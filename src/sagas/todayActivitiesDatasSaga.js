import { takeLatest, put, select, call, all } from 'redux-saga/effects'
import { FETCH_TODAY_ACTIVITIES_DATAS } from './constants.json'
import { setDatasetListToReducer, setDatasetToReducer, setMultipleDatasetsToReducer } from '../redux/actions'
import request from '../helpers/request'
import { datasetSelector } from '../redux/selectors'
import { fetchFocusingMediumsSagaAction, fetchNotificationsCountSagaAction, fetchUsersPendingQuestionsSagaAction } from './actions'
import { Toast } from 'native-base'
import fetchEvaluationsDayRelatedEvaluations from './fetchs/fetchEvaluationsDayRelatedEvaluations'
import fetchEvaluationsLast7DaysEvaluationsAchivementPercentages from './fetchs/fetchEvaluationsLast7DaysEvaluationsAchivementPercentages'
import fetchEvaluationsStreak from './fetchs/fetchEvaluationsStreak'
import fetchTodayActivitiesNumbers from './fetchs/fetchTodayActivitiesNumbersSaga'
import fetchTodayMinutesPlayed from './fetchs/fetchTodayMinutesPlayed'
import fetchCurrentWeekAchievedDays from './fetchs/fetchCurrentWeekAchievedDays'
import fetchObjectiveNotesSinceLastEvaluations from './fetchs/fetchObjectiveNotesSinceLastEvaluations'
import moment from 'moment-timezone'
import i18n from 'i18next'

const objListId = objIds => {
  let list = Object.keys(objIds).map(id => objIds[id])
  return list
}

