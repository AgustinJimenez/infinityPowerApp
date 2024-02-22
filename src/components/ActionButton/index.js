import React from 'react'
import { TouchableOpacity, Text, StyleSheet, Animated, Image, Easing } from 'react-native'
//import { Icon } from 'native-base'
import Icon from 'react-native-vector-icons/Octicons'
import { scale, primaryColor } from '../../helpers/styles'
import Modal from 'react-native-modal'

const styles = StyleSheet.create({
  container: {
    backgroundColor: primaryColor,
    width: scale(2),
    height: scale(2),
    borderRadius: scale(),
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconImage: {
    width: scale(),
    height: scale(),
  },
  firstIcon: {},
  secondIcon: {},
  thirdIcon: {},
  fourthIcon: {},
})

const IconsGroups = ({}) => {
  const [firstButtonImage, setFirstButtonImage] = React.useState(null)
  React.useEffect(() => setFirstButtonImage(Icon.getImageSourceSync('plus', scale(), 'red')), [])

  const [secondButtonImage, setSecondButtonImage] = React.useState(null)
  React.useEffect(() => setSecondButtonImage(Icon.getImageSourceSync('plus', scale(), 'blue')), [])

  const [thirdButtonImage, setThirdButtonImage] = React.useState(null)
  React.useEffect(() => setThirdButtonImage(Icon.getImageSourceSync('plus', scale(), 'green')), [])

  const [fourthButtonImage, setFourthButtonImage] = React.useState(null)
  React.useEffect(() => setFourthButtonImage(Icon.getImageSourceSync('plus', scale(), 'yellow')), [])
  return (
    <>
      <TouchableOpacity style={[styles.container, styles.firstIcon]}>
        <Image style={[styles.iconImage]} source={firstButtonImage} />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.container, styles.secondIcon]}>
        <Image style={[styles.iconImage]} source={secondButtonImage} />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.container]}>
        <Image style={[styles.iconImage]} source={thirdButtonImage} />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.container]}>
        <Image style={[styles.iconImage]} source={fourthButtonImage} />
      </TouchableOpacity>
    </>
  )
}

const ActionButton = ({ style = {} }) => {
  const [mainButtonImage, setMainButtonImage] = React.useState(null)
  React.useEffect(() => setMainButtonImage(Icon.getImageSourceSync('plus', scale(), 'white')), [])

  const [isOpened, setOpenStatus] = React.useState(false)

  const spinValue = React.useRef(new Animated.Value(0)).current
  const toggle = React.useCallback(() => {
    Animated.parallel([
      Animated.timing(spinValue, {
        toValue: isOpened ? 0 : 45,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(),
    ]).start()

    setOpenStatus(!isOpened)
  })
  const spin = spinValue.interpolate({
    inputRange: [0, 45],
    outputRange: ['0deg', '45deg'],
  })

  return (
    <>
      <TouchableOpacity style={[styles.container, style]} onPress={toggle}>
        <Animated.Image
          style={[
            styles.iconImage,
            {
              transform: [{ rotate: spin }],
            },
          ]}
          source={mainButtonImage}
        />
      </TouchableOpacity>

      <Modal isVisible={isOpened} onBackButtonPress={toggle} onBackdropPress={toggle} backdropColor='rgba(50,53,60,0.9)'>
        <IconsGroups />
      </Modal>
    </>
  )
}
export default ActionButton
