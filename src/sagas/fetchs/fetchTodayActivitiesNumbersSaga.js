import request from '../../helpers/request'

function* fetchTodayActivitiesNumbers() {
  let today_activities_numbers = null
  let { data, error } = yield request({
    url: `mobile/users/today_activities_numbers`,
    method: 'POST',
    //debug: true,
  })

  if (error) today_activities_numbers = {}
  else today_activities_numbers = data

  return { today_activities_numbers }
}

export default fetchTodayActivitiesNumbers
