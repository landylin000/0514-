// Rightcolumn.js
import React, { useState, useEffect } from 'react'
import Card from '../card'
import courseData from '../../../data/coursesData.json'
import { useRouter } from 'next/router'

export default function Rightcolumn() {
  const [courses, setCourses] = useState([])
  const router = useRouter()

  useEffect(() => {
    setCourses(courseData)
  }, [])

  // 點擊卡片後導航到詳細課程頁面的函數
  const handleCardClick = (courseId) => {
    router.push(`/course/${courseId}`) // 導航到詳細課程頁面，使用動態路由，將課程 ID 傳遞給路由
  }

  return (
    <div className="right-column">
      {courses.map((course, index) => (
        <Card
          key={index}
          course={course}
          onClick={() => handleCardClick(course.id)}
        />
      ))}
    </div>
  )
}
