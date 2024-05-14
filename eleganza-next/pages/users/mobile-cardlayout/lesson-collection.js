import React from 'react';
import Head from 'next/head'
import styles from './mobile-cardlayout.module.css';
import LessonCollectionCard from '@/component/users/cards/lessoncollection';
import UserLayout from '@/component/users/user-layout';

export default function LessonCollection() {
   return (
      <>
  <div className={styles['mainarea-desktop-collection']}>
    <LessonCollectionCard/>
    <LessonCollectionCard/>
    <LessonCollectionCard/>
  </div>
  <div className={styles['lesson-mobile']} >
    <div className={styles['btn-mobile']} >
      <div className={styles['sbtn-selected']} >
        <a href="">商品收藏</a>
      </div>
      <div className={styles['sbtn']}>
        <a href="">課程收藏</a>
      </div>
    </div>
    <LessonCollectionCard/>
    <LessonCollectionCard/>
    <LessonCollectionCard/>
  </div>
</>

   
   );
}

LessonCollection.getLayout = function (page) {
   return <UserLayout currentPage="收藏內容">{page}</UserLayout>;
};



   
      
      