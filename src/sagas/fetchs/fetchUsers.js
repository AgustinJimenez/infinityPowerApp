import { call } from 'redux-saga/effects'
import request from '../../helpers/request'

function* fetchUsers({ users_ids }) {
  users_ids = [...new Set(users_ids)]
  var { data, error } = yield call(request, {
    url: 'actions/users',
    method: 'POST',
    data: { ids: users_ids },
    //debug: true,
  })
  if (error) return []

  return data['users']
}

export default fetchUsers
