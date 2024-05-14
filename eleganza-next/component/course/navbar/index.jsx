import React, { useState } from 'react'
import styles from './navbar.module.scss'

export default function Navbar({ onCourseFilter }) {
  const [selectedCategory, setSelectedCategory] = useState(null)

  const handleCategoryClick = (category) => {
    setSelectedCategory(category)
    // 确保 onCourseFilter 是一个函数再调用它
    if (typeof onCourseFilter === 'function') {
      onCourseFilter(category)
    }
  }

  return (
    <>
      <nav className={styles.navbar}>
        <ul>
          <li>
            <button onClick={() => handleCategoryClick(null)}>全部課程</button>
          </li>
          <li>
            <button onClick={() => handleCategoryClick('初階個別課')}>
              初階個別課
            </button>
          </li>
          <li>
            <button onClick={() => handleCategoryClick('中階個別課')}>
              中階個別課
            </button>
          </li>
          <li>
            <button onClick={() => handleCategoryClick('高階個別課')}>
              高階個別課
            </button>
          </li>
          <li>
            <button onClick={() => handleCategoryClick('團體班')}>
              團體班
            </button>
          </li>
          <li>
            <button onClick={() => handleCategoryClick('大師班')}>
              大師班
            </button>
          </li>
        </ul>
        <div
          className={`${styles['navbar-icons']} d-flex align-items-center justify-content-between`}
        >
          <a href="">
            <img className={styles.search} src="/icons/icon-search.svg" />
          </a>
          <div className={styles['navbar-icons2']}>
            <a href="">排序</a>
            <a href="">
              <img
                className={styles['chevron-down']}
                src="/icons/icon-chevron-down.svg"
              />
            </a>
          </div>
        </div>
      </nav>
      <hr></hr>
      {/* <div className={styles['navbar-divider']} /> */}
      <div className={styles['filter-container']}>
        <a className={styles.Filter} href="#">
          篩選條件
          <img src="/icons/icon-chevron-down.svg" alt="" />
        </a>
        <a className={styles.sort} href="">
          sort by
          <img src="/icons/icon-chevron-down.svg" alt="" />
        </a>
      </div>
    </>
  )
}
