/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @formatNavigationActions
 * @flow
 */
import React from 'react'
import { StatusBar } from 'react-native'
import { AppearanceProvider } from 'react-native-appearance'
import AsyncStorage from '@react-native-community/async-storage'
import PhrasesProvider from '../context/PhrasesProvider'
//import additional library
import { Provider as ReduxProvider } from 'react-redux'
import { Root } from 'native-base'
import { store, persistor, persistNavigationState, loadNavigationState } from '../redux/store'
import AppNavigationContainer from './navigationProvider'
import request from '../helpers/request'
import { PersistGate } from 'redux-persist/integration/react'
import LoadingScreenComponent from '../components/LoadingScreenComponent'
import Language from '../helpers/languages'
//import request from './src/helpers/request'
import * as Sentry from '@sentry/react-native'
import DeviceInfo from 'react-native-device-info'
import { sentry_dsn, graphql_url } from '../../env.json'
import NavigationService from './navigationService'
import FirebaseProvider from './FirebaseProvider'
import GlobalFont from 'react-native-global-font'
import { enableScreens } from 'react-native-screens'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'
import LanguageProvider from './LanguageProvider'
require('moment/locale/es.js')
enableScreens()

const client = new ApolloClient({ uri: graphql_url })

Sentry.init({
  release: `infinitepower@${DeviceInfo.getVersion()}-${DeviceInfo.getBuildNumber()}`,
  dsn: sentry_dsn,
})
export default class App extends React.Component {
  constructor(props) {
    super(props)
    Language.loadLanguage()
  }

  componentDidMount() {
    this.init()
    GlobalFont.applyGlobal('Proxima Nova')
  }
  init = async () => {
    this.setLanguage()
    AsyncStorage.setItem('playerlisteners', 'SI')
    //this.fetchLangInfo()
  }
  fetchLangInfo = async () => {
    for (let langId of ['es', 'en', 'pt']) {
      var { error, response } = await request({
        url: 'get_init_data',
        data: {
          lang: langId,
          imei: null,
          timezone: null,
          //debug: true,
        },
        hide_network_error: true,
        debug: true,
      })

      if (!error) AsyncStorage.setItem(`get_init_data_${langId}`, JSON.stringify(response))
    }
  }
  setLanguage = async () => {
    const app_lang = await AsyncStorage.getItem('app_lang')

    global.lange = app_lang || 'es'
    global.lang = app_lang || 'es'
    Language.loadLanguage() //loading app language
    global.language = global.appLanguages[global.lang]
  }

  render() {
    console.disableYellowBox = true //should be restored
    return (
      <ApolloProvider client={client}>
        <ReduxProvider store={store}>
          <PersistGate loading={<LoadingScreenComponent />} persistor={persistor}>
            <Root>
              <LanguageProvider>
                <AppearanceProvider>
                  <PhrasesProvider>
                    <AppNavigationContainer
                      ref={navigatorRef => {
                        NavigationService.setTopLevelNavigator(navigatorRef)
                      }}
                      renderLoadingExperimental={() => <LoadingScreenComponent />}
                      persistNavigationState={persistNavigationState}
                      loadNavigationState={/* __DEV__ &&  */ loadNavigationState}
                    />
                    <StatusBar barStyle='light-content' hidden />
                    <FirebaseProvider />
                  </PhrasesProvider>
                </AppearanceProvider>
              </LanguageProvider>
            </Root>
          </PersistGate>
        </ReduxProvider>
      </ApolloProvider>
    )
  }
}
