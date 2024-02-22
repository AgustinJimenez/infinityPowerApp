import { useNavigation, useRoute } from '@react-navigation/native';
import { Audio } from 'expo-av';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { STORAGE_URL } from 'src/constants';
import Header from 'src/modules/common/components/Header';
import Screen from 'src/modules/common/components/Screen';
import { ViewX, ViewY } from 'src/modules/common/components/utils/ViewUtils';
import { setAudio } from 'src/modules/meditation/modules/player/handlers/audioPlayer';
import { meditationPlayerActions, modeType } from 'src/modules/meditation/modules/player/handlers/redux';
import { tw } from 'src/root/tw';
import ModeCard from '../components/ModeCard';
import MusicCard from '../components/MusicCard';
import OtherCard from '../components/OtherCard';
import TimeCard from '../components/TimeCard';
import ToneCard from '../components/ToneCard';

const PlayerConfiguration = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params;
  const { routine = {} } = params;

  const mode = useSelector(state => state.meditationPlayer.mode);

  const phrases_affirmative = useSelector(state => state.meditationPlayer.phrases_affirmative);
  const phrases_gratitude = useSelector(state => state.meditationPlayer.phrases_gratitude);

  const [phrases, setPhrases] = useState([]);

  useEffect(() => {
    (async () => {
      let phrases_playable = phrases_affirmative;
      if (mode == modeType.GRATITUDE) {
        phrases_playable = phrases_gratitude;
      }

      setPhrases(phrases_playable);

    })();

    return () => {};
  }, [mode]);

  useEffect(() => {
    dispatch(meditationPlayerActions.stop());
  }, []);

  return (
    <Screen style={tw`justify-end flex-1`} scrollEnabled={true}>
      <Header text={routine.name}></Header>
      <ViewX style={tw`justify-center`}>
        <TouchableOpacity
          style={tw`w-12 h-12 bg-white rounded-full justify-center items-center`}
          onPress={() => {
            dispatch(meditationPlayerActions.readySet(false));
            navigation.navigate('MeditationPlayer', { routine });
          }}
>
          <Icon name="play-arrow" size={48} color="#333" />
        </TouchableOpacity>
      </ViewX>
      <ViewY spacing={6}>
        <TimeCard phrases={phrases}></TimeCard>
        <MusicCard></MusicCard>
        <ToneCard></ToneCard>
        <ModeCard></ModeCard>
        <OtherCard></OtherCard>
      </ViewY>
    </Screen>
  );
};

export default PlayerConfiguration;
