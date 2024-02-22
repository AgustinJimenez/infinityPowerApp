import { Audio } from 'expo-av';
import RNFetchBlob from 'rn-fetch-blob';
import { STORAGE_URL } from 'src/constants';

let audios_phrase = [];
audios_phrase.push({
  url: '',
  sound: new Audio.Sound(),
});
audios_phrase.push({
  url: '',
  sound: new Audio.Sound(),
});
audios_phrase.push({
  url: '',
  sound: new Audio.Sound(),
});
audios_phrase.push({
  url: '',
  sound: new Audio.Sound(),
});
audios_phrase.push({
  url: '',
  sound: new Audio.Sound(),
});

let audio_musics = {};
let audio_tones = {};

audio_phrase_affirmative = new Audio.Sound();
audio_phrase_gratitude = new Audio.Sound();

export const getAudiosPhrases = () => {
  return audios_phrase;
};

export const setAudioMusic = async music => {
  let file_name = '/music/' + music.path;
  let path = await downloadFile(file_name);

  let audio_music = audio_musics[music.path] || {
    name: music.name,
    path: music.path,
    sound: new Audio.Sound(),
  };
  audio_music.url = music.path;
  await audio_music.sound.unloadAsync();
  await audio_music.sound.loadAsync({ uri: 'file://' + path });
  audio_musics[music.path] = audio_music;

  return audio_music;
};

export const setAudioTone = async tone => {
  let file_name = '/tone/' + tone.path;
  let path = await downloadFile(file_name);

  let audio_tone = audio_tones[tone.path] || {
    name: tone.name,
    path: tone.path,
    sound: new Audio.Sound(),
  };
  audio_tone.url = tone.path;
  await audio_tone.sound.unloadAsync();
  await audio_tone.sound.loadAsync({ uri: 'file://' + path });
  audio_tones[tone.path] = audio_tone;

  return audio_tone;
};

export const setAudio = async (index, phrase) => {
  let file_name = '/' + phrase.path;
  let path = await downloadFile(file_name);

  audios_phrase[index].url = phrase.path;
  await audios_phrase[index].sound.unloadAsync();
  await audios_phrase[index].sound.loadAsync({ uri: 'file://' + path });

  return audios_phrase[index];
};

export const getAudio = async phrase => {
  let audio = audios_phrase.find(audio_phrase => audio_phrase.url == phrase.path);

  return audio;
};

export const getAudioMusic = async music => {
  return audio_musics[music.path];
};

export const getAudioTone = async tone => {
  return audio_tones[tone.path];
};

export async function downloadFile(file_name) {
  let uri = STORAGE_URL + file_name;

  console.log({ uri });

  let dirs = RNFetchBlob.fs.dirs;
  let path = dirs.DocumentDir + file_name;

  let exists = await RNFetchBlob.fs.exists(path);

  if (!exists) {
    console.log('Descargando');
    let uploaded = await RNFetchBlob.config({
      // response data will be saved to this path if it has access right.
      path: dirs.DocumentDir + file_name,
    }).fetch('GET', uri, {
      //some headers ..
    });
    console.log('Descargado');
  } else {
    console.log('Desde cache');
  }

  return path;
}

export function playListRandom(repeat: any, phrases: any, pause: any) {
  let total = 0;
  let playlist_time = {};
  for (let index = 0; index < repeat; index++) {
    phrases.map((phrase, idx) => {
      total += pause * 1000;
      playlist_time[parseInt(total / 1000)] = { ...phrase, num: idx + phrase.length * index + 1 };
      total += Math.ceil(phrase.durationMillis / 1000) * 1000;
    });
  }
  total += pause * 1000;
  total += pause * 1000;
  return { playlist_time, total };
}

export function playListNormal(repeat: any, phrases: any, pause: any) {
  let total = 0;
  let playlist_time = {};
  phrases.map((phrase, idx) => {
    for (let index = 0; index < repeat; index++) {
      total += pause * 1000;
      playlist_time[Math.ceil(total / 1000)] = { ...phrase, num: index + repeat * idx + 1 };
      total += Math.ceil(phrase.durationMillis / 1000) * 1000;
    }
  });
  total += pause * 1000;
  total += pause * 1000;
  return { playlist_time, total };
}

export const setAudioAffirmative = async path => {
  let file_name = '/' + path;
  path = await downloadFile(file_name);

  await audio_phrase_affirmative.unloadAsync();
  await audio_phrase_affirmative.loadAsync({ uri: 'file://' + path });

  return audio_phrase_affirmative;
};

export const setAudioGratitude = async path => {
  let file_name = '/' + path;
  path = await downloadFile(file_name);

  await audio_phrase_gratitude.unloadAsync();
  await audio_phrase_gratitude.loadAsync({ uri: 'file://' + path });

  return audio_phrase_gratitude;
};

export const getAudioAffirmative = () => {
  return audio_phrase_affirmative;
};

export const getAudioGratitude = () => {
  return audio_phrase_gratitude;
};
