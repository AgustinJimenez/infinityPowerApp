import { Slider } from 'react-native-elements';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { convertMsToHM } from 'src/constants';
import Screen from 'src/modules/common/components/Screen';
import { ViewX, ViewY } from 'src/modules/common/components/utils/ViewUtils';
import {
  getAudio,
  getAudioMusic,
  getAudiosPhrases,
  getAudioTone,
} from 'src/modules/meditation/modules/player/handlers/audioPlayer';
import { meditationPlayerActions } from 'src/modules/meditation/modules/player/handlers/redux';
import { meditationRoutineActions } from 'src/modules/meditation/modules/routine/handlers/redux';
import { tw } from 'src/root/tw';

const PlayerScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const route = useRoute();
  const params = route.params;
  const { routine = {} } = params;

  const [background, setBackground] = useState('');
  const [toneVolumenVisible, setToneVolumenVisible] = useState(true);

  const [count, setCount] = useState(0);
  const playList = useSelector(state => state.meditationPlayer.playList);
  const tone = useSelector(state => state.meditationPlayer.tone);
  const music = useSelector(state => state.meditationPlayer.music);
  const total = useSelector(state => state.meditationPlayer.total);
  const backgroundVisible = useSelector(state => state.meditationPlayer.backgroundVisible);
  const status = useSelector(state => state.meditationPlayer.status);
  const seconds = useSelector(state => state.meditationPlayer.seconds);
  const phrase_current = useSelector(state => state.meditationPlayer.phrase_current);

  const audio_volumen = useSelector(state => state.meditationPlayer.audio_volumen);
  const music_volumen = useSelector(state => state.meditationPlayer.music_volumen);
  const tone_volumen = useSelector(state => state.meditationPlayer.tone_volumen);

  const ready = useSelector(state => state.meditationPlayer.ready);

  const [equalizer, setEqualizer] = useState(false);
  useEffect(() => {
    dispatch(meditationPlayerActions.routineSet(routine));
  }, [routine.id]);


  useEffect(() => {
    if (!!ready) {
      dispatch(meditationPlayerActions.play());
    }
  }, [ready]);

  useEffect(() => {
    (async () => {
      const audio_music = await getAudioMusic(music);
      audio_music?.sound?._loaded && (await audio_music.sound.setVolumeAsync(music_volumen));
    })();
  }, [music_volumen]);

  useEffect(() => {
    (async () => {
      const audio_tone = await getAudioTone(tone);
      audio_tone?.sound?._loaded && (await audio_tone.sound.setVolumeAsync(tone_volumen));
    })();
  }, [tone_volumen]);

  const setAudioVolumenAsync = async audioVolumen => {
    const audios_phrase = getAudiosPhrases();
    for await (const audio of audios_phrase) {
      const sound = audio.sound;
      sound?._loaded && (await sound.setVolumeAsync(audioVolumen));
    }
  };

  useEffect(() => {
    if (tone?.name && tone?.name.toLowerCase() == 'normal') {
      setToneVolumenVisible(false);
    }
  }, [tone?.name]);

  useEffect(() => {
    setAudioVolumenAsync(audio_volumen);
  }, [audio_volumen]);

  useEffect(() => {
    if (!!phrase_current.image) {
      setBackground(phrase_current.image);
    }
  }, [phrase_current?.image]);

  useEffect(() => {
    if (!!phrase_current.num) {
      setCount(phrase_current.num);
    }

  }, [phrase_current?.num]);

  useFocusEffect(() => {
    if (phrase_current?.num) {
      setCount(phrase_current.num);
    }
  });

  useEffect(() => {
    let t = setTimeout(() => {
      dispatch(meditationPlayerActions.audioVolumenSet(1));
      dispatch(meditationPlayerActions.musicVolumenSet(0.75));
      dispatch(meditationPlayerActions.toneVolumenSet(0.35));

      console.log('====>fasdfasdf');
    }, 500);
    return () => {
      clearTimeout(t);
      dispatch(meditationPlayerActions.stop());
    };
  }, []);

  useEffect(() => {
    (async () => {
      const audio_tone = await getAudioTone(tone);
      const audios_phrase = getAudiosPhrases();

      if (status.isMuted) {
        audio_tone?.sound?._loaded && (await audio_tone.sound.setIsMutedAsync(true));
        for await (const audio of audios_phrase) {
          const sound = audio.sound;
          sound?._loaded && (await sound.setIsMutedAsync(true));
        }
      } else {
        audio_tone?.sound?._loaded && (await audio_tone.sound.setIsMutedAsync(false));
        for await (const audio of audios_phrase) {
          const sound = audio.sound;
          sound?._loaded && (await sound.setIsMutedAsync(false));
        }
      }
    })();
  }, [status.isMuted]);

  const onMute = async () => {
    const audio_music = await getAudioMusic(music);
    // const audio_current = await getAudio(phrase_current);

    audio_music?.sound?._loaded && (await audio_music.sound.setIsMutedAsync(!status.isMuted));
  };

  const onPlay = async () => {
    if (status.isPlaying) {
      dispatch(meditationPlayerActions.pause());
    } else {
      dispatch(meditationPlayerActions.play());
    }
  };

  // const background = phrase_current.image || routine.image
  return (
    <Screen style={tw`justify-end relative flex-1`} background={backgroundVisible ? background || routine.image : null}>
      <ViewY spacing={6}>
        <ViewX style={tw`px-16 py-12 justify-center`}>
          <Text style={tw`text-white text-center`}>{phrase_current?.text}</Text>
        </ViewX>
        <ViewY spacing={0}>
          <View>
            <Slider value={seconds * 1000} step={1000} maximumValue={total} style={tw`flex-grow`} thumbStyle={{ height: 25, width: 25, backgroundColor: '#fff' }} />
          </View>
          <ViewX style={tw`justify-between`}>
            <ViewY style={tw`justify-center`}>
              <Text style={tw`text-white`}>{convertMsToHM(seconds * 1000 > total ? total : seconds * 1000)}</Text>
            </ViewY>
            <ViewY style={tw`justify-center`}>
              <Text style={tw`text-white`}>{convertMsToHM(total - seconds * 1000)}</Text>
              <Text style={tw`text-white`}>
                {count}/{Object.keys(playList).length}
              </Text>
            </ViewY>
          </ViewX>
        </ViewY>
        <ViewX spacing={6} style={tw`justify-center items-center`}>
          <TouchableOpacity style={tw`h-10 w-10 rounded-full justify-center items-center`} onPress={onMute}>
            {!status.isMuted && <Icon name="volume-up" size={30} color="#fff" />}
            {!!status.isMuted && <Icon name="volume-off" size={30} color="#fff" />}
          </TouchableOpacity>
          <TouchableOpacity
            // disabled={audio_music?.sound?.current?._loaded != true}
            style={tw`h-12 w-12 rounded-full bg-white justify-center items-center`}
            onPress={onPlay}>
            {!status.isPlaying && <Icon name="play-arrow" size={38} color="#333" />}
            {!!status.isPlaying && <Icon name="pause" size={38} color="#333" />}
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`h-10 w-10 rounded-full justify-center items-center`}
            onPress={() => setEqualizer(!equalizer)}
          >
            <Icon name="equalizer" size={30} color="#fff" />
          </TouchableOpacity>
        </ViewX>

        {!!equalizer && (
          <ViewY spacing={6}>
            <ViewX style={tw`w-full items-center`}>
              <View style={tw`w-24`}>
                <Text style={tw`text-white`}>Afirmacion</Text>
              </View>
              <Slider
                testID="audio_volumen"
                onValueChange={value => {
                  console.log({ value, audio_volumen });
                  dispatch(meditationPlayerActions.audioVolumenSet(value));
                }}
                step={0.1}
                value={audio_volumen}
                maximumValue={1}
                style={tw`flex-grow`}
              />
            </ViewX>
            <ViewX style={tw`w-full items-center`}>
              <View style={tw`w-24`}>
                <Text style={tw`text-white`}>Musica</Text>
              </View>
              <Slider
                testID="music_volumen"
                onValueChange={value => dispatch(meditationPlayerActions.musicVolumenSet(value))}
                step={0.1}
                value={music_volumen}
                maximumValue={1}
                style={tw`flex-grow`}
              />
            </ViewX>
            {!!toneVolumenVisible && (
              <ViewX style={tw`w-full items-center`}>
                <View style={tw`w-24`}>
                  <Text style={tw`text-white`}>Tono</Text>
                </View>
                <Slider
                  testID="tone_volumen"
                  onValueChange={value => dispatch(meditationPlayerActions.toneVolumenSet(value))}
                  step={0.1}
                  maximumValue={1}
                  value={tone_volumen}
                  style={tw`flex-grow`}
                />
              </ViewX>
            )}
          </ViewY>
        )}
        
      </ViewY>
    </Screen>
  );
};

export default PlayerScreen;
