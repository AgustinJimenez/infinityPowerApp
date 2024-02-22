import { Icon } from 'native-base'
import React from 'react'
import { ActivityIndicator, Image, TouchableOpacity, View, StyleSheet } from 'react-native'
import Modal from 'react-native-modal'
import { scale } from '../../helpers/styles'
import { RNCamera } from 'react-native-camera'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import RNFS from 'react-native-fs'
import ImageResizer from 'react-native-image-resizer'

const styles = StyleSheet.create({
  button: {
    color: 'white',
    fontSize: 40,
    elevation: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
})

const GalleryIcon = ({ onPress }) => (
  <TouchableOpacity
    style={{
      position: 'absolute',
      bottom: scale(0.4),
      left: scale(0.4),
      alignSelf: 'flex-start',
      fontSize: 40,
    }}
    onPress={onPress}
  >
    <Icon name='image' type='Entypo' style={styles.button} />
  </TouchableOpacity>
)

const FlipCameraIcon = ({ onPress }) => (
  <TouchableOpacity
    style={{
      position: 'absolute',
      bottom: scale(0.4),
      right: scale(0.4),
      alignSelf: 'flex-end',
      fontSize: 40,
    }}
    onPress={onPress}
  >
    <Icon name='md-camera-reverse-sharp' style={styles.button} />
  </TouchableOpacity>
)

const CameraIcon = ({ onPress }) => (
  <TouchableOpacity
    style={{
      position: 'absolute',
      bottom: scale(),
      alignSelf: 'center',
      fontSize: 40,
    }}
    onPress={onPress}
  >
    <Icon name='camera' style={styles.button} />
  </TouchableOpacity>
)

const CancelPreviewIcon = ({ onPress }) => (
  <TouchableOpacity
    style={{
      position: 'absolute',
      bottom: scale(0.4),
      left: scale(0.4),
      alignSelf: 'flex-start',
      fontSize: 40,
    }}
    onPress={onPress}
  >
    <Icon name='close' type='MaterialCommunityIcons' style={styles.button} />
  </TouchableOpacity>
)

const AcceptIcon = ({ onPress }) => (
  <TouchableOpacity
    style={{
      position: 'absolute',
      bottom: scale(0.4),
      right: scale(0.4),
      alignSelf: 'flex-end',
      fontSize: 40,
    }}
    onPress={onPress}
  >
    <Icon type='Ionicons' name='send' style={styles.button} />
  </TouchableOpacity>
)

const Loading = ({ isLoading }) =>
  isLoading && (
    <View style={{ position: 'absolute', flex: 1, alignSelf: 'center' }}>
      <ActivityIndicator
        size='large'
        style={{
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.5,
          shadowRadius: 2,
        }}
        color='white'
      />
    </View>
  )

const CloseCameraIcon = ({ onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      position: 'absolute',
      right: 0,
      top: 0,
      padding: scale(0.4),
    }}
  >
    <Icon
      name='keyboard-arrow-down'
      type='MaterialIcons'
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
)

const Buttons = ({ isLoading, data, onPressTakePhoto, onPressChangeCameraType, onPressCancelPreview, onPressAcceptPhoto, closeCamera, onPressGallery }) => {
  if (isLoading) return null

  if (!data)
    return (
      <>
        <CloseCameraIcon onPress={closeCamera} />
        <GalleryIcon onPress={onPressGallery} />
        <CameraIcon onPress={onPressTakePhoto} />
        <FlipCameraIcon onPress={onPressChangeCameraType} />
      </>
    )

  return (
    <>
      <CloseCameraIcon onPress={closeCamera} />
      <CancelPreviewIcon onPress={onPressCancelPreview} />
      <AcceptIcon onPress={onPressAcceptPhoto} />
    </>
  )
}

const Camera = ({ base64Data = '', isVisible = false, onClose = () => {}, onSave = (base64Data = '') => {} }) => {
  const [data, setData] = React.useState(base64Data)
  const [cameraType, setCameraType] = React.useState('back')
  const [isLoading, setLoadingState] = React.useState(false)
  const cameraRef = React.useRef(null)

  const onPressChangeCameraType = React.useCallback(() => {
    if (cameraType === 'back') setCameraType('front')
    else setCameraType('back')
  }, [cameraType])

  const onPressTakePhoto = React.useCallback(async () => {
    setLoadingState(true)
    let response = await cameraRef.current.takePictureAsync({
      base64: true,
      quality: 0.7,
      mirrorImage: false,
      pauseAfterCapture: true,
    })
    setLoadingState(false)
    //console.log('onPressTakePhoto ===> ', {response})
    const imageResized = await ImageResizer.createResizedImage(response.uri, 1024, 1024, 'JPEG', 80)
    const base64 = await RNFS.readFile(imageResized.uri, 'base64')
    let mime = response.uri.split('.').pop()
    setData(`data:image/${/* mime */ 'jpeg'};base64,${base64}`)
  }, [])

  const onPressGallery = React.useCallback(() => {
    setLoadingState(true)
    launchImageLibrary(
      { videoQuality: Platform.OS === 'android' ? '0.7' : 0.7, mediaType: 'photo', storageOptions: { cameraRoll: true, waitUntilSaved: true } },
      async response => {
        //console.log('launchImageLibrary ===> ',{response})

        if (!response.didCancel) {
          const imageResized = await ImageResizer.createResizedImage(response.uri, 1024, 1024, 'JPEG', 80)
          const base64 = await RNFS.readFile(imageResized.uri, 'base64')
          setData(`data:image/${/* mime */ 'jpeg'};base64,${base64}`)
        }
        setLoadingState(false)
      },
    )
  })

  const onPressCancelPreview = React.useCallback(() => {
    setData(null)
    if (!!cameraRef?.current?.resumePreview()) cameraRef?.current?.resumePreview()
  }, [])

  const closeCamera = React.useCallback(() => {
    onClose()
    if (!!cameraRef?.current?.resumePreview()) cameraRef?.current?.resumePreview()
  }, [])

  const onPressAcceptPhoto = React.useCallback(() => {
    onClose()
    onSave(data)
  }, [data])

  return (
    <>
      <Modal
        isVisible={isVisible}
        onBackdropPress={closeCamera}
        hasBackdrop
        animationInTiming={500}
        animationOutTiming={500}
        swipeDirection='down'
        onSwipeComplete={closeCamera}
        style={{ margin: 0, backgroundColor: 'black' }}
      >
        <Image
          source={{ uri: data || '--' }}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            opacity: !!data ? 1 : 0,
          }}
        />
        <Buttons
          data={data}
          closeCamera={closeCamera}
          onPressTakePhoto={onPressTakePhoto}
          onPressChangeCameraType={onPressChangeCameraType}
          onPressCancelPreview={onPressCancelPreview}
          onPressAcceptPhoto={onPressAcceptPhoto}
          onPressGallery={onPressGallery}
        />

        <RNCamera
          ref={cameraRef}
          type={cameraType}
          autoFocus
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            opacity: !!data ? 0 : 1,
          }}
        >
          <Buttons
            isLoading={isLoading}
            data={data}
            closeCamera={closeCamera}
            onPressTakePhoto={onPressTakePhoto}
            onPressChangeCameraType={onPressChangeCameraType}
            onPressCancelPreview={onPressCancelPreview}
            onPressAcceptPhoto={onPressAcceptPhoto}
            onPressGallery={onPressGallery}
          />
        </RNCamera>

        <Loading isLoading={isLoading} />
      </Modal>
    </>
  )
}
export default Camera
