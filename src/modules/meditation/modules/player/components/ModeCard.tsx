import React from 'react';
import { Switch, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CardCollapse from 'src/modules/common/components/CardCollapse';
import CardTitle from 'src/modules/common/components/CardTitle';
import { ViewX, ViewY } from 'src/modules/common/components/utils/ViewUtils';
import { meditationPlayerActions, modeType } from 'src/modules/meditation/modules/player/handlers/redux';
import { tw } from 'src/root/tw';

const RightComponent = (mode) => () => (
  <View style={tw`justify-center`}>
    <Text style={tw`text-white text-sm`}>
      {modeType.AFFIRMATIVE == mode && "Afirmacion"}
      {modeType.GRATITUDE == mode && "Gratitud"}
    </Text>
  </View>
);

const ModeCard = () => {
  const dispatch = useDispatch()
  const mode = useSelector(state => state.meditationPlayer.mode)

  const setMode = (mode) => () => {
    dispatch(meditationPlayerActions.modeSet(mode))
  }

  return (
    <CardCollapse>
      <CardTitle title={'Modo'} RightComponent={RightComponent(mode)}></CardTitle>
      <ViewY spacing={4}>
        <ViewY spacing={2}>
          <ViewX style={tw`justify-between`}>
            <Text style={tw`text-white`}>Afirmacion</Text>
            <Switch value={mode == modeType.AFFIRMATIVE} onChange={setMode(modeType.AFFIRMATIVE)}></Switch>
          </ViewX>
          <ViewX style={tw`justify-between`}>
            <Text style={tw`text-white`}>Gratitud</Text>
            <Switch value={mode == modeType.GRATITUDE} onChange={setMode(modeType.GRATITUDE)}></Switch>
          </ViewX>
        </ViewY>
      </ViewY>
    </CardCollapse>
  );
};

export default ModeCard;
