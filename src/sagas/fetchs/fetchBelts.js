import { call } from 'redux-saga/effects'
import request from '../../helpers/request'

function* fetchBelts() {
  let belts = null
  var { data, error } = yield call(request, {
    url: 'mobile/users/belts',
    method: 'POST',
    // debug: true,
  })

  if (!error) belts = data

  return { belts }
}

export default fetchBelts
