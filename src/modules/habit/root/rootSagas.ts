import { all } from 'redux-saga/effects';
import { habitHomeSagas } from '../modules/home/handlers/sagas';
import { habitObjectiveSagas } from '../modules/objectives/handlers/sagas';

export function* rootHabitSagas() {
  yield all([habitHomeSagas(), habitObjectiveSagas()]);
}
