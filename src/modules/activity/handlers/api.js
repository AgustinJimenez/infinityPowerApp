import axios from 'axios';
import {API_URL} from 'src/constants';

export const activityApi = token => {
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
  };

  return {
    resumen: async () => {
      try {
        let response = await axios.get(API_URL + '/activity/resumen', {
          headers,
        });

        return response.data;
      } catch (error) {
        console.log(error, 'activity');
        throw error;
      }
    },
    pending: async () => {
      try {
        let response = await axios.get(API_URL + '/activity/pending', {
          headers,
        });

        return response.data;
      } catch (error) {
        console.log(error, 'activity');
        throw error;
      }
    },
    belts: async () => {
      try {
        let response = await axios.get(API_URL + '/activity/belts', {
          headers,
        });
        return response.data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    weeks: async () => {
      try {
        let response = await axios.get(API_URL + '/activity/user_week_progress', {
          headers,
        });
        return response.data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    percentHabit: async () => {
      try {
        let response = await axios.get(API_URL + '/habit/percent', {
          headers,
        });
        return response.data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  };
};
