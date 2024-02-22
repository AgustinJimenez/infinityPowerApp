import { call } from 'redux-saga/effects'
import request from '../../helpers/request'

function* fetchObjectiveNotesSinceLastEvaluations(objective_id) {
  let notes = []
  var { data = [], error } = yield call(request, {
    url: `actions/get_objective_notes`,
    method: 'POST',
    data: {
      objective_id,
    },
    //debug: true
  })
  if (!error) notes = data

  return { notes }
}

export default fetchObjectiveNotesSinceLastEvaluations
