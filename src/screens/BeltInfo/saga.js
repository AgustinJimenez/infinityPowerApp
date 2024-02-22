import { takeLatest, put, call, all } from 'redux-saga/effects'
import { UPDATE_BELT_INFO_SCREEN_DATAS_SAGA } from '../../sagas/constants.json'
import { setDatasetToReducer, setMultipleDatasetsToReducer, setDatasetListToObjectReducer } from '../../redux/actions'
import fetchUserBeltInfo from '../../sagas/fetchs/fetchUserBeltInfo'
import fetchBelts from '../../sagas/fetchs/fetchBelts'
import fetchLastConsecutivesAchievedWeeks from '../../sagas/fetchs/fetchLastConsecutivesAchievedWeeks'

function* beltInfoSaga() {
  const { belt } = yield call(fetchUserBeltInfo)
  const { belts } = yield call(fetchBelts)
  const { last_consecutives_achieved_weeks } = yield call(fetchLastConsecutivesAchievedWeeks)
  yield all([
    put(
      setMultipleDatasetsToReducer([
        setDatasetListToObjectReducer(belts, 'belts'),
        setDatasetToReducer(belt, 'belt'),
        setDatasetToReducer(last_consecutives_achieved_weeks, 'last_consecutives_achieved_weeks'),
      ]),
    ),
  ])
}

export default function* saga() {
  yield takeLatest(UPDATE_BELT_INFO_SCREEN_DATAS_SAGA, beltInfoSaga)
}
