import { takeLatest, put, call, select, putResolve } from 'redux-saga/effects'
import { UPDATE_HABITS_HOME_DATAS_SAGA } from './constants.json'
import { setDatasetListToReducer, setDatasetToReducer, setMultipleDatasetsToReducer } from '../redux/actions'
import { fetchHabitsHomeData } from './fetchs/fetchHabitsHomeData'
import { datasetSelector } from '../redux/selectors'
import { fetchHabitsPercentage } from '../sagas/fetchs/fetchHabitsPercentage'
import { prepareObjectiveEvaluationsStats } from '../transformers/objectiveTransformers'

function* updateHabitsHomeDatas({ objectives_ids = [], replace_habits_home_datas = true }) {
  //console.log("Vishal updateHabitsHomeDatas called => ");
  var habits_home_datas = yield select(state => datasetSelector(state, 'habits_home_datas'))
  const { habits_percentage } = yield call(fetchHabitsPercentage)
  yield putResolve(setDatasetToReducer(true, 'habits_home_is_loading'))

  var { habits_home_datas = { objectives: [] } } = yield call(fetchHabitsHomeData, { objectives_ids })

  let evaluationsObj = {}
  let usersObj = {}
  // console.log('Vishal updateHabitsHomeDatas saga ===> ', habits_home_datas)
  if (!!habits_home_datas?.['objectives']) habits_home_datas['objectives'] = prepareObjectiveEvaluationsStats({ objectives: habits_home_datas?.['objectives'] })
  let objectives = (habits_home_datas['objectives'] || []).map(objective => {
    let new_objective = { ...objective }
    //let new_objective = Object.assign({}, objective)
    new_objective['evaluations'].map(evaluation => {
      usersObj[evaluation.user.id] = evaluation.user
      evaluationsObj[evaluation.id] = evaluation
    })
    new_objective['evaluators'].map(evaluator => {
      usersObj[evaluator.user.id] = evaluator['user']
    })
    //delete new_objective['evaluations']
    //delete new_objective['evaluations_average_by_date']
    //delete new_objective['evaluations_average_by_date_data']
    delete new_objective['evaluations_by_date']
    return new_objective
  })

  //console.log('updateHomeDatas ===> ', { habits_home_datas, objectives })
  yield putResolve(setDatasetToReducer(false, 'habits_home_is_loading'))
  let datasets_executions = []

  //console.log('Vishal replace_habits_home_datas saga ===> ', replace_habits_home_datas)
  //console.log('Vishal habits_home_datas saga ===> ', habits_home_datas)
  if (replace_habits_home_datas) datasets_executions.push(setDatasetToReducer(habits_home_datas, 'habits_home_datas'))

  //console.log('Vishal objectives saga ===> ', objectives.length)

  datasets_executions = [
    ...datasets_executions,
    setDatasetToReducer(habits_percentage, 'habits_percentage'),
    setDatasetListToReducer(objectives, 'objectives'),
    setDatasetListToReducer(
      Object.keys(evaluationsObj).map(id => evaluationsObj[id]),
      'evaluations',
    ),
    setDatasetListToReducer(
      Object.keys(usersObj).map(id => usersObj[id]),
      'users',
    ),
  ]

  yield put(setMultipleDatasetsToReducer(datasets_executions))
}

export default function* updateHabitsHomeDatasSaga() {
  yield takeLatest(UPDATE_HABITS_HOME_DATAS_SAGA, updateHabitsHomeDatas)
}
