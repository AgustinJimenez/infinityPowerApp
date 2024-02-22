import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {activityActions} from 'src/modules/activity/handlers/redux';
import Header from 'src/modules/common/components/Header';
import Screen from 'src/modules/common/components/Screen';
import {ViewX, ViewY} from 'src/modules/common/components/utils/ViewUtils';
import RoutineActivityCard from 'src/modules/meditation/modules/routine/components/RoutineActivityCard';
import {tw} from 'src/root/tw';
import ActivityProgress from '../components/ActivityProgress';
import PendingPill from '../components/PendingPill';

const ActivityToday = () => {
  const dispatch = useDispatch();
  const resumen = useSelector(state => state.activity.resumen || {});
  const pending = useSelector(state => state.activity.pending || []);

  useEffect(() => {
    //   dispatch(activityActions.resumen());
    dispatch(activityActions.pending());
  }, []);
  const [tab, setTab] = useState(0);

  return (
    <Screen style={tw`w-full`} scrollEnabled={false}>
      <ScrollView spacing={6}>
        <Header
          style={tw`text-white text-2xl `}
          text={'Actividades Hoy'}></Header>
        <ViewY style={tw`items-center justify-center`}>
          <View style={tw`flex items-center justify-center`}>
            <ActivityProgress></ActivityProgress>
          </View>
        </ViewY>
        <ViewX style={tw` `}>
          <PendingPill>{resumen.pending} Pendientes</PendingPill>
        </ViewX>
        <ViewY spacing={2}>
          {pending.map(goal => (
            <RoutineActivityCard key={goal.evaluation_detail_id} data={goal} />
          ))}
        </ViewY>
      </ScrollView>
    </Screen>
  );
};

export default ActivityToday;
