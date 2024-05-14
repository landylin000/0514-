import React from 'react'
import styles from './leftcolumn.module.scss'

export default function Leftcolumn() {
  const teachingExperienceOptions = ['5年以下', '5年至10年', '10年以上']
  const musicStyleOptions = ['古典', '爵士/藍調', '流行']

  return (
    <div>
      <div>
        <div>
          <p>課程時間</p>
        </div>
        <div className={styles['filter-section']}>
          <p>教學年資</p>
          {teachingExperienceOptions.map((option, index) => (
            <div key={index}>
              <input
                className={styles['checkbox-style']}
                type="checkbox"
                id={`teaching-experience-${index}`}
                name={`teaching-experience-${index}`}
                value={option}
              />
              <label htmlFor={`teaching-experience-${index}`}>{option}</label>
            </div>
          ))}
        </div>
        <div className={styles['filter-section']}>
          <p>音樂風格</p>
          {musicStyleOptions.map((option, index) => (
            <div key={index}>
              <input
                className={styles['checkbox-style']}
                type="checkbox"
                id={`music-style-${index}`}
                name={`music-style-${index}`}
                value={option}
              />
              <label htmlFor={`music-style-${index}`}>{option}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
