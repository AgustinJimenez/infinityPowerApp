import {all} from 'redux-saga/effects';
import {meditationPhraseSagas} from 'src/modules/meditation/modules/phrase/handlers/sagas';
import {meditationRoutineSagas} from 'src/modules/meditation/modules/routine/handlers/sagas';
import {meditationPlayerSagas} from '../modules/player/handlers/sagas';
import {meditationReminderSagas} from '../modules/reminder/handlers/sagas';

export function* rootMeditationSagas() {
  yield all([
    meditationRoutineSagas(),
    meditationPhraseSagas(),
    meditationReminderSagas(),
    meditationPlayerSagas(),
  ]);
}
