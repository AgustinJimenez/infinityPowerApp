import React from 'react'
import { TouchableOpacity, Image, ActivityIndicator } from 'react-native'

import { primaryColor, scale } from '../helpers/styles'
import ImageSend from '../img/send2.png'

const SendButton = ({ onPress = () => {}, style = {}, size = scale(0.9), isLoading = false, visible = true }) => {
  if (!visible) return null

  if (isLoading) return <ActivityIndicator style={[{ width: size, height: size }, style]} />

  return (
    <TouchableOpacity
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: primaryColor,
          alignSelf: 'center',
        },
        style,
      ]}
      onPress={onPress}
    >
      <Image
        source={ImageSend}
        resizeMode='contain'
        style={{
          flex: 1,
          width: size * 0.6,
          height: size * 0.6,
          alignSelf: 'center',
          justifyContent: 'center',
        }}
      />
    </TouchableOpacity>
  )
}

export default SendButton
