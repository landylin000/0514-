import React from 'react'
import styles from './rightcolumn.module.scss'
import courseData from '../../../../data/coursesData.json'

export default function CourseDetailRight() {
  const course = courseData[0]
  return (
    <>
      <div className="right-column col-6">
        <div className={styles['grid-item-right']}>
          <div className={styles['course-details-title']}>
            <p>
              {course.course_style} / {course.teacher_id}老師
            </p>
            <h1>{course.course_name}</h1>
            <div className={styles['stars-container']}>
              <div className={styles['stars']}>
                <img src="/icons/icon-star-solid.svg" alt="" />
                <img src="/icons/icon-star-solid.svg" alt="" />
                <img src="/icons/icon-star-solid.svg" alt="" />
                <img src="/icons/icon-star-solid.svg" alt="" />
                <img src="/icons/icon-star.svg" alt="" />
              </div>
              <p>4.3(24)</p>
            </div>
            <h2>${course.course_price}</h2>
            <p>課程時間</p>
            <div className={styles['fc-container']}>
              <div id="example" />
            </div>
            <div className={styles['course-details-title-bottom']}>
              <div className={styles['course-like-icon']}>
                <a href="#">
                  <img src="/icons/icon-like.svg" alt="" />
                </a>
              </div>
              <div className={styles['action-icons']}>
                <a href="#">
                  <img src="/icons/icon-minus.svg" alt="" />
                </a>
                <button>1</button>
                <a href="#">
                  <img src="/icons/icon-plus.svg" alt="" />
                </a>
              </div>
              <button className={styles['course-add-to-cart']}>
                加入購物車
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