function* todayActivitiesDatas() {
  //console.log('todayActivitiesDatas start ===> ', moment().format('HH:mm:ss'))
  yield put(setDatasetToReducer(true, 'is_refreshing_today_activity_list'))
  yield put(fetchNotificationsCountSagaAction())
  let today_activities = []

  var { data = [], error, message } = yield call(request, {
    url: `mobile/users/day_activities`,
    method: 'POST',
    debug: true,
  })

  if (error)
    Toast.show({
      text: !!message ? message : global?.language?.unexpected_error,
      type: 'danger',
      duration: 4000,
    })
  else {
    today_activities = data
    /////////////////////////////////////////////////////

    today_activities = today_activities.map(activity => {
      let transformed_activity = {}

      if (activity['type'] === 'article') {
        transformed_activity = {
          title: '',
          subtitles: activity['data']['title'],
          type: activity['type'],
          data: activity['data'],
        }
      } else if (activity['type'] === 'evaluation' || activity['type'] === 'self_evaluation') {
        transformed_activity = {
          title: '',
          time: moment.utc(activity['date_time']).tz(activity['user']['timezone']).format('HH:mm:ss'),
          subtitles: activity['data']['objective']['objective'],
          type: activity['type'],
          data: activity['data'],
        }
      } else if (activity['type'] === 'evaluation_report' || activity['type'] === 'self_evaluation_report') {
        transformed_activity = {
          time: moment.utc(activity['date_time']).tz(activity['user']['timezone']).format('HH:mm:ss'),
          subtitles: activity['data']['objective']['objective'],
          type: activity['type'],
          data: activity['data'],
        }
      } else if (activity['type'] === 'routine_configuration') {
        transformed_activity = {
          title: activity['data']['routine']['name'],
          time: moment.utc(activity['date_time']).tz(activity['user']['timezone']).format('HH:mm:ss'),
          subtitles: i18n.t('meditation_routine'),
          type: activity['type'],
          data: activity['data'],
        }
      } else if (activity['type'] === 'friend_made_note') {
        const notification = activity['data']
        transformed_activity = {
          title: i18n.t('friend_note').replace(':friend_name', notification['source']['user']['name']),
          time: moment.utc(activity['date_time']).tz(activity['user']['timezone']).format('HH:mm:ss'),
          subtitles: notification['source']['objective']['objective'],
          type: activity['type'],
          data: notification,
        }
      } else if (activity.type === 'closing_report') {
        $closingObjectiveEvaluationReport = activity['data']
        //$closingObjectiveEvaluationReport['evaluations'] = $closingObjectiveEvaluationReport.evaluations;
        $closingObjectiveEvaluationReport['evaluations_ids'] = $closingObjectiveEvaluationReport['evaluations'].map(({ id }) => id)
        $closingObjectiveEvaluationReport['objectives_achievement_percentages'] = []
        transformed_activity = {
          type: 'closing_report',
          time: '00:01',
          data: activity['data'],
        }
      } else if (activity['type'] === 'create_routine_reminder') {
        transformed_activity = {
          title: activity['title'],
          subtitles: activity['subtitles'],
          type: activity['type'],
          data: activity['data'],
        }
      }
      transformed_activity['id'] = activity['id']
      return transformed_activity
    })

    ////////////////////////////////////////////////////
  }
  //console.log('todayActivitiesDatas procesed ===> ', moment().format('HH:mm:ss'))

  let activities_secondary_datas = {
    evaluations_day_related_to_evaluations_ids: [],
    evaluation_report_ids: [],

    users: {},
    objectives: {},
    routines: {},
    evaluations: {},
    routines_configurations: {},
    notes: {},
  }

  for (let activity of today_activities) {
    //console.log('activity ===> ', { activity, today_activities })
    let type = activity['type']

    if (!!activity['data']?.['objective']?.['user']) {
      activities_secondary_datas['users'][activity['data']['objective']['user']['id']] = activity['data']['objective']['user']
      //delete activity['data']['objective']['user']
    }

    if (!!activity['data']?.['objective']) {
      activities_secondary_datas['objectives'][activity['data']['objective']['id']] = activity['data']['objective']
      //delete activity['data']['objective']
    }
    if (!!activity['data']?.['routine']) {
      activities_secondary_datas['routines'][activity['data']['routine']['id']] = activity['data']['routine']
      //delete activity['data']['routine']
    }
    if (!!activity['data']?.['user']) {
      activities_secondary_datas['users'][activity['data']['user']['id']] = activity['data']['user']
      //delete activity['data']['routine']
    }
    if (!!activity['data']?.['evaluations']) {
      for (let eva of activity['data']['evaluations']) activities_secondary_datas['evaluations'][eva['id']] = eva
    }

    if (type === 'evaluation' || type === 'self_evaluation' || type === 'self_evaluation_report' || type === 'evaluation_report') {
      activities_secondary_datas['evaluations'][activity['data']['id']] = activity['data']
      if (type === 'self_evaluation_report' || type === 'evaluation_report') activities_secondary_datas['evaluation_report_ids'].push(activity['data']['id'])
    } else if (type === 'routine_configuration') {
      activities_secondary_datas['routines_configurations'][activity['data']['id']] = activity['data']
    } else if (type === 'friend_made_note') {
      activities_secondary_datas['notes'][activity['data']['id']] = activity['data']
    } else if (type === 'article') {
      //current_article_id = activity['data']['id']
      //activities_secondary_datas['notes'][activity['data']['id']] = activity['data']
    } else if (type === 'closing_report') {
      for (var eva of activity['data']['evaluations']) {
        activities_secondary_datas['evaluations'][eva?.id] = eva
        activities_secondary_datas['objectives'][eva?.objective.id] = eva['objective']
        activities_secondary_datas['users'][eva?.user?.id] = eva['user']
      }
    }
  } // end for loop
  //console.log('todayActivitiesDatas fetchEvaluationsDayRelatedEvaluations start ===> ', moment().format('HH:mm:ss'))
  var { evaluations, evaluations_day_related_evaluations, users } = yield call(fetchEvaluationsDayRelatedEvaluations, {
    evaluations_ids: activities_secondary_datas['evaluation_report_ids'],
  })
  for (let user of users) activities_secondary_datas['users'][user.id] = user
  for (var eva of evaluations) activities_secondary_datas['evaluations'][eva.id] = eva
  let { evaluations_streaks } = yield fetchEvaluationsStreak({ evaluations_ids: activities_secondary_datas['evaluation_report_ids'] })
  //console.log('todayActivitiesDatas fetchEvaluationsLast7DaysEvaluationsAchivementPercentages start ===> ', moment().format('HH:mm:ss'))
  var evaluations_last_7_days_evaluations_achivements_percentages = yield call(fetchEvaluationsLast7DaysEvaluationsAchivementPercentages, {
    evaluations_ids: activities_secondary_datas['evaluation_report_ids'],
  })
  //console.log('todayActivitiesDatas fetchTodayActivitiesNumbers start ===> ', moment().format('HH:mm:ss'))
  let { today_activities_numbers } = yield call(fetchTodayActivitiesNumbers)
  //console.log('todayActivitiesDatas fetchTodayMinutesPlayed start ===> ', moment().format('HH:mm:ss'))
  let { minutesPlayed } = yield call(fetchTodayMinutesPlayed)
  //console.log('todayActivitiesDatas fetchCurrentWeekAchievedDays start ===> ', moment().format('HH:mm:ss'))
  let { current_week_achieved_days } = yield call(fetchCurrentWeekAchievedDays)

  let objectives_ids = Object.keys(activities_secondary_datas['objectives'])
  //console.log('todayActivitiesDatas fetchObjectiveNotesSinceLastEvaluations start ===> ', moment().format('HH:mm:ss'))
  for (let objective_id of objectives_ids) {
    var { notes } = yield call(fetchObjectiveNotesSinceLastEvaluations, objective_id)
    for (let note of notes) activities_secondary_datas['notes'][note.id] = note
  }

  //console.log('todayActivitiesDatas redux-start ===> ', moment().format('HH:mm:ss'))
  yield all([
    put(
      setMultipleDatasetsToReducer([
        setDatasetToReducer(current_week_achieved_days, 'current_week_achieved_days'),
        setDatasetToReducer(today_activities, 'today_activities'),
        setDatasetToReducer(today_activities_numbers, 'today_activities_numbers'),
        setDatasetToReducer(evaluations_streaks, 'evaluations_streaks'),
        setDatasetToReducer(evaluations_last_7_days_evaluations_achivements_percentages, 'evaluations_last_7_days_evaluations_achivements_percentages'),
        setDatasetToReducer(evaluations_day_related_evaluations, 'evaluations_day_related_evaluations'),
        setDatasetListToReducer(objListId(activities_secondary_datas['users']), 'users'),
        setDatasetListToReducer(objListId(activities_secondary_datas['objectives']), 'objectives'),
        setDatasetListToReducer(objListId(activities_secondary_datas['routines']), 'routines'),
        setDatasetListToReducer(objListId(activities_secondary_datas['evaluations']), 'evaluations'),
        setDatasetListToReducer(objListId(activities_secondary_datas['routines_configurations']), 'routines_configurations'),
        setDatasetListToReducer(objListId(activities_secondary_datas['notes']), 'notes'),
        setDatasetToReducer(false, 'is_refreshing_today_activity_list'),
        setDatasetToReducer(minutesPlayed, 'today_minutes_played'),
      ]),
    ),
    put(fetchFocusingMediumsSagaAction()),
    put(fetchUsersPendingQuestionsSagaAction()),
  ])
  //console.log('todayActivitiesDatas end ===> ', moment().format('HH:mm:ss'))
}

export default function* todayActivitiesDatasSaga() {
  yield takeLatest(FETCH_TODAY_ACTIVITIES_DATAS, todayActivitiesDatas)
}
