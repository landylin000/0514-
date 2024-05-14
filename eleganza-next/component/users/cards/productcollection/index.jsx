import { useState, useEffect } from 'react';
import React from 'react';
import styles from './productcollection.module.scss';

export default function ProductCard({productId=2}) {
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

    const [isMobileButtonClicked, setIsMobileButtonClicked] = useState(false);

    const handleMobileButtonClick = () => {
        setIsMobileButtonClicked(!isMobileButtonClicked);
    };

    return (
        <div className={`${styles['productcard']} ${isMobileButtonClicked ? styles['mobile-clicked'] : ''}`}>
            <a href="">
                <img
                    src="/images/product_images/17663193_800.jpg"
                    alt=""
                    className={styles['productcardimg']}
                />
            </a>
            <div className={styles['product-word']}>
                <ul className={`${styles.productcardtitle} list-unstyled`}>
                    <li className={styles['productbranding']}>
                        <a href="">{productDetails?.brand}</a>
                    </li>
                    <li>
                        <a className={styles['productname']} href="">
                            {productDetails?.name}
                        </a>
                    </li>
                </ul>
                <ul className={`${styles['productcard-function']} list-unstyled`}>
                    <li className={styles['productprice']}>{productDetails?.product_price}</li>
                    <a className={styles['icon-mobile']} href="#" onClick={handleMobileButtonClick}>
                        <img src="/icons/icon-chevron-right.svg" alt="手機版" />
                    </a>
                    <div className={styles['productcardicons']}>
                        <a href="">
                            <img src="/icons/icon-cart.svg" alt="購物車" />
                        </a>
                        <a href="">
                            <img src="/icons/icon-liked.svg" alt="收藏" />
                        </a>
                    </div>
                </ul>
            </div>
            {isMobileButtonClicked && (
                <div className={`${styles['productcard-hidden']} `}>
                    <div className={styles['hiddenbtn']}>
                        <a href="">加入購物車</a>
                    </div>
                    <div className={styles['hiddenbtn']}>
                        <a href="">刪除</a>
                    </div>
                </div>
            )}
        </div>
    );
}