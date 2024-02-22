import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { LineChart } from 'react-native-chart-kit'
import { scale } from '../../../../helpers/styles'
import { tailwind } from '../../../../tailwind'

const styles = StyleSheet.create({
  container: {
    paddingVertical: scale(0.1),
    marginLeft: -scale(0.8),
    // backgroundColor: 'blue',
  },
  right_bottom_label: { fontWeight: '400', fontSize: 12, color: 'white', textAlign: 'center', marginTop: scale(0.5) },
})

const LineDotsChartAchievedLast7Days = ({ data = [], right_bottom_label = '', style = {} }) => {
  data = data.filter(d => !isNaN(d)).map(d => (d == 0 ? (d = 25) : d))
  //console.log('LineDotsChartAchievedLast7Days ===> ', data)
  return (
    <View style={tailwind('-ml-10')}>
      <LineChart
        style={[styles.container, style]}
        fromZero
        // renderDotContent={({ y, index }) =>
        //   index === data.length - 1 && (
        //     <View style={{ flex: 1, top: 0 }} key={index}>
        //       <Text
        //         style={{
        //           fontWeight: '700',
        //           fontSize: 12,
        //           color: 'white',
        //         }}
        //       >
        //         {/* {data[index]}% */}
        //       </Text>
        //       <Text style={styles.right_bottom_label}>{right_bottom_label}</Text>
        //     </View>
        //   )
        // }
        data={{
          datasets: [
            {
              data,
              color: (opacity = 1) => `white`, // optional
              strokeWidth: 1, // optional
            },
          ],
        }}
        getDotColor={percentage => (percentage >= 75 ? 'rgba(47,211,21,1)' : 'rgba(255,0,61,1)')}
        width={scale(8)}
        height={scale(1.5)}
        chartConfig={{
          height: scale(1.5),

          color: () => {},
          propsForDots: {
            r: 7,
          },
        }}
        hideLegend
        transparent
        withInnerLines={false}
        withShadow={false}
        withOuterLines={false}
        withVerticalLabels={false}
        withHorizontalLabels={false}
      />
    </View>
  )
}

export default LineDotsChartAchievedLast7Days
