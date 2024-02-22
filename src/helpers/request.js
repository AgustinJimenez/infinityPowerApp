import axios from 'axios'
import * as fn from './scripts'
import AsyncStorage from '@react-native-community/async-storage'
import { Toast } from 'native-base'
import moment from 'moment'
import { log_all_requests, admin_url, api_url } from '../../env.json'
import NavigationService from '../app/navigationService'
import { NavigationActions, StackActions } from 'react-navigation'
import * as RNLocalize from 'react-native-localize'
//https://github.com/axios/axios#axios-api

export default async options => {
  let token = await AsyncStorage.getItem('userToken')
  let tokenType = await AsyncStorage.getItem('userTokenType')
  let { imei } = (await AsyncStorage.getItem('user')) || {}

  options['data'] = !!options['data'] ? options['data'] : {}
  options['timeout'] = options['timeout'] !== undefined ? options['timeout'] : 6000000
  options['show_message'] = !!options['show_message'] ? options['show_message'] : false
  options['hide_network_error'] = !!options['hide_network_error'] ? options['hide_network_error'] : false
  options['onSuccessMessage'] = !!options['onSuccessMessage'] ? options['onSuccessMessage'] : null
  options['endpoint'] = options['endpoint'] ? options['endpoint'] : 'api' || 'admin'
  options['debug'] = options['debug'] !== undefined ? options['debug'] : log_all_requests

  if (options['endpoint'] === 'api') options['url'] = `${api_url}${options['url']}`
  else if (options['endpoint'] === 'admin') options['url'] = `${admin_url}${options['url']}`

  options['method'] = options['method'] || 'GET'

  options['headers'] = {
    Authorization: `${tokenType} ${token},`,
    'Content-Type': 'application/json;charset=utf-8',
    Accept: 'application/json, text/plain, */*',
    lang: global.lang,
    imei,
    ...(options['headers'] || {}),
  }

  options['data']['lang'] = global.lang
  options['data']['imei'] = !!options['data']['imei'] ? options['data']['imei'] : imei

  options['data']['timezone'] = RNLocalize.getTimeZone()

  if (options['debug'])
    console.log(`<================ AXIOS-REQUEST [${options.url}] ${moment().format('DD/MM/YYYY HH:mm:ss:SSS')} ===> `, {
      options,
    })

  let response = {}
  try {
    response = await axios(options)
  } catch (error) {
    /* if (options['debug']) */ console.log(`REQUEST-ERROR-CATCHED [${options.url}] ${moment().format('DD/MM/YYYY HH:mm:ss:SSS')}===> `, { error, options })
    response['status'] = error?.response?.status || 500
    response['error'] = error
    response['message'] = error?.response?.data?.message || error['message']

    if (error && (error.message === 'Network Error' || error.message.includes('timeout')) && !options['hide_network_error'])
      Toast.show({
        text: global?.language?.there_is_a_connection_problem,
        buttonText: 'OK',
        type: error ? 'danger' : 'success',
        duration: 4000,
      })
  }

  if (response['status'] === 401) {
    try {
      /*  
      console.log('HELP!!!!')
      resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'AuthPage' })],
      })
      NavigationService.dispatch(resetAction)

 */
    } catch (e) {
      console.log('REQUEST-401 ===> ', e)
    }
  }

  let { message, result, status } = response.data || {}
  message = !!message ? message : response['message']
  if (!result) result = response.data

  if ((response['status'] === 200 && status === 1) || (response['status'] === 200 && status === undefined)) error = false
  else error = true

  if (!error && !!options['onSuccessMessage']) message = options['onSuccessMessage']

  if (options['show_message'] && message) {
    Toast.show({
      text: message,
      buttonText: 'OK',
      type: error ? 'danger' : 'success',
      duration: 4000,
    })
  }

  let returnData = { response, data: result, error, message }
  if (options['debug']) console.log(`<================ AXIOS-RESPONSE  [${options.url}] ${moment().format('DD/MM/YYYY HH:mm:ss:SSS')}===> `, returnData)
  return returnData
}
