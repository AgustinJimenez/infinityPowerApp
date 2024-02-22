import { takeLatest, put } from 'redux-saga/effects'
import { FETCH_ROUTINES_SAGA } from '../constants.json'
import { setDatasetToReducer } from '../../redux/actions'
import request from '../../helpers/request'

function* fetchRoutines(action) {
  var { data, error } = yield request({
    url: 'mobile/users/routine_list',
    method: 'POST',
    data: { ids: action.data.routines_ids },
    //debug: true,
  })
  if (error) return

  for (let routine of data.data) yield put(setDatasetToReducer(routine, 'routines', { key: routine.id }))
}

export default function* fetchRoutinesSaga() {
  yield takeLatest(FETCH_ROUTINES_SAGA, fetchRoutines)
}
