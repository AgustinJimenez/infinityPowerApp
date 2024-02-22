import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import tw from 'twrnc';
import { ViewY } from './utils/ViewUtils';

export interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  spacing?: number;
}

const Card = ({ children, style = {}, spacing = 2 }) => {
  return (
    <ViewY spacing={spacing} style={[tw`p-4 rounded-xl `, style]}>
      {children}
    </ViewY>
  );
};

export default Card;
