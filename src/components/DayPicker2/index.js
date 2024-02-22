import React from 'react'
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import capitalizeWords from '../../helpers/capitalizeWords'
import { scale } from '../../helpers/styles'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  dayContainer: {
    backgroundColor: 'rgba(120, 120, 120, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: scale(0.14),
    paddingVertical: scale(0.4),
    borderRadius: scale(0.2),
    flex: 1,
  },
  dayContainerSelected: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  dayText: {
    color: 'rgba(255, 255, 255, 1)',
  },
  dayTextSelected: {
    color: 'rgba(0, 0, 0, 1)',
  },
  allDaysButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    width: '50%',
    alignSelf: 'center',
    paddingVertical: scale(0.15),
    marginTop: scale(0.3),
    borderRadius: scale(0.2),
  },
  allDaysButtonText: {
    textAlign: 'center',
  },
})

export const allDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

const dayIsSelected = (dayName, selectedDays) => {
  let isSelected = !!selectedDays.find(dName => dName === dayName)
  return isSelected
}

const DayPicker2 = ({ days: selectedDays = [], onSelectDay = () => {}, containerStyle = {}, labelComponent = null }) => {
  const onPressDay = React.useCallback(
    dayName => {
      let newSelectedDays = [...selectedDays]
      const isSelectedDay = dayIsSelected(dayName, newSelectedDays)
      if (!isSelectedDay) newSelectedDays.push(dayName)
      else newSelectedDays = newSelectedDays.filter(dName => dName !== dayName)

      onSelectDay(newSelectedDays)
    },
    [selectedDays],
  )

  return (
    <>
      <View style={[styles.container, containerStyle]}>
        {React.Children.toArray(
          allDays.map(dayName => {
            const isSelectedDay = dayIsSelected(dayName, selectedDays)
            return (
              <TouchableOpacity style={[styles.dayContainer, isSelectedDay ? styles.dayContainerSelected : {}]} onPress={() => onPressDay(dayName)}>
                <Text style={[styles.dayText, isSelectedDay ? styles.dayTextSelected : {}]}>
                  {capitalizeWords(global?.['language']?.[dayName])?.charAt?.(0)}
                </Text>
              </TouchableOpacity>
            )
          }),
        )}
      </View>
      <TouchableOpacity style={styles.allDaysButton} onPress={() => onSelectDay(allDays)}>
        <Text style={styles.allDaysButtonText}>{global?.language?.all_day}</Text>
      </TouchableOpacity>
    </>
  )
}
export default DayPicker2
