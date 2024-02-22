import React from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';

import tw from 'twrnc';

interface ViewXProps {
  children: any;
  style?: StyleProp<ViewStyle>;
  spacing?: number;
}

export const ViewX = ({ 
  children,
  style = null,
  spacing = 0,
  ...props
}: ViewXProps) => {
  let content = children;
  if (children && children.length) {
    content = children.filter(child => !!child).map((child, idx) => {
      return <View key={`${idx}`} style={tw`flex ${idx != 0 ? 'ml-' + spacing : ''} ${child?.props?.style?.flexGrow ? 'flex-grow' : ''}`}>{child}</View>;
    });
  }

  return <View style={[style, tw`flex flex-row`]} {...props}>{content}</View>;
};


export const ViewY = ({ 
  children,
  style = {},
  spacing = 0,
  ...props
}: ViewXProps) => {

  let content = children;
  if (children && children.length) {
    content = children.filter(child => !!child).map((child, idx) => {
      return <View key={`${idx}`} style={tw`flex ${idx != 0 ? 'mt-' + spacing : ''} ${child?.props?.style?.flexGrow ? 'flex-grow' : ''}`}>{child}</View>;
    });
  }

  return <View style={[style, tw`flex flex-col`]} {...props}>{content}</View>;
};

