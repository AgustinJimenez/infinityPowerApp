import { call } from 'redux-saga/effects'
import request from '../../helpers/request'

function* fetchEvaluationsStreak({ evaluations_ids }) {
  evaluations_ids = [...new Set(evaluations_ids)]
  let evaluations_streaks = {}
  for (let evaluation_id of evaluations_ids) {
    var { data, error } = yield call(request, {
      url: 'mobile/users/evaluations_streak',
      method: 'POST',
      //debug: true,
      data: {
        evaluation_id,
      },
    })
    if (error) evaluations_streaks[evaluation_id] = 0
    else evaluations_streaks[evaluation_id] = data
  }

  return { evaluations_streaks }
}

export default fetchEvaluationsStreak
