import React from 'react'
import styles from './breadcrumb.module.scss'

export default function Breadcrumb() {
  return (
    <>
      <div className={styles.breadcrumb}>
        <a href="#">首頁</a>
        <span className={styles.separator}>/</span>
        <a href="#">精選課程</a>
        <a href="#" className={styles['chevron-left']}>
          <img src="./icons/icon-chevron-left.svg" alt="" />
        </a>
        <a href="#" className={styles.prev}>
          上一頁
        </a>
        <a href="#" className={styles.search}>
          <img src="./icons/icon-search.svg" alt="" />
        </a>
      </div>
    </>
  )
}
