import { useState, useEffect } from 'react';
import React from 'react';
import styles from './lessoncard.module.scss'

export default function LessonCard({lessonId=2701}) {
    const [lessonDetails, setLessonDetails] = useState(null);

    useEffect(() => {
        // 向後端 API 端點發送請求獲取使用者資料
        fetch(`http://localhost:3005/api/my-lessoncollection/${lessonId}`)
          .then((response) => response.json())
          .then((data) => {
            setLessonDetails(data.lessonDetails);
          })
          .catch((error) => console.error('Error fetching lesson details:', error));
      }, [lessonId]); 

  return (
    <>
    <div className={styles['lessoncard']}>
        <img
            src="/images/course_images/movie_soundtrack_class.jpg"
            alt=""
            className={styles['lessoncardimg']}
        />
        <div className={styles['lessoncard-word']} >
            <ul className={`${styles.lessoncardtitle} list-unstyled`}>
            <li className={styles['lessondate']} >2024/11/4</li>
            <li>
                <a className={styles['lessonname']} href="">
                {lessonDetails?.course_name}
                </a>
            </li>
            <li>
                <a className={styles['teachername']} href="">
                {lessonDetails?.course_teacher_name} 教師
                </a>
            </li>
            </ul>
            <ul className={`list-unstyled`} >
            <li className={styles['lessoncardtime']} >18:00~20:00</li>
            </ul>
        </div>
        </div>
        </>

  )
}