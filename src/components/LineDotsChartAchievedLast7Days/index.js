import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { scale as sScale } from '../../helpers/styles'
import Svg, { Line, Circle, G, Text as SvgText } from 'react-native-svg'

const styles = StyleSheet.create({
  container: {
    //backgroundColor: 'blue',
    paddingBottom: sScale(0.3),
    marginBottom: sScale(0.3),
    marginLeft: -sScale(0.8),
  },
  right_bottom_label: { fontWeight: '400', fontSize: sScale(0.4), color: 'rgba(255,255,255,1)', textAlign: 'center', marginTop: sScale(0.7) },
})

const ChartCircles = ({ x1 = 0, y1 = 0, x2 = 0, y2 = 0, isLast, showLastValue }) => {
  return (
    <>
      <Circle cx={`${x1}%`} cy={`${y1}%`} r='10' strokeWidth='8' fill={y1 >= 75 ? 'rgba(47,211,21,1)' : 'rgba(255,0,61,1)'} />
      {!isLast && <Circle cx={`${x2}%`} cy={`${y2}%`} r='10' strokeWidth='8' fill={y1 >= 75 ? 'rgba(47,211,21,1)' : 'rgba(255,0,61,1)'} />}
      {/* !!showLastValue && isLast && (
        <SvgText fill='white' stroke='white' fontSize='30' fontWeight='bold' x={`${x1}%`} y={`${y1 - 50}%`} rotate='180'>
          {`${y1}`}
        </SvgText>
      ) */}
    </>
  )
}

const ChartLine = ({ x1 = 0, y1 = 0, x2 = 0, y2 = 0, index, count, showLastValue }) => {
  let isLast = index === count - 1
  //console.log({ index, x1, x2, y1, y2 })
  return (
    <>
      {!isLast && <Line x1={`${x1}%`} y2={`${y2}%`} x2={`${x2}%`} y1={`${y1}%`} stroke='white' strokeWidth='2' />}
      <ChartCircles x1={x1} y1={y1} x2={x2} y2={y2} isLast={isLast} showLastValue={showLastValue} />
    </>
  )
}

const LineDotsChartAchievedLast7Days = ({ data = [], right_bottom_label = '', height = '100%', scale = 0.75, style = {}, showLastValue = true }) => {
  data = data.filter(d => !isNaN(d))
  data = data?.reverse?.()
  //console.log('<=== === === ===>', data)
  return (
    <>
      {/* 
      <LineChart
        style={{
          ...styles.container,
          ...style,
        }}
        fromZero
        renderDotContent={({ y, index }) =>
          index === data.length - 1 && (
            <View style={{ flex: 1, position: 'absolute', right: scale(data[index] >= 10 ? 0.2 : 0.4), top: y - 30 }} key={index}>
              <Text
                style={{
                  fontWeight: '700',
                  fontSize: scale(0.4),
                  color: 'white',
                }}
              >
                {data[index]}%
              </Text>
              <Text style={styles.right_bottom_label}>{right_bottom_label}</Text>
            </View>
          )
        }
        data={{
          datasets: [
            {
              data,
              color: (opacity = 1) => 'rgba(255,255,255,1)', // optional
              strokeWidth: 1, // optional
            },
          ],
        }}
        getDotColor={percentage => (percentage >= 75 ? 'rgba(47,211,21,1)' : 'rgba(255,0,61,1)')}
        width={scale(8)}
        height={scale(1.2)}
        chartConfig={{
          height: scale(1.2),
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
      /> */}
      <View
        style={{
          width: '100%',
          transform: [{ rotate: '180deg' }],
          alignSelf: 'flex-end',
          height,
          maxHeight: sScale(2),
          ...style,
        }}
      >
        <Svg height='100%' width='100%'>
          <G scale={scale} x='10' y='10'>
            {data.map((y1, key) => {
              let y2 = data[key + 1]
              const percentageSection = 20
              const x1 = percentageSection * key
              const x2 = percentageSection * (key + 1)
              return <ChartLine x1={x1} x2={x2} y1={y1} y2={y2} key={key} index={key} count={data.length} showLastValue={showLastValue} />
            })}
          </G>
        </Svg>
      </View>
    </>
  )
}

export default LineDotsChartAchievedLast7Days
