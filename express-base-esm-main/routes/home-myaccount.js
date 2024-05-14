import express from 'express';
const router = express.Router();
import db from '##/configs/mysql.js';
import bodyParser from 'body-parser';
import 'dotenv/config.js';
import jwt from "jsonwebtoken";
// 中介軟體，存取隱私會員資料用
import authenticate from '#middlewares/authenticate.js'
// 檢查空物件, 轉換req.params為數字
import { getIdParam } from '#db-helpers/db-tool.js'
// 上傳檔案用使用multer
import path from 'path'
import multer from 'multer'

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const secretkey = "thisisverstrongaccesstokensecre"
const token = jwt.sign({
  userID: "BEN",

}, secretkey)

router.get('/', async (req, res) => {
  try {
    // 從資料庫中獲取所有使用者的資訊
    const [users] = await db.query('SELECT * FROM `users`');
    res.json({ users });
  } catch (error) {
    console.error('獲取使用者時發生錯誤:', error);
    res.status(500).json({ message: '伺服器錯誤' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { user_email, user_password } = req.body;
    // 在資料庫中查詢使用者記錄
    const [userRows] = await db.query('SELECT * FROM `users` WHERE `user_email`=? AND `user_password`=?', [user_email, user_password]);
    const user = userRows[0];

    if (user) {
      res.status(200).json({ userId: user.user_id });
    } else {
      res.status(401).json({ message: '無效的認證資訊' });
    }
  } catch (error) {
    console.error('登入時發生錯誤:', error);
    res.status(500).json({ message: '伺服器錯誤' });
  }
});

router.post('/register', async (req, res, next) => {
  const newUser = req.body;
  console.log(req.body);

  // 檢查是否有必要的數據
  if (!newUser.useremail || !newUser.phone || !newUser.password || !newUser.confirmPassword) {
      return res.status(400).json({ status: 'error', message: '缺少必要數據' });
  }

  if (newUser.password !== newUser.confirmPassword) {
      return res.status(400).json({ status: 'error', message: '密碼和確認密碼不匹配' });
  }

  try {
      // 檢查數據表中是否已存在相同的 email
      const [existingUsers] = await db.query('SELECT * FROM `users` WHERE `user_email` = ?', [newUser.email]);
      console.log(existingUsers);
      if (existingUsers.length > 0) {
          return res.status(400).json({ status: 'error', message: '此帳號已存在' });
      }

      // 如果數據表中不存在相同的 email，則創建新的使用者帳號
      const [createdUser] = await db.query('INSERT INTO `users` (`user_email`, `user_phone`, `user_password`) VALUES (?, ?, ?)', [newUser.useremail, newUser.phone, newUser.password]);
      console.log(createdUser);

      if (!createdUser.insertId) {
          // 若無法獲取新使用者的 insertId，則表示創建使用者失敗
          throw new Error('Failed to create user');
      }

      // 返回成功的響應
      return res.status(201).json({ status: 'success', data: null, message: '使用者帳號創建成功' });
  } catch (error) {
      console.error('Error creating user:', error);
      return res.status(500).json({ status: 'error', message: '伺服器錯誤，無法創建使用者帳號' });
  }
});

router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    // 從資料庫中獲取特定使用者的資訊
    const [rows] = await db.query('SELECT * FROM `users` WHERE `user_id`=?', [userId]);
    const userDetails = rows[0];

    res.json({ userDetails });
  } catch (error) {
    console.error('獲取使用者詳細資訊時發生錯誤:', error);
    res.status(500).json({ message: '伺服器錯誤' });
  }
});

router.put('/:userId', authenticate, async function (req, res) {
  const id = getIdParam(req);

  // 檢查是否為授權會員，只有授權會員可以存取自己的資料
  if (req.user.id !== id) {
    return res.json({ status: 'error', message: '存取會員資料失敗' });
  }

  // user 為來自前端的會員資料(準備要修改的資料)
  const user = req.body;

  // 檢查從前端瀏覽器來的資料，哪些為必要(name, ...)
  if (!id || !user.user_name || !user.user_account || !user.user_phone || !user.user_email) {
    return res.json({ status: 'error', message: '缺少必要資料' });
  }

  try {
    // 查詢資料庫目前的資料
    const [rows] = await db.query('SELECT * FROM `users` WHERE `user_id`=?', [id]);
    const dbUser = rows[0];

    // null 代表不存在
    if (!dbUser) {
      return res.json({ status: 'error', message: '使用者不存在' });
    }

    // 更新資料庫的資料
    const updateQuery = `
      UPDATE users 
      SET user_name=?, user_account=?, user_password=?, user_phone=?, user_email=?
      WHERE user_id=?
    `;
    await db.query(updateQuery, [
      user.user_name,
      user.user_account,
      user.user_password,
      user.user_phone,
      user.user_email,
      id
    ]);

    // 更新成功後，重新查詢更新後的會員資料
    const [updatedRows] = await db.query('SELECT * FROM `users` WHERE `user_id`=?', [id]);
    const updatedUser = updatedRows[0];

    // 不需要回傳密碼給前端
    delete updatedUser.user_password;

    // 回傳更新後的會員資料
    return res.json({ status: 'success', data: { user: updatedUser } });
  } catch (error) {
    console.error('更新會員資料時發生錯誤:', error);
    return res.status(500).json({ status: 'error', message: '伺服器錯誤' });
  }
});

export default router;






