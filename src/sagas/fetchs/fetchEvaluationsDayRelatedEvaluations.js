import { call } from 'redux-saga/effects'
import request from '../../helpers/request'
import fetchUsers from './fetchUsers'

function* fetchEvaluationsDayRelatedEvaluations({ evaluations_ids = [] }) {
  //console.log('fetchEvaluationsDayRelatedEvaluations ===> ', evaluations_ids)
  evaluations_ids = [...new Set(evaluations_ids)]
  let evaluations = {}
  let evaluations_day_related_evaluations = {}
  let users_ids = []
  let users = []
  for (let evaluation_id of evaluations_ids) {
    var { data, error } = yield call(request, {
      url: 'mobile/users/evaluation_day_related_evaluations',
      method: 'POST',
      data: { evaluation_id },
      //debug: true,
    })
    if (error) continue
    if (!!data?.length) {
      evaluations_day_related_evaluations[evaluation_id] = data.map(evaluation => evaluation.id)
      for (let evaluation of data) {
        evaluations[evaluation.id] = evaluation
        users_ids.push(evaluation.muser_id)
      }
    }
  }
  users = yield call(fetchUsers, { users_ids })
  evaluations = Object.keys(evaluations).map(id => evaluations[id])

  return {
    evaluations,
    evaluations_day_related_evaluations,
    users,
  }
}

export default fetchEvaluationsDayRelatedEvaluations
