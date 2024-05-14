import React from 'react';
import Head from 'next/head'
import styles from './mobile-cardlayout.module.css';
import LessonCard from '@/component/users/cards/lessoncard';
import UserLayout from '@/component/users/user-layout';

export default function MyLesson() {
   return (
      <>
  <div className={styles['mainarea-desktop-mylesson']}>
    <LessonCard/>
    <LessonCard/>
    <LessonCard/>
  </div>
  <div className={styles['lesson-mobile']} >
    <div className={styles['btn-mobile']} >
      <div className={styles['sbtn-selected']} >
        <a href="">全部課程</a>
      </div>
      <div className={styles['sbtn']}>
        <a href="">尚未開始</a>
      </div>
      <div className={styles['sbtn']}>
        <a href="">課程結束</a>
      </div>
    </div>
    <LessonCard/>
    <LessonCard/>
    <LessonCard/>
  </div>
</>

   
   );
}

MyLesson.getLayout = function (page) {
   return <UserLayout currentPage="我的課程">{page}</UserLayout>;
};

