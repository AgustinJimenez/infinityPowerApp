import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
import ListItem from 'src/modules/common/components/ListItem';
import { ViewX } from 'src/modules/common/components/utils/ViewUtils';
import { tw } from 'src/root/tw';
import { meditationReminderActions } from '../handlers/redux';

// const IconSwitch = (
//   <ViewX style={tw`flex-grow items-center`}>
//     <Switch value={true} ></Switch>
//   </ViewX>
// );

const IconDelete = (reminder) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return <ViewX style={tw`relative w-10 flex flex-grow items-center justify-center`}>
    <TouchableOpacity onPress={() => {

      dispatch(meditationReminderActions.reminderDelete(reminder));
    }}>
      <MaterialIcon name={'trash-o'} size={32} color="#fff" />
    </TouchableOpacity>

  </ViewX>
}

const IconEdit = (reminder) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();


  return <ViewX style={tw`relative w-10 flex flex-grow items-center justify-end`}>
    <TouchableOpacity onPress={() => {

      dispatch(meditationReminderActions.reminderSet(reminder));
      navigation.navigate('MeditationReminderAdd');
    }}>
      <MaterialIcon name={'angle-right'} size={32} color="#fff" />
    </TouchableOpacity>
  </ViewX>

}

const ReminderListItem = ({ edit = false, reminder = {} }) => {
  const { id = '' } = reminder;
  let days = []

  if (reminder.sunday) days.push('dom')
  if (reminder.monday) days.push('lun')
  if (reminder.tuesday) days.push('mar')
  if (reminder.wednesday) days.push('mie')
  if (reminder.thursday) days.push('jue')
  if (reminder.friday) days.push('vie')
  if (reminder.saturday) days.push('sab')

  console.log(reminder)
  return (
    <ListItem
      style={tw`border-t`}
      LeftComponent={() => edit ? IconDelete(reminder) : null}
      RightComponent={() => edit ? IconEdit(reminder) : null}
      title={reminder.hour.substr(0, 5)}
      text={days.join(",")}
    />
  );
};

export default ReminderListItem;
