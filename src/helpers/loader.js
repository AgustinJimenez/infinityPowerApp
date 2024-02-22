import React from 'react'
import { StyleSheet, ActivityIndicator, View } from 'react-native'
import Modal from 'react-native-modal'
import * as fn from '../helpers/scripts'
import { scale } from './styles'

const customStyles = StyleSheet.create({
  loaderContainer: {
    backgroundColor: 'white',
    width: 80,
    height: 80,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
})

const Loader = ({ loading, dismissable = true }) => {
  const [forceClose, setForceClose] = React.useState(false)

  return (
    <Modal
      useNativeDriver
      backdropOpacity={0}
      animationIn='fadeIn'
      animationOut='fadeOut'
      isVisible={loading && !forceClose}
      onBackdropPress={() => !!dismissable && setForceClose(true)}
      style={{
        bottom: scale(2),
        margin: 0,
      }}
    >
      <View style={customStyles.loaderContainer}>
        <ActivityIndicator size='large' color={global.mainColor} animating={loading} />
      </View>
    </Modal>
  )
}

export default Loader
