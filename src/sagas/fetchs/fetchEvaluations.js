import { call } from 'redux-saga/effects'
import request from '../../helpers/request'

function* fetchEvaluations({ evaluations_ids, only_current_user_evaluations = true }) {
  evaluations_ids = [...new Set(evaluations_ids)]
  var { data, error } = yield call(request, {
    url: 'mobile/users/evaluations',
    method: 'POST',
    data: { ids: evaluations_ids, only_current_user: only_current_user_evaluations },
    //debug: true,
  })
  if (error) return []
  //yield put(setDatasetListToReducer(data, 'evaluations'))
  return data
}

export default fetchEvaluations
