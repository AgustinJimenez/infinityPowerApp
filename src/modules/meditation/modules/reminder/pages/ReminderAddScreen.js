import {useNavigation} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useDispatch, useSelector} from 'react-redux';
import Header from 'src/modules/common/components/Header';
import Screen from 'src/modules/common/components/Screen';
import {ViewX} from 'src/modules/common/components/utils/ViewUtils';
import {tw} from 'src/root/tw';
import {meditationReminderActions} from '../handlers/redux';

const LeftComponent = ({}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('MeditationReminder')}
      style={tw`pr-4 pb-4`}>
      <Text style={tw`text-white text-base text-teal-300`}>Cancelar</Text>
    </TouchableOpacity>
  );
};
const RightComponent = ({}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const reminder_create_loading = useSelector(
    state => state?.meditationReminder?.reminder_create_loading,
  );
  let reminder = useSelector(state => state.meditationReminder.reminder);

  const onCreatePress = () => {
    dispatch(meditationReminderActions.reminderCreate());
  };

  const onUpdatePress = () => {
    dispatch(meditationReminderActions.reminderUpdate());
  };

  return (
    <TouchableOpacity onPress={onCreatePress} style={tw`pl-4 pb-4`}>
      {!reminder.id && <Text style={tw`text-teal-300 text-base`}>Guardar</Text>}
      {!!reminder.id && (
        <Text onPress={onUpdatePress} style={tw`text-teal-300 text-base`}>
          Actualizar
        </Text>
      )}
    </TouchableOpacity>
  );
};

const ButtonDay = ({active = false, children = `texto`, ...props}) => {
  const dispatch = useDispatch();

  const activeStyle = tw`border border-teal-400 w-10 h-12 justify-center items-center  py-2 bg-teal-400  rounded-lg`;
  const inactiveStyle = tw`border border-white  w-10 h-12 justify-center items-center py-2  rounded-lg`;

  return (
    <TouchableOpacity style={active ? activeStyle : inactiveStyle} {...props}>
      <Text style={tw`text-white ${active ? 'font-bold' : ''}`}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const ReminderAddScreen = () => {
  const dispatch = useDispatch();
  const datePickerRef = useRef(null);
  const routine = useSelector(state => state.meditationRoutine.routine);
  let reminder = useSelector(state => state.meditationReminder.reminder);
  const [open, setOpen] = useState(false);

  const onConfirm = date => {
    const hour =
      date.getHours().toString().padStart(2, '0') +
      ':' +
      date.getMinutes().toString().padStart(2, '0');

    let newReminder = {...reminder, hour: hour};
    dispatch(meditationReminderActions.reminderSet(newReminder));

    setOpen(false);
  };

  const onCancel = () => {
    setOpen(false);
  };

  const setDay = day => () => {
    let newReminder = {...reminder, [day]: !reminder[day]};
    dispatch(meditationReminderActions.reminderSet(newReminder));
  };

  console.log({reminder});

  return (
    <Screen scrollEnabled={false} style={tw` flex flex-grow`}>
      <Header
        text={'Agregar recordatorio'}
        LeftComponent={LeftComponent}
        RightComponent={RightComponent}></Header>
      <View style={tw`items-center `}>
        <Text style={tw`text-white text-base justify-center`}>
          {routine.name}
        </Text>
      </View>
      <View style={tw`items-center pt-4  `}>
        <TouchableOpacity
          onPress={() => setOpen(true)}
          style={tw`items-center pt-4  `}>
          <Text style={tw`text-white text-4xl font-bold justify-center`}>
            {(reminder.hour || '06:00').toString().substr(0, 5)}
          </Text>
        </TouchableOpacity>
        <DateTimePickerModal
          onConfirm={onConfirm}
          onCancel={onCancel}
          isVisible={open}
          mode="time"
        />
      </View>
      <ViewX spacing={2} style={tw`flex-col items-center justify-center`}>
        <ButtonDay
          active={reminder['sunday'] || false}
          onPress={setDay('sunday')}>
          Dom
        </ButtonDay>
        <ButtonDay
          active={reminder['monday'] || false}
          onPress={setDay('monday')}>
          Lun
        </ButtonDay>
        <ButtonDay
          active={reminder['tuesday'] || false}
          onPress={setDay('tuesday')}>
          Mar
        </ButtonDay>
        <ButtonDay
          active={reminder['wednesday'] || false}
          onPress={setDay('wednesday')}>
          Mie
        </ButtonDay>
        <ButtonDay
          active={reminder['thursday'] || false}
          onPress={setDay('thursday')}>
          Jue
        </ButtonDay>
        <ButtonDay
          active={reminder['friday'] || false}
          onPress={setDay('friday')}>
          Vie
        </ButtonDay>
        <ButtonDay
          active={reminder['saturday'] || false}
          onPress={setDay('saturday')}>
          Sab
        </ButtonDay>
      </ViewX>
    </Screen>
  );
};

export default ReminderAddScreen;
