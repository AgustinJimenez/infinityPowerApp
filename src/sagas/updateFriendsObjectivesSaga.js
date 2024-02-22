import { takeLatest, put, call, select, putResolve } from 'redux-saga/effects'
import { UPDATE_FRIENDS_OBJECTIVES_SAGA } from './constants.json'
import { setDatasetListToReducer, setDatasetToReducer, setMultipleDatasetsToReducer } from '../redux/actions'
import { fetchFriendsObjectives } from './fetchs/fetchFriendsObjectives'
import { datasetSelector } from '../redux/selectors'
import { prepareObjectiveEvaluationsStats } from '../transformers/objectiveTransformers'

function* updateFriendsObjectives() {
  yield putResolve(setDatasetToReducer(true, 'friends_objectives_datas_is_loading'))

  let friends_objectives_datas = yield select(state => datasetSelector(state, 'friends_objectives_datas'))
  //yield put(setDatasetToReducer(friends_objectives_datas, 'friends_objectives_datas'))
  let friends_objectives_response = yield call(fetchFriendsObjectives) || {}

  if (!!friends_objectives_response['friends_objectives']['objectives'])
    friends_objectives_response['friends_objectives']['objectives'] = prepareObjectiveEvaluationsStats({
      objectives: friends_objectives_response['friends_objectives']['objectives'],
    })

  friends_objectives_datas = {
    objectives: friends_objectives_response['friends_objectives']['objectives'],
    isRefreshing: false,
  }

  yield put(
    setMultipleDatasetsToReducer([
      setDatasetToReducer(friends_objectives_datas, 'friends_objectives_datas'),
      setDatasetListToReducer(friends_objectives_datas['objectives'], 'objectives'),
      setDatasetToReducer(false, 'friends_objectives_datas_is_loading'),
    ]),
  )
}

export default function* updateFriendsObjectivesSaga() {
  yield takeLatest(UPDATE_FRIENDS_OBJECTIVES_SAGA, updateFriendsObjectives)
}
