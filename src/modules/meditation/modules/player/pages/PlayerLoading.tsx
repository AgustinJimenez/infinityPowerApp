import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Screen from 'src/modules/common/components/Screen';
import { ViewY } from 'src/modules/common/components/utils/ViewUtils';
import { tw } from 'src/root/tw';
import { meditationPlayerActions } from '../handlers/redux';

const PlayerLoading = ({ navigation }) => {
  const dispatch = useDispatch();

  const route = useRoute();
  const params = route.params;
  const { routine = {} } = params;

  const ready = useSelector(state => state.meditationPlayer.ready);

  useEffect(() => {
    dispatch(meditationPlayerActions.routineSet(routine));
  }, [routine.id]);

  useEffect(() => {
    if (!!ready) {
      dispatch(meditationPlayerActions.play());
      navigation.replace('MeditationPlayer', { routine });
    }
  }, [ready]);

  return (
    <Screen>
      <ViewY style={tw`justify-center justify-center items-center h-full`}>
        <Text style={tw`text-white text-xl`}>Preparando {routine.name}</Text>
      </ViewY>
    </Screen>
  );
};

export default PlayerLoading;
