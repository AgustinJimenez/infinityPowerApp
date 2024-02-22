import ImagePicker from 'react-native-image-crop-picker';
import {call, put, select, takeEvery, takeLatest} from 'redux-saga/effects';
import {navigation} from 'src/constants';
import {activityActions} from 'src/modules/activity/handlers/redux';
import {phraseApi} from '../../phrase/handlers/api';
import {setAudioMusic, setAudioTone} from '../../player/handlers/audioPlayer';
import {routineApi} from './api';
import {meditationRoutineActions} from './redux';

function* routineCreateSaga({payload}) {
  const token = yield select(state => state.auth.token);
  try {
    const {name = ''} = payload;
    const data = yield call(routineApi(token).create, {name});

    navigation.navigate('MeditationHome');

    yield put(meditationRoutineActions.routineCreateSuccess());

    yield put(meditationRoutineActions.routines());
  } catch (error) {
    yield put(meditationRoutineActions.routineCreateSuccess());
    console.log({error});
  }
}

function* routineUpdateSaga({payload}) {
  const token = yield select(state => state.auth.token);
  try {
    const {name = ''} = payload;
    const {id = ''} = payload;
    const data = yield call(routineApi(token).routineUpdate, {name, id});

    yield put(meditationRoutineActions.routines());
  } catch (error) {
    yield put(meditationRoutineActions.routineCreateSuccess());
    console.log({error});
  }
}

function* routineDeleteSaga({payload}) {
  const token = yield select(state => state.auth.token);
  try {
    const data = yield call(routineApi(token).routineDelete, payload);
    yield put(meditationRoutineActions.routines());
  } catch (error) {
    console.log({error});
  }
}

function* routineExecutedSaga({payload}) {
  const token = yield select(state => state.auth.token);
  try {
    const {routine = {}} = payload;
    const data = yield call(routineApi(token).routineExecuted, {routine});
    console.log('Routine Complete');
    navigation.navigate('MeditationHome');

    yield put(meditationRoutineActions.routines());
    yield put(activityActions.resumen());
    yield put(activityActions.pending());
  } catch (error) {
    yield put(meditationRoutineActions.routineCreateSuccess());
    console.log({error});
  }
}

function* routineSetActiveSaga({payload}) {
  const token = yield select(state => state.auth.token);
  try {
    const {routine = {}} = payload;
    const data = yield call(routineApi(token).routineSetActive, {routine});

    yield put(meditationRoutineActions.routineCreateSuccess());

    yield put(meditationRoutineActions.routines());
  } catch (error) {
    yield put(meditationRoutineActions.routineCreateSuccess());
    console.log({error});
  }
}

function* routineSetDeactiveSaga({payload}) {
  const token = yield select(state => state.auth.token);
  try {
    const {routine = {}} = payload;
    const data = yield call(routineApi(token).routineSetDeactive, {routine});

    yield put(meditationRoutineActions.routineCreateSuccess());

    yield put(meditationRoutineActions.routines());
  } catch (error) {
    yield put(meditationRoutineActions.routineCreateSuccess());
    console.log({error});
  }
}

function* routinesSaga({payload}) {
  const token = yield select(state => state.auth.token);
  try {
    const data = yield call(routineApi(token).routines);
    yield put(meditationRoutineActions.setRoutines({routines: data}));
  } catch (error) {
    console.log({error});
  }
}

function* tonesSaga({payload}) {
  const token = yield select(state => state.auth.token);
  try {
    const data = yield call(routineApi(token).tones);
    for (let index = 0; index < data.length; index++) {
      const tone = data[index];
      yield call(setAudioTone, tone);
    }
    yield put(meditationRoutineActions.setTones({tones: data}));

    setAudioTone;
  } catch (error) {
    console.log({error});
  }
}

function* musicsSaga({payload}) {
  const token = yield select(state => state.auth.token);
  try {
    const data = yield call(routineApi(token).musics);
    for (let index = 0; index < data.length; index++) {
      const music = data[index];
      yield call(setAudioMusic, music);
    }
    yield put(meditationRoutineActions.setMusics({musics: data}));
  } catch (error) {
    console.log({error});
  }
}

function* routineBackgroundUpdateSaga({payload}) {
  const token = yield select(state => state.auth.token);
  const image = yield select(state => state.meditationRoutine.image);
  const images = yield select(state => state.meditationPhrase.images);

  try {
    const {routine_id = ''} = payload;
    console.log(payload);
    const data = yield call(routineApi(token).routineBackgroundUpdate, {
      routine_id,
      background_image: image,
    });

    console.log(data);

    const phrases_ids = Object.keys(images);
    for (let index = 0; index < phrases_ids.length; index++) {
      const id = phrases_ids[index];
      const image = images[id];

      const data = yield call(phraseApi(token).phraseBackgroundUpdate, {
        routine_phrase_id: id,
        background_image: image,
      });

      console.log(data);
    }

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

    const path = yield call(routineApi(token).uploadImage, {image});

    yield put(meditationRoutineActions.imageSet({image: path}));
  } catch (error) {
    console.log({error});
  }
}

export function* meditationRoutineSagas() {
  yield takeEvery(meditationRoutineActions.routines.type, routinesSaga);
  yield takeEvery(
    meditationRoutineActions.routineSetActive.type,
    routineSetActiveSaga,
  );
  yield takeEvery(meditationRoutineActions.routineDelete.type, routineDeleteSaga);
  yield takeEvery(
    meditationRoutineActions.routineSetDeactive.type,
    routineSetDeactiveSaga,
  );

  yield takeEvery(
    meditationRoutineActions.routineUpdate.type,
    routineUpdateSaga,
  );

  yield takeEvery(meditationRoutineActions.tones.type, tonesSaga);
  yield takeEvery(meditationRoutineActions.musics.type, musicsSaga);
  yield takeEvery(meditationRoutineActions.musics.type, musicsSaga);
  yield takeEvery(
    meditationRoutineActions.routineBackgroundUpdate.type,
    routineBackgroundUpdateSaga,
  );
  yield takeEvery(
    meditationRoutineActions.routineCreate.type,
    routineCreateSaga,
  );
  yield takeLatest(
    meditationRoutineActions.routineExecuted.type,
    routineExecutedSaga,
  );
  yield takeEvery(meditationRoutineActions.imageGallery.type, imageGallerySaga);
}
