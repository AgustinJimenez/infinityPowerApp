import { takeLatest, put, call } from 'redux-saga/effects'
import { FETCH_NOTES_SAGA } from '../constants.json'
import request from '../../helpers/request'
import { setDatasetListToReducer } from '../../redux/actions'

function* fetchNotes({ data: { notes_ids } }) {
  notes_ids = [...new Set(notes_ids)]
  var { data, error } = yield call(request, {
    url: 'actions/notes',
    method: 'POST',
    data: { ids: notes_ids },
    //debug: true,
  })
  if (error) return

  yield put(setDatasetListToReducer(data.notes, 'notes'))
}

export default function* fetchNotesSaga() {
  yield takeLatest(FETCH_NOTES_SAGA, fetchNotes)
}
