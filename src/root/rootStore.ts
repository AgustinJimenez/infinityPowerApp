import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import { rootReducer } from './rootReducers';
import { rootSagas } from './rootSagas';

const sagaMiddleware = createSagaMiddleware();
const middleware = [
  ...getDefaultMiddleware({
    thunk: false,
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      warnAfter: 128,
    },
    immutableCheck: { warnAfter: 128 },
  }),
  sagaMiddleware,
];

const persistedReducer = persistReducer(
  {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['auth'],
  },
  combineReducers(rootReducer),
);

const store = configureStore({
  reducer: persistedReducer,
  middleware,
});

sagaMiddleware.run(rootSagas);

export const persistor = persistStore(store);

export const rootStore = store;

export type StoreType = ReturnType<typeof store.getState>;
export type PartialStoreType = RecursivePartial<ReturnType<typeof store.getState>>;
export type AppDispatch = typeof store.dispatch;
