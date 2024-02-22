import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Header from 'src/modules/common/components/Header';
import Screen from 'src/modules/common/components/Screen';
import {tw} from 'src/root/tw';
import ReminderList from '../components/ReminderList';
import {meditationReminderActions} from '../handlers/redux';

const LeftComponent =
  ({edit, setEdit}) =>
  ({}) => {
    const navigation = useNavigation();
    const reminders = useSelector(
      state => state.meditationReminder.reminders || [],
    );

    if (reminders.length <= 0) {
      return null;
    }
    return (
      <TouchableOpacity onPress={() => setEdit(!edit)} style={tw`pr-4 pb-4`}>
        {!edit && <Text style={tw`text-base text-teal-300`}>Editar</Text>}
        {!!edit && <Text style={tw`text-base text-teal-300`}>Listo</Text>}
      </TouchableOpacity>
    );
  };

const CreateComponent = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      onPress={() => {
        dispatch(meditationReminderActions.reminderSet({}));
        navigation.navigate('MeditationReminderAdd');
      }}
      style={tw`pl-4 pb-4`}>
      <Text style={tw`text-white text-4xl`}>+</Text>
    </TouchableOpacity>
  );
};

const ReminderScreen = () => {
  const routine = useSelector(state => state.meditationRoutine.routine);
  const [edit, setEdit] = useState(false);

  return (
    <Screen scrollEnabled={false} style={tw` flex flex-grow`}>
      <Header
        text={'Recordatorios'}
        LeftComponent={LeftComponent({edit, setEdit})}
        RightComponent={CreateComponent}></Header>
      <View style={tw`items-center `}>
        <Text style={tw`text-white text-base justify-center`}>
          {routine.name}
        </Text>
      </View>
      <View style={tw``}>
        <ReminderList edit={edit} routine={routine}></ReminderList>
      </View>
    </Screen>
  );
};

export default ReminderScreen;
