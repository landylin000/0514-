import { useState, useEffect } from 'react';
import React from 'react';
import styles from './lessoncollection.module.scss'

export default function LessonCollectionCard({lessonId=201}) {
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
        <div className={`${styles['productcard']} ${styles['desktop-only']}`}>
            <a href="">
                <img
                src="/images/course_images/2.Wu Junyan.jpg"
                alt=""
                className={styles['productcardimg']} 
                />
            </a>
            <div className= {styles['product-word']} >
                <ul className={`${styles.productcardtitle} list-unstyled`} >
                <li className={styles['productbranding']} >
                    <a href="">2024/11/4</a>
                </li>
                <li>
                    <a className={styles['productname']} href="">
                    {lessonDetails?.course_name} 
                    </a>
                </li>
                <li>
                    <a className={styles['teachername']} href="">
                    {lessonDetails?.course_teacher_name} 教師
                    </a>
                </li>
                <li className={styles['lessontime']} >18:00~20:00</li>
                </ul>
                <ul className={`${styles['productcard-function']} list-unstyled`}>
                <li className={styles['productprice']} >{lessonDetails?.course_price}</li>
                <div className={styles['productcardicons']} >
                    <a href="">
                    <img src="/icons/icon-cart.svg" alt="購物車" />
                    </a>
                    <a href="">
                    <img src="/icons/icon-liked.svg" alt="收藏" />
                    </a>
                </div>
                </ul>
            </div>
            </div>
            <div className={`${styles['productcard']} ${styles['mobile-only']}`}>
                <img
                    src="/images/course_images/2.Wu Junyan.jpg"
                    alt=""
                    className={styles['productcardimg']}
                />
                <div className={styles['product-word']}>
                    <ul className={`${styles.productcardtitle} list-unstyled`}>
                    <li>
                        <a className={styles['productname']} href="">
                        {lessonDetails?.course_name}
                        </a>
                    </li>
                    <li>
                        <a className={styles['teachername']} href="">
                        {lessonDetails?.course_teacher_name} 教師
                        </a>
                    </li>
                    <li className={styles['lessontime']}>18:00~20:00, 2024/11/4</li>
                    </ul>
                    <ul className={`${styles['productcard-function']} list-unstyled`}>
                    <li className={styles['productprice']}>{lessonDetails?.course_price}</li>
                    <div className={styles['productcardicons']}>
                        <a href="">
                        <img src="/icons/icon-cart.svg" alt="購物車" />
                        </a>
                        <a href="">
                        <img src="/icons/icon-x.svg" alt="刪除" />
                        </a>
                    </div>
                    </ul>
                </div>
                </div>

    </>
  )
}
