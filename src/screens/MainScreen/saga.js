import { takeLatest, put, call, all } from 'redux-saga/effects'
import { UPDATE_HOME_DATAS_SAGA } from '../../sagas/constants.json'
import { setDatasetToReducer, setMultipleDatasetsToReducer, setDatasetListToObjectReducer } from '../../redux/actions'
import fetchCurrentWeekAchievedDays from '../../sagas/fetchs/fetchCurrentWeekAchievedDays'
import { fetchHabitsPercentage } from '../../sagas/fetchs/fetchHabitsPercentage'
import fetchLastConsecutivesAchievedWeeks from '../../sagas/fetchs/fetchLastConsecutivesAchievedWeeks'
import fetchSongs from '../../sagas/fetchs/fetchSongs'
import fetchTodayActivitiesNumbers from '../../sagas/fetchs/fetchTodayActivitiesNumbers'
import fetchCategories from '../../sagas/fetchs/fetchCategories'
import fetchUserBeltInfo from '../../sagas/fetchs/fetchUserBeltInfo'
import fetchBelts from '../../sagas/fetchs/fetchBelts'

function* updateHomeDatas() {
  const { habits_percentage } = yield call(fetchHabitsPercentage)
  const { last_consecutives_achieved_weeks } = yield call(fetchLastConsecutivesAchievedWeeks)
  const { current_week_achieved_days } = yield call(fetchCurrentWeekAchievedDays)
  const { songs } = yield call(fetchSongs)
  const { today_activities_count_data } = yield call(fetchTodayActivitiesNumbers)
  const { categories, categories_complete } = yield call(fetchCategories)
  const { belt } = yield call(fetchUserBeltInfo)
  const { belts } = yield call(fetchBelts)
  yield all([
    put(
      setMultipleDatasetsToReducer([
        setDatasetToReducer(current_week_achieved_days, 'current_week_achieved_days'),
        setDatasetToReducer(habits_percentage, 'habits_percentage'),
        setDatasetToReducer(last_consecutives_achieved_weeks, 'last_consecutives_achieved_weeks'),
        setDatasetToReducer(songs, 'songs'),
        setDatasetToReducer(today_activities_count_data, 'today_activities_count_data'),
        setDatasetListToObjectReducer(categories, 'categories'),
        setDatasetToReducer(categories_complete, 'categories_complete'),
        setDatasetToReducer(belt, 'belt'),
        setDatasetToReducer(belts, 'belts'),
      ]),
    ),
  ])
}

export default function* saga() {
  yield takeLatest(UPDATE_HOME_DATAS_SAGA, updateHomeDatas)
}
