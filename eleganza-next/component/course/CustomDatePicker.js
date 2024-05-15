import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import styles from './DateTimePickerButtonStyles.module.css'

function CustomDatePicker({ getStartDate, getEndDate }) {
  const [dateRange, setDateRange] = useState([null, null])
  const [startDate, endDate] = dateRange

  const handleDateRangeChange = (update) => {
    setDateRange(update)
    if (update[0]) getStartDate(update[0])
    if (update[1]) getEndDate(update[1])
  }

  return (
    <div className={styles.reactDatepicker}>
      <DatePicker
        selectsRange
        startDate={startDate}
        endDate={endDate}
        onChange={handleDateRangeChange}
        inline
      />
    </div>
  )
}

export default CustomDatePicker
