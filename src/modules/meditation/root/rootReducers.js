import {meditationPhraseReducer} from 'src/modules/meditation/modules/phrase/handlers/redux';
import {meditationRoutineReducer} from 'src/modules/meditation/modules/routine/handlers/redux';
import {meditationPlayerReducer} from '../modules/player/handlers/redux';
import {meditationReminderReducer} from '../modules/reminder/handlers/redux';

export const rootMeditationReducer = {
  meditationRoutine: meditationRoutineReducer,
  meditationPhrase: meditationPhraseReducer,
  meditationPlayer: meditationPlayerReducer,
  meditationReminder: meditationReminderReducer,

  // debug: (a, b) => { console.log(a, b); return {} }
};
