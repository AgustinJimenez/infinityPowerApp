import { HomeStack } from '../modules/home/handlers/routes';
import { PhraseStack } from '../modules/phrase/handlers/routes';
import { PlayerStack } from '../modules/player/handlers/routes';
import { ReminderStack } from '../modules/reminder/handlers/routes';
import { RoutineStack } from '../modules/routine/handlers/routes';

export const MeditationStack = [
  ...HomeStack,
  ...PhraseStack,
  ...PlayerStack,
  ...RoutineStack,
  ...ReminderStack,
];
