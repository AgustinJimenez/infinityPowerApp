import { call } from 'redux-saga/effects'
import request from '../../helpers/request'

function* fetchUserBeltInfo() {
  let belt = null
  var { data, error } = yield call(request, {
    url: 'mobile/users/user_belt',
    method: 'POST',
    // debug: true,
  })

  if (!error) belt = data

  return { belt }
}

export default fetchUserBeltInfo
