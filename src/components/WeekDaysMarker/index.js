import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { primaryColor, activeColor ,scale } from '../../helpers/styles'
import capitalizeWords from '../../helpers/capitalizeWords'
import moment from 'moment'
import datesBetweenDates from '../../helpers/datesBetweenDates'
import styles from './styles'
import { useSelector } from 'react-redux'
import { datasetSelector } from '../../redux/selectors'

const dayListFormat = (date, now) => ({
  dayInitial: global?.['language']?.[date.format('dddd')?.toLocaleLowerCase()]?.charAt(0)?.toLocaleUpperCase(),
  dayNumber: date.format('D'),
  isToday: now.day() === date.day(),
  date,
})

const WeekDaysMarker = ({ onPress, onPressDay, displayDate = true }) => {
  const DayListContainer = !!onPress ? TouchableOpacity : View
  const DayContainer = !!onPressDay ? TouchableOpacity : View

  let now = moment()
  now.locale('en')
  let daysOfWeek = datesBetweenDates(now.clone().startOf('week').subtract(1, 'day'), now.clone().endOf('week'))
  let monthName = capitalizeWords(global.language[now.format('MMMM').toLowerCase()])
  let dayName = now.format('dddd').toLowerCase()
  dayName = capitalizeWords(global.language?.[dayName])

  const current_week_achieved_days = useSelector(state => datasetSelector(state, 'current_week_achieved_days'))
  let date_label = `${dayName}, ${monthName} ${now.locale('en').format('D')}`

  return (
    <View>
      {
        displayDate ? 
        <View style={styles.todayResumeTextContainer}>
          <Text style={[styles.todayResumeText, styles.textShadow]}>{date_label}</Text>
        </View> : 
        null
      }
      
      <DayListContainer style={styles.dayListContainer} onPress={onPress}>
        {daysOfWeek
          .map(date => dayListFormat(date, now))
          .map(({ dayInitial, dayNumber, isToday = false, date }, key) => {
            let achievedDay = !!current_week_achieved_days[date.format('YYYY-MM-DD')]
            let dayCheckName = date.format('dddd').toLowerCase()
            let dayFirst = global?.['language']?.[dayCheckName?.toLocaleLowerCase()].toLocaleUpperCase().substring(0,3)
            return (
              <DayContainer
                key={key}
                style={[
                  styles.dayContainer,
                  { backgroundColor: achievedDay ? activeColor : 'rgba(100,100,100,0.6)' },
                  isToday ? { borderColor: 'white', borderWidth: isToday ? scale(0.05) : 0 } : null,
                ]}
                onPress={onPressDay}
              >
                <Text style={styles.dayInitial}>{dayFirst}</Text>
                <Text style={styles.dayNumber}>{dayNumber}</Text>
              </DayContainer>
            )
          })}
      </DayListContainer>
    </View>
  )
}
export default WeekDaysMarker
