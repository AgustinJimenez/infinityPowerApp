import { takeLatest, put, select } from 'redux-saga/effects'
import { FETCH_USER_PENDING_QUESTIONS_SAGA } from '../constants.json'

import { setDatasetToReducer } from '../../redux/actions'
import request from '../../helpers/request'
import { datasetSelector } from '../../redux/selectors'

function* fetchUserPendingQuestions() {
  let local_questions = yield select(state => datasetSelector(state, 'questions', { list_format: true }))
  let local_questions_ids = local_questions.map(({ id }) => id)

  let { data = [] } = yield request({
    //local_questions_ids.length ? 'questions' : 'pending_questions'
    url: `mobile/users/pending_questions`,
    method: 'POST',
    data: {
      ids: local_questions_ids,
    },
    //debug: true,
  })

  let { questions = [] } = data
  let obj = {}

  if (!Array.isArray(questions)) questions = Object.keys(questions).map(key => questions[key])

  yield put(setDatasetToReducer(questions, 'questions'))
}

export function* fetchUserPendingQuestionsSaga() {
  yield takeLatest(FETCH_USER_PENDING_QUESTIONS_SAGA, fetchUserPendingQuestions)
}
