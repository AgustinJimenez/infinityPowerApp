import React from 'react';
import { Switch, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CardCollapse from 'src/modules/common/components/CardCollapse';
import CardTitle from 'src/modules/common/components/CardTitle';
import { ViewX, ViewY } from 'src/modules/common/components/utils/ViewUtils';
import { tw } from 'src/root/tw';
import { meditationPlayerActions } from '../handlers/redux';

const RightComponent = tone => () =>
  (
    <View style={tw`justify-center`}>
      <Text style={tw`text-white text-sm`}>{tone.name}</Text>
    </View>
  );

const ToneCard = () => {
  const dispatch = useDispatch();
  const tones = useSelector(state => state.meditationRoutine.tones) || [];
  const tone_selected = useSelector(state => state.meditationPlayer.tone) || {};

  const onToneChange = tone => () => {
    dispatch(meditationPlayerActions.toneSet(tone));
  };

  return (
    <CardCollapse>
      <CardTitle title={'Tono'} RightComponent={RightComponent(tone_selected)}></CardTitle>
      <ViewY spacing={2}>
        {tones.map(tone => (
          <ViewX key={tone.id} style={tw`justify-between`}>
            <Text style={tw`text-white`}>{tone.name}</Text>
            <Switch value={tone_selected.id == tone.id} onChange={onToneChange(tone)}></Switch>
          </ViewX>
        ))}
      </ViewY>
    </CardCollapse>
  );
};

export default ToneCard;
