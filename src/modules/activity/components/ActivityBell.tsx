import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ProgressCircle } from 'react-native-svg-charts';
import NotificationIcon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { tw, twGetTextColor } from 'src/root/tw';

const ActivityBell = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const resumen = useSelector(state => state.activity.resumen || {});

  const completed = resumen.completed;
  const total = resumen.total;

  const [parts, setParts] = useState([]);
  let size = (Math.PI * 2) / total;
  let space = (Math.PI * 2) / 120;

  useEffect(() => {
    let parts = [];
    for (let i = 0; i < total; i++) {
      let part = {
        startAngle: size * i + space,
        endAngle: size * (i + 1) - space,
        color: i < completed ? twGetTextColor('text-green-500') : '#FFFFFF',
      };
      parts.push(part);
    }

    setParts(parts);
  }, [completed]);

  return (
    <TouchableOpacity onPress={() => navigation.navigate('ActivityToday')}>
      <View style={tw`relative h-14 w-15`}>
        <View
          style={tw`absolute right-3 top-3 rounded-full bg-white w-5 h-5 border border-black z-10 justify-center items-center`}>
          <Text style={tw`text-xs text-center text-black`}>{resumen.pending}</Text>
        </View>
        <View style={tw`absolute  top-0 left-0 flex h-14 w-14 items-center justify-center flex-row h-full w-full`}>
          <NotificationIcon name={'notifications'} size={32} color="#fff" />
        </View>
        <View style={tw`w-14 h-14`}>
          {parts.map((part, key) => (
            <ProgressCircle
              key={key}
              strokeWidth={3}
              style={tw`absolute top-0 left-0 h-14 w-15`}
              progress={1}
              startAngle={part.startAngle}
              endAngle={part.endAngle}
              backgroundColor={'transparent'}
              progressColor={part.color}
            />
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ActivityBell;
