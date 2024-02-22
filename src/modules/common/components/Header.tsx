import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';
import { tw } from 'src/root/tw';
import { ViewX, ViewY } from './utils/ViewUtils';

const Header = ({ text = '', LeftComponent, RightComponent }) => {
  const navigation = useNavigation();

  return (
    <ViewY>
      <ViewX style={tw`justify-between items-center`}>
        <View>{!!LeftComponent && <LeftComponent />}</View>
        <View>{!!RightComponent && <RightComponent />}</View>
      </ViewX>
      {!!text && <ViewX style={tw`justify-center`}>
        <Text style={tw`text-white text-2xl py-2 text-center font-bold`}>{text}</Text>
      </ViewX>}
    </ViewY>
  );
};

export default Header;
