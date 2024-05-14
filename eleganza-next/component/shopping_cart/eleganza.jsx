import React from 'react'
import eleganza from '../shopping_cart/CSS/eleganza.module.css'

const Eleganza = () => {
  return (
    <div className={eleganza['eleganza-container']}>
      <title>Title</title>
      {/* Required meta tags */}
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <header>
    {/* main */}
    <main className="wrap flex-grow-1">
      {/* ------------------頁面內容------------------------ */}
      <div className={`${eleganza['empty-cart-container']}`}>
        <section>
          <p className={`${eleganza['empty-cart-message']}`}>您的購物車中沒有任何商品</p>
          <a href="/shop" className={`${eleganza['shop-now-button']}`}>
            前往購物
          </a>
        </section>
      </div>
    </main>
  </header>
    </div>
  )
}

export default Eleganza
