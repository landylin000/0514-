// CourseList.js
import React, { useState } from 'react';
import Breadcrumb from '@/component/course/breadcrumb';
import Navbar from '@/component/course/navbar';
import Leftcolumn from '@/component/course/left-column';
import Rightcolumn from '@/component/course/right-column';
import styles from './course.module.scss';

export default function CourseList() {
  const [filter, setFilter] = useState(null);

  const handleCourseFilter = (filter) => {
    setFilter(filter);
  };

  const handleCardClick = (courseId) => {
    console.log('點擊了課程卡片，課程ID為：', courseId);
    // 在這裡處理導航到詳細頁面的邏輯，比如使用React Router
  };

  return (
    <div>
      <Breadcrumb />
      <Navbar onCourseFilter={handleCourseFilter} />
      <div className={styles['course-container']}>
        <Leftcolumn />
        <Rightcolumn onCardClick={handleCardClick} />
      </div>
    </div>
  );
}
