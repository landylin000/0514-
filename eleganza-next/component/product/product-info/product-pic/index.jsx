import { useState, useEffect } from 'react'
import styles from './product-pic.module.scss'

export default function ProductPic({ product, picsArr }) {
  // const
  return (
    <>
      <div className={`row`}>
        <div className={`col-10`}>
          <div className={`${styles['product-pic']} h-100`}>
            <div className=" ratio ratio-1x1">
              <img
                className={`${styles['obj-fit']}`}
                src={`/images/product_images/${product.img}`}
                alt=""
              />
            </div>
          </div>
        </div>
        <div className={`col-2`}>
          <div className={`${styles['arrow']} text-center`}>
            <img src="/icons/icon-chevron-up.svg" alt="" />
          </div>
          <div className={`${styles['preview']} d-flex flex-column `} >
            <div className={`${styles['preview-pic']} d-flex flex-column`}>
              {picsArr.slice(0,5).map((v, i) => {
                return (
                  <img
                    className={`my-1`}
                    key={i}
                    src={`/images/product_images/${v}`}
                    alt=""
                  />
                )
              })}
            </div>
          </div>
          <div className={`${styles['arrow']} text-center`}>
            <img src="/icons/icon-chevron-down.svg" alt="" />
          </div>
        </div>
      </div>
    </>
  )
}
