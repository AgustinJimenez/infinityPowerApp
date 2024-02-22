import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { ViewY } from 'src/modules/common/components/utils/ViewUtils';
import RoutineCard from './RoutineCard';
import { useDispatch, useSelector } from 'react-redux';
import { meditationRoutineActions } from '../handlers/redux';
import { useFocusEffect } from '@react-navigation/native';
import { meditationPhraseActions } from '../../phrase/handlers/redux';

const RoutineList = () => {
  const dispatch = useDispatch();

  const routines = useSelector(state => state.meditationRoutine.routines || []);

  useEffect(() => {
    dispatch(meditationRoutineActions.routines());
    dispatch(meditationPhraseActions.categories());
    dispatch(meditationPhraseActions.phrases());
  }, []);


  return (
    <ViewY spacing={6}>
      {routines.map((routine, i) => (
        <RoutineCard key={routine.id + ''} data={routine} />
      ))}
    </ViewY>
  );
};

export default RoutineList;
