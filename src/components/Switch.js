import React from 'react'
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { scale } from '../helpers/styles'
import ImageQuestion from '../img/question.png'
import { PanGestureHandler, LongPressGestureHandler, State } from 'react-native-gesture-handler'
import { Icon } from 'native-base'

const styles = StyleSheet.create({
  switchIcon: {
    fontSize: scale(0.8),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  container: {
    width: scale(2),
    height: scale(),
    borderRadius: scale(),
    flexDirection: 'row',
    overflow: 'hidden',
  },
  icon_container: {
    width: scale(),
    height: scale(),
    borderRadius: scale() / 2,
    backgroundColor: 'white',
    justifyContent: 'center',
    borderWidth: scale(0.1),
  },
})

const switchAlign = selectedOptionValue => {
  switch (selectedOptionValue) {
    case null:
      return 'center'
    case true:
      return 'flex-end'
    default:
      return 'flex-start'
  }
}

const valueColor = selectedOptionValue => {
  switch (selectedOptionValue) {
    case false:
      return 'rgba(255,0,61,1)'
    case null:
      return 'gray'
    case true:
      return 'rgba(0,255,133,1)'
    default:
      return 'blue'
  }
}

const SwitchIcon = ({ value, iconStyle, color }) => {
  switch (value) {
    case false:
      return <Icon name='cross' type='Entypo' style={[styles.switchIcon, { color }, iconStyle]} />
    case null:
      delete iconStyle['fontSize']
      return <Image source={ImageQuestion} resizeMode='contain' style={[{ width: scale(0.25), alignSelf: 'center' }, iconStyle]} />
    case true:
      return <Icon name='check' type='Octicons' style={[styles.switchIcon, { color }, iconStyle]} />
    default:
      return null
  }
}

const Switch = ({
  value = null,
  onChange = () => {},
  visible = true,
  disabled = false,
  containerStyle = {},
  iconStyle = {},
  iconContainerStyle,
  switchColor = valueColor || ((value = '') => {}),
}) => {
  const longPressHandlerRef = React.createRef()
  const panGestureHandlerRef = React.createRef()
  const [selectedOptionValue, setSelectedOptionValue] = React.useState(value)
  const [marginLeftIcon, setMarginLeftIcon] = React.useState(0)

  const onChangeX = React.useCallback(
    x => {
      let width = scale(2)
      let newValue = selectedOptionValue
      if (x < width / 3.5) {
        x = 1
        newValue = false
      } else if (x > width / 1.6) {
        x = width / 1.6
        newValue = true
      } else {
        newValue = null
        x = 0
      }
      updateValue(newValue)
      setMarginLeftIcon(x)
    },
    [marginLeftIcon, selectedOptionValue],
  )
  const updateValue = React.useCallback(newValue => {
    setSelectedOptionValue(newValue)
  }, [])

  const onTapEvent = React.useCallback(
    ({ nativeEvent: { x, state } }) => {
      if (disabled) return
      onChangeX(x)
      if (state === State.END && (selectedOptionValue === true || selectedOptionValue === false)) {
        //console.log('SENDING ===> ', selectedOptionValue)
        onChange(selectedOptionValue)
      }
    },
    [selectedOptionValue],
  )

  const iconColor = switchColor(selectedOptionValue)
  const align = switchAlign(selectedOptionValue)

  if (!visible) return null

  return (
    <LongPressGestureHandler
      ref={longPressHandlerRef}
      simultaneousHandlers={panGestureHandlerRef}
      minDurationMs={10}
      onGestureEvent={onTapEvent}
      onHandlerStateChange={onTapEvent}
    >
      <View style={[styles.container, { backgroundColor: iconColor, justifyContent: align }, containerStyle]}>
        <PanGestureHandler ref={panGestureHandlerRef} simultaneousHandlers={longPressHandlerRef}>
          <TouchableOpacity style={[styles.icon_container, { borderColor: iconColor, marginLeft: marginLeftIcon }, iconContainerStyle]}>
            <SwitchIcon value={selectedOptionValue} iconStyle={iconStyle} color={iconColor} />
          </TouchableOpacity>
        </PanGestureHandler>
      </View>
    </LongPressGestureHandler>
  )
}

export default Switch
