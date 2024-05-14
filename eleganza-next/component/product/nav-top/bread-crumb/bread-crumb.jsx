import React from 'react'
import styles from './bread-crumb.module.scss'
import Link from 'next/link'
import Router from 'next/router'

export default function BreadCrumb() {
  function handleBack() {
    window.history.go(-1)
  }

  return (
    <>
      <div className={styles['bread-crumb']}>
        <div className={`${styles['bread-crumb-pc']} d-none d-md-block`}>
          <span>
            <Link href={`/`}>首頁 </Link>
          </span>
          <span>/</span>
          <span className={styles['current']}>
            <Link href={`/products`}> 產品列表 </Link>
          </span>
        </div>
        <div className={`${styles['bread-crumb-m']} d-block d-md-none`}>
          <div className="d-flex justify-content-between align-item-center">
            <button onClick={handleBack}>
              <img className="mb-1" src="/icons/icon-chevron-left.svg" alt="" />{' '}
              上一頁
            </button>
            <span>
              <img className="mb-1" src="/icons/icon-search.svg" alt="" />
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
