import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import ButtonPill from 'src/modules/common/components/ButtonPill';
import Header from 'src/modules/common/components/Header';
import Screen from 'src/modules/common/components/Screen';
import { ViewX } from 'src/modules/common/components/utils/ViewUtils';
import { tw } from 'src/root/tw';
import PhrasesBackgroundUpload from '../../phrase/components/PhraseBackgroundUpload';
import RoutineBackgroundUpload from '../components/RoutineBackgroundUpload';
import { meditationRoutineActions } from '../handlers/redux';

const LeftComponent = ({ }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('MeditationHome')}>
      <Text style={tw`text-white text-base text-teal-300`}>Cancelar</Text>
    </TouchableOpacity>
  );
};
const RightComponent = ({ routine }) => ({ }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      onPress={() => dispatch(meditationRoutineActions.routineBackgroundUpdate({ routine_id: routine.id }))}>
      <Text style={tw`text-white text-base text-teal-300`}>Guardar</Text>
    </TouchableOpacity>
  );
};

const RoutineBackground = ({ navigation, route }) => {
  const [tab, setTab] = useState(0);

  const { routine = {} } = route.params



  return (
    <Screen scrollEnabled={false} style={tw` flex flex-grow`}>
      <Header
        text={'Imágenes de fondo'}
        LeftComponent={LeftComponent}
        RightComponent={RightComponent({ routine })}></Header>

      <View style={tw`items-center `}>
        <Text style={tw`text-white text-base justify-center`}>
          {routine.name}
        </Text>
      </View>
      <ViewX spacing={2}>

        <ButtonPill
          active={tab == 0}
          onPress={() => {
            setTab(0);
          }}>
          Rutina
        </ButtonPill>
        <ButtonPill
          active={tab == 1}
          onPress={() => {
            setTab(1);
          }}>
          Afirmacion
        </ButtonPill>
      </ViewX>
      {tab == 0 && <View style={tw`justify-center items-center flex flex-grow`}>
        <RoutineBackgroundUpload routine={routine} ></RoutineBackgroundUpload>
      </View>}
      {tab == 1 && <View style={tw` flex flex-grow w-full`}>
        <PhrasesBackgroundUpload user_routine_phrases={routine.user_routine_phrases} ></PhrasesBackgroundUpload>
      </View>}
    </Screen>
  );
};

export default RoutineBackground;
