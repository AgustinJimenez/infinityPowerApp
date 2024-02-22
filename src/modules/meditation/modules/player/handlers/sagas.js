import { Audio } from 'expo-av';
import { call, put, select, take, takeEvery } from 'redux-saga/effects';
import { loadAndGetPhrases, setOnPlaybackStatusUpdate } from './audioApi';
import {
  downloadFile,
  getAudio,
  getAudioAffirmative,
  getAudioMusic,
  getAudioTone,
  playListNormal,
  playListRandom,
  setAudioMusic,
  setAudioTone,
} from './audioPlayer';
import { meditationPlayerActions, modeType } from './redux';
import { getAudiosPhrases } from './audioPlayer';
import { navigation } from 'src/constants';
import { meditationRoutineActions } from '../../routine/handlers/redux';

function* routineSetSaga({ payload }) {
  try {
    const routine = payload;
    console.log('===> desde saga player',  routine.user_routine_phrases );

    yield call(async () => {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        staysActiveInBackground: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        shouldDuckAndroid: false,
        playThroughEarpieceAndroid: false,
        allowsRecordingIOS: false,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
      });
    });

    const musics = yield select(state => state.meditationRoutine.musics) || [];
    const music_selected = yield select(state => state.meditationPlayer.music) || {};
    const tones = yield select(state => state.meditationRoutine.tones) || [];
    const tone_selected = yield select(state => state.meditationPlayer.tone) || {};

    if (!music_selected?.id) {
      yield put(meditationPlayerActions.musicSet(musics[0]));
    }
    if (!tone_selected?.id) {
      yield put(meditationPlayerActions.toneSet(tones[0]));
    }

    if (!!routine.image) {
      const image = yield call(downloadFile, '/' + routine.image);
      console.log({ image });
    }

    let phrases_gratitude = yield call(loadAndGetPhrases, {
      routine,
      mode: modeType.GRATITUDE,
    });

    let phrases_affirmative = yield call(loadAndGetPhrases, {
      routine,
      mode: modeType.AFFIRMATIVE,
    });

    yield put(meditationPlayerActions.phrasesGratitudeSet(phrases_gratitude));
    yield put(meditationPlayerActions.phrasesAffirmativeSet(phrases_affirmative));
    yield put(meditationPlayerActions.phrasesSet(phrases_affirmative));

    yield put(meditationPlayerActions.readySet(true));
  } catch (e) {
    console.log(e);
  }
}

function* preparePlayList({ payload }) {
  const aleatorio = yield select(state => state.meditationPlayer.aleatorio);
  const repeat = yield select(state => state.meditationPlayer.repeat);
  const pause = yield select(state => state.meditationPlayer.pause);
  const phrases = yield select(state => state.meditationPlayer.phrases);

  const music_selected = yield select(state => state.meditationPlayer.music) || {};

  try {
    yield call(async () => {
      const audio_music = await getAudioMusic(music_selected);
      await audio_music?.sound?.stopAsync();
    });

    let info = {};
    if (aleatorio) {
      info = playListRandom(repeat, phrases, pause);
    } else {
      info = playListNormal(repeat, phrases, pause);
    }

    let { playlist_time, total } = info;

    Object.keys(playlist_time).map(time => {
      console.log(playlist_time[time]);
    });

    yield put(meditationPlayerActions.playListSet(playlist_time));
    yield put(meditationPlayerActions.totalSet(total));
    yield put(meditationPlayerActions.preparePlay());
  } catch (e) {
    console.log(e);
  }
}

function* musicSetSaga({ payload }) {
  const music_selected = yield select(state => state.meditationPlayer.music) || {};

  try {
    if (!!music_selected?.id) {
      yield call(setAudioMusic, music_selected);
    }
  } catch (e) {
    console.log(e);
  }
}

function* toneSetSaga({ payload }) {
  const tone_selected = yield select(state => state.meditationPlayer.tone) || {};

  try {
    if (!!tone_selected?.id) {
      yield call(setAudioTone, tone_selected);
    }
  } catch (e) {
    console.log(e);
  }
}

function* preparePlaySaga({ payload }) {
  const music = yield select(state => state.meditationPlayer.music) || {};
  const total = yield select(state => state.meditationPlayer.total) || {};
  const routine = yield select(state => state.meditationPlayer.routine) || {};

  try {
    // limpiamos para comenzar la reproduccion
    yield put(meditationPlayerActions.phraseCurrentSet({}));
    yield put(meditationPlayerActions.secondsSet(0));
    yield put(meditationPlayerActions.audioVolumenSet(1));
    yield put(meditationPlayerActions.musicVolumenSet(0.75));
    yield put(meditationPlayerActions.toneVolumenSet(0.35));

    const audio_music = yield call(getAudioMusic, music);

    const chan = yield call(setOnPlaybackStatusUpdate, { audio: audio_music, total });
    try {
      while (true) {
        // take(END) will cause the saga to terminate by jumping to the finally block
        let { status, seconds, end } = yield take(chan);
        yield put(meditationPlayerActions.secondsSet(seconds));
        yield put(meditationPlayerActions.statusSet(status));

        if (!!end) {
          yield put(meditationRoutineActions.routineExecuted({ routine }));
        }
      }
    } finally {
      yield call(async () => {
        await audio_music.sound.stopAsync();
      });
      console.log('countdown terminated');
    }
  } catch (e) {
    console.log(e);
  }
}

