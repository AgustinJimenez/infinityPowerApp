import React from 'react'
import { View, Text } from 'react-native'
import * as fn from '../../helpers/scripts'
import { globalStyles } from '../../helpers/styles'
import intervalTimeToMinutes from '../../helpers/intervalTimeToMinutes'
import { useSelector } from 'react-redux'
import { datasetSelector } from '../../redux/selectors'
import moment from 'moment'
import { useTranslation } from 'react-i18next'

const todayDayNumber = moment().day()

const TodayPlayedSessionsAverageMinutes = props => {
  let minutesPlayedToday = 0
  let countSessions = 0

  const { week_played_sessions = [] } = useSelector(state => datasetSelector(state, 'general_datas'))
  week_played_sessions.map(({ total_time, completed_at }) => {
    if (todayDayNumber === moment(completed_at).day()) {
      minutesPlayedToday += intervalTimeToMinutes(total_time)
      countSessions++
    }
  })
  const averageMinutes = minutesPlayedToday / countSessions
  const { t } = useTranslation()

  return (
    <View style={globalStyles.meterTextContainer}>
      <Text style={[globalStyles.centerText, { fontSize: 15, color: 'white' }]}>{parseInt(averageMinutes || 0)} min</Text>
      <Text style={[globalStyles.centerText, { fontSize: 10, color: 'white', marginTop: 20 }]}>{t('label_average')}</Text>
    </View>
  )
}

export default TodayPlayedSessionsAverageMinutes
