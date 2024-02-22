import { call } from 'redux-saga/effects'
import request from '../../helpers/request'
import AsyncStorage from '@react-native-community/async-storage'

function* fetchSongs() {
  var { data, error, response } = yield call(request, {
    method: 'POST',
    url: 'songs',
    //debug: true,
  })
  let songs = []
  if (!error){
    AsyncStorage.setItem('songs', JSON.stringify(response))
    songs = data['last_consecutives_achieved_weeks']
  }

  return { songs }
}

export default fetchSongs
