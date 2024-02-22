import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { Button, Text, View } from 'native-base'
import { scale } from '../../helpers/styles'
import capitalizeWords from '../../helpers/capitalizeWords'

const styles = StyleSheet.create({
  label: { marginVertical: 20, color: 'white', fontSize: 18 },
  daysContainer: {
    flexDirection: 'column',
    //backgroundColor: 'blue',
  },
  center_row: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  dayLetter: {
    textAlign: 'center',
    flex: 1,
    fontSize: 18,
    color: global.txtWhiteColor,
  },
  dayCircle: {
    marginTop: 5,
    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: global.mainColor,
    borderWidth: 1,
  },
  dayLine: {
    position: 'absolute',
    top: 20,
    left: 15,
    right: 15,
    height: 2,
    backgroundColor: 'white',
  },
  selectAllText: {
    flex: 1,
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  selectAllButton: {
    marginTop: 20,
    alignSelf: 'center',
    width: '50%',
  },
})

export const weekDays = {
  Monday: false,
  Tuesday: false,
  Wednesday: false,
  Thursday: false,
  Friday: false,
  Saturday: false,
  Sunday: false,
}

const strDays = [
  capitalizeWords(global?.['language']?.['monday']),
  capitalizeWords(global?.['language']?.['tuesday']),
  capitalizeWords(global?.['language']?.['wednesday']),
  capitalizeWords(global?.['language']?.['thursday']),
  capitalizeWords(global?.['language']?.['friday']),
  capitalizeWords(global?.['language']?.['saturday']),
  capitalizeWords(global?.['language']?.['sunday']),
]

const DayPicker = ({ label = '', labelStyles = {}, onSelectDay = (day_name, value) => {}, days = weekDays, disabled = false, hideSelectAllButton = false }) => {
  //console.log('DAY-PICKER ===> ', { weekDays, strDays })
  return (
    <>
      {!!label && <Text style={[styles.label, labelStyles]}>{label}</Text>}

      <View style={[styles.center_row]}>
        {strDays.map((label, key) => (
          <Text key={key} style={styles.dayLetter}>
            {label?.charAt(0)}
          </Text>
        ))}
      </View>
      <View style={[styles.center_row, { marginBottom: scale(0.7) }]}>
        <View style={styles.dayLine} />
        {Object.keys(days).map((day_name, key) => (
          <View style={styles.center_row} key={key}>
            <TouchableOpacity
              disabled={disabled}
              onPress={() => {
                onSelectDay(day_name, !days[day_name])
              }}
              style={[
                styles.dayCircle,
                {
                  backgroundColor: days[day_name] ? global.txtWhiteColor : 'black',
                },
              ]}
            />
          </View>
        ))}
      </View>

      {!hideSelectAllButton && (
        <Button
          bordered
          light
          style={styles.selectAllButton}
          onPress={() => {
            if (disabled) return
            Object.keys(weekDays).map(day_name => {
              onSelectDay(day_name, true)
            })
          }}
        >
          <Text style={styles.selectAllText}>{global?.['language']?.['all_day']}</Text>
        </Button>
      )}
    </>
  )
}

export default DayPicker
