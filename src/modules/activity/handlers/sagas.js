import {call, put, select, takeEvery} from 'redux-saga/effects';
import {activityApi} from './api';
import {activityActions} from './redux';

function* resumenSaga({payload}) {
  const token = yield select(state => state.auth.token);
  try {
    const data = yield call(activityApi(token).resumen);

    yield put(activityActions.resumenSet({resumen: data}));
  } catch (error) {
    console.log({error});
  }
}

function* pendingSaga({payload}) {
  const token = yield select(state => state.auth.token);
  try {
    const data = yield call(activityApi(token).pending);

    console.log({pending: data});
    yield put(activityActions.pendingSet({pending: data}));
  } catch (error) {
    console.log({error});
  }
}

function* beltsSaga({ payload }) {
  const token = yield select((state) => state.auth.token);
  try {
    const data = yield call(activityApi(token).belts);
    yield put(activityActions.beltsSet({ belts: data }));
  } catch (error) {
    console.log({ error });
  }
}

function* weeksSaga({ payload }) {
  const token = yield select((state) => state.auth.token);
  try {
    const data = yield call(activityApi(token).weeks);
    yield put(activityActions.weeksSet({ weeks: data }));
  } catch (error) {
    console.log({ error });
  }
}

function* percentHabitSaga({ payload }) {
  const token = yield select((state) => state.auth.token);
  try {
    const data = yield call(activityApi(token).percentHabit);
    yield put(activityActions.percentHabitSet({ percentHabit: data }));
  } catch (error) {
    console.log({ error });
  }
}


export function* activitySagas() {
  yield takeEvery(activityActions.resumen.type, resumenSaga);
  yield takeEvery(activityActions.pending.type, pendingSaga);
  yield takeEvery(activityActions.belts.type, beltsSaga);
  yield takeEvery(activityActions.weeks.type, weeksSaga);
  yield takeEvery(activityActions.percentHabit.type, percentHabitSaga);
}
