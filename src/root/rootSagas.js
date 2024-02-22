import {all} from 'redux-saga/effects';
import {activitySagas} from 'src/modules/activity/handlers/sagas';
import {authSagas} from 'src/modules/auth/handlers/sagas';
import {rootMeditationSagas} from 'src/modules/meditation/root/rootSagas';
import {rootHabitSagas} from 'src/modules/habit/root/rootSagas';

export function* rootSagas() {
  yield all([
    authSagas(),
    activitySagas(),
    rootMeditationSagas(),
    rootHabitSagas(),
  ]);
}
