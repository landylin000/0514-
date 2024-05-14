import React from 'react'
import styles from './pagination.module.scss'

export default function Pagination() {
  return (
    <>
      <div className={styles.pagination}>
        <a className={styles['pagination-icons']} href="#">
          <img src="/icons/icon-chevron-left.svg" alt="Previous" />
        </a>
        <a href="#">1</a>
        <a href="#">2</a>
        <a href="#">3</a>
        <a href="#">4</a>
        <a href="#">5</a>
        <a className={styles['pagination-icons']} href="#">
          <img src="/icons/icon-chevron-right.svg" alt="Next" />
        </a>
      </div>
    </>
  )
}
