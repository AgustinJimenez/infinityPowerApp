import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ObjectiveProps } from './api';

export interface HabitState {
  objective: ObjectiveProps;
  objectives: Array<ObjectiveProps>;
  objective_loading: boolean;
}

export interface ObjectiveSetProps {
  objective: ObjectiveProps;
}

const habitHomeSlice = createSlice({
  name: 'habit',
  initialState: {
    objective: {
      name: 'Ser el mejor maestro pokemon',
      description: 'Atraparlos mi meta es y entrenarlos mi ideal',
      trigger: 'Mi rival es mejor que yo',
      deadline: '2022-09-30',
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
      hour: '08:00',
    },
    objectives: [],
    objective_loading: false,
  },
  reducers: {
    objectiveCreate: state => {
      state.objective_loading = true;
    },
    objectiveCreateSuccess: state => {
      state.objective_loading = false;
    },
    objectiveAvailableAllDays: state => {
      state.objective = {
        ...state.objective,
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        sunday: true,
      };
    },
    objectiveChangeData: (state, { payload }: PayloadAction<{ [key: string]: string }>) => {
      state.objective = {
        ...state.objective,
        ...payload,
      };
    },
    objectiveChangeDay: (state, { payload }: PayloadAction<{ [key: string]: boolean }>) => {
      state.objective = {
        ...state.objective,
        ...payload,
      };
    },
    objectiveSet: (state: HabitState, { payload }: PayloadAction<ObjectiveSetProps>) => {
      state.objective = payload.objective;
    },
    loadObjectives: (state: HabitState, { payload }: PayloadAction<Array<ObjectiveProps>>) => {
      state.objectives = payload;
    },
  },
});

export const habitHomeActions = habitHomeSlice.actions;
export const habitHomeReducer = habitHomeSlice.reducer;
