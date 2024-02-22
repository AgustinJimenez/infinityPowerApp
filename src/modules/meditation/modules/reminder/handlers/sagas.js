import {call, put, select, takeEvery} from 'redux-saga/effects';
import {navigation} from 'src/constants';
import {reminderApi} from './api';
import {meditationReminderActions} from './redux';

function* reminderDeleteSaga({payload}) {
  const token = yield select(state => state.auth.token);
  const routine = yield select(state => state.meditationRoutine.routine);
  const reminder = payload;

  const params = {...reminder, user_routine_id: routine.id};
  console.log({payload});
  try {
    const data = yield call(reminderApi(token).delete, params);

    yield put(meditationReminderActions.reminders());
    yield put(meditationReminderActions.reminderDeleteSuccess());

    navigation.navigate('MeditationReminder');
  } catch (error) {
    yield put(meditationReminderActions.reminderDeleteSuccess());
    console.log({error});
  }
}

function* reminderUpdateSaga({payload}) {
  const token = yield select(state => state.auth.token);
  const routine = yield select(state => state.meditationRoutine.routine);
  const reminder = yield select(state => state.meditationReminder.reminder);

  const params = {...reminder, user_routine_id: routine.id};
  try {
    const data = yield call(reminderApi(token).update, params);

    yield put(meditationReminderActions.reminderUpdateSuccess());

    navigation.navigate('MeditationReminder');

    yield put(meditationReminderActions.reminders());
  } catch (error) {
    yield put(meditationReminderActions.reminderUpdateSuccess());
    console.log({error});
  }
}

function* reminderCreateSaga({payload}) {
  const token = yield select(state => state.auth.token);
  const routine = yield select(state => state.meditationRoutine.routine);
  const reminder = yield select(state => state.meditationReminder.reminder);

  const params = {...reminder, user_routine_id: routine.id};
  try {
    const data = yield call(reminderApi(token).create, params);

    yield put(meditationReminderActions.reminderCreateSuccess());

    navigation.navigate('MeditationReminder');

    yield put(meditationReminderActions.reminders());
  } catch (error) {
    yield put(meditationReminderActions.reminderCreateSuccess());
    console.log({error});
  }
}

function* reminderSetActiveSaga({payload}) {
  const token = yield select(state => state.auth.token);
  try {
    const {reminder = {}} = payload;
    const data = yield call(reminderApi(token).reminderSetActive, {reminder});

    yield put(meditationReminderActions.reminderCreateSuccess());

    yield put(meditationReminderActions.reminders());
  } catch (error) {
    yield put(meditationReminderActions.reminderCreateSuccess());
    console.log({error});
  }
}

function* reminderSetDeactiveSaga({payload}) {
  const token = yield select(state => state.auth.token);
  try {
    const {reminder = {}} = payload;
    const data = yield call(reminderApi(token).reminderSetDeactive, {reminder});

    yield put(meditationReminderActions.reminderCreateSuccess());

    yield put(meditationReminderActions.reminders());
  } catch (error) {
    yield put(meditationReminderActions.reminderCreateSuccess());
    console.log({error});
  }
}

function* remindersSaga({payload}) {
  const token = yield select(state => state.auth.token);
  const routine = yield select(state => state.meditationRoutine.routine);
  try {
    const data = yield call(reminderApi(token).reminders, {
      user_routine_id: routine.id,
    });
    console.log({data});
    yield put(meditationReminderActions.setReminders({reminders: data}));
  } catch (error) {
    console.log({error});
  }
}

export function* meditationReminderSagas() {
  yield takeEvery(meditationReminderActions.reminders.type, remindersSaga);
  yield takeEvery(
    meditationReminderActions.reminderSetActive.type,
    reminderSetActiveSaga,
  );
  yield takeEvery(
    meditationReminderActions.reminderSetDeactive.type,
    reminderSetDeactiveSaga,
  );
  yield takeEvery(
    meditationReminderActions.reminderCreate.type,
    reminderCreateSaga,
  );
  yield takeEvery(
    meditationReminderActions.reminderUpdate.type,
    reminderUpdateSaga,
  );
  yield takeEvery(
    meditationReminderActions.reminderDelete.type,
    reminderDeleteSaga,
  );
}
