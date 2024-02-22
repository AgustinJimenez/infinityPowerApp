import ImagePicker from 'react-native-image-crop-picker';
import {call, put, select, takeEvery, takeLatest} from 'redux-saga/effects';
import {navigation} from 'src/constants';
import {meditationRoutineActions} from '../../routine/handlers/redux';
import {phraseApi} from './api';
import {meditationPhraseActions} from './redux';

function* categoriesSaga({payload}) {
  const token = yield select(state => state.auth.token);
  try {
    const categories_data = yield call(phraseApi(token).categories);

    yield put(
      meditationPhraseActions.categoriesSet({
        categories: categories_data,
      }),
    );
  } catch (error) {
    console.log({error});
  }
}

function* phrasesSaga({payload}) {
  const token = yield select(state => state.auth.token);
  try {
    const phrases_data = yield call(phraseApi(token).phrases);

    yield put(
      meditationPhraseActions.phrasesSet({
        phrases: phrases_data,
      }),
    );
  } catch (error) {
    console.log({error});
  }
}

function* phrasesRoutineSaga({payload}) {
  const token = yield select(state => state.auth.token);

  const {routine = {}} = payload;
  console.log(routine);
  const {user_routine_phrases = []} = routine;
  try {
    const phrases_data = user_routine_phrases.map(routine_phrase => {
      if(routine_phrase.user_phrase != null){
        const {id, phrase_id, ...phrase} = routine_phrase.user_phrase;
        return {
          id: phrase_id,
          user_phrase_id: id,
          idx: !!phrase_id ? phrase_id : '_' + id,
          ...phrase,
        };
      }
    });

    yield put(
      meditationPhraseActions.phrasesRoutineSet({
        phrases: phrases_data,
      }),
    );
    navigation.navigate('MeditationPhraseCategoryList');
  } catch (error) {
    console.log({error});
  }
}

function* phrasesRoutineSaveSaga({payload}) {
  const token = yield select(state => state.auth.token);
  const phrases_routine_list = yield select(
    state => state.meditationPhrase.phrases_routine_list,
  );
  const phrases_routine_id = yield select(
    state => state.meditationPhrase.phrases_routine_id,
  );
  try {
    const phrases = phrases_routine_list.map(
      ({id, user_phrase_id = null, ...phrase}) => {
        return {...phrase, phrase_id: id, id: user_phrase_id};
      },
    );

    console.log({phrases});

    const phrases_data = yield call(phraseApi(token).userRoutinesPhrases, {
      user_routine_id: phrases_routine_id,
      phrases,
    });
    console.log({phrases_data});
    yield put(
      meditationPhraseActions.phrasesRoutineSaveSuccess({
        // phrases: phrases_data,
      }),
    );
    yield put(
      meditationRoutineActions.routines({
        // phrases: phrases_data,
      }),
    );

    navigation.navigate('MeditationHome');
  } catch (error) {
    console.log({error});
  }
}

function* phrasesBackgroundUploadSaga({payload}) {
  const token = yield select(state => state.auth.token);
  try {
    const {routine_id = '', background_image} = payload;
    console.log(payload);
    const data = yield call(routineApi(token).routineBackgroundUpdate, {
      routine_id,
      background_image,
    });

    console.log(data);

    // yield put(meditationRoutineActions.routineCreateSuccess());

    navigation.navigate('MeditationHome');

    yield put(meditationRoutineActions.routines());
  } catch (error) {
    //   yield put(meditationRoutineActions.routineCreateSuccess());
    console.log({error});
  }
}

function* imageGallerySaga({payload}) {
  const token = yield select(state => state.auth.token);
  let images = yield select(state => state.meditationPhrase.images);
  try {
    const {routine_phrase} = payload;
    console.log(payload);
    const image = yield call(ImagePicker.openPicker, {
      width: 300,
      height: 400,
      cropping: true,
    });

    // en caso de que no haya imagen salir
    if (!image?.path) return;

    const path = yield call(phraseApi(token).uploadImage, {image});

    images = {...images, [routine_phrase.id]: path};

    yield put(meditationPhraseActions.imagesSet({images}));
  } catch (error) {
    console.log({error});
  }
}

function* phraseUploadAffirmativeSaga({payload}) {
  const token = yield select(state => state.auth.token);
  try {
    const {uri} = payload;

    const path = yield call(phraseApi(token).uploadAudioAffirmation, {uri});
    console.log('path', path);
    yield put(
      meditationPhraseActions.phraseAudioAffirmativeSet({
        phrase_audio_affirmative: path,
      }),
    );
  } catch (error) {
    //   yield put(meditationRoutineActions.routineCreateSuccess());
    console.log({error});
  }
}
function* phraseUploadGratitudeSaga({payload}) {
  const token = yield select(state => state.auth.token);
  try {
    const {uri} = payload;

    const path = yield call(phraseApi(token).uploadAudioGratitude, {uri});
    console.log('path', path);
    yield put(
      meditationPhraseActions.phraseAudioGratitudeSet({
        phrase_audio_gratitude: path,
      }),
    );
  } catch (error) {
    //   yield put(meditationRoutineActions.routineCreateSuccess());
    console.log({error});
  }
}

