const milisecondsToMinutes = (miliseconds = 0.0) => {
  var minutes = Math.floor(miliseconds / 60000)
  var seconds = ((miliseconds % 60000) / 1000).toFixed(0)
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}
export default milisecondsToMinutes
