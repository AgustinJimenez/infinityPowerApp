import request from '../../helpers/request'

function* fetchTodayMinutesPlayed() {
  let minutesPlayed = 0
  let { data, error } = yield request({
    url: `mobile/users/today_minutes_played`,
    method: 'POST',
    //debug: true,
  })

  if (!error) minutesPlayed = data['today_minutes_played']

  return { minutesPlayed }
}

export default fetchTodayMinutesPlayed
