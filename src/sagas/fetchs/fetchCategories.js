import AsyncStorage from '@react-native-community/async-storage'
import { call, select } from 'redux-saga/effects'
import request from '../../helpers/request'
import { datasetSelector } from '../../redux/selectors'

function* fetchCategories() {
  const app_configuration = select(state => datasetSelector(state, 'app_configuration'))
  const imei = select(state => datasetSelector(state, 'imei'))
  const timezone = select(state => datasetSelector(state, 'timezone'))

  var { data, error, response } = yield call(request, {
    url: 'categories',
    method: 'POST',
    data: {
      lang: app_configuration.language,
      imei: imei,
      timezone: timezone,
    },
  })
  let categories = []
  let categories_complete = {}

  if (!error) {
    categories = data
    categories_complete = response
    AsyncStorage.setItem('categories', JSON.stringify(categories))
    AsyncStorage.setItem('categories_complete', JSON.stringify(categories_complete))
  }

  return { categories, categories_complete }
}

export default fetchCategories
