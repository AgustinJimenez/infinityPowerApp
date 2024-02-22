import { View, Text } from 'react-native';
import React from 'react';
import { tw, twGetTextColor } from 'src/root/tw';
import { ViewX } from 'src/modules/common/components/utils/ViewUtils';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';

const HeadIcon = () => (
  <View
    style={[
      tw`w-8 h-8 rounded-full justify-center items-center`,
      { backgroundColor: twGetTextColor("text-teal-400") },
    ]}>
    <Icon name="psychology" size={28} color="#fff" />
  </View>
);

const EmptyIcon = () => (
  <View style={tw`w-8 h-8 rounded-full bg-black bg-opacity-50`}></View>
);

const PhrasesRoutineListCount = () => {
  const phrases_routine_list = useSelector(
    state => state.meditationPhrase.phrases_routine_list || [],
  );

   let count = 0;
   phrases_routine_list.map(routine_phrase => {
    if(routine_phrase != null){
      count++;
    }
  });


  return (
    <ViewX spacing={2}>
      {count > 0 ? <HeadIcon></HeadIcon> : <EmptyIcon></EmptyIcon>}
      {count > 1 ? <HeadIcon></HeadIcon> : <EmptyIcon></EmptyIcon>}
      {count > 2 ? <HeadIcon></HeadIcon> : <EmptyIcon></EmptyIcon>}
      {count > 3 ? <HeadIcon></HeadIcon> : <EmptyIcon></EmptyIcon>}
      {count > 4 ? <HeadIcon></HeadIcon> : <EmptyIcon></EmptyIcon>}
    </ViewX>
  );
};

export default PhrasesRoutineListCount;
