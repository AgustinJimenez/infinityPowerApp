import React from 'react';
import { Switch, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CardCollapse from 'src/modules/common/components/CardCollapse';
import CardTitle from 'src/modules/common/components/CardTitle';
import { ViewX, ViewY } from 'src/modules/common/components/utils/ViewUtils';
import { tw } from 'src/root/tw';
import { meditationPlayerActions } from '../handlers/redux';

const RightComponent = music => () =>
  (
    <View style={tw`justify-center`}>
      <Text style={tw`text-white text-sm`}>{music.name}</Text>
    </View>
  );

const MusicCard = () => {
  const dispatch = useDispatch();
  const musics = useSelector(state => state.meditationRoutine.musics) || [];
  const music_selected = useSelector(state => state.meditationPlayer.music) || {};

  const onMusicChange = music => () => {
    dispatch(meditationPlayerActions.musicSet(music));
  };

  return (
    <CardCollapse>
      <CardTitle title={'Musica'} RightComponent={RightComponent(music_selected)}></CardTitle>
      <ViewY spacing={2}>
        {musics.map(music => (
          <ViewX key={music.id} style={tw`justify-between`}>
            <Text style={tw`text-white`}>{music.name}</Text>
            <Switch value={music_selected.id == music.id} onChange={onMusicChange(music)}></Switch>
          </ViewX>
        ))}
      </ViewY>
    </CardCollapse>
  );
};

export default MusicCard;
