import { useState, useEffect } from 'react'
import Breadcrumb from '@/component/course/breadcrumb'
import Navbar from '@/component/course/navbar'
import CourseDetailRight from '@/component/course/course_detail/right-column'
import CourseDetailLeft from '@/component/course/course_detail/left-column'
import Comment from '@/component/course/course_detail/comment'
import styles from './detail.module.scss'

export default function CourseDetail({ courseId }) {
  const [course, setCourse] = useState({})

  useEffect(() => {
    // 根據 courseId 加載課程資訊，這裡假設有一個函數叫做 fetchCourseById 可以根據 courseId 從 API 中獲取課程資訊
    fetchCourseById(courseId)
  }, [courseId])

  const fetchCourseById = async (id) => {
    try {
      // 發送 API 請求獲取課程資訊
      const res = await fetch(`http://localhost:3005/api/courses/${id}`)
      const data = await res.json()
      if (data.success) {
        // 如果成功獲取到課程資訊，更新 course 狀態
        setCourse(data.course)
      } else {
        console.error('無法找到指定的課程')
      }
    } catch (error) {
      console.error('獲取課程資訊時出錯:', error)
    }
  }

  return (
    <>
      <Breadcrumb />
      <Navbar />
      <div className={styles['course-details-container']}>
        <CourseDetailLeft course={course} />
        <CourseDetailRight course={course} />
      </div>
      <Comment courseId={courseId} />
    </>
  )
}
