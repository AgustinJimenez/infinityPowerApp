import { HabitHomeStack } from '../modules/home/handlers/routes';
import { HabitObjectiveStack } from '../modules/objectives/handlers/routes';

export const HabitStack = [
  ...HabitHomeStack,
  ...HabitObjectiveStack
];
