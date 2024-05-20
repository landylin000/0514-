import React, { useState, useEffect } from 'react'
import Card from '../card'
import Pagination from '../pagination'
import teachersData from '../../../data/teachersData.json'
import { useRouter } from 'next/router'
import styles from './right-column.module.scss'
import axios from 'axios'
import { useAuth } from '@/hooks/use-auth' 
import { useAppContext } from '@/context/AppContext' 
import useAlert from '@/hooks/use-alert' 
import LoginForm from '@/component/users/form/login' 

export default function Rightcolumn({ filters, sortOrder, courses }) {
  const [displayCourses, setDisplayCourses] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalCourses, setTotalCourses] = useState(0)
  const [showOffcanvas, setShowOffcanvas] = useState(false) 
  const [showLoginPrompt, setShowLoginPrompt] = useState(false) 
  const [pendingCourseId, setPendingCourseId] = useState(null) 
  const coursesPerPage = 6
  const router = useRouter()
  const { auth, login } = useAuth() 
  const { dispatch } = useAppContext() 
  const { success, error } = useAlert() 

  useEffect(() => {
    const teacherMap = teachersData.reduce((map, teacher) => {
      map[teacher.teacher_id] = {
        t_years: teacher.t_years,
        t_name: teacher.t_name,
      }
      return map
    }, {})

    const enhancedCourses = courses.map((course) => {
      const teacher = teacherMap[course.teacher_id]
      return {
        ...course,
        teacher_name: teacher ? teacher.t_name : '未指定',
        t_years: teacher ? teacher.t_years : null,
      }
    })

    let filteredCourses = enhancedCourses.filter(course => {
      const { t_years, course_style, course_start_date, course_end_date } = filters;
      const startDate = new Date(course.start_date);
  
      const taiwanTimezone = 'Asia/Taipei';
      const courseStartDateInTaiwanTimezone = new Date(course_start_date?.toLocaleString('en-US', { timeZone: taiwanTimezone }));
      const courseEndDateInTaiwanTimezone = new Date(course_end_date?.toLocaleString('en-US', { timeZone: taiwanTimezone }));

      const startDateOnly = new Date(startDate.toLocaleDateString('en-US', { timeZone: taiwanTimezone }));
      const courseStartDateOnly = new Date(courseStartDateInTaiwanTimezone.toLocaleDateString('en-US', { timeZone: taiwanTimezone }));
      const courseEndDateOnly = new Date(courseEndDateInTaiwanTimezone.toLocaleDateString('en-US', { timeZone: taiwanTimezone }));
  
      // 檢查t_years
      const tYearsMatch = t_years.length !== 0 ? t_years.includes(course.t_years.toString()) : true;
  
      // 檢查course_style
      const courseStyleMatch = course_style.length !== 0 ? course_style.includes(course.course_style) : true;
  
      // 檢查日期範圍
      const dateMatch = startDateOnly >= courseStartDateOnly && startDateOnly <= courseEndDateOnly;

      return tYearsMatch && courseStyleMatch && dateMatch;
    });

    if (sortOrder === 'priceAsc') {
      filteredCourses.sort((a, b) => a.course_price - b.course_price)
    } else if (sortOrder === 'priceDesc') {
      filteredCourses.sort((a, b) => b.course_price - a.course_price)
    }

    setTotalCourses(filteredCourses.length)
    const indexOfLastCourse = currentPage * coursesPerPage
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage
    const currentCourses = filteredCourses.slice(
      indexOfFirstCourse,
      indexOfLastCourse,
    )

    setDisplayCourses(currentCourses)
    const totalPages = Math.ceil(filteredCourses.length / coursesPerPage)
    if (currentPage > totalPages) {
      setCurrentPage(1)
    }
  }, [filters, sortOrder, currentPage, courses])

  const handleCardClick = (courseId) => {
    router.push(`/course/${courseId}`)
  }

  const handleAddToCart = async (courseId) => {
    if (!auth.isLoggedIn) {
      setPendingCourseId(courseId) 
      setShowLoginPrompt(true) 
      return
    }

    try {
      const response = await axios.post('http://localhost:3005/api/cart/add', {
        user_id: auth.userData.id, 
        course_id: courseId,
      })

      if (response.data.status === 'success') {
        success('課程已加入購物車')
        const course = displayCourses.find((course) => course.course_id === courseId)
        dispatch({ type: 'ADD_TO_CART', payload: course })

       
        const userResponse = await axios.post(
          'http://localhost:3005/api/user/courses/add',
          {
            user_id: auth.userData.id, 
            course_id: courseId,
          },
        )

        if (userResponse.data.status === 'success') {
          dispatch({ type: 'ADD_USER_COURSE', payload: course })
        } else {
          error(userResponse.data.message)
        }
      } else {
        error(response.data.message)
      }
    } catch (err) {
      console.error('加入購物車錯誤:', err)
      error('無法加入購物車')
    }
  }

  const handleLoginSuccess = async () => {
    setShowOffcanvas(false) 
    if (pendingCourseId) {
     
      await handleAddToCart(pendingCourseId)
      setPendingCourseId(null)
    }
  }

  const handleConfirmLogin = () => {
    setShowLoginPrompt(false) 
    setShowOffcanvas(true) 
  }

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  console.log(courses)

  return (
    <div className={styles['right-column']}>
      {courses.length > 0 ? (
        courses.map((course, index) => (
          <Card
            key={index}
            course={course}
            onClick={() => handleCardClick(course.course_id)}
            onAddToCart={() => handleAddToCart(course.course_id)}
          />
        ))
      ) : (
        <p>沒有符合條件的課程</p>
      )}
      {courses > 0 && (
        <Pagination
          currentPage={currentPage}
          totalCourses={totalCourses}
          coursesPerPage={coursesPerPage}
          onChange={handlePageChange}
        />
      )}
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
