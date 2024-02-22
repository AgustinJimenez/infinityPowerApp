import React from 'react'
import { useSelector } from 'react-redux'
import LoadingScreenComponent from '../components/LoadingScreenComponent'
import { datasetSelector } from '../redux/selectors'
import { NavigationContext } from 'react-navigation'

const AuthLoadingScreen = ({}) => {
  const navigation = React.useContext(NavigationContext)
  //const intro_token = useSelector(state => datasetSelector(state, 'intro_token'))
  const user_token = useSelector(state => datasetSelector(state, 'token'))

  const _bootstrapAsync = React.useCallback(async () => {
    let navigationScreen = null
    //if (!intro_token) navigationScreen = 'WalkthroughScreen' else
    if (user_token) navigationScreen = 'App'
    else navigationScreen = 'Auth'

    //console.log('AUTH-LOADING ===>', { navigation, navigationScreen, intro_token, user_token })
    navigation.navigate(navigationScreen)
  }, [/* intro_token,  */ user_token])

  React.useEffect(() => {
    _bootstrapAsync()
  }, [])

  return <LoadingScreenComponent />
}

export default AuthLoadingScreen
