import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux';
import ActivityBell from 'src/modules/activity/components/ActivityBell';
import Header from 'src/modules/common/components/Header';
import Screen from 'src/modules/common/components/Screen';
import { ViewX, ViewY } from 'src/modules/common/components/utils/ViewUtils';
import { tw } from 'src/root/tw';
import RoutineList from '../../routine/components/RoutineList';
import MeditationProgress from '../components/MeditationProgress';

const LeftComponent = ({ }) => {
  const navigation = useNavigation();
  return (
    <ActivityBell></ActivityBell>
  );
};

const RightComponent = ({ }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={tw`pl-4`}
      onPress={() => navigation.navigate('MeditationRoutineAdd')}>
      <Text style={tw`text-white text-3xl`}>+</Text>
    </TouchableOpacity>
  );
};

const Home = ({ navigation }) => {
  const dispatch = useDispatch();

  const onMeditationPress = () => { };

  return (
    <Screen scrollEnabled={true}>
      <Header
        text={'Subconciente'}
        RightComponent={RightComponent}
        LeftComponent={LeftComponent}></Header>
      <TouchableOpacity onPress={onMeditationPress}>
        <MeditationProgress />
      </TouchableOpacity>

      <ViewY spacing={4}>
        <ViewX style={tw`justify-between items-end`}>
          <Text style={tw`text-white text-base`}>Mis Rutinas</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('MeditationPhraseMusic')}>
            <Icon name="music" size={30} color="#fff" />
          </TouchableOpacity>
        </ViewX>

        <RoutineList></RoutineList>
      </ViewY>
    </Screen>
  );
};

export default Home;
