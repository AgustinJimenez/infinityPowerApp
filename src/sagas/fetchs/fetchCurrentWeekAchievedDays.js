import { call } from 'redux-saga/effects'
import request from '../../helpers/request'

function* fetchCurrentWeekAchievedDays() {
  let current_week_achieved_days = []
  var { data, error } = yield call(request, {
    method: 'POST',
    url: 'mobile/users/current_week_achieved_days',
    //debug: true,
  })
  if (!error) current_week_achieved_days = data['week_achieved_days']
  return { current_week_achieved_days }
}

export default fetchCurrentWeekAchievedDays
