import React from 'react'
import styles from './header.module.scss'
import Link from 'next/link'

export default function Header() {
  return (
    <>
      <header>
        <div className={`${styles['header-container']} fixed-top`}>
          <div className={styles.logo}>
            <a href="">ELEGANZA</a>
          </div>
          <ul
            className={`d-flex justify-content-between align-content-center list-unstyled m-0`}
          >
            <li className={styles.link}>
              <a href="/">關於阿爾扎</a>
            </li>
            <li className={styles.link}>
              <Link href="/products">商品總覽</Link>
            </li>
            <li className={styles.link}>
              <Link href="/course">精選課程</Link>
            </li>
            <li className={styles.link}>
              <Link href="/teacher">師資陣容</Link>
            </li>
            <li className={styles.link}>
              <Link href="/article">弦樂專欄</Link>
            </li>
          </ul>
          <div
            className={
              styles['header-icons'] +
              ' d-flex align-items-center justify-content-between'
            }
          >
            <a href="">
              <img className={styles.cart} src="/icons/icon-cart-white.svg" />
            </a>
            <a href="">
              <img
                className={styles.account}
                src="/icons/icon-user-white.svg"
              />
            </a>
            <a href="">
              <img className={styles.menu} src="/icons/icon-menu-white.svg" />
            </a>
          </div>
        </div>
      </header>
    </>
  )
}
