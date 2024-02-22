import { takeLatest, put, call, all, putResolve } from 'redux-saga/effects'
import { UPDATE_INVITE_CODES_SAGA } from './constants.json'
import { setDatasetListToReducer, setDatasetToReducer, setMultipleDatasetsToReducer } from '../redux/actions'
import fetchInviteCodes from './fetchs/fetchInviteCodes'

function* updateInviteCodesSaga({ invite_codes }) {
  let objectives = {}
  let users = {}
  yield putResolve(setDatasetToReducer(true, 'objective_invitation_code_dialog_is_loading'))

  let result = yield call(fetchInviteCodes, { invite_codes })
  for (let invite_code of result['invite_codes']) {
    if (!!invite_code.objective) objectives[invite_code.objective.id] = invite_code.objective
    if (!!invite_code.user) users[invite_code.user.id] = invite_code.user
  }

  //console.log('updateInviteCodesSaga ===> ', { invite_codes: result.invite_codes, objectives, users })
  yield all([
    put(
      setMultipleDatasetsToReducer([
        setDatasetListToReducer(result.invite_codes, 'invite_codes'),
        setDatasetListToReducer(
          Object.keys(users).map(id => users[id]),
          'users',
        ),
        setDatasetListToReducer(
          Object.keys(objectives).map(id => objectives[id]),
          'objectives',
        ),
        setDatasetToReducer(false, 'objective_invitation_code_dialog_is_loading'),
      ]),
    ),
  ])
}

export default function* saga() {
  yield takeLatest(UPDATE_INVITE_CODES_SAGA, updateInviteCodesSaga)
}
