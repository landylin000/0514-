import React, { useState, useEffect } from 'react'
import Card from '../card'
import Pagination from '../pagination'
import courseData from '../../../data/coursesData.json'
import teachersData from '../../../data/teachersData.json'
import { useRouter } from 'next/router'
import styles from './right-column.module.scss'

export default function Rightcolumn({ filters, sortOrder }) {
  const [courses, setCourses] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalCourses, setTotalCourses] = useState(0) // 新增 totalCourses state
  const coursesPerPage = 6
  const router = useRouter()

  useEffect(() => {
    const teacherMap = teachersData.reduce((map, teacher) => {
      map[teacher.teacher_id] = {
        t_years: teacher.t_years,
        t_name: teacher.t_name,
      }
      return map
    }, {})

    const enhancedCourses = courseData.map((course) => {
      const teacher = teacherMap[course.teacher_id]
      return {
        ...course,
        teacher_name: teacher ? teacher.t_name : '未指定',
        t_years: teacher ? teacher.t_years : null,
      }
    })

    let filteredCourses = enhancedCourses.filter((course) => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true // 如果过滤值为空，不过滤该条件
        if (key === 't_years') {
          return value.includes(String(course.t_years)) // 教师年资过滤
        }
        if (key === 'course_style') {
          return value.includes(course.course_style) // 音乐风格过滤
        }
        return course[key] == value // 其他过滤
      })
    })

    // 排序逻辑
    if (sortOrder === 'priceAsc') {
      filteredCourses.sort((a, b) => a.course_price - b.course_price)
    } else if (sortOrder === 'priceDesc') {
      filteredCourses.sort((a, b) => b.course_price - a.course_price)
    }

    setTotalCourses(filteredCourses.length) // 更新 totalCourses
    const indexOfLastCourse = currentPage * coursesPerPage
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage
    const currentCourses = filteredCourses.slice(
      indexOfFirstCourse,
      indexOfLastCourse,
    )

    setCourses(currentCourses)
    const totalPages = Math.ceil(filteredCourses.length / coursesPerPage)
    if (currentPage > totalPages) {
      setCurrentPage(1) // 如果当前页超过总页数，重置为第一页
    }
  }, [filters, sortOrder, currentPage])

  const handleCardClick = (courseId) => {
    router.push(`/course/${courseId}`)
  }

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className={styles['right-column']}>
      {courses.map((course, index) => (
        <Card
          key={index}
          course={course}
          onClick={() => handleCardClick(course.course_id)}
        />
      ))}
      {totalCourses > 0 && (
        <Pagination
          currentPage={currentPage}
          totalCourses={totalCourses} // 传递 totalCourses
          coursesPerPage={coursesPerPage}
          onChange={handlePageChange}
        />
      )}
    </div>
  )
}
