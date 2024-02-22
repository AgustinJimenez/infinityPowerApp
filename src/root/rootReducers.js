import {activityReducer} from 'src/modules/activity/handlers/redux';
import {rootHabitReducer} from 'src/modules/habit/root/rootReducers';
import {rootFocusReducer} from 'src/modules/focus/root/rootReducers';
import {authReducer} from 'src/modules/auth/handlers/redux';
import {rootMeditationReducer} from 'src/modules/meditation/root/rootReducers';

export const rootReducer = {
  auth: authReducer,
  activity: activityReducer,
  ...rootHabitReducer,
  ...rootFocusReducer,
  ...rootMeditationReducer,
  // debug: (a, b) => { console.log(a, b); return {} }
};
