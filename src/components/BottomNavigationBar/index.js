import React from 'react'
import { View, TouchableOpacity, Image, Dimensions } from 'react-native'
import IconProfileImage from '../../img/icon_account.png'
import { scale, globalStyles } from '../../helpers/styles'
import { NavigationActions, NavigationContext, StackActions } from 'react-navigation'
import { Icon } from 'native-base'

const height = Dimensions.get('window').height

const currentRouteIsHome = navigation => navigation.state.routeName === 'Main'
const resetToHome = navigation => {
  if (!currentRouteIsHome(navigation)) {
    //console.log('resetToHome ===> ', navigation)
    navigation.navigate('Main')
  }
}

const NavigationButton = ({ onPress = () => {}, buttonIcon, shouldRender = true }) => {
  if (!shouldRender) return null
  return (
    <TouchableOpacity disabled={!shouldRender} style={{ flex: 1, justifyContent: 'center' }} onPress={onPress}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {buttonIcon}
      </View>
    </TouchableOpacity>
  )
}

const BottomNavigationBar = () => {
  const navigation = React.useContext(NavigationContext)
  const goBack = React.useCallback(() => {
    let backAction = NavigationActions.back()
    navigation.dispatch(backAction)
  }, [navigation])

  const routeIsTabHome = React.useMemo(() => {
    let isTabHome = true
    navigation['state']['routes']?.some?.(route => {
      if (!!route['index']) {
        isTabHome = false
        return true
      }
    })
    return isTabHome
  }, [navigation])

  const goToProfileTab = React.useCallback(() => {
    if (!routeIsTabHome) navigation.dispatch(StackActions.popToTop())
    navigation.navigate('Profile')
  }, [navigation])

  return (
    <View
      style={[
        {
          flex: 1,
          width: '100%',
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          borderTopLeftRadius: scale(0.8),
          borderTopRightRadius: scale(0.8),
          position: 'absolute',
          bottom: 0,
          height: height * 0.2 < 75 ? 75 : height * 0.1,
          flexDirection: 'row',
          justifyContent: 'center',
          shadowOffset: {
            width: 10,
            height: -10,
          },
          shadowOpacity: 0.3,
          shadowRadius: 7,
        },
        globalStyles.primaryBg,
      ]}
    >
      <NavigationButton
        shouldRender={!routeIsTabHome}
        onPress={goBack}
        buttonIcon={<Icon type='Ionicons' name='arrow-undo-outline' style={{ color: 'white' }} />}
      />

      <NavigationButton
        onPress={() => resetToHome(navigation)}
        buttonIcon={<Icon type='SimpleLineIcons' name='home' style={{ color: 'white', fontSize: scale(0.6) }} />}
      />

      <NavigationButton onPress={goToProfileTab} buttonIcon={<Image source={IconProfileImage} style={{ width: 18, height: 22.5 }} />} />
    </View>
  )
}
export default BottomNavigationBar
