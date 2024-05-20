// components/course/courseList.js
import React, { useState, useEffect } from 'react'
import Breadcrumb from '@/component/course/breadcrumb'
import Navbar from '@/component/course/navbar'
import Leftcolumn from '@/component/course/left-column'
import Rightcolumn from '@/component/course/right-column'
import styles from './course.module.scss'
import courseData from '../../data/coursesData.json'

export default function CourseList() {
  const [filters, setFilters] = useState({
    course_style: [],
    t_years: [],
    course_start_date: null,
    course_end_date: null,
  })
  const [sortOrder, setSortOrder] = useState('priceAsc')
  const [courses, setCourses] = useState([])

  const handleCourseFilter = (courseClassId) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      course_class_id: courseClassId,
    }))
  }

  const handleSortChange = (sortType) => {
    setSortOrder(sortType)
  }

  const handleFilterChange = (filterType, value, method) => {
    if (['t_years', 'course_style'].includes(filterType)) {
      if (method === 'add') {
        const mergedSet = new Set([...filters[filterType], ...value]);
        setFilters((prevFilters) => ({
          ...prevFilters,
          [filterType]: Array.from(mergedSet),
        }))
      } else {
        const filteredSet = filters[filterType].filter((item) => !value.includes(item));
        setFilters((prevFilters) => ({
          ...prevFilters,
          [filterType]: filteredSet,
        }))
      }
      return;
    }
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }))
  }

  const handleSearchResults = (results) => {
    console.log('Search Results:', results)
    setCourses(results)
  }

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:3005/api/courses')
        const data = await response.json()
        console.log('Fetched Courses:', data.data.courses) // 调试信息
        setCourses(data.data.courses)
      } catch (error) {
        console.error('获取课程数据时出错:', error)
      }
    }

    fetchCourses()
  }, [])

  return (
    <div>
      <Breadcrumb />
      <Navbar
        onCourseFilter={handleCourseFilter}
        onSortChange={handleSortChange}
        onSearchResults={handleSearchResults}
      />
      <div className={styles['course-container']}>
        <Leftcolumn onFilterChange={handleFilterChange} />
        <Rightcolumn
          filters={filters}
          sortOrder={sortOrder}
          courses={courseData}
        />
      </div>
    </div>
  )
}
