import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux';
import { colors } from 'src/modules/constants/colors';
import { RootNavigationProps } from 'src/root/rootRoutes';
import { tw } from 'src/root/tw';
import { habitObjectiveActions, habitObjectiveSelector } from '../handlers/redux';

const HeaderRight: React.FC = () => {
  const navigation = useNavigation<RootNavigationProps>();
  const dispatch = useAppDispatch();
  const { objective } = useAppSelector(habitObjectiveSelector);

  const handleDone = () => {
    // dispatch(habitObjectiveActions.objectiveCreate(objective));
    navigation.navigate('HomeHabit')
  };

  return (
    <TouchableOpacity style={tw`pl-4`} onPress={handleDone}>
      <Text style={tw`text-[${colors.turquoise}] text-base text-teal-300`}>Guardar</Text>
    </TouchableOpacity>
  );
};

export default HeaderRight;
