import { createSlice } from '@reduxjs/toolkit';

export const modeType = {
  AFFIRMATIVE: 'affirmative',
  GRATITUDE: 'gratitude',
};

const meditationPlayerSlice = createSlice({
  name: 'meditationPlayer',
  initialState: {
    aleatorio: false,
    backgroundVisible: true,
    mode: modeType.AFFIRMATIVE,
    music: {},
    pause: 5,
    phrases_affirmative: [],
    phrases_gratitude: [],
    phrases: [],
    phrase_current: {},
    playList: {},
    ready: false,
    repeat: 5,
    routine: {},
    seconds: 0,
    status: {},
    tone: {},
    total: 0,
    audio_volumen: 1,
    music_volumen: 0.75,
    tone_volumen: 0.35,
  },
  reducers: {
    audioVolumenSet: (state, { payload }) => {
      console.log(123123);
      state.audio_volumen = payload;
    },
    musicVolumenSet: (state, { payload }) => {
      state.music_volumen = payload;
    },
    toneVolumenSet: (state, { payload }) => {
      state.tone_volumen = payload;
    },
    readySet: (state, { payload }) => {
      state.ready = payload;
    },
    routineSet: (state, { payload }) => {
      state.routine = payload;
    },
    phraseCurrentSet: (state, { payload }) => {
      state.phrase_current = payload;
      console.log('payload ' + payload)
    },
    phrasesSet: (state, { payload }) => {
      state.phrases = payload;
    },
    phrasesAffirmativeSet: (state, { payload }) => {
      state.phrases_affirmative = payload;
    },
    phrasesGratitudeSet: (state, { payload }) => {
      state.phrases_gratitude = payload;
    },
    secondsSet: (state, { payload }) => {
      state.seconds = payload;
    },
    totalSet: (state, { payload }) => {
      console.log('total ' + payload);
      state.total = payload;
    },
    aleatorioSet: (state, { payload }) => {
      state.aleatorio = payload;
    },
    backgroundVisibleSet: (state, { payload }) => {
      state.backgroundVisible = payload;
    },
    repeatSet: (state, { payload }) => {
      state.repeat = payload;
    },
    pauseSet: (state, { payload }) => {
      state.pause = payload;
    },
    playListSet: (state, { payload }) => {
      state.playList = payload;
    },
    modeSet: (state, { payload }) => {
      state.mode = payload;
    },
    musicSet: (state, { payload }) => {
      state.music = payload;
    },
    toneSet: (state, { payload }) => {
      state.tone = payload;
    },
    statusSet: (state, { payload }) => {
      state.status = payload;
    },
    preparePlay: () => {},
    play: () => {},
    pause: () => {},
    stop: () => {},
  },
});

export const meditationPlayerActions = meditationPlayerSlice.actions;
export const meditationPlayerReducer = meditationPlayerSlice.reducer;
