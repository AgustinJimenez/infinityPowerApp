import React from 'react'
import { ActivityIndicator, Image, TouchableOpacity, View, Icon } from 'react-native'
import Modal from 'react-native-modal'
import { scale } from '../../helpers/styles'

const ModalImagePreview = ({ showPreview = false, source = null, onClose = () => {} }) => {
  const [loading, setLoading] = React.useState(false)

  return (
    <Modal
      isVisible={showPreview}
      onBackdropPress={onClose}
      hasBackdrop
      animationInTiming={500}
      animationOutTiming={500}
      swipeDirection='down'
      onSwipeComplete={onClose}
      style={{
        margin: 0,
      }}
    >
      {loading && (
        <View style={{ position: 'absolute', alignSelf: 'center' }}>
          <ActivityIndicator size='large' />
        </View>
      )}
      <Image
        source={source}
        style={{ width: '90%', height: '100%', alignSelf: 'center' }}
        resizeMode='contain'
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
      />
      <TouchableOpacity
        onPress={onClose}
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          padding: scale(0.4),
        }}
      >
        <Icon
          name='close'
          style={{
            color: 'white',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.5,
            shadowRadius: 2,
            elevation: 10,
          }}
        />
      </TouchableOpacity>
    </Modal>
  )
}
export default ModalImagePreview
