import { takeLatest, put, call } from 'redux-saga/effects'
import { FETCH_OBJECTIVES_SAGA } from '../constants.json'
import request from '../../helpers/request'
import { setDatasetListToReducer } from '../../redux/actions'

function* fetchObjectives({ data: { objectives_ids } }) {
  objectives_ids = [...new Set(objectives_ids)]
  var { data, error } = yield call(request, {
    url: 'actions/get_objective_list',
    method: 'POST',
    data: { ids: objectives_ids },
    //debug: true,
  })
  if (error) return
  yield put(setDatasetListToReducer(data, 'objectives'))
}

export default function* fetchObjectivesSaga() {
  yield takeLatest(FETCH_OBJECTIVES_SAGA, fetchObjectives)
}
