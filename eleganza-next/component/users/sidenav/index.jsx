import { useState, useEffect } from 'react';
import React from 'react'
import styles from './sidenav.module.scss'
import { useRouter } from 'next/router';

export default function SideNav() {
  const [currentPage, setCurrentPage] = useState('我的帳號'); // 預設為我的帳號頁面
  const [isSideNavVisible, setIsSideNavVisible] = useState(false);
  const router = useRouter();
  const handleLogout = (e) => {
    // 清除存储在浏览器中的 cookie 或本地存储
    // 例如，清除名为 'authToken' 的 cookie 再研究，還沒刪掉cookie
    e.preventDefault();
    document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    // 重定向到登录页面或其他相关页面
    router.push('/users/user-form/login'); // 将 '/login' 替换为你的登录页面路径
};

   const toggleSideNav = () => {
    setIsSideNavVisible(!isSideNavVisible);
  };

  return (
    <>
      <div className={styles['sidenav-desktop']}>
        <ul className={`list-unstyled ${styles['accountname']}`} >
          <li className="">
            <div>
              <p>Fanny456</p>
            </div>
          </li>
        </ul>
        <hr />
        <ul className={`list-unstyled ${styles['accountform']}`}>
          <li>
            <a href="#"
              onClick={() => setCurrentPage('我的帳號')}
              className={currentPage === '我的帳號' ? styles['sidenavselected'] : ''}>
              我的帳號
            </a>
          </li>
          <li>
            <a href="#"
              onClick={() => setCurrentPage('我的課程')}
              className={currentPage === '我的課程' ? styles['sidenavselected'] : ''}>我的課程</a>
          </li>
          <li>
            <a href="#"
              onClick={() => setCurrentPage('收藏內容')}
              className={currentPage === '收藏內容' ? styles['sidenavselected'] : ''}>收藏內容</a>
          </li>
          <li>
            <a href="#"
              onClick={() => setCurrentPage('歷史訂單')}
              className={currentPage === '歷史訂單' ? styles['sidenavselected'] : ''}>歷史訂單</a>
          </li>
          <li>
            <a className={styles['sidenavlogout']} onClick={handleLogout} href="">
              登出
            </a>
          </li>
        </ul>
      </div>
      <div className={`${styles['sidenav-mobile']} ${isSideNavVisible ? styles['show'] : styles['hide']}`}>
        <ul className={`list-unstyled ${styles['accountname']}`}>
          <li className="">
            <div
              style={{
                marginBottom: 20,
                width: "100%",
                borderBottom: "0.5px solid var(--color-primary-medium)"
              }}
            >
              <p>Fanny456</p>
            </div>
          </li>
        </ul>
        <ul className={`list-unstyled ${styles['accountform-mobile']}`}>
          <li>
            <a href="#"
              onClick={() => setCurrentPage('我的帳號')}
              className={currentPage === '我的帳號' ? styles['sidenavselected'] : ''}>
              我的帳號
              <img src="./icons/icon-chevron-right.svg" alt="" />
            </a>
          </li>
          <li>
            <a href="#"
              onClick={() => setCurrentPage('我的課程')}
              className={currentPage === '我的課程' ? styles['sidenavselected'] : ''}>
              我的課程
              <img src="./icons/icon-chevron-right.svg" alt="" />
            </a>
          </li>
          <li>
            <a href="#"
              onClick={() => setCurrentPage('收藏內容')}
              className={currentPage === '收藏內容' ? styles['sidenavselected'] : ''}>
              收藏內容
              <img src="./icons/icon-chevron-right.svg" alt="" />
            </a>
          </li>
          <li>
            <a href="#"
              onClick={() => setCurrentPage('歷史訂單')}
              className={currentPage === '歷史訂單' ? styles['sidenavselected'] : ''}>
              歷史訂單
              <img src="./icons/icon-chevron-right.svg" alt="" />
            </a>
          </li>
          <li>
            <a className={styles['sidenavlogout']} href="">
              登出
            </a>
          </li>
        </ul>
      </div>
</>

  )
}