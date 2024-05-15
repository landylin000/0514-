import React, { useState, useEffect } from 'react';
import Breadcrumb from '@/component/course/breadcrumb';
import Navbar from '@/component/course/navbar';
import Leftcolumn from '@/component/course/left-column';
import Rightcolumn from '@/component/course/right-column';
import styles from './course.module.scss';

export default function CourseList() {
  const [filters, setFilters] = useState({});
  const [sortOrder, setSortOrder] = useState('priceAsc');

  const handleCourseFilter = (courseClassId) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      course_class_id: courseClassId,
    }));
  };

  const handleSortChange = (sortType) => {
    setSortOrder(sortType);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  return (
    <div>
      <Breadcrumb />
      <Navbar
        onCourseFilter={handleCourseFilter}
        onSortChange={handleSortChange}
      />
      <div className={styles['course-container']}>
        <Leftcolumn onFilterChange={handleFilterChange} />
        <Rightcolumn filters={filters} sortOrder={sortOrder} />
      </div>
    </div>
  );
}