function* playSaga({ payload }) {
  const music = yield select(state => state.meditationPlayer.music) || {};
  const tone = yield select(state => state.meditationPlayer.tone) || {};
  const phrase_current = yield select(state => state.meditationPlayer.phrase_current) || {};

  try {
    yield call(async () => {
      const audio_music = await getAudioMusic(music);
      await audio_music?.sound?.setStatusAsync({
        shouldPlay: true,
        isMuted: false,
        isLooping: true,
      });

      const audio_tone = await getAudioTone(tone);
      await audio_tone?.sound?.setStatusAsync({
        shouldPlay: true,
        isMuted: false,
        isLooping: true,
      });

      if (phrase_current.path) {
        let audio = await getAudio(phrase_current);
        await audio?.sound?.playAsync();
      }
    });
  } catch (e) {
    console.log(e);
  }
}

function* stopSaga({ payload }) {
  const music = yield select(state => state.meditationPlayer.music) || {};
  const tone = yield select(state => state.meditationPlayer.tone) || {};

  try {
    yield call(async () => {
      const audio_music = await getAudioMusic(music);
      const audio_tone = await getAudioTone(tone);

      await audio_music?.sound?.setStatusAsync({
        shouldPlay: false,
        isMuted: false,
        isLooping: false,
        positionMillis: 0,
      });
      await audio_tone?.sound?.setStatusAsync({
        shouldPlay: false,
        isMuted: false,
        isLooping: false,
        positionMillis: 0,
      });

      const audios_phrase = await getAudiosPhrases();
      for await (const audio of audios_phrase) {
        const sound = audio.sound;
        sound?._loaded && (await sound.setIsMutedAsync(true));
      }
    });
  } catch (e) {
    console.log(e);
  }
}

function* pauseSaga({ payload }) {
  const music = yield select(state => state.meditationPlayer.music) || {};
  const tone = yield select(state => state.meditationPlayer.tone) || {};
  const phrase_current = yield select(state => state.meditationPlayer.phrase_current) || {};

  try {
    yield call(async () => {
      const audio_music = await getAudioMusic(music);
      await audio_music?.sound?.pauseAsync();

      const audio_tone = await getAudioTone(tone);
      await audio_tone?.sound?.pauseAsync();

      if (phrase_current.path) {
        let audio = await getAudio(phrase_current);
        await audio?.sound?.pauseAsync();
      }
    });
  } catch (e) {
    console.log(e);
  }
}

function* changeModeSaga({ payload }) {
  const mode = yield select(state => state.meditationPlayer.mode) || {};
  const routine = yield select(state => state.meditationPlayer.routine) || {};

  try {
    if (mode == modeType.GRATITUDE) {
      let phrases_gratitude = yield call(loadAndGetPhrases, {
        routine,
        mode: modeType.GRATITUDE,
      });
      yield put(meditationPlayerActions.phrasesSet(phrases_gratitude));
    } else {
      let phrases_affirmative = yield call(loadAndGetPhrases, {
        routine,
        mode: modeType.AFFIRMATIVE,
      });
      yield put(meditationPlayerActions.phrasesSet(phrases_affirmative));
    }
  } catch (e) {
    console.log(e);
  }
}

function* preparePhraseSaga({ payload }) {
  const seconds = yield select(state => state.meditationPlayer.seconds) || {};
  const playList = yield select(state => state.meditationPlayer.playList) || {};
  const phrase_current = yield select(state => state.meditationPlayer.phrase_current) || {};

  try {
    let phrase = playList[seconds] || {};
    // si hay phrase y no hay phrase current
    // se actualiza phrase_current
    if (phrase.path && !phrase_current.path) {
      let end = seconds + Math.ceil(phrase.durationMillis / 1000);
      let start = seconds;
      yield put(meditationPlayerActions.phraseCurrentSet({ ...phrase, start, end }));

      yield call(async () => {
        try {
          let audio = await getAudio(phrase);
          audio?.sound &&
            (await audio.sound.setStatusAsync({
              shouldPlay: true,
              positionMillis: 0,
            }));
        } catch (error) {
          console.log({ error });
        }
      });
    }

    // cuando termina la phrase se limpia
    if (phrase_current.path && phrase_current.end <= seconds) {
      yield put(meditationPlayerActions.phraseCurrentSet({}));
      yield call(async () => {
        try {
          let audio = await getAudio(phrase_current);
        } catch (error) {
          console.log({ error });
        }
      });
    }

    console.log({ seconds, start: phrase_current.start, end: phrase_current.end });
  } catch (e) {
    console.log(e);
  }
}

export function* meditationPlayerSagas() {
  // Player
  yield takeEvery(meditationPlayerActions.preparePlay.type, preparePlaySaga);
  yield takeEvery(meditationPlayerActions.play.type, playSaga);
  yield takeEvery(meditationPlayerActions.stop.type, stopSaga);
  yield takeEvery(meditationPlayerActions.pause.type, pauseSaga);
  yield takeEvery(meditationPlayerActions.preparePlay.type, preparePlaySaga);
  // Config
  yield takeEvery(meditationPlayerActions.routineSet.type, routineSetSaga);
  yield takeEvery(meditationPlayerActions.aleatorioSet.type, preparePlayList);
  yield takeEvery(meditationPlayerActions.repeatSet.type, preparePlayList);
  yield takeEvery(meditationPlayerActions.pauseSet.type, preparePlayList);
  yield takeEvery(meditationPlayerActions.phrasesSet.type, preparePlayList);
  //
  yield takeEvery(meditationPlayerActions.modeSet.type, changeModeSaga);
  //
  yield takeEvery(meditationPlayerActions.musicSet.type, musicSetSaga);
  yield takeEvery(meditationPlayerActions.musicSet.type, preparePlaySaga);
  yield takeEvery(meditationPlayerActions.toneSet.type, toneSetSaga);
  yield takeEvery(meditationPlayerActions.toneSet.type, preparePlaySaga);
  //
  yield takeEvery(meditationPlayerActions.secondsSet.type, preparePhraseSaga);
}
