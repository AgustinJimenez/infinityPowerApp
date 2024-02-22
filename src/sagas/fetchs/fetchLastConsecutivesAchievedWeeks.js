import { call } from 'redux-saga/effects'
import request from '../../helpers/request'

function* fetchLastConsecutivesAchievedWeeks() {
  var { data, error } = yield call(request, {
    url: 'mobile/users/last_consecutives_achieved_weeks',
    method: 'POST',
    //debug: true,
  })
  let last_consecutives_achieved_weeks = []
  if (!error) last_consecutives_achieved_weeks = data['last_consecutives_achieved_weeks']

  return { last_consecutives_achieved_weeks }
}

export default fetchLastConsecutivesAchievedWeeks
