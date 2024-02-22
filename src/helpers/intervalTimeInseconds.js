const intervalTimeInseconds = (interval = '') => {
    let arrNumbers = interval.split(':')
    let hours = arrNumbers[0]
    let minutes = arrNumbers[1]
    let seconds = arrNumbers[2]
  
    let totalSeconds = parseInt(seconds) + parseInt(minutes)*60 + parseInt(hours)*3600
    //totalSeconds = parseInt(totalSeconds/60)
  
    return totalSeconds
  }
  
  export default intervalTimeInseconds
  