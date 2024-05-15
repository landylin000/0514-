import React, { useState, useEffect } from 'react'
import styles from './card.module.scss'
import teacherData from '../../../data/teachersData.json'

const teachersPerPage = 5 // 每頁顯示的老師數量

export default function Card({ filter }) {
  const [expandedIndex, setExpandedIndex] = useState(null)
  const [filteredTeacherData, setFilteredTeacherData] = useState([])
  const [currentPage, setCurrentPage] = useState(1) // 當前所在頁面

  const handleIconClick = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index)
  }

  useEffect(() => {
    const updatedTeacherData = teacherData.map((teacher) => {
      return {
        ...teacher,
        courses: teacher.courses.split(',').map((course) => course.trim()),
      }
    })
    const filteredData = filter
      ? updatedTeacherData.filter((teacher) => teacher.courses.includes(filter))
      : updatedTeacherData
    setFilteredTeacherData(filteredData)
  }, [filter])

  // 根據當前頁碼和每頁顯示的老師數量計算切片的起始和結束索引
  const indexOfLastTeacher = currentPage * teachersPerPage
  const indexOfFirstTeacher = indexOfLastTeacher - teachersPerPage
  const currentTeachers = filteredTeacherData.slice(
    indexOfFirstTeacher,
    indexOfLastTeacher,
  )

  // 分頁變更處理函數
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <>
      {currentTeachers.map((teacher, index) => (
        <div key={index} className={styles['card-column']}>
          <div className={styles['card-row']}>
            <div className={styles['card-body']}>
              <div className={styles['image-container']}>
                <img
                  src={`/images/teacher_images/${teacher.t_img}`}
                  className={styles['card-image']}
                  alt=""
                />
              </div>
              <div className={styles['card-header']}>
                <div className={styles['text-box']}>
                  <h4>{teacher.t_name}</h4>
                </div>
                <div className={styles['text-box']}>
                  <ul>
                    <li>學歷:{teacher.education}</li>
                    <li>教學年資:{teacher.t_years}年</li>
                    <li>教學經歷:{teacher.experience}</li>
                  </ul>
                </div>
              </div>
              <div className={styles['card-footer']}>
                <div
                  className={styles['card-icons']}
                  onClick={() => handleIconClick(index)}
                >
                  <img
                    src="/icons/icon-chevron-down.svg"
                    alt=""
                    className="expand-icon"
                  />
                </div>
              </div>
              <div
                className={`${styles['card-content']} ${
                  expandedIndex === index ? styles.expanded : ''
                }`}
              >
                <div className={styles['content-text']}>
                  <div className={styles['three-column-layout']}>
                    <div className={styles.column}>
                      <p>教師簡介</p>
                      <p>{teacher.introduction}</p>
                    </div>
                    <div className={styles.column}>
                      <p>學經歷</p>
                      <p>{teacher.experience}</p>
                    </div>
                    <div className={styles.column}>
                      <p>教授課程</p>
                      {teacher.courses.map((course, courseIndex) => (
                        <p key={courseIndex}>{course}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`${styles['card-row']} ${
              expandedIndex === index ? styles['expanded-row'] : ''
            }`}
          ></div>
        </div>
      ))}
    </>
  )
}
