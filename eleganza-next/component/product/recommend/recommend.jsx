import React from 'react'
import styles from './recommend.module.scss'
import ProductCard from '../card/product-card'

export default function Recommend({ recommendProduct }) {
  // console.log(recommendProduct)
  return (
    <>
      <div className={styles['product-recommend']}>
        <div className="d-flex justify-content-between">
          <span className={styles['also']}>你可能也喜歡</span>
        </div>
        <div className={`${styles['product-list']} d-flex`}>
          {recommendProduct.map((product, i) => {
            const { product_id, name, brand, product_price, img } = product
            return (
              <div className="col" key={product_id}>
                <a href={`/products/${product_id}`}>
                  <ProductCard
                    name={name}
                    brand={brand}
                    price={product_price}
                    img={img}
                  />
                </a>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
