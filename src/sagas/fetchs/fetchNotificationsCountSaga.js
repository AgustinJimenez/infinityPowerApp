import { takeLatest, put, select } from 'redux-saga/effects'
import { FETCH_NOTIFICATIONS_COUNT_SAGA } from '../constants.json'
import { setDatasetToReducer } from '../../redux/actions'
import request from '../../helpers/request'
import { datasetSelector } from '../../redux/selectors'
import firebase from 'react-native-firebase'

function* fetchNotificationsCount(action) {
    const notifications_count = yield select(state => datasetSelector(state, 'notifications_count'))

    let {error, data} = yield request({
        url: 'mobile/users/unchecked_notifications',
        method: 'POST',
        //debug: true
    })
    if(error) return 
    
    //console.log('fetchNotificationsCount ===> ', {notifications_count, data})
    if(notifications_count !== data){
      firebase.notifications().setBadge(data)
      yield put(setDatasetToReducer(data, 'notifications_count'))
    }
}

export default function* fetchNotificationsCountSaga() {
  yield takeLatest(FETCH_NOTIFICATIONS_COUNT_SAGA, fetchNotificationsCount)
}
