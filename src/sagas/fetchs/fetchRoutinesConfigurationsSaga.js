import { takeLatest, put } from 'redux-saga/effects'
import { FETCH_ROUTINES_CONFIGURATIONS } from '../constants.json'
import { setDatasetListToReducer } from '../../redux/actions'
import request from '../../helpers/request'

function* fetchRoutinesConfigurations(action) {
  var { data, error } = yield request({
    url: 'mobile/users/routines_configurations',
    method: 'POST',
    data: { ids: action.data.routines_configurations_ids },
    //debug: true,
  })
  if (error) return
  yield put(setDatasetListToReducer(data, 'routines_configurations'))
}

export default function* fetchRoutinesConfigurationsSaga() {
  yield takeLatest(FETCH_ROUTINES_CONFIGURATIONS, fetchRoutinesConfigurations)
}
