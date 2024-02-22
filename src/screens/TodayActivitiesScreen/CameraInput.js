import React from 'react'
import { TouchableOpacity, Image, ActivityIndicator, View, Text } from 'react-native'
import { scale, primaryColor } from '../../helpers/styles'
import { Icon } from 'native-base'
import ImagePicker from 'react-native-image-crop-picker'
import capitalizeWords from '../../helpers/capitalizeWords'
import AwesomeAlert from 'react-native-awesome-alerts'
import sleep from '../../helpers/sleep'
import ModalImagePreview from '../../components/ModalImagePreview'
import Camera from '../../components/Camera'

const CameraInput = ({
  data = '',
  onSave = () => {},
  visible = true,
  isNewLayout = false,
  showPreviewOverIcon = true,
  color = 'white',
  containerStyles = {},
}) => {
  const [camearaOptions, setCameraOptions] = React.useState({})
  const [isLoading, setIsLoading] = React.useState(false)
  const [alertIsOpen, setAlertIsOpen] = React.useState(false)
  const [showPreview, setShowPreview] = React.useState(false)
  const [cameraVisibility, setCameraVisibility] = React.useState(false)

  React.useEffect(() => {
    setCameraOptions({
      includeBase64: true,
      compressImageQuality: 0.7,
      mediaType: 'photo',
      forceJpg: true,
      //cropping: true,
      cropperToolbarColor: 'red',
      //title: capitalizeWords(global?.['language']?.['select_a_image']),
      cropperChooseText: capitalizeWords(global?.['language']?.['choose']),
      cropperCancelText: capitalizeWords(global?.['language']?.['cancel']),
      //takePhotoButtonTitle: capitalizeWords(global?.['language']?.['take_photo']),
      //chooseFromLibraryButtonTitle: capitalizeWords(global?.['language']?.['choose_from_library']),
    })
  }, [setCameraOptions])

  if (!visible) return null

  return (
    <>
      {isLoading ? (
        <ActivityIndicator style={{ paddingHorizontal: scale(0.4), justifyContent: 'center', flex: 0.1 }} />
      ) : (
        <TouchableOpacity
          onPress={() => {
            setCameraVisibility(true)
          }}
          style={{
            paddingHorizontal: scale(0.4),
            justifyContent: 'center',
            shadowOffset: { width: 1, height: 1 },
            shadowColor: '#000',
            shadowOpacity: 0.5,
            ...containerStyles,
            //width: scale(1.5),
          }}
        >
          {!!data && !!showPreviewOverIcon ? (
            <Image source={{ uri: data }} style={{ width: scale(0.8), height: scale(0.8), borderRadius: scale(0.4) }} resizeMode='contain' />
          ) : (
            <Icon name='camera' type='FontAwesome' style={{ color, fontSize: scale(0.5) }} />
          )}
        </TouchableOpacity>
      )}
      <AwesomeAlert
        show={alertIsOpen}
        showProgress={false}
        onDismiss={() => {
          setAlertIsOpen(false)
        }}
        onCancelPressed={() => {
          setAlertIsOpen(false)
        }}
        onConfirmPressed={() => {}}
        customView={
          <View style={{ marginTop: scale(0.3) }}>
            <TouchableOpacity
              onPress={() => {
                setAlertIsOpen(false)
                setShowPreview(true)
              }}
              style={{
                backgroundColor: primaryColor,
                paddingHorizontal: scale(0.3),
                paddingVertical: scale(0.25),
                marginVertical: scale(0.1),
                borderRadius: scale(0.2),
              }}
            >
              <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>
                {capitalizeWords(global?.['language']?.['show_image'], { firstOnly: true })}
              </Text>
            </TouchableOpacity>
          </View>
        }
      />
      <ModalImagePreview showPreview={showPreview} source={{ ...{ uri: data } }} onClose={() => setShowPreview(false)} />
      <Camera data={data} isVisible={cameraVisibility} onClose={() => setCameraVisibility(false)} onSave={base64Data => onSave(base64Data)} />
    </>
  )
}

export default CameraInput
