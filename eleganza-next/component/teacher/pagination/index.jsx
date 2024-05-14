import React from 'react'
import styles from './pagination.module.scss'

export default function Pagination({
  currentPage,
  totalItems, // 通用名称，可以代表 totalCourses 或 totalTeachers
  itemsPerPage, // 通用名称，可以代表 coursesPerPage 或 teachersPerPage
  onChange, // 通用处理函数，可以代表 paginate 函数
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  // 如果总数小于或等于每页显示的数量，不显示分页控件
  if (totalItems <= itemsPerPage) {
    return null
  }

  const pageNumbers = []
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }

  return (
    <div className={styles.pagination}>
      <button
        className={`${styles['pagination-icons']} ${currentPage > 1 ? '' : styles.disabled}`}
        onClick={() => currentPage > 1 && onChange(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        <img src="/icons/icon-chevron-left.svg" alt="Previous" />
      </button>
      {pageNumbers.map((number) => (
        <button
          key={number}
          className={`${styles['pagination-link']} ${number === currentPage ? styles.active : ''}`}
          onClick={() => onChange(number)}
        >
          {number}
        </button>
      ))}
      <button
        className={`${styles['pagination-icons']} ${currentPage < totalPages ? '' : styles.disabled}`}
        onClick={() => currentPage < totalPages && onChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        <img src="/icons/icon-chevron-right.svg" alt="Next" />
      </button>
    </div>
  )
}
