import React from 'react';
import Head from 'next/head'
import styles from './mobile-cardlayout.module.css';
import ProductCollectionCard from '@/component/users/cards/productcollection';
import UserLayout from '@/component/users/user-layout';

export default function ProductCollection() {
   return (
      <>
  <div className={styles['mainarea-desktop-collection']}>
    <ProductCollectionCard/>
    <ProductCollectionCard/>
    <ProductCollectionCard/>
    <ProductCollectionCard/>
    <ProductCollectionCard/>
    <ProductCollectionCard/>
  </div>
  <div className={styles['lesson-mobile']} >
    <div className={styles['btn-mobile']} >
      <div className={styles['sbtn-selected']} >
        <a href="">商品收藏</a>
      </div>
      <div className={styles['sbtn']}>
        <a href="">課程收藏</a>
      </div>
    </div>
    <ProductCollectionCard/>
    <ProductCollectionCard/>
    <ProductCollectionCard/>
    <ProductCollectionCard/>
    <ProductCollectionCard/>
  </div>
</>

   
   );
}

ProductCollection.getLayout = function (page) {
   return <UserLayout currentPage="收藏內容">{page}</UserLayout>;
};


