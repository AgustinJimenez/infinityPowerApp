import { habitHomeReducer } from '../modules/home/handlers/redux';
import { habitObjectiveReducer } from '../modules/objectives/handlers/redux';

export const rootHabitReducer = {
  habitHome: habitHomeReducer,
  habitObjective: habitObjectiveReducer,
};
