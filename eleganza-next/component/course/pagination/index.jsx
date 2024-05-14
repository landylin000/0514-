import React from 'react'
import styles from './pagination.module.scss'

export default function Pagination({
  currentPage,
  totalCourses,
  coursesPerPage,
  onChange,
}) {
  const totalPages = Math.ceil(totalCourses / coursesPerPage)

  // 如果总课程数小于或等于每页显示的课程数，不显示分页控件
  if (totalCourses <= coursesPerPage) {
    return null
  }

  const pageNumbers = []
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }

  return (
    <>
      <div className={styles.pagination}>
        <a
          className={styles['pagination-icons']}
          onClick={() => (currentPage > 1 ? onChange(currentPage - 1) : null)}
          href="#"
          style={{ visibility: currentPage > 1 ? 'visible' : 'hidden' }}
        >
          <img src="/icons/icon-chevron-left.svg" alt="Previous" />
        </a>
        {pageNumbers.map((number) => (
          <a
            key={number}
            href="#"
            className={number === currentPage ? `${styles.active}` : ''}
            onClick={() => onChange(number)}
          >
            {number}
          </a>
        ))}
        <a
          className={styles['pagination-icons']}
          onClick={() =>
            currentPage < totalPages ? onChange(currentPage + 1) : null
          }
          href="#"
          style={{
            visibility: currentPage < totalPages ? 'visible' : 'hidden',
          }}
        >
          <img src="/icons/icon-chevron-right.svg" alt="Next" />
        </a>
      </div>
    </>
  )
}
