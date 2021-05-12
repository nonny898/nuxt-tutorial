import Vue from 'vue'

const months = [
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
  'December',
]

const dateFilter = (value: string | number | Date): string => {
  return formatDate(value)
}

function formatDate(inputDate: string | number | Date): string {
  const date = new Date(inputDate)
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()
  const formattedDate = day + '. ' + months[month] + ' ' + year
  return formattedDate
}

Vue.filter('date', dateFilter)
