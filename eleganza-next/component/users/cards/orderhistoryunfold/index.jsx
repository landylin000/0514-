import { useState, useEffect } from 'react';
import React from 'react';
import styles from './orderhistoryunfold.module.scss';

export default function OrderHistoryUnfoldCard({orderId=2024010401}, {productId=2}) {
    const [orderDetails, setOrderDetails] = useState(null);

    useEffect(() => {
        // 向後端 API 端點發送請求獲取使用者資料
        fetch(`http://localhost:3005/api/order-history/${orderId}`)
          .then((response) => response.json())
          .then((data) => {
            setOrderDetails(data.orderDetails);
          })
          .catch((error) => console.error('Error fetching order details:', error));
      }, [orderId]); 

    const [productDetails, setProductDetails] = useState(null);
   
   useEffect(() => {
     // 向後端 API 端點發送請求獲取使用者資料
     fetch(`http://localhost:3005/api/my-productcollection/${productId}`)
       .then((response) => response.json())
       .then((data) => {
         setProductDetails(data.productDetails);
       })
       .catch((error) => console.error('Error fetching product details:', error));
   }, [productId]); 
      
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    const toggleDetail = () => {
      setIsDetailOpen(!isDetailOpen);
    };
  
    return (
        <>
            <div className={`${styles['orderhistoryrow-l']} ${styles['desktop-only']}`} >
                <p>{orderDetails?.order_id} </p>
                <p>{orderDetails?.order_date}</p>
                <p>$8,8666</p>
                <p>{orderDetails?.status}</p>
                <div className={`${styles['checkdetail']}`} >
                    <p style={{ margin: 0 }}>查看詳情</p>
                    <a href="#" onClick={toggleDetail}>
                        <img src="/icons/icon-chevron-down.svg" alt="" />
                    </a>
                </div>
            </div>
            <div className={`${styles['orderhistoryrow-l']} ${styles['mobile-only']}`}>
                <p>{orderDetails?.order_id}</p>
                <p>{orderDetails?.order_date}</p>
                <p>{orderDetails?.status}</p>
                <a href="#" onClick={toggleDetail}>
                    <img src="/icons/icon-chevron-down.svg" alt="" />
                </a>
            </div>
            {isDetailOpen && (
                <div className={`${styles['orderhistorydetailrow']} `} >
        
                    <div className={styles.orderhistorydetail} >
                        <div className={styles.orderimg} >
                            <a href="">
                                <img src="/images/product_images/17663193_800.jpg" alt="" />
                            </a>
                        </div>
                        <div className={styles.orderwords} >
                            <div className={styles.ordertitle} >
                                <a href="" className={styles.orderbrand} >
                                {productDetails?.brand}{" "}
                                </a>
                                <a href="">{productDetails?.name}</a>
                            </div>
                            <div className={styles.orderprice} >
                                <p>{productDetails?.product_price}</p>
                                <div className={styles.orderquantity} >
                                    <img src="/icons/icon-x.svg" alt="" />
                                    <p>1</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles['orderhistorydetail2']} `}>
                        <div className={styles.creditcard}  >
                            <p>{orderDetails?.payment_method}</p>
                            <div className={styles.creditcardno} >
                                <p>{orderDetails?.creditcard_no}</p>
                                <img
                                    src="/icons/visa-credit-card-logo-payment-mastercard-usa-visa-e2526db464dd09168c03c4916787dd35.png"
                                    alt=""
                                />
                                {/* 可能要再寫程式判定如果是現場付款就隱藏卡片圖案 */}
                            </div>
                        </div>
                        <div className={styles.creditcard} >
                            <p>{orderDetails?.shipping_method}</p>
                            <div className={styles.creditcardno}   >
                                <p>{orderDetails?.address}</p>
                            </div>
                        </div>
                    </div>
                    <div className= {`${styles['mobiletotal']} `} >
                        <p>總計</p>
                        <p>$8,7000</p>
                    </div>
                </div>
            )}
        </>
    );
}