import {createSlice} from '@reduxjs/toolkit';

const meditationPhraseSlice = createSlice({
  name: 'meditationPhrase',
  initialState: {
    categories: [],
    categories_loading: false,
    images: {},
    phrases: [],
    phrase: {},
    phrase_audio_affirmative: '',
    phrase_audio_gratitude: '',
    phrase_text_affirmative: '',
    phrase_text_gratitude: '',
    phrases_loading: false,
    phrases_routine_id: null,
    phrases_routine_list: [],
    phrases_routine_list_save_loading: false,
    phrases_background_upload_loading: false,
    phrase_upload_affirmative_loading: false,
    phrase_upload_gratitude_loading: false,
    phrase_update_loading: false,
    phrase_create_loading: false,
    phrase_delete_loading: false,
  },
  reducers: {
    // Categories
    categories: (state, {payload}) => {
      state.categories_loading = true;
    },
    categoriesSet: (state, {payload}) => {
      state.categories = payload.categories;
      state.categories_loading = false;
    },
    // Images
    imageGallery: (state, {payload = {routine_phrase}}) => {},
    imagesSet: (state, {payload}) => {
      state.images = payload.images;
    },
    // Phrases
    phrases: (state, {payload}) => {
      state.phrases_loading = true;
    },
    phrasesSet: (state, {payload}) => {
      state.phrases = payload.phrases;
      state.phrases_loading = false;
    },
    phraseAudioAffirmativeSet: (state, {payload}) => {
      state.phrase_audio_affirmative = payload.phrase_audio_affirmative;
    },
    phraseAudioGratitudeSet: (state, {payload}) => {
      state.phrase_audio_gratitude = payload.phrase_audio_gratitude;
    },
    phraseTextAffirmativeSet: (state, {payload}) => {
      state.phrase_text_affirmative = payload.phrase_text_affirmative;
    },
    phraseTextGratitudeSet: (state, {payload}) => {
      state.phrase_text_gratitude = payload.phrase_text_gratitude;
    },
    phraseSet: (state, {payload}) => {
      const {
        audio_affirmative = '',
        text_affirmative = '',
        audio_gratitude = '',
        text_gratitude = '',
      } = payload.phrase;
      console.log({phrase: payload.phrase});
      state.phrase_audio_affirmative = audio_affirmative;
      state.phrase_text_affirmative = text_affirmative;
      state.phrase_audio_gratitude = audio_gratitude;
      state.phrase_text_gratitude = text_gratitude;
      state.phrase = payload.phrase;
    },
    phraseAffirmativeReset: (state, {payload}) => {
      const {audio_affirmative = '', text_affirmative = ''} = state.phrase;

      state.phrase_audio_affirmative = audio_affirmative;
      state.phrase_text_affirmative = text_affirmative;
    },
    // PhrasesRoutine
    phrasesRoutine: (state, {payload}) => {
      state.phrases_routine_id = payload.routine.id;
    },
    phrasesRoutineAdd: (state, {payload}) => {
      const {phrase = {}} = payload || {};
      if (!(!!phrase.id || !!phrase.user_phrase_id)) return;

      state.phrases_routine_list = state.phrases_routine_list.filter(
        p => p != null,
      );
      state.phrases_routine_list = state.phrases_routine_list.filter(
        p => p.idx != phrase.idx,
      );
      state.phrases_routine_list.push(phrase);
    },
    phrasesRoutineRemove: (state, {payload}) => {
      const {phrase = {}} = payload || {};
      if (!(!!phrase.id || !!phrase.user_phrase_id)) return;

      state.phrases_routine_list = state.phrases_routine_list.filter(
        p => p != null,
      );
      state.phrases_routine_list = state.phrases_routine_list.filter(
        p => p.idx != phrase.idx,
      );
    },
    phrasesRoutineSet: (state, {payload}) => {
      const {phrases = []} = payload || {};
      state.phrases_routine_list = phrases;
    },
    phrasesRoutineSave: (state, {payload}) => {
      const {phrases = []} = payload || {};
      state.phrases_routine_list_save_loading = false;
    },
    phrasesRoutineSaveSuccess: (state, {payload}) => {
      const {phrases = []} = payload || {};
      state.phrases_routine_list_save_loading = true;
      state.phrases_routine_id = null;
    },
    phrasesBackgroundUpload: (
      state,
      {payload = {routine_id, background_image}},
    ) => {
      state.phrases_background_upload_loading = true;
    },
    phraseUploadAffirmative: (
      state,
      {payload = {routine_id, background_image}},
    ) => {
      state.phrase_upload_affirmative_loading = true;
    },
    phraseUploadGratitude: (
      state,
      {payload = {routine_id, background_image}},
    ) => {
      console.log({payload});
      state.phrase_upload_gratitude_loading = true;
    },
    phraseUpdate: (state, {payload = {}}) => {
      state.phrase_update_loading = true;
    },
    phraseCreate: (state, {payload = {}}) => {
      state.phrase_create_loading = true;
    },
    phraseDelete: (state, {payload = {}}) => {
      const {phrase = {}} = payload || {};
      state.phrase_delete_loading = true;

      state.phrases_routine_list = state.phrases_routine_list.filter(
        p => p != null,
      );
      state.phrases_routine_list = state.phrases_routine_list.filter(
        p => p.idx != phrase.idx,
      );
    },
  },
});

export const meditationPhraseActions = meditationPhraseSlice.actions;
export const meditationPhraseReducer = meditationPhraseSlice.reducer;
