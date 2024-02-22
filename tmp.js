const moment = require('moment-timezone')

//console.log(moment.utc('2021-03-08 10:12:34').tz('America/Asuncion').format('HH:mm:ss'))
//console.log('2021-02-18 14:58:00'.slice(0, -8))
console.log(moment.tz('America/Asuncion').second(0).toString())
