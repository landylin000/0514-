import express from 'express'
const router = express.Router()

import sequelize from '#configs/db.js'
const { Comment } = sequelize.models

//得到所有評論
router.get('/', async function (req, res) {
  const articleId = req.query.articleId // 從查詢參數取得文章ID
  if (!articleId) {
    return res
      .status(400)
      .json({ status: 'error', message: 'Article ID is required' })
  }

  try {
    const commentResults = await Comment.findAll({
      where: { article_id: articleId }, //使用文章ID過濾評論
      logging: console.log,
    })

    if (commentResults.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'No comments found for this article',
      })
    }

    return res.json({ status: 'success', data: { comments: commentResults } })
  } catch (error) {
    console.error('Error fetching comments:', error)
    return res
      .status(500)
      .json({ status: 'error', message: 'Error fetching comments' })
  }
})

//新增評論
router.post('/', async function (req, res) {
  const { userId, articleId, productId, courseId, rating, commentText } =
    req.body
  // 檢查至少有一個 ID 是有效的
  if (!articleId && !productId && !courseId) {
    return res
      .status(400)
      .json({ message: 'At least one ID must be valid to post a comment.' })
  }
  try {
    const newComment = await Comment.create({
      user_id: userId,
      article_id: articleId || null,
      product_id: productId || null,
      course_id: courseId || null,
      comment_star: rating,
      comment_content: commentText,
    })

    return res
      .status(201)
      .json({ status: 'success', data: { comment: newComment } })
  } catch (error) {
    console.error('Error creating comment:', error)
    return res
      .status(500)
      .json({ status: 'error', message: 'Error creating comment' })
  }
})

export default router
