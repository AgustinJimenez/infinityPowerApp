import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, Text } from 'react-native';
import { tw } from 'src/root/tw';
import { RootNavigationProps } from 'src/root/rootRoutes';

const HeaderRight: React.FC = () => {
  const navigation = useNavigation<RootNavigationProps>();

  const handlePlus = () => {
    navigation.navigate('ObjectiveHabit');
  };

  return (
    <TouchableOpacity
      style={tw`pl-4`}
      onPress={handlePlus}>
      <Text style={tw`text-white text-3xl`}>+</Text>
    </TouchableOpacity>
  );
};

export default HeaderRight;
