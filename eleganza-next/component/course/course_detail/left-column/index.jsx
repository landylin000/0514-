import React from 'react'
import styles from './leftcolumn.module.scss'
import courseData from '../../../../data/coursesData.json'

export default function CourseDetailLeft(course) {
  return (
    <>
      <div className="left-column col-6">
        <img
          src={`/images/course_images/${course.course_img}`}
          style={{ width: 600 }}
          alt=""
        />
        <div className={styles['grid-item-left-description']}>
          <h3>課程簡介</h3>
          <p>{course.course_description}</p>
        </div>
        <div className={styles['grid-item-left-button']}>
          <h3>商品細項</h3>
          <button style={{ width: 161 } }>點我下載</button>
        </div>
      </div>
    </>
  )
}
