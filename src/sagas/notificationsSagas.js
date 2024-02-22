import { all, call, put, takeLatest } from 'redux-saga/effects'
import { NOTIFICATION_OPENED_SAGA, NOTIFICATION_WAS_CHECKED_SAGA } from './constants.json'
import { Toast } from 'native-base'
import NavigationService from '../app/navigationService'
import { NavigationActions, StackActions } from 'react-navigation'
import { fetchNotificationsCountSagaAction, fetchObjectivesSagaAction, fetchRoutinesSagaAction } from './actions'
import request from '../helpers/request'

function* notificationWasChecked(notification_id) {
  request({
    url: 'mobile/users/notification_check',
    method: 'POST',
    data: {
      id: notification_id,
    },
    //debug: true
  })
}

function* notificationOpened({ notification }) {
  if (!!notification['notification']) notification = notification['notification']

  if (!!notification['_data'] && !!notification['_data']['source'] && typeof notification['_data']['source'] === 'string')
    notification['_data']['source'] = JSON.parse(notification['_data']['source'])

  if (!!notification['_data'] && !!notification['_data']['type']) {
    let resetAction = null
    yield call(notificationWasChecked, notification['_data']['id'])

    switch (notification['_data']['type']) {
      case 'auto_evaluation_coming':
        try {
          let objective_id = notification['_data']['source']['objective_id']

          console.log('START PROCESS !!!')
          yield put(fetchObjectivesSagaAction([objective_id]))
          resetAction = yield call(StackActions.reset, {
            index: 3,
            actions: [
              NavigationActions.navigate({ routeName: 'Main' }),
              NavigationActions.navigate({ routeName: 'TodayActivitiesScreen' }),
              NavigationActions.navigate({ routeName: 'HabitsHome' }),
              NavigationActions.navigate({
                routeName: 'EvaluationScreen',
                params: {
                  objective_id,
                  onlyNotes: false,
                },
              }),
            ],
          })
          yield call(NavigationService.dispatch, resetAction)
          console.log('END PROCESS !!!')
        } catch (e) {}
        break
      case 'friend_evaluation_coming':
        break
      case 'friend_made_note':
        try {
          let objective_id = notification['_data']['source']['objective_id']
          yield put(fetchObjectivesSagaAction([objective_id]))
          resetAction = StackActions.reset({
            index: 3,
            actions: [
              NavigationActions.navigate({ routeName: 'Main' }),
              NavigationActions.navigate({ routeName: 'TodayActivitiesScreen' }),
              NavigationActions.navigate({ routeName: 'ObjectiveDetailsScreen', params: { objective_id } }),
              NavigationActions.navigate({
                routeName: 'CalendarScreen',
                params: { objective_id },
              }),
            ],
          })
          NavigationService.dispatch(resetAction)
        } catch (e) {}

        break
      case 'user_nearly_routine_time':
        let routine_id = notification['_data']['source']['muser_routine_id']
        //console.log('HERE ===> ', { NavigationService, ID: notification['_data']['source']['muser_routine_id'] })
        yield put(fetchRoutinesSagaAction([routine_id]))
        try {
          resetAction = yield call(StackActions.reset, {
            index: 3,
            actions: [
              NavigationActions.navigate({ routeName: 'Main' }),
              NavigationActions.navigate({ routeName: 'TodayActivitiesScreen' }),
              NavigationActions.navigate({ routeName: 'MeditationHome' }),
              NavigationActions.navigate({
                routeName: 'PrePlayRoutineScreen',
                params: { routineSelectedId: notification['_data']['source']['muser_routine_id'] },
              }),
            ],
          })
          yield call(NavigationService.dispatch, resetAction)
        } catch (e) {}

        break
      case 'user_has_evaluated':
        yield call(Toast.show, {
          text: ' A pantalla de ACTIVIDADES DE HOY',
          type: 'success',
          duration: 4000,
        })
        break

      default:
        break
    }
    yield put(fetchNotificationsCountSagaAction())
  }
  //yield put(setDatasetToReducer(notification, 'notifications_history', { key: moment().format('DD_MM_YYYY__HH:mm:ss:SSS') }))
}

export function* notificationOpenedSaga() {
  yield takeLatest(NOTIFICATION_OPENED_SAGA, notificationOpened)
}
export function* notificationWasCheckedSaga() {
  yield takeLatest(NOTIFICATION_WAS_CHECKED_SAGA, notificationWasChecked)
}
