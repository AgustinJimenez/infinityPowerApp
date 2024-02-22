import React from 'react'
import { View, Text } from 'react-native'
import { globalStyles } from '../../helpers/styles'
import intervalTimeToMinutes from '../../helpers/intervalTimeToMinutes'
import { useSelector } from 'react-redux'
import { datasetSelector } from '../../redux/selectors'
import moment from 'moment'
import { useTranslation } from 'react-i18next'

const todayDayNumber = moment().day()

const TodayPlayedSessionsAchievedMinutes = props => {
  const { t } = useTranslation()
  let minutesPlayedToday = 0
  const { week_played_sessions = [] } = useSelector(state => datasetSelector(state, 'general_datas'))
  week_played_sessions.map(({ total_time, completed_at }) => {
    if (todayDayNumber === moment(completed_at).day()) minutesPlayedToday += intervalTimeToMinutes(total_time)
  })

  return (
    <View style={[globalStyles.meterTextContainer]}>
      <Text style={[globalStyles.centerText, { fontSize: 15, color: 'white' }]}>{parseInt(minutesPlayedToday)} min</Text>
      <Text style={[globalStyles.centerText, { fontSize: 10, color: 'white', marginTop: 20 }]}>{t('label_minutes_done')}</Text>
    </View>
  )
}

export default TodayPlayedSessionsAchievedMinutes
