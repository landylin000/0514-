import React from 'react'
import Breadcrumb from '@/component/teacher/breadcrumb'
import Navbar from '@/component/teacher/navbar'
import Card from '@/component/teacher/card'
import Pagination from '@/component/teacher/pagination'
import styles from './teacher.module.scss'

export default function Course() {
  return (
    <>
      <Breadcrumb />
      <Navbar />
      <Card/>
      <Card/>
      <Card/>
      <Card/>
      <Card/>
      <Card/>
      <Pagination/>
    </>
  )
}
