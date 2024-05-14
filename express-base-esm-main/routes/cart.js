import express from 'express'
const router = express.Router() // 创建路由

import ShoppingCart from '##/models/ShoppingCart.js'
import Product from '##/models/Product.js'
import Course from '##/models/Course.js'
import Teacher from '##/models/Teacher.js'

// 中间件，假设存在用户身份验证机制，提供req.user.id
import authenticate from '#middlewares/authenticate.js'

// 获取购物车的当前状态，包括商品详细信息和总金额
router.get('/cart', authenticate, async (req, res) => {
  try {
    const userId = req.user.id // 假设有用户身份验证机制

    const cartItems = await ShoppingCart.findAll({
      where: { user_id: userId },
      include: [
        { model: Product, as: 'product' },
        { model: Course, as: 'course' },
        { model: Teacher, as: 'teacher' },
      ],
    })

    // 计算购物车总金额
    const total = cartItems.reduce((acc, item) => {
      const itemPrice = item.product_price || item.course_price || 0
      return acc + itemPrice * item.quantity
    }, 0)

    res.json({ status: 'success', data: { cartItems, total } })
  } catch (error) {
    console.error('Error fetching cart:', error)
    res.status(500).json({ status: 'error', message: 'Error fetching cart' })
  }
})

// 添加商品到购物车，或者增加现有商品的数量
router.post('/cart/add', authenticate, async (req, res) => {
  const { product_id, course_id, quantity = 1 } = req.body // 商品信息
  const userId = req.user.id

  try {
    // 检查购物车中是否已有此商品
    let cartItem = await ShoppingCart.findOne({
      where: { user_id: userId, product_id, course_id },
    })

    if (cartItem) {
      // 如果商品已经存在，增加其数量
      cartItem.quantity += quantity
      await cartItem.save() // 保存更改
    } else {
      // 如果商品不存在，创建新的购物车项
      cartItem = await ShoppingCart.create({
        user_id: userId,
        product_id,
        course_id,
        quantity,
        product_price: product_id
          ? (await Product.findByPk(product_id)).price
          : null,
        course_price: course_id
          ? (await Course.findByPk(course_id)).price
          : null,
      })
    }

    res.json({ status: 'success', data: cartItem })
  } catch (error) {
    console.error('Error adding to cart:', error)
    res.status(500).json({ status: 'error', message: 'Error adding to cart' })
  }
})

// 减少购物车中商品的数量，如果少于1则自动移除
router.post('/cart/decrease', authenticate, async (req, res) => {
  const { product_id, course_id } = req.body // 获取商品信息
  const userId = req.user.id

  try {
    const cartItem = await ShoppingCart.findOne({
      where: { user_id: userId, product_id, course_id },
    })

    if (!cartItem) {
      return res
        .status(404)
        .json({ status: 'fail', message: 'Item not found in cart' })
    }

    // 减少商品数量
    cartItem.quantity -= 1

    if (cartItem.quantity < 1) {
      // 如果数量小于1，删除购物车项
      await cartItem.destroy()
    } else {
      await cartItem.save() // 保存更改
    }

    res.json({ status: 'success', data: cartItem })
  } catch (error) {
    console.error('Error decreasing item in cart:', error)
    res
      .status(500)
      .json({ status: 'error', message: 'Error decreasing item in cart' })
  }
})

export default router // 导出路由
