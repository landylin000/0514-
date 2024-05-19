import React, { useState } from 'react'
import styles from './navbar.module.scss'

function debounce(fn, delay) {
  let timeoutId
  return function (...args) {
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn.apply(this, args), delay)
  }
}

export default function Navbar({
  onCourseFilter,
  onSortChange,
  onSearchResults,
  showSearch = true,
  showSort = true,
}) {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const categories = [
    { id: 1, name: '初階個別課' },
    { id: 2, name: '中階個別課' },
    { id: 3, name: '高階個別課' },
    { id: 4, name: '團體課' },
  ]

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId)
    onCourseFilter(categoryId)
  }

  const handleSortChange = (event) => {
    onSortChange(event.target.value)
  }

  const handleSearch = async (searchValue) => {
      try {
        const encodedSearchValue = encodeURIComponent(searchValue.trim())
        const response = searchValue
          ? await fetch(`http://localhost:3005/api/courses/search/${encodedSearchValue}`)
          : await fetch('http://localhost:3005/api/courses')
        const results = await response.json()
        console.log('API response:', results)
        if (response.ok) {
          onSearchResults(results.data.courses)
        } else {
          console.error('搜索请求失败:', results)
        }
      } catch (error) {
        console.error('搜索请求错误:', error)
      }
  }

  const debouncedSearch = debounce(handleSearch, 300)

  const handleSearchChange = (event) => {
    const newSearchTerm = event.target.value
    setSearchTerm(newSearchTerm)
    debouncedSearch(newSearchTerm)
  }

  return (
    <nav className={styles.navbar}>
      <ul>
        <li>
          <button
            className={!selectedCategory ? styles.active : ''}
            onClick={() => handleCategoryClick(null)}
          >
            全部課程
          </button>
        </li>
        {categories.map((category) => (
          <li key={category.id}>
            <button
              className={selectedCategory === category.id ? styles.active : ''}
              onClick={() => handleCategoryClick(category.id)}
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>
      <div className={styles['search-and-sort']}>
        {showSearch && (
          <>
            <img src="/icons/icon-search.svg" alt="Search" />
            <input
              type="text"
              placeholder="搜尋課程..."
              value={searchTerm}
              onChange={handleSearchChange}
              className={styles.searchInput}
            />
          </>
        )}
        {showSort && (
          <>
            <label htmlFor="sortSelect" className={styles.sortLabel}>
              排序
            </label>
            <select
              id="sortSelect"
              onChange={handleSortChange}
              className={styles.sortSelect}
            >
              <option value="">請選擇</option>
              <option value="priceAsc">價格從低到高</option>
              <option value="priceDesc">價格從高到低</option>
            </select>
          </>
        )}
      </div>
    </nav>
  )
}
