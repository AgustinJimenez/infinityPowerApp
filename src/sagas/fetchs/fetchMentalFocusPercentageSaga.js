import { takeLatest, put } from 'redux-saga/effects'
import { FETCH_MENTAL_FOCUS_PERCENTAGE_SAGA } from '../constants.json'

import { setDatasetToReducer } from '../../redux/actions'
import request from '../../helpers/request'

function* fetchMentalFocusPercentage() {
  let { data = {}, error } = yield request({
    url: 'mobile/users/mental_focus_percentage',
    method: 'POST',
    //debug: true,
  })
  let { mental_focus_percentage = 0, stats = {} } = data

  if (error && isNaN(mental_focus_percentage)) return

  yield put(setDatasetToReducer(mental_focus_percentage, 'mental_focus_percentage'))
  yield put(setDatasetToReducer(stats, 'mental_focus_stats'))
}

export default function* fetchMentalFocusPercentageSaga() {
  yield takeLatest(FETCH_MENTAL_FOCUS_PERCENTAGE_SAGA, fetchMentalFocusPercentage)
}
