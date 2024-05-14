import React, { useEffect, useState } from 'react'
import { fetchCart } from '@/hooks/cartapi'
import ShoppingCart from '../component/shopping_cart/purchasepagecart'
import Login from '../component/shopping_cart/login'
import Eleganza from '../component/shopping_cart/eleganza'
import useAuth from '../hooks/useAuth'

const Index = () => {
  const { isAuthenticated } = useAuth() // 檢查用戶身份驗證
  const [cartItems, setCartItems] = useState([]); // 確保 cartItems 為空陣列

  useEffect(() => {
    const loadCart = async () => {
      if (isAuthenticated) {
        try {
          const items = await fetchCart();
          // 檢查 items 是否是陣列
          if (Array.isArray(items)) {
            setCartItems(items); // 正確格式時設置 cartItems
          } else {
            setCartItems([]); // 如果不是陣列，設為空
          }
        } catch (error) {
          console.error('Failed to load cart:', error);
          setCartItems([]); // 在錯誤時保持為空陣列
        }
      }
    };
    loadCart(); // 在組件掛載時或身份驗證狀態變化時呼叫
  }, [isAuthenticated]); // 監聽身份驗證狀態的改變

  const isCartEmpty = Array.isArray(cartItems) && cartItems.length === 0; // 檢查 cartItems 是否為陣列

  // 根據不同情況返回適當的組件
  if (!isAuthenticated) {
    return <Login /> // 未登入時返回登入頁面
  }

  if (isCartEmpty) {
    return <Eleganza /> // 如果購物車為空，顯示 Eleganza
  }

  return <ShoppingCart cartItems={cartItems} /> // 如果購物車有內容，顯示購物車
}

export default Index

// import React, { useEffect, useState } from 'react'
// import { fetchCart } from '@/hooks/cartapi'
// import ShoppingCart from '../component/shopping_cart/purchasepagecart'
// import Eleganza from '../component/shopping_cart/eleganza'

// const Index = () => {
//   const [cartItems, setCartItems] = useState([])

//   useEffect(() => {
//     const loadCart = async () => {
//       try {
//         const items = await fetchCart()
//         if (Array.isArray(items)) {
//           setCartItems(items)
//         } else {
//           setCartItems([])
//         }
//       } catch (error) {
//         console.error('Failed to load cart:', error)
//         setCartItems([])
//       }
//     }

//     loadCart()
//   }, []) // 只在組件掛載時執行

//   const isCartEmpty = Array.isArray(cartItems) && cartItems.length === 0

//   if (isCartEmpty) {
//     return <Eleganza /> // 購物車為空時
//   }

//   return <ShoppingCart cartItems={cartItems} /> // 購物車有內容時
// }

// export default Index
