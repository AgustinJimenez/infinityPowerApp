import { Icon } from 'native-base'
import { TouchableOpacity, Text, View } from 'react-native'
//import { TouchableOpacity } from 'react-native-gesture-handler'
import React from 'react'
import { scale } from '../helpers/styles'
import { useDispatch, useSelector } from 'react-redux'
import { datasetSelector } from '../redux/selectors'
import { fetchNotificationsCountSagaAction } from '../sagas/actions'
import { NavigationEvents } from 'react-navigation'

export const NotificationCountIcon = () => {
  const dispatch = useDispatch()

  const notifications_count = useSelector(state => datasetSelector(state, 'notifications_count'))

  return (
    <>
      {!!notifications_count && (
        <View
          style={{
            position: 'absolute',
            backgroundColor: 'white',
            width: scale(0.35),
            height: scale(0.35),
            borderRadius: scale(0.35) / 2,
            alignSelf: 'flex-end',
            alignItems: 'center',
            justifyContent: 'center',
            elevation: 10,
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.5,
            shadowRadius: 2,
          }}
        >
          <Text style={{ fontSize: scale(0.25), textAlign: 'center', textAlignVertical: 'center', color: 'black' }}>{notifications_count}</Text>
        </View>
      )}
      <NavigationEvents
        onDidFocus={() => {
          dispatch(fetchNotificationsCountSagaAction())
        }}
      />
    </>
  )
}

const NotificationIconComponent = ({ onPress = () => {} }) => {
  return (
    <TouchableOpacity
      style={{
        position: 'absolute',
        top: scale(1.2),
        left: scale(0.8),
        zIndex: 1
      }}
      onPress={onPress}
    >
      <Icon
        type='MaterialIcons'
        name='notifications'
        color='white'
        style={{
          color: 'white',
          elevation: 10,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.5,
          shadowRadius: 2,
        }}
      />
      <NotificationCountIcon />
    </TouchableOpacity>
  )
}

export default NotificationIconComponent
