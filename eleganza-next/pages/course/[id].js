import { useRouter } from 'next/router'
import Breadcrumb from '@/component/teacher/breadcrumb'
import CourseDetailRight from '@/component/course/course_detail/right-column' 
import CourseDetailLeft from '@/component/course/course_detail/left-column' 
import CommentsPage from '@/component/article/comment' 
import axios from 'axios'
import styles from './detail.module.scss'
import courseData from '../../data/coursesData.json'

const dummy = {
  "course_id": 101,
  "course_class_id": 1,
  "teacher_id": 1,
  "course_name": "小提琴演奏初階個別課",
  "course_img": "LinWenxi.jpg",
  "course_price": 1000,
  "course_style": "Classical",
  "course_description": "這是一個專為初學者設計的小提琴課程，旨在為學生提供穩健的音樂基礎，讓他們建立起良好的演奏技巧和音樂理解能力。課程將從最基本的樂理知識和小提琴技巧開始，逐步引導學生進入音樂的世界，享受音樂帶來的樂趣和成就感。",
  "course_payment":"學費為單堂一小時費用，教師和學生自訂上課時間",
  "quota": 8,
  "teacher_name": "LinWenxi",
  "start_date": "2024-06-01",
  "start_time": "10:00"
}

// 從後端 API 獲取課程詳情和評論
export async function getServerSideProps(context) {
  const { id } = context.params
  try {
    const [courseRes, commentsRes] = await Promise.all([
      axios.get(`http://localhost:3005/api/courses/${id}`),
      axios.get(`http://localhost:3005/api/comments/course/${id}`),
    ])

    if (!courseRes.data || !commentsRes.data) {
      console.error('API data is missing')
      return { props: { course: null, comments: [] } }
    }

    if (
      courseRes.data.status === 'error' ||
      commentsRes.data.status === 'error'
    ) {
      console.error(
        'API calls failed:',
        courseRes.data.message,
        commentsRes.data.message,
      )
      return { props: { course: null, comments: [] } }
    }
    // 確保 comments 是一個數組
    const comments = Array.isArray(commentsRes.data.data.comments)
      ? commentsRes.data.data.comments
      : []

    return {
      props: {
        course: courseRes.data.data.course || null,
        comments,
      },
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    return { props: { course: null, comments: [] } }
  }
}

export default function CourseDetailPage({ course, comments }) {
  const router = useRouter()
  const user = {} // 從某處獲取的用戶信息
  console.log(course)

  // if (!course) {
  //   return <p>課程未找到</p>
  // }

  course = dummy;

  return (
    <>
      <div className={styles['container']}>
        <Breadcrumb />
        <div className={styles['separator']} />
        <button
          className={styles['back-button']}
          onClick={() => router.push('/course')}
        >
          <img src="/icons/icon-chevron-left.svg" alt="返回" />
          返回
        </button>
        <div className={styles['course-details-container']}>
          <CourseDetailLeft course={dummy} />
          <CourseDetailRight course={dummy} />
        </div>
        <div className={styles['comments-container']}>
          <CommentsPage
            courseId={dummy.course_id}
            userId={user ? user.id : null}
            comments={comments}
          />
        </div>
      </div>
    </>
  )
}
