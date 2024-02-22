import axios from 'axios';
import RNFetchBlob from 'rn-fetch-blob';
import {API_URL} from 'src/constants';

export const phraseApi = token => {
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
  };

  return {
    categories: async () => {
      try {
        let response = await axios.get(API_URL + '/meditation/categories', {
          headers,
        });
        return response.data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    phrases: async () => {
      try {
        let response = await axios.get(API_URL + '/meditation/phrases', {
          headers,
        });
        return response.data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    userRoutinesPhrases: async ({user_routine_id, phrases}) => {
      try {
        let response = await axios.post(
          API_URL + '/meditation/users_routines_phrases',
          {
            user_routine_id,
            phrases,
          },
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

    phraseBackgroundUpdate: async ({routine_phrase_id, background_image}) => {
      try {
        const data = {id: routine_phrase_id, background_image};

        console.log(data);

        let response = await axios.put(
          API_URL +
            `/meditation/users_routines_phrases/${routine_phrase_id}/background_image`,
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

    uploadAudioAffirmation: async ({uri}) => {
      try {
        const realPath =
          Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

        const resp = await RNFetchBlob.fetch(
          'POST',
          API_URL + '/meditation/upload_audio_affirmation',
          {
            Authorization: 'Bearer ' + token,
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
          [
            {
              name: 'archivo',
              filename: 'audio.m4a',
              type: 'audio/x-m4a',
              data: RNFetchBlob.wrap(realPath),
            },
          ],
        );

        const audio_url = JSON.parse(resp.data);

        return audio_url;
      } catch (error) {
        // ...
        console.log({error});
      }
    },

    uploadAudioGratitude: async ({uri}) => {
      try {
        const realPath =
          Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

        const resp = await RNFetchBlob.fetch(
          'POST',
          API_URL + '/meditation/upload_audio_gratitude',
          {
            Authorization: 'Bearer ' + token,
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
          [
            {
              name: 'archivo',
              filename: 'audio.m4a',
              type: 'audio/x-m4a',
              data: RNFetchBlob.wrap(realPath),
            },
          ],
        );

        const audio_url = JSON.parse(resp.data);

        return audio_url;
      } catch (error) {
        // ...
        console.log({error});
      }
    },
    phraseUpdate: async ({
      phrase_id,
      audio_affirmative,
      audio_gratitude,
      text_affirmative,
      text_gratitude,
    }) => {
      try {
        const data = {
          id: phrase_id,
          audio_affirmative,
          audio_gratitude,
          text_affirmative,
          text_gratitude,
        };

        console.log(data);

        let response = await axios.put(
          API_URL + `/meditation/users_phrases/${phrase_id}`,
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
    phraseCreate: async ({
      audio_affirmative,
      audio_gratitude,
      text_affirmative,
      text_gratitude,
    }) => {
      try {
        const data = {
          audio_affirmative,
          audio_gratitude,
          text_affirmative,
          text_gratitude,
        };

        console.log(data);

        let response = await axios.post(
          API_URL + `/meditation/users_phrases`,
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

    phraseDelete: async ({
      user_routine_id, user_phrase_id
    }) => {
      try {
        
        let response = await axios.delete(
          API_URL + `/meditation/users_routines_phrases/`+user_routine_id+`/`+user_phrase_id,
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
  };
};
