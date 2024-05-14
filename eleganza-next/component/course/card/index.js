import React from 'react'
import styles from './card.module.scss'
import { Link } from 'react-router-dom'

export default function Card({ course, onClick }) {
  return (
    <div className="card-row" onClick={() => onClick(course.id)}>
      <div className={styles['card-body']}>
        <img
          src={`/images/course_images/${course.course_img}`}
          className={styles['card-image']}
          alt=""
        />
        <div className={styles['card-content']}>
          <div className={styles['ul-container']}>
            <div className={styles['text-box']}>
              <p>
                {course.course_style} / {course.teacher_name}老師
              </p>
              <p>{course.course_name}</p>
            </div>
            <div className={styles['text-box']}>
              <ul>
                <li>{course.course_description}</li>
              </ul>
            </div>
          </div>
        </div>
        <div className={styles['card-footer']}>
          <div className={styles['card-icons']}>
            <img src="/icons/icon-like.svg" alt="Icon 1" />
            <img src="/icons/icon-cart.svg" alt="Icon 2" />
          </div>
          <div className={styles['card-price']}>
            <p>${course.course_price}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
