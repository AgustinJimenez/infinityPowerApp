import React from 'react'
import { Alert } from 'react-native'
import firebase from 'react-native-firebase'
import { useDispatch, useSelector } from 'react-redux'
import request from '../helpers/request'
import { setDatasetToReducer } from '../redux/actions'
import { datasetSelector } from '../redux/selectors'
import { notificationOpenedSagaAction, fetchNotificationsCountSagaAction } from '../sagas/actions'

const updateToken = newToken =>
  request({
    url: 'mobile/users/refresh_user_fcm_token',
    method: 'POST',
    data: {
      fcm_token: newToken,
    },
    //debug: true,
  })

const showMessage = ({ notification, dispatch }) => {
  /* 
  Alert.alert(
    notification['data']['title'],
    notification['data']['message'],
    [
      {
        text: 'OK',
        onPress: () => dispatch(notificationOpenedSagaAction(notification)),
      },
    ],
    { cancelable: false },
 
  )
  */
}

const setFcmTokenToStore = async ({ dispatch }) => {
  let fcmToken = null
  try {
    fcmToken = await firebase.messaging().getToken()
    updateToken(fcmToken)
  } catch (error) {
    console.log('APP.JS - FCM-getToken ERROR', error)
  }

  if (!!fcmToken) {
    dispatch(setDatasetToReducer(fcmToken, 'fcm_token'))
  }
}

const checkPermission = async ({ dispatch, notifications_count }) => {
  try {
    if (!firebase.messaging().hasPermission()) await firebase.messaging().requestPermission()
    else {
      setFcmTokenToStore({ dispatch })
      createNotificationListeners({ dispatch, notifications_count })
    }
  } catch (error) {
    alert('Permiso denegado para recibir notificaciones.', error)
  }
}

const createNotificationListeners = async ({ dispatch, notifications_count }) => {
  firebase.notifications().onNotificationDisplayed(() => {
    dispatch(fetchNotificationsCountSagaAction())
  })

  /*
   * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
   * */
  firebase.notifications().onNotificationOpened(notification => dispatch(notificationOpenedSagaAction(notification)))

  /*
   * Triggered for data only payload in foreground
   * */
  firebase.messaging().onMessage(notification => {
    showMessage({ notification, dispatch })
  })

  firebase.messaging().onTokenRefresh(updateToken)

  /*
   * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
   * */
  const notificationOpen = await firebase.notifications().getInitialNotification()

  if (notificationOpen) {
    //const { title, body } = notificationOpen.notification
    console.log('FIREBASE - getInitialNotification', { notificationOpen })
  }
}

const FirebaseProvider = props => {
  const notifications_count = useSelector(state => datasetSelector(state, 'notifications_count'))
  const dispatch = useDispatch()

  React.useEffect(() => {
    firebase.notifications().setBadge(notifications_count)
    checkPermission({ dispatch, notifications_count })
    //dispatch(setDatasetToReducer({}, 'notifications_history'))
  }, [])

  return null
}
export default FirebaseProvider
