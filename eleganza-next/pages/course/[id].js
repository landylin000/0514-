import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Breadcrumb from '@/component/course/breadcrumb'
import Navbar from '@/component/course/navbar'
import CourseDetailRight from '@/component/course/course_detail/right-column'
import CourseDetailLeft from '@/component/course/course_detail/left-column'
import styles from './detail.module.scss'
import axios from 'axios'

export default function CourseDetail() {
  const router = useRouter()
  const { id } = router.query
  const [course, setCourse] = useState(null)

  useEffect(() => {
    if (id) {
      const fetchCourseById = async (courseId) => {
        try {
          const response = await axios.get(`/api/courses/${courseId}`)
          setCourse(response.data.data.course)
        } catch (error) {
          console.error('无法获取课程数据', error)
        }
      }

      fetchCourseById(id)
    }
  }, [id])

  if (!course) {
    return <p>Loading...</p>
  }

  return (
    <>
      <Breadcrumb />
      <Navbar />
      <div className={styles['course-details-container']}>
        <CourseDetailLeft course={course} />
        <CourseDetailRight course={course} />
      </div>
    </>
  )
}
