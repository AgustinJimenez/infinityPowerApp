import axios from 'axios';
import RNFetchBlob from 'rn-fetch-blob';
import {API_URL} from 'src/constants';

export const routineApi = token => {
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
  };

  return {
    create: async ({name}) => {
      try {
        const data = {name};

        let response = await axios.post(
          API_URL + '/meditation/users_routines',
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
    routineUpdate: async ({name, id}) => {
      try {
        const data = {name, id};

        let response = await axios.put(
          API_URL + '/meditation/users_routines/'+id+'/update_name',
          data,
          {
            headers,
          },
        );
        console.log(response.data);

        return response.data;
      } catch (error) {
        console.log(JSON.stringify(error));
        throw error;
      }
    },
    routineDelete: async (routine) => {
      try {
        let response = await axios.delete(
          API_URL + `/meditation/users_routines/${routine.id}`,
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
    routineExecuted: async ({routine}) => {
      try {
        const data = {
          user_routine_id: routine.id,
          day: new Date().getDay(),
          timezone: 'America/Asuncion',
          value_datetime: new Date().toISOString().toString().substr(0, 10),
        };

        let response = await axios.post(
          API_URL + '/meditation/users_routines_execution',
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
    routineSetActive: async ({routine}) => {
      try {
        console.log({routine});
        let response = await axios.put(
          API_URL + `/meditation/users_routines/${routine.id}/active`,
          {id: routine.id},
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
    routineSetDeactive: async ({routine}) => {
      try {
        let response = await axios.put(
          API_URL + `/meditation/users_routines/${routine.id}/deactive`,
          {id: routine.id},
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
    routineBackgroundUpdate: async ({routine_id, background_image}) => {
      try {
        const data = {id: routine_id, background_image};

        console.log(data);

        let response = await axios.put(
          API_URL + `/meditation/users_routines/${routine_id}/background_image`,
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
    routineSetConfiguration: async ({routine, data}) => {
      try {
        let response = await axios.put(
          API_URL + `/meditation/users_routines/${routine.id}/configuration`,
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
    routines: async () => {
      try {
        let response = await axios.get(API_URL + '/meditation/users_routines', {
          headers,
        });
        return response.data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

    tones: async () => {
      try {
        let response = await axios.get(API_URL + '/meditation/tones', {
          headers,
        });
        return response.data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

    musics: async () => {
      try {
        let response = await axios.get(API_URL + '/meditation/musics', {
          headers,
        });
        return response.data.filter(m => m.enabled);
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    uploadImage: async ({image}) => {
      try {
        // subir imagen
        const uri = image?.path;
        const realPath =
          Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

        const resp = await RNFetchBlob.fetch(
          'POST',
          API_URL + '/meditation/upload_background',
          {
            Authorization: 'Bearer ' + token,
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
          [
            {
              name: 'background_image',
              filename: image.filename,
              type: image.mime,
              data: RNFetchBlob.wrap(realPath),
            },
          ],
        );

        const background_image = JSON.parse(resp.data);

        return background_image;
      } catch (error) {
        // ...
        console.log({err});
      }
    },
  };
};
