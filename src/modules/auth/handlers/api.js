import axios from 'axios';
import {API_URL} from 'src/constants';

export const authApi = () => {
  return {
    login: async ({email, password}) => {
      try {
        let response = await axios.post(
          API_URL + '/auth/login',
          {
            email,
            password,
            imei: '520369423248715',
            lang: 'es',
            timezone: 'America/Asuncion',
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          },
        );
        return response.data?.data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    register: async ({name, email, password}) => {
      try {
        let response = await axios.post(
          API_URL + '/auth/register',
          {
            name,
            email,
            password,
            imei: '520369423248715',
            lang: 'es',
            timezone: 'America/Asuncion',
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          },
        );
        return response.data?.data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    verify: async ({recid, email}) => {
      try {
        let response = await axios.post(
          'http://telehealthcontinuum.com/XZXXXXXXZ/verify_email.asp',
          {
            recid: recid,
            Value1: email,
            auth: 'DOC0139-HnX6Vx3-HvBkVc5',
            ProdID: "VerEm"
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          },
        );
        return response.data?.data;
        // return 'abcd';
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  };
};
