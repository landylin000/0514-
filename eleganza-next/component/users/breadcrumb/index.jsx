import React from 'react';
import styles from './breadcrumb.module.scss';
import { useState, useEffect } from 'react';

export default function Breadcrumb({ currentPage, handleIconClick }) {
  
  // const [isSideNavVisible, setIsSideNavVisible] = useState(false);
  // const toggleSideNav = () => {
  //   setIsSideNavVisible(!isSideNavVisible);
  // };

  return (
    <>
      <div className={styles['tabs-desktop']}>
        <ul className={`list-unstyled`}>
          <li>
            <a href="">首頁</a> /
          </li>
          <li>
            <a href="">會員中心</a> /
          </li>
          <li className={styles['current']}>
            <a href="">{currentPage}</a>
          </li>
        </ul>
      </div>
      <div className={styles['tabs-mobile']}>
        <ul className={`list-unstyled`}>
          <li>
            <a href="#" onClick={handleIconClick}>
              <img src="/icons/icon-chevron-left.svg" alt="" />
            </a>
            {currentPage}
          </li>
        </ul>
      </div>
    </>
  );
}