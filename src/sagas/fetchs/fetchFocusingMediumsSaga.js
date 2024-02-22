import { takeLatest, put } from 'redux-saga/effects'
import { FETCH_FOCUSING_MEDIUMS_SAGA } from '../constants.json'

import { setDatasetListToObjectReducer } from '../../redux/actions'
import request from '../../helpers/request'

export function* fetchFocusingMediums(useStore = true) {
  let focusing_mediums = []
  let { data, error } = yield request({
    url: 'actions/focusing_mediums',
    method: 'POST',
    //debug: true,
  })
  if (!error && !!data && data.length) {
    focusing_mediums = data
  }
  if (useStore) yield put(setDatasetListToObjectReducer(data, 'focusing_mediums'))

  return { focusing_mediums }
}

export function* fetchFocusingMediumsSaga() {
  yield takeLatest(FETCH_FOCUSING_MEDIUMS_SAGA, fetchFocusingMediums)
}
