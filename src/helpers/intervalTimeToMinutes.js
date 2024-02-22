const intervalTimeToMinutes = (interval = '') => {
  let arrNumbers = interval.split(':')

  let totalMinutes = parseInt(arrNumbers?.[0]) * 60 + parseInt(arrNumbers?.[1]) + parseInt(arrNumbers?.[2]) / 60

  return totalMinutes
}

export default intervalTimeToMinutes
