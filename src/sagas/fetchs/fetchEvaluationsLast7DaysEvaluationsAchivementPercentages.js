import { call } from 'redux-saga/effects'
import request from '../../helpers/request'

function* fetchEvaluationsLast7DaysEvaluationsAchivementPercentages({ evaluations_ids }) {
  evaluations_ids = [...new Set(evaluations_ids)]
  let evaluations_last_7_days_evaluations_achivements_percentages = {}
  for (let evaluation_id of evaluations_ids) {
    var { data, error } = yield call(request, {
      url: 'mobile/users/objective_last_7_days_evaluations_achievements_percentages',
      method: 'POST',
      data: { evaluation_id },
      //debug: true,
    })
    if (error) continue
    evaluations_last_7_days_evaluations_achivements_percentages[evaluation_id] = data
  }

  return evaluations_last_7_days_evaluations_achivements_percentages
}

export default fetchEvaluationsLast7DaysEvaluationsAchivementPercentages
