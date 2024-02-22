import React from 'react'
import { View, Text } from 'react-native'
import { globalStyles } from '../../helpers/styles'
import { useSelector } from 'react-redux'
import { datasetSelector } from '../../redux/selectors'
import moment from 'moment'
import { useTranslation } from 'react-i18next'

const todayDayNumber = moment().day()

const TodayPlayedSessionsCount = props => {
  const { t } = useTranslation()
  let count = 0
  const { week_played_sessions = [] } = useSelector(state => datasetSelector(state, 'general_datas'))
  week_played_sessions.map(({ total_time, completed_at }) => {
    if (todayDayNumber === moment(completed_at).day()) count++
  })

  return (
    <View style={globalStyles.meterTextContainer}>
      <Text style={[globalStyles.centerText, { fontSize: 15, color: 'white' }]}>{count}</Text>
      <Text style={[globalStyles.centerText, { fontSize: 10, color: 'white', marginTop: 20 }]}>{t('label_reproductions')}</Text>
    </View>
  )
}

export default TodayPlayedSessionsCount
