import { takeLatest, put } from 'redux-saga/effects'
import { UPDATE_DEVICE_IMEI_SAGA } from './constants.json'
import md5 from 'md5'
import DeviceInfo from 'react-native-device-info'
import { setDatasetToReducer } from '../redux/actions'

function* updateDeviceImei() {
  let imei = md5(DeviceInfo.getUniqueId())
  yield put(setDatasetToReducer(imei, 'imei'))
}

export default function* updateDeviceImeiSaga() {
  yield takeLatest(UPDATE_DEVICE_IMEI_SAGA, updateDeviceImei)
}
