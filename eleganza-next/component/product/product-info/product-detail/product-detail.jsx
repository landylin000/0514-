import React from 'react'
import styles from './product-detail.module.scss'

export default function ProductDetail({ product }) {
  return (
    <div className={styles['product-info']}>
      <div className={styles.brand + ' mb-1'}>{product.brand}</div>
      <div className={styles['product-name'] + ' mb-1'}>{product.name}</div>
      <div className={'d-flex align-items-center ' + styles.rating}>
        <img src="/icons/icon-star-solid.svg" alt="" />
        <img src="/icons/icon-star-solid.svg" alt="" />
        <img src="/icons/icon-star-solid.svg" alt="" />
        <img src="/icons/icon-star-solid.svg" alt="" />
        <img src="/icons/icon-star-solid.svg" alt="" />
        <span className="ms-1 mt-1">4.3(24)</span>
      </div>
      <div className={styles.price}>${product.product_price}</div>
      <div className="d-flex justify-content-between">
        <img src="/icons/icon-like.svg" alt="" />
        <div className={'d-flex ' + styles.num}>
          <img src="/icons/icon-minus.svg" alt="" />
          <div className={styles['num-area']}>{product.num}</div>
          <img src="/icons/icon-plus.svg" alt="" />
        </div>
        <button className="flex-grow-1">加入購物車</button>
      </div>
    </div>
  )
}
