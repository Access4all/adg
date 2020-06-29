/**
 * Format a date from a date string to user friendly format.
 * @param {string} date in form of '2018-07-01'
 * @returns {string} '1. July, 2018'
 */
const formatDate = date => {
  var monthNames = [
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

  const dateTime = new Date(date)

  const day = dateTime.getDate()
  const monthIndex = dateTime.getMonth()
  const year = dateTime.getFullYear()

  return `${monthNames[monthIndex]} ${day}, ${year}`
}

module.exports = {
  formatDate
}
