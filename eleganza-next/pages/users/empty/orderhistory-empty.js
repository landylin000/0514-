import React from 'react';
import Head from 'next/head'
import styles from './empty.module.css';
import UserLayout from '@/component/users/user-layout';

export default function CollectionEmpty() {
   return (
      <>
  <div className={styles['mainarea-desktop-collection']} >
    <div className={styles['emptycontent']} >
      <p>您尚未有任何一筆訂單</p>
    </div>
    <div className={styles['sbtn']}>
      <a href="">前往購物</a>
    </div>
  </div>
  <div className={styles['lesson-mobile']} >
    <div className={styles['emptycontent']}>
      <p>您尚未有任何一筆訂單</p>
    </div>
    <div className={styles['sbtn']}>
      <a href="">前往購物</a>
    </div>
  </div>
</>

   );
}

CollectionEmpty.getLayout = function (page) {
   return <UserLayout currentPage="歷史訂單">{page}</UserLayout>;
};









