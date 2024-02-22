import { call, put, takeEvery } from 'redux-saga/effects';
import { meditationPhraseActions } from 'src/modules/meditation/modules/phrase/handlers/redux';
import { authApi } from './api';
import { authActions, ERROR } from './redux';

function* loginSaga({ payload }) {
  try {
    const data = yield call(authApi().login, {
      email: payload.email,
      password: payload.password,
    });

    console.log(data.token);
    yield put(authActions.setUser({ user: data.user }));
    yield put(authActions.setToken({ token: data.token }));
    yield put(authActions.setError({ error: ERROR['NONE'] }));
    yield put(authActions.setConfirmed({ confirmed: true }));
  } catch (error) {
    console.log({ error });
    yield put(authActions.setError({ error: ERROR['LOGIN'] }));
  }
}

function* registerSaga({ payload }) {
  try {
    const data = yield call(authApi().register, {
      name: payload.name,
      email: payload.email,
      password: payload.password,
    });

    const data_pin = yield call(authApi().verify, {
      recid: data.user.id,
      email: data.user.email,
    });

    console.log(data.token);
    yield put(authActions.setUser({ user: data }));
    yield put(authActions.setToken({ token: data.token }));
    yield put(authActions.setPin({ pin: data_pin }));
    yield put(authActions.setConfirmed({ confirmed: false }));
    yield put(authActions.setError({ error: ERROR['NONE'] }));
  } catch (error) {
    console.log({ error });
    yield put(authActions.setError({ error: ERROR['REGISTER'] }));
  }
}

export function* authSagas() {
  yield takeEvery(authActions.login.type, loginSaga);
  yield takeEvery(authActions.register.type, registerSaga);
}
