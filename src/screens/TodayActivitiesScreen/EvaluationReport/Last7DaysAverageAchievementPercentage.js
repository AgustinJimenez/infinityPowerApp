import React from 'react'
import { scale } from '../../../helpers/styles'
import { View, Text } from 'react-native'
import { meanBy } from 'lodash'

const Last7DaysAverageAchievementPercentage = ({ last_7_days_achievement_percentages = [] }) => {
  let average_achievements_las_7_days = Math.round(meanBy(last_7_days_achievement_percentages)) || 0

  return (
    <View
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        paddingHorizontal: scale(0.5),
        paddingVertical: scale(0.15),
        borderRadius: scale(0.3),
        alignSelf: 'center',
        elevation: 10,
        /* 
        shadowOffset: {
          width: 7,
          height: 7,
        },
        shadowOpacity: 0.5,
        shadowRadius: 2,
*/
      }}
    >
      <Text
        style={{
          color: 'white',
          fontWeight: 'bold',
          fontSize: scale(0.7),
          textAlign: 'center',
        }}
      >
        {average_achievements_las_7_days}%
      </Text>
    </View>
  )
}

export default Last7DaysAverageAchievementPercentage
