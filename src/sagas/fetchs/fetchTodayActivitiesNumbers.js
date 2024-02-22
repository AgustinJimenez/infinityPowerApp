import moment from 'moment'
import { call, select } from 'redux-saga/effects'
import request from '../../helpers/request'
import { datasetSelector } from '../../redux/selectors'

function* fetchTodayActivitiesNumbers() {
  const app_configuration = select(state => datasetSelector(state, 'app_configuration'))
  const imei = select(state => datasetSelector(state, 'imei'))
  const timezone = select(state => datasetSelector(state, 'timezone'))

  var { data, error } = yield call(request, {
    url: 'mobile/users/today_activities_numbers',
    method: 'POST',
    data: {
      lang: app_configuration.language,
      imei: imei,
      timezone: timezone,
      date: moment().format('YYYY-MM-DD hh:mm:ss'),
    },
  })
  let today_activities_count_data = {}
  if (!error) today_activities_count_data = data

  return { today_activities_count_data }
}

export default fetchTodayActivitiesNumbers
