import express from 'express';
const router = express.Router();
import db from '##/configs/mysql.js';
import 'dotenv/config.js';

router.get('/', async (req, res) => {
  const [products] = await db.query('SELECT * FROM `product`')

res.json({ products });
});

router.get('/:productId', async (req, res) => {
  try {
    const productId = req.params.productId; 
    // 從資料庫中取得使用者資料
    const [rows] = await db.query('SELECT * FROM product WHERE product_id=? ', [productId]);
    console.log(rows);


    // 回傳資料給前端
    res.json({ productDetails:rows[0] });
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router