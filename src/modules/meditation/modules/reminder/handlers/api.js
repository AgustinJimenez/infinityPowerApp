import axios from 'axios';
import {API_URL} from 'src/constants';

export const reminderApi = token => {
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
  };

  return {
    create: async ({
      user_routine_id,
      sunday = false,
      monday = false,
      tuesday = false,
      wednesday = false,
      thursday = false,
      friday = false,
      saturday = false,
      hour = '06:00',
    }) => {
      try {
        const data = {
          user_routine_id,
          sunday,
          monday,
          tuesday,
          wednesday,
          thursday,
          friday,
          saturday,
          hour,
        };

        let response = await axios.post(
          API_URL + '/meditation/reminder',
          data,
          {
            headers,
          },
        );
        return response.data;
      } catch (error) {
        console.log(JSON.stringify(error));
        throw error;
      }
    },
    update: async ({
      id,
      user_routine_id,
      sunday = false,
      monday = false,
      tuesday = false,
      wednesday = false,
      thursday = false,
      friday = false,
      saturday = false,
      hour = '06:00',
    }) => {
      try {
        const data = {
          id,
          user_routine_id,
          sunday,
          monday,
          tuesday,
          wednesday,
          thursday,
          friday,
          saturday,
          hour,
        };

        let response = await axios.put(
          API_URL + '/meditation/reminder/' + id,
          data,
          {
            headers,
          },
        );
        return response.data;
      } catch (error) {
        console.log(JSON.stringify(error));
        throw error;
      }
    },
    delete: async ({id, user_routine_id}) => {
      try {
        const data = {
          id,
          user_routine_id,
        };

        console.log({id});

        let response = await axios.delete(
          API_URL + '/meditation/reminder/' + id,

          {
            headers,
          },
        );
        return response.data;
      } catch (error) {
        console.log(JSON.stringify(error));
        throw error;
      }
    },
    reminderSetActive: async ({reminder}) => {
      try {
        console.log({reminder});
        let response = await axios.put(
          API_URL + `/meditation/reminder/${reminder.id}/active`,
          {id: reminder.id},
          {
            headers,
          },
        );

        return response.data;
      } catch (error) {
        console.log(JSON.stringify(error));
        throw error;
      }
    },
    reminderSetDeactive: async ({reminder}) => {
      try {
        let response = await axios.put(
          API_URL + `/meditation/reminder/${reminder.id}/deactive`,
          {id: reminder.id},
          {
            headers,
          },
        );
        return response.data;
      } catch (error) {
        console.log(JSON.stringify(error));
        throw error;
      }
    },
    reminders: async ({user_routine_id}) => {
      try {
        let response = await axios.get(
          API_URL + '/meditation/reminder?user_routine_id=' + user_routine_id,
          {
            headers,
          },
        );
        return response.data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  };
};
