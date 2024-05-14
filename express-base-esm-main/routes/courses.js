import express from 'express'
const router = express.Router()

// 資料庫使用
import sequelize from '#configs/db.js'
const { Course } = sequelize.models

router.get('/', async function (req, res) {
  try {
    const courses = await Course.findAll({ logging: console.log })
    // 處理如果沒找到資料

    // 標準回傳JSON
    return res.json({ status: 'success', data: { courses } })
  } catch (error) {
    console.error('Error retrieving courses:', error)
    return res
      .status(500)
      .json({ status: 'error', message: '無法取得課程資料' })
  }
})

// GET - 得到單筆資料(注意，有動態參數時要寫在GET區段最後面)
router.get('/:id', async function (req, res) {
  const courseId = req.params.id // 取得動態路由參數中的 id

  try {
    const course = await Course.findByPk(courseId, {
      raw: true, // 只需要資料表中資料
    })

    if (!course) {
      return res
        .status(404)
        .json({ status: 'error', message: '找不到指定的課程' })
    }

    return res.json({ status: 'success', data: { course } })
  } catch (error) {
    console.error('Error retrieving course:', error)
    return res
      .status(500)
      .json({ status: 'error', message: '無法取得指定的課程' })
  }
})

// POST - 新增課程資料
router.post('/', async function (req, res) {
  // 要新增的課程資料
  const newCourse = req.body

  // 檢查從前端來的資料哪些為必要(course_id, course_class_id...)
  if (
    !newCourse.course_id ||
    !newCourse.course_class_id ||
    !newCourse.teacher_id ||
    !newCourse.course_name ||
    !newCourse.course_img ||
    !newCourse.course_style ||
    !newCourse.course_description ||
    !newCourse.quota
  ) {
    return res.json({ status: 'error', message: '缺少必要資料' })
  }

  try {
    // 建立課程資料
    const course = await Course.create({
      course_id: newCourse.course_id,
      course_class_id: newCourse.course_class_id,
      teacher_id: newCourse.teacher_id,
      course_name: newCourse.course_name,
      course_img: newCourse.course_img,
      course_price: newCourse.course_price,
      course_style: newCourse.course_style,
      course_description: newCourse.course_description,
      quota: newCourse.quota,
    })

    // 成功建立課程的回應
    return res.status(201).json({
      status: 'success',
      data: course, // 回傳新建立的課程資料
    })
  } catch (error) {
    console.error('Error creating course:', error)
    return res.status(500).json({ status: 'error', message: '建立課程失敗' })
  }
})

export default router
