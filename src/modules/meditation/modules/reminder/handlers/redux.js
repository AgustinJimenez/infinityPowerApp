import {createSlice} from '@reduxjs/toolkit';

const meditationReminderSlice = createSlice({
  name: 'meditationReminder',
  initialState: {
    reminder_create_loading: false,
    reminder_update_loading: false,
    reminder_delete_loading: false,
    reminder: {},
    reminders: [],
    reminders_loading: false,
  },
  reducers: {
    reminderSet: (state, {payload = {reminder}}) => {
      console.log({payload});
      state.reminder = payload;
    },
    reminderCreate: (state, {payload = {}}) => {
      state.reminder_create_loading = true;
    },
    reminderCreateSuccess: state => {
      state.reminder_create_loading = false;
    },
    reminderUpdate: (state, {payload = {}}) => {
      state.reminder_update_loading = true;
    },
    reminderUpdateSuccess: state => {
      state.reminder_update_loading = false;
    },
    reminderDelete: (state, {payload = {}}) => {
      state.reminder_delete_loading = true;
    },
    reminderDeleteSuccess: state => {
      state.reminder_delete_loading = false;
    },
    reminders: (state, {payload}) => {
      state.reminders_loading = true;
    },
    setReminders: (state, {payload}) => {
      state.reminders = payload.reminders;
      state.reminders_loading = false;
    },
    reminderSetActive: (state, {payload}) => {
      const {reminder = {}} = payload;
      for (let index = 0; index < state.reminders.length; index++) {
        const r = state.reminders[index];
        if (reminder.id == r.id) {
          reminder.enabled = true;
        }
        state.reminders[index] = r;
      }
    },
    reminderSetDeactive: (state, {payload}) => {
      const {reminder = {}} = payload;
      for (let index = 0; index < state.reminders.length; index++) {
        const r = state.reminders[index];
        if (reminder.id == r.id) {
          reminder.enabled = false;
        }
        state.reminders[index] = r;
      }
    },
    remindersSetConfiguration: (state, {payload}) => {
      state.reminders_loading = true;
    },
    setReminders: (state, {payload}) => {
      state.reminders = payload.reminders;
      state.reminders_loading = false;
    },
  },
});

export const meditationReminderActions = meditationReminderSlice.actions;
export const meditationReminderReducer = meditationReminderSlice.reducer;
