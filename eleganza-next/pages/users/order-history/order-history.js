import React from 'react';
import Head from 'next/head'
import styles from './order-history.module.css';
import OrderHistoryUnfoldCard from '@/component/users/cards/orderhistoryunfold';
import UserLayout from '@/component/users/user-layout';

export default function OrderHistoryUnfold() {
   return (
      <>
  <div className={styles['mainarea-desktop-collection']}>
    <OrderHistoryUnfoldCard/>
    <OrderHistoryUnfoldCard/>
    <OrderHistoryUnfoldCard/>
    <OrderHistoryUnfoldCard/>
    <OrderHistoryUnfoldCard/>
  </div>
  <div className={styles['lesson-mobile']} >
   <OrderHistoryUnfoldCard/>
   <OrderHistoryUnfoldCard/>
   <OrderHistoryUnfoldCard/>
   <OrderHistoryUnfoldCard/>
  </div>
</>
   );
}

OrderHistoryUnfold.getLayout = function (page) {
   return <UserLayout currentPage="歷史訂單">{page}</UserLayout>;
};


       