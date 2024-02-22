import { takeLatest, put, select } from 'redux-saga/effects'
import { REMOVE_ACTIVITY_FROM_STORE_BY_ID_SAGA } from './constants.json'
import { setDatasetToReducer } from '../redux/actions'
import { datasetSelector } from '../redux/selectors'

function* removeActivityFromStoreById({ ids = [], callback } = {}) {
  let today_activities = yield select(state => datasetSelector(state, 'today_activities'))

  let today_activities_updated = today_activities.filter(activity => !ids.includes(activity['id']))

  //console.log('removeActivityFromStoreById ===> ', { ids, today_activities, today_activities_updated })

  yield put(setDatasetToReducer(today_activities_updated, 'today_activities'))
  if (!!callback) callback?.()
}

export default function* saga() {
  yield takeLatest(REMOVE_ACTIVITY_FROM_STORE_BY_ID_SAGA, removeActivityFromStoreById)
}
