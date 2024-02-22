import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Header from 'src/modules/common/components/Header';
import Screen from 'src/modules/common/components/Screen';
import {ViewX} from 'src/modules/common/components/utils/ViewUtils';
import {tw} from 'src/root/tw';
import {
  getAudioAffirmative,
  getAudioGratitude,
  setAudioAffirmative,
  setAudioGratitude,
} from '../../player/handlers/audioPlayer';
import PhraseRecorder from '../components/PhraseRecorder';
import {meditationPhraseActions} from '../handlers/redux';

const LeftComponent = ({}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('MeditationHome')}>
      <Text style={tw`text-white text-base text-teal-300`}>Cancelar</Text>
    </TouchableOpacity>
  );
};
const RightComponent = ({}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      onPress={() => {
        dispatch(meditationPhraseActions.phraseUpdate({}));
        navigation.navigate('MeditationHome');
      }}>
      <Text style={tw`text-white text-base text-teal-300`}>Guardar</Text>
    </TouchableOpacity>
  );
};
const PhraseCustomScreen = () => {
  const dispatch = useDispatch();

  const phrase_text_affirmative = useSelector(
    state => state.meditationPhrase.phrase_text_affirmative,
  );
  const phrase_text_gratitude = useSelector(
    state => state.meditationPhrase.phrase_text_gratitude,
  );
  const phrase_audio_affirmative = useSelector(
    state => state.meditationPhrase.phrase_audio_affirmative,
  );
  const phrase_audio_gratitude = useSelector(
    state => state.meditationPhrase.phrase_audio_gratitude,
  );
  const phrase = useSelector(state => state.meditationPhrase.phrase);

  console.log({phrase});

  useEffect(() => {
    setAudioAffirmative(phrase_audio_affirmative);
  }, [phrase_audio_affirmative]);

  useEffect(() => {
    setAudioGratitude(phrase_audio_gratitude);
  }, [phrase_audio_gratitude]);

  const audio_affirmative = getAudioAffirmative();
  const audio_gratitude = getAudioGratitude();

  const allowAffirmativeReset =
    phrase.audio_affirmative != phrase_audio_affirmative ||
    phrase.text_affirmative != phrase_text_affirmative;

  const {is_edited = false} = phrase;

  return (
    <Screen scrollEnabled={true} style={tw` flex flex-grow`}>
      <Header
        text={'Personalizar afirmación'}
        LeftComponent={LeftComponent}
        RightComponent={RightComponent}></Header>
      <ViewX>
        <Text style={tw`text-white text-base`}>Afirmación</Text>
      </ViewX>
      <PhraseRecorder
        is_edited={
          is_edited > 0 ||
          phrase_audio_affirmative != phrase.audio_affirmative ||
          phrase_text_affirmative != phrase.text_affirmative
        }
        allowReset={allowAffirmativeReset}
        // onPressReset={dispatch(
        //   meditationPhraseActions.phraseAffirmativeReset({}),
        // )}
        text={phrase_text_affirmative}
        textRecord={
          phrase_audio_affirmative == phrase.audio_affirmative
            ? 'Grabar con mi voz'
            : 'Grabar nuevamente'
        }
        onChangeText={text =>
          dispatch(
            meditationPhraseActions.phraseTextAffirmativeSet({
              phrase_text_affirmative: text,
            }),
          )
        }
        audio={audio_affirmative}
        onChangeAudio={audio =>
          dispatch(
            meditationPhraseActions.phraseUploadAffirmative({uri: audio}),
          )
        }></PhraseRecorder>
      <ViewX>
        <Text style={tw`text-white text-base`}>Gratitud</Text>
      </ViewX>
      <PhraseRecorder
        is_edited={
          is_edited > 0 ||
          phrase_audio_gratitude != phrase.audio_gratitude ||
          phrase_text_gratitude != phrase.text_gratitude
        }
        text={phrase_text_gratitude}
        textRecord={
          phrase_audio_gratitude == phrase.audio_gratitude
            ? 'Grabar con mi voz'
            : 'Grabar nuevamente'
        }
        onChangeText={text =>
          dispatch(
            meditationPhraseActions.phraseTextGratitudeSet({
              phrase_text_gratitude: text,
            }),
          )
        }
        audio={audio_gratitude}
        onChangeAudio={audio =>
          dispatch(meditationPhraseActions.phraseUploadGratitude({uri: audio}))
        }></PhraseRecorder>
    </Screen>
  );
};

export default PhraseCustomScreen;
