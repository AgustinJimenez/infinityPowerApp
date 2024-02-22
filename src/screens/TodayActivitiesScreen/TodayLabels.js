import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { scale } from '../../helpers/styles'
import moment from 'moment'
import capitalizeWords from '../../helpers/capitalizeWords'
import { useSelector } from 'react-redux'
import { datasetSelector } from '../../redux/selectors'

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(88,89,91,1)',
    paddingTop: scale(0.2),
    //paddingVertical: scale(0.1),
    paddingHorizontal: scale(0.4),
    borderRadius: scale(0.195),
  },
  dayInitialsText: {
    color: 'rgba(255,255,255,0.5)',
    fontWeight: '700',
    fontSize: scale(0.5),
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0.7, height: 0.7 },
    textShadowRadius: 1,
  },
  dayNumberText: {
    color: 'rgba(255,255,255,1)',
    fontWeight: '700',
    fontSize: scale(0.5),
    textAlign: 'center',
    paddingTop: scale(0.1),
    paddingBottom: scale(0.19),
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0.7, height: 0.7 },
    textShadowRadius: 1,
    //backgroundColor: 'blue',
  },
  activitiesCompleted: {
    backgroundColor: 'rgba(115,221,98,1)',
    color: 'rgba(255, 255, 255, 1)',
  },
})

const TodayLabels = ({ containerStyle = {} }) => {
  const [todayInitials, setInitials] = React.useState('-')
  const [todayDayNumber, setDayNumber] = React.useState(0)
  const [achievedDay, setAchievedDay] = React.useState(false)
  const current_week_achieved_days = useSelector(state => datasetSelector(state, 'current_week_achieved_days'))

  React.useEffect(() => {
    let now = moment()
    setInitials(capitalizeWords(global?.language?.[now.format('dddd').toLowerCase()]?.substr?.(0, 3)))
    setDayNumber(now.get('D'))
    setAchievedDay(!!current_week_achieved_days[now.format('YYYY-MM-DD')])
  }, [current_week_achieved_days])

  return (
    <View style={[styles.container, containerStyle, achievedDay ? styles.activitiesCompleted : {}]}>
      <Text style={[styles.dayInitialsText, achievedDay ? styles.activitiesCompleted : {}]}>{todayInitials}</Text>
      <Text style={[styles.dayNumberText]}>{todayDayNumber}</Text>
    </View>
  )
}

export default TodayLabels
