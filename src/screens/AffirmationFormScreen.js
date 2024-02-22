import React from 'react'
import { Text, View, TouchableOpacity, TextInput, Alert, Keyboard, Platform, ScrollView, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { SafeAreaView } from 'react-navigation'
import * as fn from 'helpers/scripts'
import Loader3 from '../helpers/loader3.js'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { globalStyles, secondaryColor } from '../helpers/styles'
import { Recorder, Player } from '@react-native-community/audio-toolkit'
import RNFetchBlob from 'rn-fetch-blob'
import Dialog, { DialogContent, DialogTitle } from 'react-native-popup-dialog'
import capitalizeWords from '../helpers/capitalizeWords'
import { Icon, Button, Toast } from 'native-base'
import sleep from '../helpers/sleep'
//import AudioRecorderPlayer from 'react-native-audio-recorder-player'
import { check, request as permissionRequest, PERMISSIONS, RESULTS } from 'react-native-permissions'
import httpRequest from '../helpers/request'
import { connect } from 'react-redux'
import { datasetSelector } from '../redux/selectors'
import BottomNavigationBar from '../components/BottomNavigationBar'
import { tailwind } from '../tailwind'
import { ImageBackground } from 'react-native'
import BgMainIconImg from '../img/background-home.jpg'
import MicrophoneImage from 'img/microphone.png'
import BgAffirmation from '../img/bg_affirmation_default.png'

import { Image } from 'react-native-svg'

const new_affirmation_filename = 'new_affirmation.mp4'
const new_gratitude_filename = 'new_gratitude.mp4'
class AffirmationFormScreen extends React.Component {
  state = {
    show_loader3: false,
    modalText: null,
    affirmationText: '',
    gratitudeText: '',
    affirmationAudio: null,
    gratitudeAudio: null,
    newPhrase: false,
    item: null,
    productList: [],
    receipt: '',
    availableItemsMessage: '',
    visiblePhrasesChooser: false,
    phrasesLoaded: false,
    afAudioEdited: false,
    grAudioEdited: false,
    phrases: [],
    loading: false,
    fieldsWhereEdited: false,
    prerecording_count: -1,
  }

  constructor(props) {
    super(props)
    this.state['phrases'] = props.navigation.getParam('phrases', []).map(phrase => {
      phrase['audio_affirmative_time'] = '00:00:00'
      phrase['audio_gratitude_time'] = '00:00:00'
      return phrase
    })
  }

  recorderInstance = filename =>
    new Recorder(filename)
      .on('ended', () => this.recordingWasEnded())
      .on('error', error => {
        console.log('ERROR-RECORDING ===> ', error)
        Toast.show({
          text: `${global?.language?.unexpected_error_recording} ${error}`,
          duration: 4000,
          type: 'danger',
        })
      })

  audioRecordersPlayers = {
    [new_affirmation_filename]: {
      player: new Player(new_affirmation_filename, { autoDestroy: false }).on('ended', () => this.forceUpdate()),
      recorder: this.recorderInstance(new_affirmation_filename),
      duration: 0,
      filePath: '',
    },
    [new_gratitude_filename]: {
      player: new Player(new_gratitude_filename, { autoDestroy: false }).on('ended', () => this.forceUpdate()),
      recorder: this.recorderInstance(new_gratitude_filename),
      duration: 0,
      filePath: '',
    },
  }
  routineId = () => {
    let routineId = this.props.navigation.getParam('routineId', null)
    return routineId
  }

  recordingWasEnded = async () => {
    await this.setState({ fieldsWhereEdited: true })
  }

  audioRecorderByFilename = (filename = '') => {
    return this['audioRecordersPlayers'][filename]
  }
  hasPermissionToRecord = async () => {
    let permission = Platform.select({
      ios: PERMISSIONS.IOS.MICROPHONE,
      android: PERMISSIONS.ANDROID.RECORD_AUDIO,
    })
    let result = await check(permission)
    if (result === RESULTS.DENIED || result === RESULTS.BLOCKED) return await permissionRequest(PERMISSIONS.IOS.MICROPHONE)

    return true
  }
  recordProcess = async (filename = '') => {
    Alert.alert(
      'Infinite Power',
      'Está a punto de comenzar la grabación para su afirmación, recuerde estar en un lugar tranquilo y silencioso, a modo de tener una mejor grabación y futura reproducción.',
      [
        {
          text: global?.language?.cancel,
        },
        {
          text: capitalizeWords(global?.language?.i_am_ready),
          onPress: async () => {
            //console.log('onAcceptRecording ===> ', { startRecordingAfirmation: this.startRecordingAfirmation })
            await this.setState({ show_loader3: true })
            for (let second of [3, 2, 1, 0]) {
              await this.setState({
                modalText: second,
              })
              await sleep()
            }
            await this.setState({ show_loader3: false, modalText: null })
            let uri = ''
            let audioRecPlay = this.audioRecorderByFilename(filename)

            //uri = await audioRecPlay['recorder'].startRecorder(filename)
            audioRecPlay['recorder'].prepare((error, uri) => {
              audioRecPlay['filePath'] = uri
              audioRecPlay['recorder'].record(error => {
                if (error) {
                  Toast.show({
                    text: global?.['language']?.['unexpected_error_recording'],
                    type: 'danger',
                    duration: 4000,
                  })
                  console.log('ERROR RECORDING ==> ', error)
                }

                RNFetchBlob.fs.stat(uri).then(stats => {})
                this.forceUpdate()
              })
            })
            //this.forceUpdate()
          },
        },
      ],
      {
        cancelable: false,
      },
    )
  }
  UNSAFE_componentWillMount() {
    this.init()
  }
  init = async () => {
    let user = await AsyncStorage.getItem('user')
    user = JSON.parse(user)
    this.setState({
      applang: user.default_language,
    })
    auxlang = 'get_screens_translations_es'
    if (this.state.applang == 'en') auxlang = 'get_screens_translations_en'
    if (this.state.applang == 'pt') auxlang = 'get_screens_translations_pt'

    let auxlang = await AsyncStorage.getItem(auxlang)
    auxlang = JSON.parse(auxlang)
    auxlang = auxlang.result
    this.setState({
      gratitudeLabel: auxlang.userPhrasesScreen.gratitude.label,
      affirmationLabel: auxlang.userPhrasesScreen.affirmation.label,
      saveLabel: auxlang.userPhrasesScreen.modal.save.label,
    })

    let editable = this.props.navigation.getParam('editRoutinePhrase')
    let editablePhrase = this.props.navigation.getParam('editablePhrase')
    let newPhrase = this.props.navigation.getParam('new')
    if (newPhrase) this.setState({ newPhrase: true })

    let item = this.props.navigation.getParam('item')
    //console.log('INIT ===> ', item)
    if (!!item) {
      this.setState({
        item,
        affirmationText: item.text_affirmative,
        gratitudeText: item.text_gratitude,
        affirmationAudio: item.audio_affirmative,
        gratitudeAudio: item.audio_gratitude,
      })

      let reprocess = await AsyncStorage.getItem('reprocess')
      if (reprocess == 'true') AsyncStorage.setItem('reprocess', 'false')

      if (item.muser_routine_id && editable) this.setState({ removableItem: item })

      if (editablePhrase)
        this.setState({
          removableItem: {
            ...item,
            id: item.phrase_id,
          },
        })
    }
  }
  recargarDatos = async () => {
    await this.setState({
      loading: true,
      desde: '',
    })
    let { response, error, data } = await httpRequest({
      url: 'mobile/users/get_profile_data',
      method: 'POST',
      data: {
        lang: this.state['applang'],
        imei: this.props.imei,
        timezone: this.props.timezone,
      },
      //debug: true,
    })
    await this.setState({
      loading: false,
    })
    if (!error) {
      AsyncStorage.setItem('get_profile_data', JSON.stringify(response))
    }
  }
  formIsValid = () => {
    let textFieldsAreFilled = false
    let audiosAreFilledOrNot = false
    let audiosAreReady = false

    audiosAreFilledOrNot =
      (!!this.audioRecordersPlayers[new_affirmation_filename]['filePath'] && !!this.audioRecordersPlayers[new_gratitude_filename]['filePath']) ||
      (!this.audioRecordersPlayers[new_affirmation_filename]['filePath'] && !this.audioRecordersPlayers[new_gratitude_filename]['filePath'])

    textFieldsAreFilled = !!this['state']['affirmationText'] && !!this['state']['gratitudeText']

    audiosAreReady = !this.isRecording(new_affirmation_filename) && !this.isRecording(new_gratitude_filename)

    return textFieldsAreFilled && audiosAreFilledOrNot && audiosAreReady
  }
  getDataFromFile = async (filePath = '') => {
    let data = null

    data = RNFetchBlob.wrap(filePath)

    /* 
    data  = await new Promise(async (resolve, reject) => {
      let data = ''
      let readStream = await RNFetchBlob.fs.readStream(filePath, 'base64')
      readStream.open()
      readStream.onData(chunk => {
        data += chunk
      })
      readStream.onError(() => {
        reject(null)
      })
      readStream.onEnd(() => {
        resolve(data)
      })

      return data
    }) */

    return data
  }
  showSavedCorrectlyMessage = async (message = '', duration = 4000) =>
    await Toast.show({
      text: message || global?.['language']?.['saved_correctly'],
      type: 'success',
      duration,
    })
  showUnexpectedErrorMessage = async (message = '', duration = 4000) => {
    this.setState({ loading: false })
    await Toast.show({
      text: message || global?.['language']?.['unexpected_error'],
      type: 'danger',
      duration,
    })
  }
  saveProcessWithoutAudio = async ({ imei }) => {
    let params = {
      lang: imei['default_language'],
      imei: this.props.imei,
      timezone: this.props.timezone,
      text_affirmative: this.state['affirmationText'],
      text_gratitude: this.state['gratitudeText'],
      type: 'recorded_with_user_voice',
    }
    //if (this.state['removableItem'] && !this.state['removableItem']['is_audio_app']) params['phrase_id'] = this.state['removableItem']['id'].toString()

    var { data, error } = await httpRequest({
      url: 'mobile/users/save_custom_user_phrase',
      method: 'POST',
      data: params,
      //debug: true,
    })

    if (error) return this.showUnexpectedErrorMessage()

    await this.setState({ nuevoItem: data })

    let routineId = this.routineId()
    if (!!routineId) {
      if (this.state.phrases.length === 5) return await this.setState({ visiblePhrasesChooser: true })
      else return this.phraseReplaceHandler(this.state['nuevoItem']['id'])
    }

    await this.setState({ loading: false })
    this.recargarDatos()
    Keyboard.dismiss()
    if (!!this['state']['affirmationText'] && !!this['state']['gratitudeText'] && !this.bothFieldsHasAudiosFiles())
      this.showSavedCorrectlyMessage(global?.['language']?.['affirmation_saved_as_draft'], 6000)
    else this.showSavedCorrectlyMessage()
    this.props.navigation.goBack()
  }
  saveProcessWithAudioLoaded = async ({ affirmationAudioFilePath, gratitudeAudioFilePath, bothFieldsHasAudiosFiles, imei }) => {
    /* let params = {
        audio_affirmative: {
          name: 'audio_affirmative',
          filename: 'audio_affirmative.mp4',
          type: 'audio/mp4',
          data: await this.getDataFromFile(affirmationAudioFilePath),
        },
        audio_gratitude: {
          name: 'audio_gratitude',
          filename: 'audio_gratitude.mp4',
          type: 'audio/mp4',
          data: await this.getDataFromFile(gratitudeAudioFilePath),
        },
        lang: imei['default_language'],
        timezone: this.props.timezone,
        imei: this.props.imei,
        text_affirmative: this.state['affirmationText'],
        text_gratitude: this.state['gratitudeText'],
        type: 'recorded_with_user_voice',
      }
      if (this.state.removableItem && this.state.removableItem.is_audio_app == false) params['phrase_id'] = this.state.removableItem.id.toString()
 */
    let params = []

    params.push({
      name: 'audio_affirmative',
      filename: 'audio_affirmative.mp4',
      type: 'audio/mp4',
      data: RNFetchBlob.wrap(affirmationAudioFilePath),
    })
    params.push({
      name: 'audio_gratitude',
      filename: 'audio_gratitude.mp4',
      type: 'audio/mp4',
      data: RNFetchBlob.wrap(gratitudeAudioFilePath),
    })

    params.push({ name: 'lang', data: imei['default_language'] })
    params.push({ name: 'timezone', data: imei['timezone'] })
    params.push({ name: 'imei', data: imei['imei'] })
    params.push({ name: 'text_affirmative', data: this.state['affirmationText'] })
    params.push({ name: 'text_gratitude', data: this.state['gratitudeText'] })
    params.push({ name: 'type', data: 'recorded_with_user_voice' })

    if (this.state.removableItem && !this.state['removableItem']['is_audio_app'])
      params.push({ name: 'phrase_id', data: this.state['removableItem']['id'].toString() })

    let token = await AsyncStorage.getItem('userToken')
    let tokenType = await AsyncStorage.getItem('userTokenType')
    let response = await RNFetchBlob.fetch(
      'POST',
      `${fn.url}mobile/users/save_custom_user_phrase`,
      {
        Authorization: `${tokenType} ${token}`,
        'Content-Type': 'multipart/form-data',
      },
      params,
    )
    await this.setState({ loading: false })
    let { status, result } = await response.json()
    //console.log('saveProcess - save_custom_user_phrase ===>  ', { response, status, result })
    if (!status) return this.showUnexpectedErrorMessage()

    await this.setState({ nuevoItem: result })
    /* 
var { error, data, response } = await httpRequest({
  url: 'mobile/users/save_custom_user_phrase',
  method: 'POST',
  data: params,
  //header: { 'Content-Type': 'multipart/form-data' },
  //debug: true,
})
console.log('saveProcess - save_custom_user_phrase ===>  ', { data, error, response })
if (error) {
  await this.setState({ loading: false })
  return alert(global?.language?.unexpected_error)
}
await this.setState({ nuevoItem: data })
*/
    AsyncStorage.setItem('reprocess', 'true')
    let routineId = this.routineId()
    if (!!routineId) {
      if (this.state.phrases.length >= 5) this.setState({ visiblePhrasesChooser: true })
      else {
        let newObj = {}
        newObj['imei'] = this.props.imei
        newObj['lang'] = global['lang']
        newObj['source'] = 'userPhrase'
        newObj['timezone'] = this.props.timezone
        newObj['destination'] = 'myRoutine'
        newObj['phrase_id'] = this.state['nuevoItem']['id']
        newObj['routine_id'] = routineId
        await this.setState({ loading: true })
        this.phraseReplaceHandler(this.state['nuevoItem']['id'])
        await this.setState({ loading: false })
        if (!error) {
          this.showSavedCorrectlyMessage()
          return this.props.navigation.goBack()
        } else this.showUnexpectedErrorMessage()
      }
    } else if (this.state['removableItem']) {
      await this.setState({ loading: true })
      var { error } = await httpRequest({
        url: 'mobile/users/remove_phrase_from',
        method: 'POST',
        data: {
          lang: global['lang'],
          imei: this.props['imei'],
          timezone: this.props['timezone'],
          source: 'myRoutine',
          phrase_id: this.state['removableItem']['id'],
          routine_id: this.state['removableItem']['muser_routine_id'],
        },
        //debug: true,
      })

      if (error)
        await this.setState({
          visiblePhrasesChooser: false,
        })
      var { error } = await httpRequest({
        url: 'mobile/users/add_phrase_to',
        method: 'POST',
        data: {
          imei: this.props['imei'],
          lang: global['lang'],
          source: 'userPhrase',
          timezone: this.props['timezone'],
          destination: 'myRoutine',
          phrase_id: this.state['nuevoItem']['id'],
          routine_id: this.state['removableItem']['muser_routine_id'],
        },
        //debug: true,
      })
      await this.setState({ loading: false })
      if (!error) {
        this.showSavedCorrectlyMessage()
        return this.props.navigation.goBack()
      }
    }
  }
  bothFieldsHasAudiosFiles = () => {
    let affirmationAudioFilePath = this.audioRecordersPlayers[new_affirmation_filename]['filePath']
    let gratitudeAudioFilePath = this.audioRecordersPlayers[new_gratitude_filename]['filePath']
    let bothFieldsHasAudiosFiles = !!affirmationAudioFilePath && !!gratitudeAudioFilePath
    return bothFieldsHasAudiosFiles
  }
  saveProcess = async () => {
    if (!this.formIsValid()) return

    if (!this.state['fieldsWhereEdited']) this.props.navigation.goBack()

    let imei = await AsyncStorage.getItem('user')
    await this.setState({ loading: true })
    let affirmationAudioFilePath = this.audioRecordersPlayers[new_affirmation_filename]['filePath']
    let gratitudeAudioFilePath = this.audioRecordersPlayers[new_gratitude_filename]['filePath']
    let bothFieldsHasAudiosFiles = this.bothFieldsHasAudiosFiles()
    imei = JSON.parse(imei)
    if (bothFieldsHasAudiosFiles)
      return this.saveProcessWithAudioLoaded({
        affirmationAudioFilePath,
        gratitudeAudioFilePath,
        bothFieldsHasAudiosFiles,
        imei,
      })
    else
      this.saveProcessWithoutAudio({
        affirmationAudioFilePath,
        gratitudeAudioFilePath,
        bothFieldsHasAudiosFiles,
        imei,
      })
  }
  renderSaveButton = () => {
    return (
      <Button
        disabled={!this.formIsValid() || this.state['loading']}
        style={{
          backgroundColor: !this.state['loading'] && this.formIsValid() ? global.authButtonColor : 'gray',
          padding: 10,
          width: 150,
          borderRadius: 10,
          justifyContent: 'center',
          alignSelf: 'center',
        }}
        onPress={this.saveProcess}
      >
        {this['state']['loading'] ? (
          <ActivityIndicator animating />
        ) : (
          <Text style={{ textAlign: 'center', fontWeight: 'bold', color: 'white' }}>{capitalizeWords(global?.['language']?.['save'])}</Text>
        )}
      </Button>
    )
  }

  phraseReplaceHandler = async phraseId => {
    let routine_id = this.routineId()
    await httpRequest({
      url: 'mobile/users/remove_phrase_from',
      method: 'POST',
      data: {
        lang: global['lang'],
        imei: this.props['imei'],
        timezone: this.props['timezone'],
        source: 'myRoutine',
        phrase_id: phraseId,
        routine_id,
      },
      //debug: true,
    })

    await httpRequest({
      url: 'mobile/users/add_phrase_to',
      method: 'POST',
      data: {
        imei: this.props['imei'],
        lang: global['lang'],
        source: 'userPhrase',
        timezone: this.props['timezone'],
        destination: 'myRoutine',
        phrase_id: this.state['nuevoItem']['id'],
        routine_id,
      },
      //debug: true,
    })

    if (!!this['state']['affirmationText'] && !!this['state']['gratitudeText'] && !this.bothFieldsHasAudiosFiles())
      Alert.alert(capitalizeWords(global?.['language']?.['notice']), global?.['language']?.['affirmation_saved_as_draft'], [
        {
          text: 'Ok',
        },
      ])

    this.showSavedCorrectlyMessage()

    await this.setState({ loading: false, visiblePhrasesChooser: false })

    this.props.navigation.goBack()
  }
  renderPhrasesPicker = () => (
    <Dialog
      width={0.8}
      visible={this.state['visiblePhrasesChooser']}
      onTouchOutside={() => this.setState({ visiblePhrasesChooser: false })}
      dialogTitle={
        <DialogTitle
          title={global?.language?.replacePhrase}
          hasTitleBar={false}
          style={{
            backgroundColor: 'white',
            color: 'black',
            minHeight: 100,
            justifyContent: 'center',
          }}
          textStyle={{
            color: 'black',
          }}
          align='left'
        />
      }
    >
      <DialogContent
        style={{
          backgroundColor: 'white',
          color: 'black',
        }}
      >
        <ScrollView>{this.renderPhreasesDialog()}</ScrollView>
      </DialogContent>
    </Dialog>
  )
  renderPhreasesDialog = () => {
    return this.state.phrases.map((phrase, key) => (
      <TouchableOpacity
        key={key}
        onPress={() => {
          this.phraseReplaceHandler(phrase.id)
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: 15,
              paddingBottom: 15,
              borderBottomColor: '#5c9c93',
              borderBottomWidth: 1,
            }}
          >
            <Text
              style={{
                width: '100%',
                color: 'black',
              }}
            >
              {phrase.text_affirmative}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    ))
  }

  renderHeaderOld = () => (
    <View style={globalStyles.titleBar}>
      <Text style={{ fontSize: 20, color: 'white' }}>{capitalizeWords(global?.language?.affirmation)}</Text>
    </View>
  )

  recordButtonIconName = (filename = '') => {
    let iconName = ''
    iconName = this.isRecording(filename) ? 'stop' : 'microphone'
    return iconName
  }

  playButtonWasTapped = async (filename = '') => {
    let audioRecPlay = this.audioRecorderByFilename(filename)
    audioRecPlay['player'].playPause((error, paused) => {
      if (error) console.log('ERROR PLAYPAUSE ===> ', error)
      this.forceUpdate()
    })
  }

  recordButtonWasTapped = async (filename = '') => {
    let hasPermission = await this.hasPermissionToRecord()
    if (!hasPermission) return

    if (!this.isRecording(filename)) {
      this.recordProcess(filename)
    } else {
      this['audioRecordersPlayers'][filename]['recorder'].stop(error => {
        if (error) console.log('RECORDER-STOP-ERROR ===> ', error)

        this['audioRecordersPlayers'][filename]['recorder'] = this.recorderInstance(filename)
        this['audioRecordersPlayers'][filename]['player'].prepare(err => {
          this['audioRecordersPlayers'][filename]['hastLoadedAtLeastOnce'] = true
          this.forceUpdate()
        })
      })
    }
  }
  isPlaying = (filename = '') => this.audioRecorderByFilename(filename)['player']['isPlaying']
  isRecording = (filename = '') => this.audioRecorderByFilename(filename)['recorder']['isRecording']
  hasPaused = (filename = '') => this.audioRecorderByFilename(filename)['player']['isPaused']
  playerHasAudio = (filename = '') => {
    let playerHasAudio = false
    let audioRecorder = this.audioRecorderByFilename(filename)
    playerHasAudio = audioRecorder['hastLoadedAtLeastOnce'] > 0 && !this.isRecording(filename)
    return playerHasAudio
  }

  recordStart = filename => {
    let uri = ''
    let audioRecPlay = this.audioRecorderByFilename(filename)
    //uri = await audioRecPlay['recorder'].startRecorder(filename)
    audioRecPlay['recorder'].prepare((error, uri) => {
      // TODO: no aparece el path
      audioRecPlay['filePath'] = uri

      audioRecPlay['recorder'].record(error => {
        if (error) {
          Toast.show({
            text: global?.['language']?.['unexpected_error_recording'],
            type: 'danger',
            duration: 4000,
          })
          console.log('ERROR RECORDING ==> ', error)
        }

        RNFetchBlob.fs.stat(uri).then(stats => {})
        this.forceUpdate()
      })
    })
  }

  recordStop = filename => {
    this['audioRecordersPlayers'][filename]['recorder'].stop(error => {
      if (error) console.log('RECORDER-STOP-ERROR ===> ', error)

      this['audioRecordersPlayers'][filename]['recorder'] = this.recorderInstance(filename)
      this['audioRecordersPlayers'][filename]['player'].prepare(err => {
        this['audioRecordersPlayers'][filename]['hastLoadedAtLeastOnce'] = true
        this.forceUpdate()
      })
    })
  }

  onPressRecording = filename => () => {
    this.setState({ prerecording_count: 4 }, () => {
      this.onPrerecordingTick(filename)
    })
  }

  onPressRecordingStop = filename => () => {
    this.recordStop(filename)

    this.setState({ prerecording_count: -1 }, () => {
      this.onPrerecordingTick(filename)
    })
  }

  onPrerecordingTick = filename => {
    if (this.state.prerecording_count < 0) {
      console.log('abort')
      return
    }

    if (this.state.prerecording_count == 0) {
      console.log('start recording')
      this.recordStart(filename)
      this.setState(state => ({ prerecording_count: state.prerecording_count - 1 }))
      return
    }

    this.setState(
      state => ({ prerecording_count: state.prerecording_count - 1 }),
      () => {
        setTimeout(() => {
          this.onPrerecordingTick(filename)
        }, 1000)
      },
    )
  }

  renderRecordingOrPlayingLabel = (filename = '') => {
    let isRecording = this.isRecording(filename)
    let isPlaying = this.isPlaying(filename)
    let color = 'gray'
    let label = ''
    if (isRecording) {
      color = 'red'
      label = `${capitalizeWords(global?.language?.recording)}...`
    } else if (isPlaying) {
      color = 'gray'
      label = `${capitalizeWords(global?.language?.playing)}...`
    }
    return <Text style={{ color }}>{label}</Text>
  }
  renderInputAudioOld = (textStatusName = '', filename = '', label = '') => {
    let playerHasAudio = this.playerHasAudio(filename)

    return (
      <>
        <Text style={{ fontWeight: 'bold', marginBottom: 10, color: 'white' }}>{label}</Text>
        <View style={[globalStyles.roundedInputStyle, { justifyContent: 'flex-end', alignItems: 'flex-start', marginBottom: 15 }]}>
          <TextInput
            returnKeyType='done'
            onChangeText={text => this.setState({ [textStatusName]: text, fieldsWhereEdited: true })}
            value={this['state'][textStatusName]}
            multiline
            style={{ flex: 1, width: '100%', padding: 3, color: 'white', backgroundColor: global.pageBkColor }}
          />
          <View
            style={{
              position: 'absolute',
              right: 10,
              bottom: 10,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
            }}
          >
            <View style={{ alignSelf: 'center', right: 10 }}>{this.renderRecordingOrPlayingLabel(filename)}</View>
            <View style={{ alignSelf: 'flex-end', flexDirection: 'row' }}>
              <Button
                rounded
                style={{ backgroundColor: global.mainColor, alignSelf: 'flex-end' }}
                onPress={() => {
                  this.recordButtonWasTapped(filename)
                }}
              >
                <Icon name={this.recordButtonIconName(filename)} type='FontAwesome' style={{ fontSize: 18 }} />
              </Button>
              {playerHasAudio && (
                <Button
                  rounded
                  style={{ backgroundColor: playerHasAudio ? global.mainColor : 'gray', marginLeft: 10 }}
                  onPress={() => {
                    this.playButtonWasTapped(filename)
                  }}
                >
                  <Icon name={this.playerIconName(filename)} type='FontAwesome' style={{ fontSize: 16 }} />
                </Button>
              )}
            </View>
          </View>
        </View>
      </>
    )
  }

  playerIconName = (filename = '') => {
    let iconName = ''
    iconName = this.isPlaying(filename) ? 'pause' : 'play'
    return iconName
  }
  renderOld() {
    return (
      <View style={[globalStyles.informationLayout, { width: '100%', height: '100%', backgroundColor: 'black' }]}>
        {/* <NavigationEvents onWillFocus={async payload => {}} /> */}
        <Loader3 loading={this.state.show_loader3} modalText={this.state.modalText} />
        <SafeAreaView
          style={{
            flex: 1,
            alignItems: 'stretch',
            justifyContent: 'flex-start',
          }}
        >
          {this.renderPhrasesPicker()}
          {this.renderHeader()}
          <KeyboardAwareScrollView contentContainerStyle={{ alignItems: 'stretch', paddingHorizontal: 40 }}>
            {this.renderInputAudio('affirmationText', new_affirmation_filename, this.state.affirmationLabel)}
            {this.renderInputAudio('gratitudeText', new_gratitude_filename, this.state.gratitudeLabel)}
            {/* <Debug data={this.audioRecordersPlayers} /> */}
            <View style={{ marginTop: 10 }}>{this.renderSaveButton()}</View>
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </View>
    )
  }

  render() {
    return (
      <View style={tailwind('w-full h-full relative')}>
        <ImageBackground source={BgMainIconImg} imageStyle={{ resizeMode: 'stretch' }} style={tailwind('absolute h-full w-full ')} />
        <View style={[tailwind('absolute w-full h-full'), { backgroundColor: secondaryColor(0.8) }]}></View>
        {/* 
        {this.renderAddAffirmationModal()} */}
        <SafeAreaView style={tailwind('flex')}>
          <ScrollView>
            <View style={tailwind('flex p-6 flex-col justify-start pb-24')}>
              {/* Header */}
              {this.renderHeader()}
              {/* Status */}
              {this.renderStatus()}
              {/* TextForms */}
              {this.renderTextForms()}
            </View>
          </ScrollView>
        </SafeAreaView>
        <BottomNavigationBar hasPlay={this.state.hasPlay} hasBack />
      </View>
    )
  }

  renderHeader = () => {
    return (
      <View style={tailwind('flex flex-col')}>
        {/* Top Buttons */}
        <View style={tailwind('flex flex-row justify-between mb-2')}>
          <TouchableOpacity
            style={tailwind('relative')}
            onPress={() => {
              this.props.navigation.navigate('TodayActivitiesScreen')
            }}
          >
            <Text>{global?.language?.cancel}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tailwind('relative')}
            onPress={() => {
              this.props.navigation.navigate('TodayActivitiesScreen')
            }}
          >
            <Text>{global?.language?.save}</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  renderStatus = () => {
    return (
      <View style={tailwind('flex w-full mt-2')}>
        <View style={tailwind('flex justify-center w-full mb-3')}>
          {/* Titulo */}
          <Text style={tailwind('text-3xl font-bold text-white capitalize text-center')}> {global?.['language']?.['label_customize_affirmation']} </Text>
        </View>
      </View>
    )
  }

  renderTextForms = () => {
    return (
      <KeyboardAwareScrollView contentContainerStyle={[{ alignItems: 'stretch', paddingHorizontal: 8 }]}>
        {this.renderInputAudio('affirmationText', new_affirmation_filename, this.state.affirmationLabel)}
        {this.renderInputAudio('gratitudeText', new_gratitude_filename, this.state.gratitudeLabel)}
      </KeyboardAwareScrollView>
    )
  }

  renderInputAudio = (textStatusName = '', filename = '', label = '') => {
    let playerHasAudio = this.playerHasAudio(filename)

    return (
      <>
        <Text style={{ fontWeight: 'bold', marginBottom: 10, color: 'white', paddingHorizontal: 8 }}>{label}</Text>
        <View style={tailwind('relative mb-4 z-0')}>
          <View style={tailwind('mb-4')}>
            {/* bg transparent */}
            <View style={tailwind('absolute top-0 left-0 w-full h-full bg-black opacity-25 rounded-xl z-0')}></View>

            {/* Affirmation Info */}
            {/* <View style={tailwind('p-5 pb-2 ')}>{this.renderInfo(textStatusName)}</View>
            <TouchableOpacity style={tailwind(' pb-4 pl-6 ')}>
              <Text style={tailwind('text-green-300 text-base')}>Grabar con mi voz</Text>
            </TouchableOpacity> */}

            {/* Recorder */}
            {this.renderRecorder(textStatusName, filename)}
          </View>
        </View>
      </>
    )
  }

  renderRecorder = (textStatusName, filename) => {
    let is_recoding = this.isRecording(filename)

    return (
      <View style={tailwind('p-6')}>
        <View style={tailwind('flex flex-row')}>
          <View>
            <Icon name={'chevron-up'} type='Feather' style={tailwind('text-4xl text-white')}></Icon>
          </View>
          <View>
            <Text style={tailwind('text-xl text-white px-6 leading-6')}>{this.state[textStatusName]}</Text>
          </View>
        </View>
        <View style={tailwind('py-2')}>
          {/* Timer */}
          <Text style={tailwind('text-3xl text-white text-center font-bold')}>00:00</Text>
          <Text style={tailwind('text-3xl text-white text-center font-bold')}>{is_recoding ? 'quien sabe' : 'sera'}</Text>
        </View>
        <View style={tailwind('py-3')}>
          {/* Graphic */}
          {this.renderRecorderGraphic(filename)}
        </View>
        <View style={tailwind('py-2 flex justify-center items-center')}>{this.renderRecorderButton(filename)}</View>
      </View>
    )
  }

  renderRecorderButton = filename => {
    let { prerecording_count = 0 } = this.state
    let is_recoding = this.isRecording(filename)

    if ((prerecording_count > -1 && prerecording_count < 4) || is_recoding) {
      return (
        <TouchableOpacity onPress={this.onPressRecordingStop(filename)}>
          <View style={tailwind('py-3 px-4 bg-white rounded-3xl')}>
            <Text style={tailwind('text-red-600 text-2xl font-bold')}>Detener Grabación</Text>
          </View>
        </TouchableOpacity>
      )
    }

    return (
      <TouchableOpacity onPress={this.onPressRecording(filename)} disabled={!this.formIsValid() || this.state['loading']}>
        <View style={tailwind('py-3 px-4 bg-red-600 rounded-3xl')}>
          <Text style={tailwind('text-white text-2xl font-bold')}>Iniciar Grabación</Text>
        </View>
      </TouchableOpacity>
    )
  }

  renderRecorderGraphic = filename => {
    let shadow = {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,

      elevation: 4,
    }

    let { prerecording_count = 0 } = this.state
    let info = prerecording_count
    if (prerecording_count < 0 || prerecording_count > 3) {
      info = 'icono'
    }

    let is_recoding = this.isRecording(filename)

    let level_1_color = 'bg-gray-400'
    let level_2_color = 'bg-gray-300'
    let level_3_color = 'bg-white'
    if (info == prerecording_count || is_recoding) {
      level_1_color = prerecording_count < 4 ? 'bg-red-600 bg-opacity-90' : level_1_color
      level_2_color = prerecording_count < 3 ? 'bg-red-600 bg-opacity-90' : level_2_color
      level_3_color = prerecording_count < 2 ? 'bg-red-600 bg-opacity-90' : level_3_color
    }

    let shadow2 = shadow
    if (prerecording_count < 3 || is_recoding) {
      shadow2 = {}
    }
    if (prerecording_count == 0) {
      info = '¡Comienza!'
    }

    return (
      <View style={tailwind('flex justify-center items-center relative')}>
        <View style={tailwind('flex justify-center items-center top-0 bottom-0 left-0 right-0 z-10 absolute')}>
          <Text style={tailwind('text-white text-4xl font-bold mt-1')}>{info}</Text>
        </View>
        <View>
          <View>
            <View style={[shadow, tailwind('flex justify-center items-center p-6 rounded-full ' + level_3_color)]}>
              <View style={tailwind('flex justify-center items-center p-6 rounded-full ' + level_2_color)}>
                <View style={[shadow2, tailwind('flex justify-center w-24 h-24 rounded-full ' + level_1_color)]}></View>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }

  renderInfo = textStatusName => {
    return (
      <View style={tailwind('flex flex-row w-full')}>
        <View style={tailwind('flex flex-row items-center justify-center py-0')}>
          <ImageBackground source={BgAffirmation} style={tailwind('w-10 h-10 relative flex justify-center items-center mr-4 ml-3 rounded-full')}>
            <View style={tailwind('absolute top-0 right-0')}>
              <View>
                <Image source={MicrophoneImage} style={tailwind('w-5 h-5 -mt-1 -mr-2')} />
              </View>
            </View>
          </ImageBackground>
          <View style={{ width: '80%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
              <TextInput
                returnKeyType='done'
                onChangeText={text => this.setState({ [textStatusName]: text, fieldsWhereEdited: true })}
                value={this['state'][textStatusName]}
                multiline
                style={[tailwind('text-white text-left text-base bg-black bg-opacity-25 p-2 rounded-lg')]}
              />
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  timezone: datasetSelector(state, 'timezone'),
  imei: datasetSelector(state, 'imei'),
})
const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(AffirmationFormScreen)
