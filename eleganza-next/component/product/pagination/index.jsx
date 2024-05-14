import React from 'react'
import styles from './pagination.module.scss'

export default function Pagination() {
  return (
    <>
      <div className={`${styles['pagination']} d-none d-md-block`}>
        <div className="d-flex justify-content-center align-item-center mx-auto">
          <div className={`${styles['pages']} d-flex align-items-center`}>
            <div className={`${styles['prev']} mb-1`}>
              <img src="./icons/icon-chevron-left.svg" alt="" />
            </div>
            <div className={styles['link']}>1</div>
            <div className={styles['link']}>2</div>
            <div className={styles['link']}>3</div>
            <div className={styles['link']}>4</div>
            <div className={styles['link']}>5</div>
            <div className={`${styles['next']} mb-1`}>
              <img src="./icons/icon-chevron-right.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
