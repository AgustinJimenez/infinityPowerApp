import { Icon } from 'native-base'
import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { ProgressCircle as Circle } from 'react-native-svg-charts'
import { scale } from '../../helpers/styles'

const styles = StyleSheet.create({
  whiteDotStart: {
    backgroundColor: 'rgba(255,255,255,1)',
    width: scale(0.3),
    height: scale(0.3),
    borderRadius: scale(0.3) / 2,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export const achievedSuccessColor = 'rgba(47, 211, 21, 1)'
export const achievedFailColor = 'rgba(255,0,61,1)'

const ProgressCircleTitle = ({ size = 20, title, style = {} }) =>
  !!title && (
    <Text
      style={[
        {
          color: 'white',
          textAlign: 'center',
          marginBottom: scale(0.1),
          fontWeight: '700',
          fontSize: size / 4,
        },
        style,
      ]}
    >
      {title}
    </Text>
  )

const CheckCrossIcon = ({ achieved, size, visible, color }) =>
  visible && (
    <View
      style={{
        backgroundColor: 'rgba(255,255,255,1)',
        width: size / 3.5,
        height: size / 3.5,
        borderRadius: size / 3.5 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: 5,
        top: 10,
      }}
    >
      <Icon
        name={achieved ? 'check' : 'cross'}
        type={achieved ? 'Octicons' : 'Entypo'}
        style={{
          color,
          fontSize: size / 3.5,
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          /* , marginTop: scale(0.07)  */
        }}
      />
    </View>
  )

const WhiteDotStart = ({}) => <View style={styles.whiteDotStart} />

const ProgressCircle = ({
  progress = 100,
  size = 100,
  checkmarkSize = 100,
  title = '',
  titleSize = 0,
  titleStyle = {},
  subtitle = '0/0',
  achieved = true,
  containerStyle = {},
  ringBgColor = 'rgba(49, 50, 54)',
  successColor = achievedSuccessColor,
  failColor = achievedFailColor,
  showCheckFailIcon = true,
  strokeWidth = 8,
  endAngle = -100,
  onPress = null,
}) => {
  let ContainerComponent
  titleSize = !!titleSize ? titleSize : size / 4

  // const color = achieved ? achievedSuccessColor : achievedFailColor
  const color = achieved ? successColor : failColor

  if (!!onPress) ContainerComponent = TouchableOpacity
  else ContainerComponent = View
  //console.log({ progress })
  //console.log('#############################################')
  return (
    <ContainerComponent style={[{ width: size, marginHorizontal: scale(0.3) }, containerStyle]} onPress={onPress}>
      <ProgressCircleTitle size={size} title={title} style={titleStyle} />
      <View style={{ height: size, width: size }}>
        <Circle
          progress={progress / 100}
          progressColor={color}
          strokeWidth={strokeWidth}
          backgroundColor={'#FFFFFF20'}
          style={{ height: '100%', width: '100%', position: 'absolute' }}
          endAngle={endAngle}
        />
        <View style={{ flex: 1, justifyContent: 'center' }}>
          {!isNaN(progress) && (
            <Text style={{ color: 'white', fontSize: titleSize, fontWeight: '700', alignSelf: 'center', textAlign: 'center' }}>{`${progress}%`}</Text>
          )}
          {!!subtitle && <Text style={{ color: 'white', fontSize: size / 5, fontWeight: '400', alignSelf: 'center' }}>{subtitle}</Text>}
        </View>
        <CheckCrossIcon visible={showCheckFailIcon} achieved={achieved} size={checkmarkSize} color={color} />
      </View>
    </ContainerComponent>
  )
}
export default ProgressCircle
