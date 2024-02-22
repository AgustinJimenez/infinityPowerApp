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

export interface ErrorCurrentProps {
  status: number;
  data: {
    name?: string;
    description?: string;
    trigger?: string;
    deadline?: string;
    monday?: string;
    tuesday?: string;
    wednesday?: string;
    thursday?: string;
    friday?: string;
    saturday?: string;
    sunday?: string;
    hour?: string;
  };
}

export interface ErrorProps {
  response: ErrorCurrentProps;
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
        const data = {
          ...objective,
          hour: objective.hour.split(' ')[0],
        };

        console.log(data);

        const response = await axios.post(API_URL + '/habit/user_objective', data, {
          headers,
        });

        return response.data;
      } catch (error) {
        const typedError = error as ErrorProps;
        throw {
          status: typedError.response.status,
          data: typedError.response.data,
        };
      }
    },
    get: async () => {
      try {
        const response = await axios.get(API_URL + '/habit/user_objective', {
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
