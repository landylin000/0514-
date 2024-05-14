import { useState, useEffect } from 'react';
import React from 'react';
import Head from 'next/head'
import styles from './account-center.module.css';
import UserLayout from '@/component/users/user-layout';
import { useRouter } from 'next/router';

export default function AccountCenter() {
   const [userDetails, setUserDetails] = useState(null);
   const router = useRouter();

   useEffect(() => {
      const { userId } = router.query; // 從 URL 參數中獲取用戶 ID
      if (userId) {
         // 向後端 API 端點發送請求獲取使用者資料
         fetch(`http://localhost:3005/api/home-myaccount/${userId}`)
            .then((response) => response.json())
            .then((data) => {
               setUserDetails(data.userDetails);
            })
            .catch((error) => console.error('Error fetching user details:', error));
      }
   }, [router.query.userId]); 
 
   const handleSave = () => {
      // 將更新後的用戶資料發送到後端
      fetch(`http://localhost:3005/api/home-myaccount/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_name: userDetails.user_name,
          user_account: userDetails.user_account,
          user_password: userDetails.user_password,
          user_phone: userDetails.user_phone,
          user_email: userDetails.user_email,
        }),
      })
      .then((response) => response.json())
      .then((data) => {
        console.log('Update success:', data);
        // 在更新成功後，你可以做一些額外的處理，例如顯示成功提示、重新加載用戶資料等
      })
      .catch((error) => console.error('Error updating user details:', error));
    };
 
   return (
     <>
       <div className={styles['main']}>
         <div className={styles['mainarea-desktop']}>
         <div>
            <form>
               <p className={styles['maintitle']} >帳號細節</p>
               <div className={styles['formdetail']} >
               <div className={styles['formkey']} >
                  <p>帳號名稱</p>
                  <p>手機號碼</p>
               </div>
               <div className={styles['formvalue']} >
                  <p>{userDetails?.user_email}</p>
                  <p>{userDetails?.user_phone}</p>
               </div>
               </div>
            </form>
            <div>
               <p className={styles['maintitle']}>個人檔案</p>
               <div className={styles['formdetail']}>
               <div className={styles['formkey']}>
                  <p>姓名</p>
                  <p>手機號碼</p>
                  <p>顯示名稱</p>
               </div>
               <div className={styles['formvalue']}>
               <input className={styles['formstyle']} type="text" defaultValue={userDetails?.user_name} />
               <input className={styles['formstyle']} type="text" defaultValue={userDetails?.user_phone} /> {/* 將數字轉換為字串 */}
               <input className={styles['formstyle']} type="text" defaultValue={userDetails?.user_account}/>
               </div>
               </div>
            </div>
            <div>
               <p className={styles['maintitle']}>變更密碼</p>
               <div className={styles['formdetail']}>
               <div className={styles['formkey']}>
                  <p>舊密碼</p>
                  <p>新密碼</p>
                  <p>密碼確認</p>
               </div>
               <div className={styles['formvalue']}>
                  <input className={styles['formstyle']} type="password" defaultValue={userDetails?.user_password} />
                  <input className={styles['formstyle']} type="password" defaultValue="" />
                  <input className={styles['formstyle']} type="password" defaultValue="" />
                  <div className={styles['xsbtn']} >
                     <a href="">儲存</a>
                  </div>
               </div>
               </div>
            </div>
         </div>
         </div>
         
         <div className={styles['mainarea-mobile']} >
         <form>
            <div
               style={{
               marginBottom: 20,
               width: "100%",
               borderBottom: "0.5px solid var(--color-primary-medium)"
               }}
            >
               <p>Fanny456</p>
            </div>
            <p className={styles['maintitle']} >帳號細節</p>
            <div className={styles['formdetail']}>
               <div className={styles['formkey']}>
               <p>帳號名稱</p>
               <p>手機號碼</p>
               </div>
               <div className={styles['formvalue']}>
               <p>{userDetails?.user_email}</p>
               <p>{userDetails?.user_phone}</p>
               </div>
            </div>
            <p className={styles['maintitle']}>個人檔案</p>
            <div className={styles['formdetail']}>
               <div className={styles['formkey']}>
               <p>姓名</p>
               <p>手機號碼</p>
               <p>顯示名稱</p>
               </div>
               <div className={styles['formvalue']}>
               <input className={styles['formstyle']} type="text" defaultValue={userDetails?.user_name} />
               <input className={styles['formstyle']} type="text" defaultValue={userDetails?.user_phone} />
               <input className={styles['formstyle']} type="text" defaultValue={userDetails?.user_account} />
               </div>
            </div>
            <p className={styles['maintitle']}>變更密碼</p>
            <div className={styles['formdetail']}>
               <div className={styles['formkey']}>
               <p>舊密碼</p>
               <p>新密碼</p>
               <p>密碼確認</p>
               </div>
               <div className={styles['formvalue']}>
               <input className={styles['formstyle']} type="password" defaultValue={userDetails?.user_password} />
               <input className={styles['formstyle']} type="password" defaultValue="" />
               <input className={styles['formstyle']} type="password" defaultValue="" />
               </div>
            </div>
         </form>
         <div className={styles['xsbtn']}>
            <button type="button" onClick={handleSave}>儲存</button>
         </div>
         </div>
         </div>
     </>
   );
 }

AccountCenter.getLayout = function (page) {
return <UserLayout currentPage="我的帳號">{page}</UserLayout>;}