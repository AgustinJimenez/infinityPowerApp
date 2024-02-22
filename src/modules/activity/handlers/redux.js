import { createSlice } from '@reduxjs/toolkit';

const activitySlice = createSlice({
  name: 'activity',
  initialState: {
    resumen: {},
    resumen_loading: false,
    pending: [],
    pending_loading: false,
    belts: {},
    belts_loading: false,
    weeks: {},
    weeks_loading: false,
    percent_habit: 0,
    percent_habit_loading: false
  },
  reducers: {
    resumen: (state, { email, password }) => {
      state.resumen_loading = true;
    },
    resumenSet: (state, { payload }) => {
      state.resumen = payload.resumen;
      state.resumen_loading = false;
    },
    pending: (state, { email, password }) => {
      state.pending_loading = true;
    },
    pendingSet: (state, { payload }) => {
      state.pending = payload.pending;
      console.log(payload.pending);
    },
    belts: (state, {payload}) => {
      state.belts_loading = true;
    },
    beltsSet: (state, {payload}) => {
      state.belts = payload.belts;
      state.belts_loading = false;
    },
    weeks: (state, {payload}) => {
      state.weeks_loading = true;
    },
    weeksSet: (state, {payload}) => {
      state.weeks = payload.weeks;
      state.weeks_loading = false;
    },
    percentHabit: (state, {payload}) => {
      state.percent_habit_loading = true;
    },
    percentHabitSet: (state, {payload}) => {
      state.percent_habit = payload.percentHabit;
      state.percent_habit_loading = false;
    },
  },
});

export const activityActions = activitySlice.actions;
export const activityReducer = activitySlice.reducer;