function* phraseUpdateSaga({payload}) {
  const token = yield select(state => state.auth.token);
  const phrase = yield select(state => state.meditationPhrase.phrase);
  const phrase_audio_affirmative = yield select(
    state => state.meditationPhrase.phrase_audio_affirmative,
  );
  const phrase_audio_gratitude = yield select(
    state => state.meditationPhrase.phrase_audio_gratitude,
  );
  const phrase_text_affirmative = yield select(
    state => state.meditationPhrase.phrase_text_affirmative,
  );
  const phrase_text_gratitude = yield select(
    state => state.meditationPhrase.phrase_text_gratitude,
  );

  try {
    const data = yield call(phraseApi(token).phraseUpdate, {
      phrase_id: phrase.id,
      audio_affirmative: phrase_audio_affirmative,
      audio_gratitude: phrase_audio_gratitude,
      text_affirmative: phrase_text_affirmative,
      text_gratitude: phrase_text_gratitude,
    });

    console.log(data);

    // yield put(meditationRoutineActions.routineCreateSuccess());

    navigation.goBack();

    yield put(meditationRoutineActions.routines());
  } catch (error) {
    //   yield put(meditationRoutineActions.routineCreateSuccess());
    console.log({error});
  }
}
function* phraseCreateSaga({payload}) {
  const token = yield select(state => state.auth.token);
  const phrase_audio_affirmative = yield select(
    state => state.meditationPhrase.phrase_audio_affirmative,
  );
  const phrase_audio_gratitude = yield select(
    state => state.meditationPhrase.phrase_audio_gratitude,
  );
  const phrase_text_affirmative = yield select(
    state => state.meditationPhrase.phrase_text_affirmative,
  );
  const phrase_text_gratitude = yield select(
    state => state.meditationPhrase.phrase_text_gratitude,
  );

  try {
    const data = yield call(phraseApi(token).phraseCreate, {
      audio_affirmative: phrase_audio_affirmative,
      audio_gratitude: phrase_audio_gratitude,
      text_affirmative: phrase_text_affirmative,
      text_gratitude: phrase_text_gratitude,
    });

    console.log(data);

    yield put(meditationPhraseActions.phrases());

    navigation.goBack();

    yield put(meditationRoutineActions.routines());
  } catch (error) {
    //   yield put(meditationRoutineActions.routineCreateSuccess());
    console.log({error});
  }
}
function* phraseDeleteSaga({payload}) {
  const token = yield select(state => state.auth.token);
  console.log({payload});
  try {
    const data = yield call(phraseApi(token).phraseDelete, {
      user_routine_id: payload.phrase.user_routine_id,
      user_phrase_id: payload.phrase.user_phrase_id
    });

    console.log(data);

    yield put(meditationPhraseActions.phrases());
    yield put(meditationRoutineActions.routines());
  } catch (error) {
    //   yield put(meditationRoutineActions.routineCreateSuccess());
    console.log({error});
  }
}

export function* meditationPhraseSagas() {
  yield takeEvery(meditationPhraseActions.categories.type, categoriesSaga);
  yield takeEvery(meditationPhraseActions.phrases.type, phrasesSaga);
  yield takeEvery(
    meditationPhraseActions.phrasesRoutine.type,
    phrasesRoutineSaga,
  );
  yield takeEvery(
    meditationPhraseActions.phrasesRoutineSave.type,
    phrasesRoutineSaveSaga,
  );
  yield takeEvery(
    meditationPhraseActions.phrasesBackgroundUpload.type,
    phrasesBackgroundUploadSaga,
  );
  yield takeEvery(meditationPhraseActions.imageGallery.type, imageGallerySaga);
  yield takeEvery(
    meditationPhraseActions.phraseUploadAffirmative.type,
    phraseUploadAffirmativeSaga,
  );
  yield takeEvery(
    meditationPhraseActions.phraseUploadGratitude.type,
    phraseUploadGratitudeSaga,
  );
  yield takeLatest(meditationPhraseActions.phraseUpdate.type, phraseUpdateSaga);
  yield takeLatest(meditationPhraseActions.phraseCreate.type, phraseCreateSaga);
  yield takeLatest(meditationPhraseActions.phraseDelete.type, phraseDeleteSaga);
}
