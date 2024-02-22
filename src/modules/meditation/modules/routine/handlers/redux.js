import {createSlice} from '@reduxjs/toolkit';

const meditationRoutineSlice = createSlice({
  name: 'meditationRoutine',
  initialState: {
    image: '',
    routine: {},
    routine_create_loading: false,
    routine_update_loading: false,
    routines: [],
    routines_loading: false,
    tones: [],
    tones_loading: false,
    musics: [],
    musics_loading: false,
    routine_background_upload_loading: false,
  },
  reducers: {
    // Image
    imageGallery: (state, {payload}) => {},
    imageSet: (state, {payload}) => {
      state.image = payload.image;
    },

    routineSet: (state, {payload}) => {
      state.routine = payload.routine;
    },
    routineCreate: (state, {payload = {name}}) => {
      state.routine_create_loading = true;
    },
    routineUpdate: (state, {payload = {name}}) => {
      state.routine_update_loading = true;
    },
    routineCreateSuccess: state => {
      state.routine_create_loading = false;
    },
    routineExecuted: (state, {payload = {routine}}) => {},
    routines: (state, {payload}) => {
      state.routines_loading = true;
    },
    routineSetActive: (state, {payload}) => {
      const {routine = {}} = payload;
      for (let index = 0; index < state.routines.length; index++) {
        const r = state.routines[index];
        if (routine.id == r.id) {
          routine.enabled = true;
        }
        state.routines[index] = r;
      }
    },
    routineSetDeactive: (state, {payload}) => {
      const {routine = {}} = payload;
      for (let index = 0; index < state.routines.length; index++) {
        const r = state.routines[index];
        if (routine.id == r.id) {
          routine.enabled = false;
        }
        state.routines[index] = r;
      }
    },

    routineBackgroundUpdate: (
      state,
      {payload = {routine_id, background_image}},
    ) => {
      state.affirmation_background_upload_loading = true;
    },

    routinesSetConfiguration: (state, {payload}) => {
      state.routines_loading = true;
    },
    setRoutines: (state, {payload}) => {
      state.routines = payload.routines;
      state.routines_loading = false;
    },
    tones: (state, {payload}) => {
      state.tones_loading = true;
    },
    setTones: (state, {payload}) => {
      state.tones = payload.tones;
      state.tones_loading = false;
    },
    musics: (state, {payload}) => {
      state.musics_loading = true;
    },
    setMusics: (state, {payload}) => {
      state.musics = payload.musics;
      state.musics_loading = false;
    },
    RoutineBackgroundUpload: (state, {payload}) => {
      state.routine_background_upload_loading = true;
    },
    setRoutineBackgroundUpload: (state, {payload}) => {
      state.routine_background_upload = payload.routine_background_upload;
      state.routine_background_upload_loading = false;
    },
    routineDelete: (state, {payload}) => {
      state.routines_loading = false;
    },
  },
});

export const meditationRoutineActions = meditationRoutineSlice.actions;
export const meditationRoutineReducer = meditationRoutineSlice.reducer;
