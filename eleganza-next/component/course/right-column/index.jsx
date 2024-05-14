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
  const coursesPerPage = 6
  const router = useRouter()

  useEffect(() => {
    // 创建教师经验映射
    const teacherExperienceMap = teachersData.reduce((map, teacher) => {
      map[teacher.teacher_id] = teacher.t_years
      return map
    }, {})

    // 应用所有过滤条件
    let filteredCourses = courseData.filter((course) =>
      Object.entries(filters).every(([key, value]) => {
        if (!value) return true
        const [filterKey, filterValues] = key.split('-')
        if (filterKey === 't_years') {
          const years = teacherExperienceMap[course.teacher_id]
          const valuesArray = filterValues.split(',')
          return valuesArray.includes(String(years))
        }
        return course[filterKey] == filterValues
      }),
    )

    // 排序
    if (sortOrder === 'priceAsc') {
      filteredCourses.sort((a, b) => a.course_price - b.course_price)
    } else if (sortOrder === 'priceDesc') {
      filteredCourses.sort((a, b) => b.course_price - a.course_price)
    }

    // 分页处理
    const totalFilteredCourses = filteredCourses.length
    const totalPages = Math.ceil(totalFilteredCourses / coursesPerPage)
    if (currentPage > totalPages) {
      setCurrentPage(1)
    } else if (currentPage < 1) {
      setCurrentPage(totalPages)
    }

    const indexOfLastCourse = currentPage * coursesPerPage
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage
    const currentCourses = filteredCourses.slice(
      indexOfFirstCourse,
      indexOfLastCourse,
    )

    setCourses(currentCourses)
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
      {courses.length > coursesPerPage && (
        <Pagination
          currentPage={currentPage}
          totalCourses={courses.length}
          coursesPerPage={coursesPerPage}
          onChange={handlePageChange}
        />
      )}
    </div>
  )
}
