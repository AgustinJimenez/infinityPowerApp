import axios from 'axios';
import { API_URL } from 'src/constants';

export interface ObjectiveProps {
  name: string;
  description: string;
  trigger: string;
  deadline: string;
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
  hour: string;
}

export const handleObjectiveApi = (token: string) => {
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
  };

  return {
    create: async (objective: ObjectiveProps) => {
      try {
        const data = objective;

        const response = await axios.post(API_URL + '/habit/user_objective', data, {
          headers,
        });

        return response.data;
      } catch (error) {
        console.log(error, 'habit');
        throw error;
      }
    },
  };
};
