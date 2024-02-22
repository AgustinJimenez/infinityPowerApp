import { STORAGE_URL } from 'src/constants';
import { downloadFile, setAudio } from './audioPlayer';
import { modeType } from './redux';
import { eventChannel, END } from 'redux-saga';

export const loadAndGetPhrases = async ({ routine, mode }) => {
  const phrases_playable = [];
  let i = 0;
  for await (const routine_phrase of routine.user_routine_phrases) {
    const phrase = routine_phrase.user_phrase;

    if (!!routine_phrase.image) {
      await downloadFile('/' + routine_phrase.image);
    }

    if(phrase != null ){
      let path = phrase.audio_affirmative;
      let text = phrase.text_affirmative;

      if (mode == modeType.GRATITUDE) {
        path = phrase.audio_gratitude;
        text = phrase.text_gratitude;
      }

      const audio_url = STORAGE_URL + '/phrase/' + path.replace('phrase/', '');

      try {
        const audio = await setAudio(i, { path, text });
        await audio.sound.setStatusAsync({
          isMuted: false,
        });

        const status = await audio.sound.getStatusAsync();
        phrases_playable.push({
          path,
          text,
          image: routine_phrase.image,
          durationMillis: status.durationMillis,
        });
        // await sound.unloadAsync();
        i++;
      } catch (error) {
        console.log('==> sin audio ', { id: phrase.id, audio_url, error });
      }
    }
  }

  return phrases_playable;
};

export function setOnPlaybackStatusUpdate({ audio, total }) {
  return eventChannel(emitter => {
    let seconds = 0;
    let last_second_aux = 0;

    let isPlaying = false;
    let isMuted = false;

    audio.sound.setOnPlaybackStatusUpdate(async status => {
      if (status.isPlaying != isPlaying || status.isMuted != isMuted) {
        emitter({ status, seconds });
        isPlaying = status.isPlaying;
        isMuted = status.isMuted;
      }

      let second_aux = parseInt(status?.positionMillis / 1000) || 0;

      const diff = second_aux - last_second_aux;

      if(diff > 0){
        seconds = seconds + diff;
      }

      if (status.isLooping && seconds * 1 >= parseInt((total * 1) / 1000) && status?.isPlaying == true) {
        emitter({ status, seconds, end: true });
        await audio.sound.setStatusAsync({
          shouldPlay: false,
          isMuted: false,
          isLooping: false,
          positionMillis: 0,
        });
        return;
      }

      if (status.didJustFinish && !status.isLooping) {
        emitter(END);
        return;
      }

      if (diff > 0) {
        last_second_aux = second_aux;
        emitter({ status, seconds });
      }

      if (diff < 0) {
        last_second_aux = 0;
      }
    });

    // The subscriber must return an unsubscribe function
    return () => {
      seconds = 0;
      last_second_aux = 0;
      console.log('123123123');
    };
  });
}
