import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { show_redux_logs } from '../../env.json'
// Imports: Redux Store
import { persistStore, persistReducer } from 'redux-persist'
import storage from '@react-native-community/async-storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
// Imports: Redux Root Reducer
import reducers from './reducers'
// Imports: Redux Root Saga
import AsyncStorage from '@react-native-community/async-storage'
import sagas from '../sagas'
// Middleware: Redux Sagas
const sagaMiddleware = createSagaMiddleware()
// Redux: Store
//import customReduxMiddleware from './customReduxMiddleware'

import { composeWithDevTools } from 'redux-devtools-extension'

const persistedReducer = persistReducer(
  {
    key: 'root',
    storage,
    timeout: null,
    stateReconciler: autoMergeLevel2,
    blacklist: ['navigation'], // navigation will not be persisted
  },
  reducers,
)

let middlewares = [sagaMiddleware /* , customReduxMiddleware */]
if (show_redux_logs && process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`)
  middlewares.push(logger)
}
const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(...middlewares)))
const persistor = persistStore(store)
// Middleware: Redux Saga
sagaMiddleware.run(sagas)
// Exports

const persistenceKey = 'navigation'
const persistNavigationState = async navState => {
  try {
    //console.log('persistNavigationState===> ', navState)
    await AsyncStorage.setItem(persistenceKey, JSON.stringify(navState))
  } catch (err) {
    console.log('persistNavigationState ERROR ===> ', err)
  }
}

const loadNavigationState = async () => {
  const jsonString = await AsyncStorage.getItem(persistenceKey)
  const navState = JSON.parse(jsonString)
  return navState
}

export { store, persistor, persistNavigationState, loadNavigationState }
