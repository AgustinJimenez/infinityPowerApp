import {View, Text} from 'react-native';
import React from 'react';
import Progress from 'src/modules/common/components/charts/Progress';
import {useSelector} from 'react-redux';

const MeditationProgress = () => {
  const routines = useSelector(state => state.meditationRoutine.routines || []);

  const total = routines
    .filter(r => r.enabled)
    .map(r => r.routine_active_days)
    .reduce((a, b) => a + b, 0);
  const num = routines
    .filter(r => r.enabled)
    .map(r => r.executions_days)
    .reduce((a, b) => a + b, 0);

  const percent = total > 0 ? (100 / total) * num : 0;

  return (
    <View>
      <Progress value={percent} percent={percent} />
    </View>
  );
};

export default MeditationProgress;
