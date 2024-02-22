import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StoreType } from 'src/root/rootStore';
import { ObjectiveProps } from './api';

export interface HabitState {
  objective: ObjectiveProps;
  objectives: Array<ObjectiveProps>;
  get_objective_loading: boolean;
  create_objective_loading: boolean;
  dateToDeadLine: string;
}

export interface ObjectiveSetProps {
  objective: ObjectiveProps;
}

const dateToDeadLine = new Date().toDateString();

const habitObjectiveSlice = createSlice({
  name: 'habit',
  initialState: {
    objective: {
      name: '',
      description: '',
      trigger: '',
      deadline: '2022-09-30',
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
      hour: '08:00 am',
      percent: 0,
    },
    dateToDeadLine: dateToDeadLine,
    objectives: [],
    get_objective_loading: false,
    create_objective_loading: false,
  },
  reducers: {
    objectiveChangeDateDeadLine: (state: HabitState, { payload }: PayloadAction<string>) => {
      state.dateToDeadLine = payload;
    },
    objectiveCreate: (state, { payload }: PayloadAction<ObjectiveProps>) => {
      state.create_objective_loading = true;
    },
    objectiveCreateSuccess: state => {
      state.create_objective_loading = false;
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
      console.log(payload);
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
      state.objectives = payload.objectives;
      state.objective = payload.objective;
    },
    getObjectives: (state: HabitState) => {
      state.get_objective_loading = true;
    },
    getObjectivesSuccess: (state: HabitState) => {
      state.get_objective_loading = false;
    },
    loadObjectives: (state: HabitState, { payload }: PayloadAction<Array<ObjectiveProps>>) => {
      state.objectives = payload;
    },
  },
});

export const habitObjectiveActions = habitObjectiveSlice.actions;
export const habitObjectiveReducer = habitObjectiveSlice.reducer;
export const habitObjectiveSelector = (state: StoreType) => state.habitObjective;
