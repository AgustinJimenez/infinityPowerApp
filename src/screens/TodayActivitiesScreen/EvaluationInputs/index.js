import React, { useState } from 'react'
import { View, TextInput, ActivityIndicator } from 'react-native'
import { Toast } from 'native-base'
import { scale } from '../../../helpers/styles'
import { useSelector } from 'react-redux'
import { datasetSelector } from '../../../redux/selectors'
import request from '../../../helpers/request'
import CameraInput from '../CameraInput'
import MicrophoneInput from '../MicrophoneInput'
import Switch from '../../../components/Switch'
import SendButton from '../../../components/SendButton'
import sleep from '../../../helpers/sleep'
import ModalImagePreview from '../../../components/ModalImagePreview'
import EvaluationNotesList from '../EvaluationNotesList'

const SimpleInput = ({ value, onChangeText, onFocus, onBlur, containerStyles = {} }) => {
  const [height, setHeight] = React.useState(0)
  const inputRef = React.useRef(null)
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'gray',
        borderRadius: scale(0.4),
        paddingHorizontal: scale(0.2),
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        height: Math.max(35, height),
        ...containerStyles,
      }}
    >
      <TextInput
        ref={inputRef}
        multiline
        value={value}
        onContentSizeChange={({ nativeEvent: { contentSize } }) => {
          setHeight(contentSize.height)
        }}
        placeholderTextColor='white'
        placeholder={global.language.write_a_final_comment_before_evaluate}
        onChangeText={onChangeText}
        onFocus={onFocus}
        onBlur={onBlur}
        style={{
          flex: 1,
          fontSize: scale(0.35),
        }}
        returnKeyType='done'
        onSubmitEditing={() => {
          if (!!inputRef && !!inputRef.current && !!inputRef.current.blur) inputRef.current.blur()
        }}
      />
    </View>
  )
}

const EvaluationInputs = ({ dataset_index, visible = true, evaluation_id = 0, reloadScreen = () => {} }) => {
  const evaluation = useSelector(state => datasetSelector(state, 'evaluations', { id: evaluation_id }))
  //console.log('EvaluationInputs ===> ', { dataset_index, evaluation })
  const imei = useSelector(state => datasetSelector(state, 'imei'))
  const timezone = useSelector(state => datasetSelector(state, 'timezone'))
  const { language } = useSelector(state => datasetSelector(state, 'app_configuration'))
  const [newNote = '', setNewNote] = useState('')
  const [newPhoto = '', setNewPhoto] = useState('')
  const [newAudio = '', setNewAudio] = useState('')
  const [sendingEvaluation, setSendingEvaluation] = useState(false)
  const [inputIsOnFocus, setInputIsOnFocus] = useState(false)
  const [sendingNote, setSendingNote] = useState(false)
  const sendEvaluation = React.useCallback(
    async ({ achieved }) => {
      if (!evaluation) return
      setSendingEvaluation(true)
      let data = {
        objective_id: evaluation['objective_id'],
        achieved,
        imei,
      }
      let { error } = await request({
        url: 'actions/evaluate',
        method: 'POST',
        data,
        //debug: true,
      })
      await Toast.show({
        text: global?.['language']?.[error ? 'unexpected_error' : 'objective_evaluated_successfully'],
        duration: 2000,
        type: error ? 'danger' : 'success',
      })
      reloadScreen(() => {
        setSendingEvaluation(false)
      })
    },
    [evaluation, newNote, language, imei, timezone, newPhoto, newAudio],
  )

  const onCreateNote = React.useCallback(async () => {
    setSendingNote(true)
    let { error } = await request(
      {
        url: 'actions/create_note',
        method: 'POST',
        data: {
          objective_id: evaluation['objective_id'],
          note: newNote,
          photo: newPhoto,
          audio: newAudio,
        },
        //debug: true,
      },
      [newPhoto, newAudio, newNote, evaluation],
    )
    if (error) {
      setSendingNote(false)
      return Toast.show({
        text: global?.['language']?.['unexpected_error'],
        duration: 2000,
        type: 'danger',
      })
    } else {
      setSendingNote(false)
    }

    setNewNote('')
    setNewAudio('')
    setNewPhoto('')
    reloadScreen(() => {
      setSendingNote(false)
    })
  }, [evaluation, newNote, newPhoto, newAudio])

  //console.log('EvaluationInputs ===> ', { id: evaluation.id, evaluation, notes})
  return (
    <View style={{ width: '100%' }}>
      <View>
        <EvaluationNotesList objective_id={evaluation?.objective_id || null} />
        <View
          style={{
            //backgroundColor: 'red',
            flexDirection: 'row',
            height: scale(1.2),
            marginBottom: scale(0.4),
          }}
        >
          {!newAudio && (
            <SimpleInput
              onFocus={() => setInputIsOnFocus(true)}
              onBlur={() => setInputIsOnFocus(false)}
              onChangeText={setNewNote}
              value={newNote}
              setInputIsOnFocus={setInputIsOnFocus}
              containerStyles={{ flex: 0.7 }}
            />
          )}
          <View style={{ flexDirection: 'row', flex: !!newAudio ? 1 : 0.3, justifyContent: 'center', alignItems: 'center' }}>
            <CameraInput data={newPhoto} visible={!inputIsOnFocus || !newNote} onSave={data => setNewPhoto(data)} />
            <MicrophoneInput
              defaultProps={{ backgroundColor: 'red' }}
              data={newAudio}
              visible={!inputIsOnFocus || !newNote}
              onSave={setNewAudio}
              id={evaluation_id}
            />
            <SendButton isLoading={sendingNote} visible={!!newNote || !!newAudio || !!newPhoto} onPress={onCreateNote} />
          </View>
        </View>
      </View>
      <View style={{ flexDirection: 'row', flex: 0.8, paddingHorizontal: scale(0.2) }}>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', flex: 1 }}>
          {sendingEvaluation && <ActivityIndicator style={{ alignSelf: 'center', flex: 0.25 }} size='large' />}
          <Switch
            visible={!sendingEvaluation && !inputIsOnFocus}
            onChange={async achieved => {
              //console.log('SWITCH ==== >', {achieved})
              if (achieved !== null) sendEvaluation({ achieved })
            }}
          />
        </View>
      </View>
    </View>
  )
}

export default EvaluationInputs
