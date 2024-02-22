import { all } from 'redux-saga/effects'
import callbackVoidSaga from './callbackVoidSaga'
import updateDeviceImeiSaga from './updateDeviceImei'
import { fetchFocusingMediumsSaga } from './fetchs/fetchFocusingMediumsSaga'
import { fetchUserPendingQuestionsSaga } from './fetchs/fetchUserPendingQuestionsSaga'
import clearReducersSaga from './clearReducersSaga'
import fetchMentalFocusPercentageSaga from './fetchs/fetchMentalFocusPercentageSaga'
import { notificationOpenedSaga, notificationWasCheckedSaga } from './notificationsSagas'
import fetchObjectivesSaga from './fetchs/fetchObjectivesSaga'
import fetchRoutinesSaga from './fetchs/fetchRoutinesSaga'
import fetchNotificationsCountSaga from './fetchs/fetchNotificationsCountSaga'
import todayActivitiesDatasSaga from './todayActivitiesDatasSaga'
import fetchRoutinesConfigurationsSaga from './fetchs/fetchRoutinesConfigurationsSaga'
import fetchNotesSaga from './fetchs/fetchNotesSaga'
import updateHabitsHomeDatasSaga from './updateHabitsHomeDatasSaga'
import updateFriendsObjectivesSaga from './updateFriendsObjectivesSaga'
import updateInviteCodesSaga from './updateInviteCodesSaga'
import removeActivityFromStoreById from './removeActivityFromStoreById'
import mainScreenSaga from '../screens/MainScreen/saga'
import beltInfoScreenSaga from '../screens/BeltInfo/saga'

const allSagas = [
  callbackVoidSaga(),
  updateDeviceImeiSaga(),
  fetchFocusingMediumsSaga(),
  fetchUserPendingQuestionsSaga(),
  clearReducersSaga(),
  fetchMentalFocusPercentageSaga(),
  notificationOpenedSaga(),
  fetchObjectivesSaga(),
  notificationWasCheckedSaga(),
  fetchRoutinesSaga(),
  fetchNotificationsCountSaga(),
  todayActivitiesDatasSaga(),
  fetchRoutinesConfigurationsSaga(),
  fetchNotesSaga(),
  mainScreenSaga(),
  updateHabitsHomeDatasSaga(),
  updateFriendsObjectivesSaga(),
  updateInviteCodesSaga(),
  removeActivityFromStoreById(),
  beltInfoScreenSaga(),
]

export default function* rootSaga() {
  yield all(allSagas)
}
