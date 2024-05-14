import express from 'express';
const router = express.Router();
import db from '##/configs/mysql.js';
import 'dotenv/config.js';

router.get('/', async (req, res) => {
  try {
    const [orders] = await db.query('SELECT * FROM `order`');
    res.json({ orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:orderId', async (req, res) => {
  try {
    const orderId = req.params.orderId; 
    const [rows] = await db.query('SELECT * FROM `order` WHERE order_id=?', [orderId]);
    console.log(rows);

    res.json({ orderDetails: rows[0] });
  } catch (error) {
    console.error('Error fetching order details:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;