import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import IconAngleLeft from 'react-native-vector-icons/FontAwesome';
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
    <TouchableOpacity
      onPress={() => navigation.navigate('MeditationPhrasePersonalAffirmation')}
      style={tw` w-16 pl-2 justify-center items-cener`}>
      <IconAngleLeft name="angle-left" size={30} color="#fff" />
    </TouchableOpacity>
  );
};
const RightComponent = ({}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      onPress={() => {
        dispatch(meditationPhraseActions.phraseCreate({}));
        navigation.navigate('MeditationPhrasePersonalAffirmation');
      }}>
      <Text style={tw`text-white text-base text-teal-300`}>Guardar</Text>
    </TouchableOpacity>
  );
};

const PhraseNewAffirmation = () => {
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
  const dispatch = useDispatch();
  const phrase = useSelector(state => state.meditationPhrase.phrase);

  useEffect(() => {
    setAudioAffirmative(phrase_audio_affirmative);
  }, [phrase_audio_affirmative]);

  useEffect(() => {
    setAudioGratitude(phrase_audio_gratitude);
    console.log({phrase_audio_gratitude});
  }, [phrase_audio_gratitude]);

  const audio_affirmative = getAudioAffirmative();
  const audio_gratitude = getAudioGratitude();

  return (
    <Screen scrollEnabled={true} style={tw` flex flex-grow`}>
      <Header
        text={'Crear Nueva Afirmacion'}
        LeftComponent={LeftComponent}
        RightComponent={RightComponent}></Header>
      <ViewX>
        <Text style={tw`text-white text-base`}>Afirmación</Text>
      </ViewX>
      <PhraseRecorder
        is_edited={true}
        text={phrase_text_affirmative}
        onChangeText={text =>
          dispatch(
            meditationPhraseActions.phraseTextAffirmativeSet({
              phrase_text_affirmative: text,
            }),
          )
        }
        audio={!!phrase_audio_affirmative ? audio_affirmative : null}
        onChangeAudio={audio =>
          dispatch(
            meditationPhraseActions.phraseUploadAffirmative({uri: audio}),
          )
        }></PhraseRecorder>
      <ViewX>
        <Text style={tw`text-white text-base`}>Gratitud</Text>
      </ViewX>
      <PhraseRecorder
        is_edited={true}
        text={phrase_text_gratitude}
        onChangeText={text =>
          dispatch(
            meditationPhraseActions.phraseTextGratitudeSet({
              phrase_text_gratitude: text,
            }),
          )
        }
        audio={!!phrase_audio_gratitude ? audio_gratitude : null}
        onChangeAudio={audio =>
          dispatch(meditationPhraseActions.phraseUploadGratitude({uri: audio}))
        }></PhraseRecorder>
    </Screen>
  );
};

export default PhraseNewAffirmation;
