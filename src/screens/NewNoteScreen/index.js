import React, { useState } from 'react'
import { View, TouchableOpacity, TextInput, SafeAreaView, Image } from 'react-native'
import { Icon } from 'native-base'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CameraInput from '../TodayActivitiesScreen/CameraInput'
import { NavigationContext } from 'react-navigation'
import MicrophoneInput from '../TodayActivitiesScreen/MicrophoneInput'
import { useTranslation } from 'react-i18next'
import styles from './styles'

const getInputBoxFlex = ({ inputIsFocused, noteAudio }) => {
  if (!!inputIsFocused) return 1
  else if (!!noteAudio) return 0.5
  else return 1
}

const NewNoteScreen = ({}) => {
  const [inputIsFocused, senInputFocusStatus] = useState(false)
  const [inputHeight, setInputHeight] = useState(0)
  const [newNoteImage = '', setNewNoteImage] = useState('')
  const [noteAudio = '', setNoteAudio] = useState('')
  const navigation = React.useContext(NavigationContext)
  const { t } = useTranslation()
  const [noteText, setNoteText] = useState('')

  const noteHasSomeValue = React.useMemo(() => (!!noteText && noteText.trim() !== '') || !!noteAudio || !!newNoteImage, [noteText, noteAudio, newNoteImage])

  const onSubmit = React.useCallback(
    event => {
      if (noteHasSomeValue) navigation.navigate('UsersListScreen', { notes: noteText, newPhoto: newNoteImage, newAudio: noteAudio })
      event.preventDefault()
    },
    [noteHasSomeValue, noteText, newNoteImage, noteAudio],
  )

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>{!!newNoteImage && <Image source={{ uri: newNoteImage }} style={styles.image} />}</View>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAwareScrollView contentContainerStyle={styles.scrollContainer} style={{ paddingBottom: inputHeight - 20 }}>
          <View style={styles.inputsContainer}>
            <View style={[styles.inputBox, { flex: getInputBoxFlex({ inputIsFocused, noteAudio, noteHasSomeValue }) }]}>
              <TextInput
                style={[styles.noteTextInput, { height: inputHeight + 20 }]}
                placeholder={t('write_note') + '...'}
                keyboardType='default'
                returnKeyType='done'
                placeholderTextColor='rgba(255, 255, 255, 0.4)'
                onChange={event => setNoteText(event.nativeEvent.text)}
                onContentSizeChange={event => {
                  setInputHeight(event.nativeEvent.contentSize.height)
                }}
                onSubmitEditing={onSubmit}
                onFocus={() => senInputFocusStatus(true)}
                onBlur={() => senInputFocusStatus(false)}
                multiline
              />
            </View>
            {!inputIsFocused && (
              <View style={styles.cameraIconContainer}>
                <CameraInput data={newNoteImage} onSave={setNewNoteImage} visible isNewLayout showPreviewOverIcon={false} />
              </View>
            )}

            <View style={[styles.microphoneIconContainer, inputIsFocused && styles.hidden]}>
              <MicrophoneInput id='homeCreateNote' onSave={setNoteAudio} visible isNewLayout />
            </View>
            {noteHasSomeValue && !inputIsFocused && (
              <TouchableOpacity style={styles.sendButton} onPress={onSubmit}>
                <Icon type='Ionicons' name='send' style={styles.button} />
              </TouchableOpacity>
            )}
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </View>
  )
}

export default NewNoteScreen
