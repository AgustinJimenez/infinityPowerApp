import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {ProgressCircle} from 'react-native-svg-charts';
import {useSelector} from 'react-redux';
import {tw, twGetTextColor} from 'src/root/tw';

function ActivityProgress() {
  const [parts, setParts] = useState([]);

  const resumen = useSelector(state => state.activity.resumen || {});
  const completed = resumen.completed;
  const total = resumen.total;

  let size = (Math.PI * 2) / total;
  let space = (Math.PI * 2) / 120;

  let percent = 0;
  if (!!total) {
    percent = Math.round((100 / total) * completed);
  }

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
    <View style={tw`relative h-37 w-36`}>
      <View
        style={tw`flex items-center justify-center flex-col h-full w-full `}>
        <Text style={tw`text-4xl text-white font-bold`}>{percent}%</Text>
        <Text style={tw`text-xl text-white `}>
          {completed}/{total}
        </Text>
      </View>
      <View style={tw`absolute  top-0 `}>
        {parts.map((part, key) => (
          <ProgressCircle
            key={key}
            strokeWidth={5}
            style={tw`absolute  top-0 h-37 w-36`}
            progress={1}
            startAngle={part.startAngle}
            endAngle={part.endAngle}
            backgroundColor={'transparent'}
            progressColor={part.color}
          />
        ))}
      </View>
    </View>
  );
}

export default ActivityProgress;
