import React, { useState } from 'react'
import axios from 'axios'
import { useAuth } from '@/hooks/use-auth'
import { useAppContext } from '@/context/AppContext'
// import useAlert from '@/hooks/use-alert'
import LoginForm from '@/component/users/form/login'
import Schedule from '@/component/Schedule.js'
import styles from './rightcolumn.module.scss'
import { useRouter } from 'next/router'

const availableTimes = {
  // 預定的日期時間資料
  'Sun Jun 02 2024': ['10:00', '11:00', '12:00', '13:00'],
  'Mon Jun 03 2024': ['09:00', '11:00', '14:00'],
  'Tue Jun 04 2024': ['10:00', '11:00', '13:00', '16:00'],
  'Wed Jun 05 2024': ['09:00', '10:00', '14:00', '17:00'],
  'Thu Jun 06 2024': ['09:00', '11:00', '14:00'],
  'Fri Jun 07 2024': ['09:00', '10:00', '11:00', '13:00'],
  'Sat Jun 08 2024': ['10:00', '11:00', '12:00', '14:00'],
  'Sun Jun 09 2024': ['10:00', '11:00', '12:00', '13:00'],
  'Mon Jun 10 2024': ['09:00', '11:00', '14:00'],
  'Tue Jun 11 2024': ['10:00', '11:00', '13:00', '16:00'],
  'Wed Jun 12 2024': ['09:00', '10:00', '14:00', '17:00'],
  'Thu Jun 13 2024': ['09:00', '11:00', '14:00'],
  'Fri Jun 14 2024': ['09:00', '10:00', '11:00', '13:00'],
  'Sat Jun 15 2024': ['10:00', '11:00', '12:00', '14:00'],
  'Sun Jun 16 2024': ['10:00', '11:00', '12:00', '13:00'],
  'Mon Jun 17 2024': ['09:00', '11:00', '14:00'],
  'Tue Jun 18 2024': ['10:00', '11:00', '13:00', '16:00'],
  'Wed Jun 19 2024': ['09:00', '10:00', '14:00', '17:00'],
  'Thu Jun 20 2024': ['09:00', '11:00', '14:00'],
  'Fri Jun 21 2024': ['09:00', '10:00', '11:00', '13:00'],
  'Sat Jun 22 2024': ['10:00', '11:00', '12:00', '14:00'],
  'Sun Jun 23 2024': ['10:00', '11:00', '12:00', '13:00'],
  'Mon Jun 24 2024': ['09:00', '11:00', '14:00'],
  'Tue Jun 25 2024': ['10:00', '11:00', '13:00', '16:00'],
  'Wed Jun 26 2024': ['09:00', '10:00', '14:00', '17:00'],
  'Thu Jun 27 2024': ['09:00', '11:00', '14:00'],
  'Fri Jun 28 2024': ['09:00', '10:00', '11:00', '13:00'],
  'Sat Jun 29 2024': ['10:00', '11:00', '12:00', '14:00'],
  'Sun Jun 30 2024': ['10:00', '11:00', '12:00', '13:00'],
}

export default function CourseDetailRight({ course }) {
  const { auth } = useAuth()
  const { dispatch } = useAppContext()
  const router = useRouter()
  const [showOffcanvas, setShowOffcanvas] = useState(false)
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [selectedTime, setSelectedTime] = useState(null)
  const courseId = router.asPath.split('/').pop()

  const handleAddToCart = async () => {
    if (!auth.isLoggedIn) {
      setShowLoginPrompt(true)
      return
    }

    if (!selectedTime) {
      alert('請選擇時間')
      return
    }

    try {
      const response = await axios.post('http://localhost:3005/api/cart/add', {
        user_id: auth.userData.id,
        course_id: course.id,
        quantity,
        time: selectedTime,
      })

      if (response.data.status === 'success') {
        alert('課程已加入購物車')
        dispatch({
          type: 'ADD_TO_CART',
          payload: { ...course, quantity, time: selectedTime },
        })
      } else {
        alert(response.data.message)
      }
    } catch (error) {
      console.error('加入購物車錯誤:', error)
      if (error.response) {
        alert(`錯誤: ${error.response.data.message}`)
      } else {
        alert('無法加入購物車')
      }
    }
  }

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1)
  }

  const handleDecrease = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1))
  }

  const handleLoginSuccess = () => {
    setShowOffcanvas(false)
    setShowLoginPrompt(false)
  }

  const handleConfirmLogin = () => {
    setShowLoginPrompt(false)
    setShowOffcanvas(true)
  }

  return (
    <div className={styles['right-column']}>
      <div className={styles['course-details']}>
        <p>
          {course.course_style} / {course.teacher_name}老師
        </p>
        <h1>{course.course_name}</h1>
        <div className={styles['stars-container']}>{/* 星星評分組件 */}</div>
        <h2>${course.course_price}</h2>
        <p>課程時間</p>
        <Schedule
          availableTimes={availableTimes}
          onTimeSelect={setSelectedTime}
        />
        <div className={styles['course-details-bottom']}>
          <div className={styles.actionIcons}>
            <a href="#" onClick={handleDecrease}>
              <img src="/icons/icon-minus.svg" alt="minus" />
            </a>
            <button>{quantity}</button>
            <a href="#" onClick={handleIncrease}>
              <img src="/icons/icon-plus.svg" alt="plus" />
            </a>
          </div>
          <button
            className={styles['add-to-cart-button']}
            onClick={handleAddToCart}
          >
            加入購物車
          </button>
        </div>
      </div>

      {showLoginPrompt && (
        <div className={styles.overlaybg}>
          <div className={styles.popupwindow}>
            <p>請先登入</p>
            <button onClick={handleConfirmLogin}>確定</button>
          </div>
        </div>
      )}
      <div
        className={`offcanvas offcanvas-end ${showOffcanvas ? 'show' : ''}`}
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            onClick={() => setShowOffcanvas(false)}
          ></button>
        </div>
        <div className="offcanvas-body">
          <LoginForm onLoginSuccess={handleLoginSuccess} />
        </div>
      </div>
    </div>
  )
}
