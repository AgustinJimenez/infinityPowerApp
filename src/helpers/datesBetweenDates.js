import moment from 'moment'

const datesBetweenDates = (startDate = moment(), endDate = moment().add(7, 'days'), { format = 'moment' || 'date' } = {}) => {
  let currDate = moment(startDate)
  let lastDate = moment(endDate)
  let dateTmp = null
  let dates = []

  while (currDate.add(1, 'days').diff(lastDate) < 0) {
    if (format === 'date') dateTmp = currDate.clone().toDate()
    else if (format === 'moment') dateTmp = currDate.clone()
    dates.push(dateTmp)
  }

  return dates
}
export default datesBetweenDates
