import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ViewY } from 'src/modules/common/components/utils/ViewUtils';
import { meditationReminderActions } from '../handlers/redux';
import ReminderListItem from './ReminderListItem';

const ReminderList = ({ edit }) => {
  const dispatch = useDispatch();

  const reminders = useSelector(state => state.meditationReminder.reminders || []);

  useEffect(() => {
    dispatch(meditationReminderActions.reminders());

  }, []);


  return (
    <ViewY spacing={6}>
      {reminders.map((reminder, i) => (
        <ReminderListItem key={reminder.id + ''}
          edit={edit}
          reminder={reminder}
        />

      ))}
    </ViewY>
  );
};

export default ReminderList;
