import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import Card from 'src/modules/common/components/Card';
import CardTitle from 'src/modules/common/components/CardTitle';
import { ViewY } from 'src/modules/common/components/utils/ViewUtils';
import { tw, twGetTextColor } from 'src/root/tw';
import { meditationPlayerActions } from '../../player/handlers/redux';
import {meditationRoutineActions} from 'src/modules/meditation/modules/routine/handlers/redux';

const MeditationIcon = data => () => {
  const navigation = useNavigation();
  return (
    <View
      style={[
        tw`w-10 h-10 rounded-full justify-center items-center`,
        { backgroundColor: twGetTextColor('text-teal-400') },
      ]}>
      <Icon name="psychology" size={34} color="#fff" />
    </View>
  );
};

const RoutineActivityCard = ({ data = {} }) => {
  const { name = '' } = data;

  const routines = useSelector(state => state.meditationRoutine.routines);

  const routine = routines.find(r => r.id == data.goal_id);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  let irConfiguration = (routine) => {
    dispatch(meditationPlayerActions.routineSet(routine));
    navigation.navigate('MeditationPlayerConfiguration', {routine: routine});
  }

  return (
    <TouchableOpacity
     style={{borderRadius:17, backgroundColor:'rgba(0, 0, 0, 0.5)'}}
      onPress={() => {
       irConfiguration(routine);
      }}>
      <ViewY spacing={0}>
        <Card>
          <CardTitle
            LeftComponent={MeditationIcon(data)}
            title={name}
            description={'Rutina de subconsciente'}
            info={'Hoy a las ' + data.hour.toString().substr(0, 5)}></CardTitle>
        </Card>
      </ViewY>
    </TouchableOpacity>
  );
};

export default RoutineActivityCard;
