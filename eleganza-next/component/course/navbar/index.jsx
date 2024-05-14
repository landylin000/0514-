import React, { useState } from 'react'
import styles from './navbar.module.scss'

export default function Navbar({ onCourseFilter, onSortChange }) {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [showSortMenu, setShowSortMenu] = useState(false)

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId)
    if (typeof onCourseFilter === 'function') {
      onCourseFilter(categoryId)
    }
  }

  const toggleSortMenu = () => {
    setShowSortMenu(!showSortMenu)
  }

  const handleSortSelection = (sortType) => {
    if (typeof onSortChange === 'function') {
      onSortChange(sortType)
    }
    setShowSortMenu(false) // Close menu after selection
  }

  return (
    <>
      <nav className={styles.navbar}>
        <ul>
          <li>
            <button
              className={selectedCategory === null ? styles.active : ''}
              onClick={() => handleCategoryClick(null)}
            >
              全部課程
            </button>
          </li>
          <li>
            <button
              className={selectedCategory === 1 ? styles.active : ''}
              onClick={() => handleCategoryClick(1)}
            >
              初階個別課
            </button>
          </li>
          <li>
            <button
              className={selectedCategory === 2 ? styles.active : ''}
              onClick={() => handleCategoryClick(2)}
            >
              中階個別課
            </button>
          </li>
          <li>
            <button
              className={selectedCategory === 3 ? styles.active : ''}
              onClick={() => handleCategoryClick(3)}
            >
              高階個別課
            </button>
          </li>
          <li>
            <button
              className={selectedCategory === 4 ? styles.active : ''}
              onClick={() => handleCategoryClick(4)}
            >
              團體班
            </button>
          </li>
          <li>
            <button
              className={selectedCategory === 5 ? styles.active : ''}
              onClick={() => handleCategoryClick(5)}
            >
              大師班
            </button>
          </li>
        </ul>
        <div className={styles['navbar-icons']}>
          <a href="">
            <img
              className={styles.search}
              src="/icons/icon-search.svg"
              alt="Search"
            />
          </a>
          <div className={styles['navbar-icons2']}>
            <button onClick={toggleSortMenu}>排序</button>
            {showSortMenu && (
              <div className={styles['sort-menu']}>
                <button onClick={() => handleSortSelection('priceAsc')}>
                  價格升序
                </button>
                <button onClick={() => handleSortSelection('priceDesc')}>
                  價格降序
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
      <hr />
      <div className={styles['filter-container']}>
        <a className={styles.Filter} href="#">
          篩選條件
          <img src="/icons/icon-chevron-down.svg" alt="Filter" />
        </a>
        <a className={styles.sort} href="">
          sort by
          <img src="/icons/icon-chevron-down.svg" alt="Sort" />
        </a>
      </div>
    </>
  )
}
