/**
 * Format a date from a date string to user friendly format.
 * @param {string} date in form of '2018-07-01'
 * @returns {string} '1. July, 2018'
 */
const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

const formatDate = date => {
  const dateTime = new Date(date)

  if (Number.isNaN(dateTime.getTime())) {
    return ''
  }

  const day = dateTime.getDate()
  const monthIndex = dateTime.getMonth()
  const year = dateTime.getFullYear()

  return `${monthNames[monthIndex]} ${day}, ${year}`
}

const formatDateTime = timestamp => {
  const dateTime = new Date(
    typeof timestamp === 'number' && timestamp < 1_000_000_000_000
      ? timestamp * 1000
      : timestamp
  )

  if (Number.isNaN(dateTime.getTime())) {
    return ''
  }

  const day = dateTime.getDate()
  const monthIndex = dateTime.getMonth()
  const year = dateTime.getFullYear()
  const hours = String(dateTime.getHours()).padStart(2, '0')
  const minutes = String(dateTime.getMinutes()).padStart(2, '0')

  return `${monthNames[monthIndex]} ${day}, ${year}, ${hours}:${minutes}`
}

export { formatDate, formatDateTime }
