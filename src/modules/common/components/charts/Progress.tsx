import React from 'react';
import { Text, View } from 'react-native';
import { ProgressCircle } from 'react-native-svg-charts';
import { twGetTextColor } from 'src/root/tw';
import tw from 'twrnc';
import { ViewY } from '../utils/ViewUtils';

interface ProgressProps {
  percent?: number
  value?: number;
  info?: string;
  title?: string;
  fondo?: boolean;
  icon?: React.ReactNode
}

const Progress = ({ percent, value = 0, info, title, icon, fondo } : ProgressProps) => {
  return (
    <ViewY spacing={1} style={tw`flex items-center`}>
      <View style={tw`flex justify-center items-center w-24 h-24`}>
        <View style={tw`absolute top-0 left-0`}>
          <ProgressCircle
            style={fondo ? tw`w-24 h-24 bg-black rounded-full` : tw`w-24 h-24`}
            strokeWidth={5}
            progress={value / 100}
            progressColor={
            //De 0 a 69% = Rojo de 70 a 100% = Verde
            percent >= 0 && percent <= 69  ? twGetTextColor('text-red-600')
                : percent >= 70 && percent <= 100  ? twGetTextColor('text-green-500') : ''  
            }
          />
        </View>
        {!!icon && <View style={tw`absolute top-0 right-0`}>{icon}</View>}
        <Text style={tw`text-3xl font-extrabold text-white`}>
          {percent ? Math.round(percent) : 0}%
        </Text>
        {!!info && <Text style={tw`text-white text-md  -mt-2`}>{info}</Text>}
      </View>
      {!!title && (
        <View style={tw`bg-black rounded px-2`}>
          <Text style={tw`text-white text-sm font-bold`}>{title}</Text>
        </View>
      )}
    </ViewY>
  );
};

export default Progress;
