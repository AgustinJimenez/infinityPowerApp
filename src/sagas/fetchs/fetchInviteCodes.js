import { call } from 'redux-saga/effects'
import request from '../../helpers/request'

function* fetchInviteCodes({ invite_codes = [] } = {}) {
  invite_codes = [...new Set(invite_codes)]

  var { data, error } = yield call(request, {
    url: 'mobile/users/invite_codes',
    method: 'POST',
    //debug: true,
    data: {
      invite_codes,
    },
  })
  if (error) return { invite_codes: [] }

  return { invite_codes: data['invite_codes'] }
}

export default fetchInviteCodes
