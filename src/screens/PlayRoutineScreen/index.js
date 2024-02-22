import React from 'react'
import { Text, View, TouchableOpacity, ImageBackground, Image, AppState, Platform } from 'react-native'
import NetInfo from '@react-native-community/netinfo'
import Slider from '@react-native-community/slider'
import AsyncStorage from '@react-native-community/async-storage'
import { SafeAreaView } from 'react-navigation'
import * as fn from 'helpers/scripts'
import Orientation from 'react-native-orientation-locker'
//import { Player } from 'react-native-audio-toolkit';
import { Player } from '@react-native-community/audio-toolkit'
import RNFetchBlob from 'rn-fetch-blob'
import KeepAwake from 'react-native-keep-awake'
import Moment from 'moment'
import Debug from 'react-native-json-tree'
import TrackPlayer, { useTrackPlayerProgress } from 'react-native-track-player'
import Loader from 'helpers/loader'
import Toast from 'react-native-easy-toast'
import { NavigationActions, StackActions } from 'react-navigation'
import { datasetSelector } from '../../redux/selectors.js'
import { connect } from 'react-redux'
import request from '../../helpers/request.js'
import { storage_url } from '../../../env.json'
import { getColor, tailwind } from '../../tailwind.js'

const silent1Sec = '1sec.mp3'
const silentMusicPath = `${storage_url}musics/1sec.mp3`

import BgMainIconImg from '../../img/background-home.jpg'
import { secondaryColor } from '../../helpers/styles.js'
import { ScrollView } from 'react-native-gesture-handler'
import BottomNavigationBar from '../../components/BottomNavigationBar/index.js'
import { Icon } from 'native-base'
import LinearGradient from 'react-native-linear-gradient'

class PlayRoutineScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      timeValue: 0,
      btnplaypause: require('img/btnplay.png'),
      volphrase: 1,
      volmusic: 1,
      voltone: 1,
      phrase: '',
      phrases: [],
      maxvalue: 0,
      maxvaluetext: '00:00:00',
      currentvalue: 0,
      currentvaluetext: '00:00:00',
      isShuffle: false,
      isRepeat: false,
      isNoche: false,
      nPhrases: -1,
      actualPhrase: 0,
      usuarioParo: false,
      bgImage: require('img/bg_day_excercise.png'),
      bgcolor: 'orange',
      bgtextcolor: 'green',
      btnaux: require('img/btn_note_black.png'),
      btnspeaker: require('img/btn_sound_black.png'),
      btnsetting: require('img/btn_setting_black.png'),
      mute: false,
      firstAudio: true,
      btnshuffle: require('img/btnshuffle-active.png'),
      btnrepeat: require('img/btnrepeat-active.png'),
      btnnoche: require('img/btn_sleep_black.png'),
      shufflerepeat: 1,
      playerVolText: '',
      appState: AppState.currentState,
      donttouchplaybutton: false,
      phrasesForSendAux: null,
      musicId: 0,
      another: null,
      playAgain: false,
      nol: 10,
      nol2: 0.9,
      lastRun: false,
      repeticiones: 1,
      showVolumenes: false,
      isConnected: true,
      modalText: '',
      isPlayEnabled: false,
      nightMode: false,
      blackMode: false,
      hasBackgroundImage: false,
      bgBlur: 1,
    }
    this.playerAudio = null
    this.playerTone = null
    this.interval = null
    this.interval2 = null
    this.intervalMusic = null
    this.intervalTone = null
    this.wsphrases = []
    this.tiempo = 0
    this.onPlaybackState = null
    this.onTrackChange = null
    this.onPlaybackError = null
    this.onQueueEnd = null
    this.newProgress = 0
    this.toneName = ''
    this.musicName = ''
    this.tone_id = 4
    this.isSetTone = false
    //testing variable :
    this.cntplayerPrinciple = 0
    this.routineData = null
    this.shuffle = false
    this.music = null
    this.tone = null
    this.mode_label = 'affirmation'
    this.valuePausa = 5
    this.repetitions_quantity = 5
    this.totalTime = 0
    this.routine_phrases = null
    this.repeticiones_total = 0
    this.started_at = null
    this.phrasesImages = {}
    this.nPhrases = []
  }
  componentDidMount() {
    this.init()
  }
  init = async () => {
    //console.log('INIT ===> ', {params: this.props.navigation.state.params, routine_configuration_id: this.props.navigation.state.params.routine_configuration_id } )
    this.routineData = this.props.navigation.getParam('routineData')
    this.shuffle = this.props.navigation.getParam('shuffle')
    this.music = this.props.navigation.getParam('music')
    this.tone = this.props.navigation.getParam('tone')
    this.mode_label = this.props.navigation.getParam('mode_label')
    this.valuePausa = this.props.navigation.getParam('valuePausa')
    this.repetitions_quantity = this.props.navigation.getParam('repetitions_quantity')
    this.totalTime = this.props.navigation.getParam('totalTime')
    this.phrasesImages = this.props.navigation.getParam('routine_phrases_images')
    this.nPhrases = []
    this.backgroundImage = this.props.navigation.getParam('backgroundImage')
    //console.log('backgroundImage', this.backgroundImage)
    this.routine_phrases = this.props.navigation.getParam('routine_phrases')
    this.isRepeat = this.props.navigation.getParam('isRepeat')
    this.backgroundMode = this.props.navigation.getParam('backgroundMode')

    const minutesSeconds = Moment.duration(Math.ceil(this.totalTime), 'seconds')
    const maxvaluetext = this.pad(minutesSeconds.hours()) + ':' + this.pad(minutesSeconds.minutes()) + ':' + this.pad(minutesSeconds.seconds())

    this.repeticiones_total = this.routine_phrases.length * this.repetitions_quantity
    this.setState({
      bgBlur: Platform.OS === 'ios' ? 10 : 1,
      maxvaluetext,
      maxvalue: this.totalTime,
      nightMode: this.props.navigation.getParam('nightMode'),
    })

    try {
      TrackPlayer.destroy()
      if (!!this.playerAudio) {
        this.playerAudio.destroy()
      }
      if (!!this.playerTone) {
        this.playerTone.destroy()
      }
    } catch (err) {
      console.log('DESTROY PLAYERS ===> ', err)
    }

    this.phrasesForSend = []
    await this.startPlayer()

    if (this.backgroundMode)
      if (this.state.bgcolor === 'black')
        await this.setState({
          bgcolor: 'black',
          bgtextcolor: 'white',
          btnaux: require('img/btn_note_white.png'),
          btnshuffle: require('img/btnshuffle.png'),
          btnrepeat: require('img/btnrepeat.png'),
          btnnoche: require('img/btn_sleep_white.png'),
          btnspeaker: require('img/btn_sound_white.png'),
          btnsetting: require('img/btn_setting_white.png'),
        })
      else
        await this.setState({
          bgcolor: 'white',
          bgtextcolor: 'black',
          btnaux: require('img/btn_note_black.png'),
          btnshuffle: require('img/btnshuffle-active.png'),
          btnrepeat: require('img/btnrepeat-active.png'),
          btnnoche: require('img/btn_sleep_black.png'),
          btnspeaker: require('img/btn_sound_black.png'),
          btnsetting: require('img/btn_setting_black.png'),
        })
    else if (this.state.nightMode)
      await this.setState({
        nightMode: false,
        bgImage: this.backgroundMode ? this.state.bgImage : require('img/bg_day_excercise.png'),
        bgcolor: 'white',
        bgtextcolor: 'black',
        btnaux: require('img/btn_note_black.png'),
        btnshuffle: require('img/btnshuffle-active.png'),
        btnrepeat: require('img/btnrepeat-active.png'),
        btnnoche: require('img/btn_sleep_black.png'),
        btnspeaker: require('img/btn_sound_black.png'),
        btnsetting: require('img/btn_setting_black.png'),
      })
    else
      await this.setState({
        nightMode: true,
        bgImage: this.backgroundMode ? this.state.bgImage : require('img/bg_excercise.png'),
        bgcolor: 'black',
        bgtextcolor: 'white',
        btnaux: require('img/btn_note_white.png'),
        btnshuffle: require('img/btnshuffle.png'),
        btnrepeat: require('img/btnrepeat.png'),
        btnnoche: require('img/btn_sleep_white.png'),
        btnspeaker: require('img/btn_sound_white.png'),
        btnsetting: require('img/btn_setting_white.png'),
      })
  }

  _playerVolComponent = () => {
    if (this.state.isNoche) {
      return <Slider step={0.1} maximumValue={1} onValueChange={this.changePlayerVol.bind(this)} value={this.state.volphrase} style={{ marginTop: 10 }} />
    } else {
      return <Slider step={0.1} maximumValue={1} onValueChange={this.changePlayerVol.bind(this)} value={this.state.volphrase} style={{ marginTop: 10 }} />
    }
  }

  logPlayback = async () => {}

  change(value) {
    this.setState({
      value: parseFloat(value),
    })
  }

  changePlayerVol(value) {
    try {
      TrackPlayer.setVolume(value)
    } catch (err) {}
    this.setState({
      volphrase: value,
    })
  }

  changePlayerMusicVol(value) {
    try {
      this.playerAudio.volume = value
    } catch (err) {}
    this.setState({ volmusic: value })
  }

  changePlayerToneVol(value) {
    try {
      this.playerTone.volume = value
    } catch (err) {}
    this.setState({ voltone: value })
  }

  pad(num) {
    return ('0' + num).slice(-2)
  }

  hhmmss(secs) {
    var minutes = Math.floor(secs / 60)
    secs = secs % 60
    var hours = Math.floor(minutes / 60)
    minutes = minutes % 60

    secs = Math.round(secs)

    return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(secs)}`
  }

  _getActualDateTime(fechaHoraActual) {
    fechaHora = new Date(fechaHoraActual)
    return (
      Moment(fechaHora).format('Y-') +
      this.pad(Moment(fechaHora).format('M')) +
      '-' +
      this.pad(Moment(fechaHora).format('D')) +
      ' ' +
      this.pad(Moment(fechaHora).format('H')) +
      ':' +
      this.pad(Moment(fechaHora).format('m')) +
      ':' +
      this.pad(Moment(fechaHora).format('s'))
    )
  }

  _initializeMusic = async (dirs, musicName) => {
    const filePath = 'file://' + dirs.DocumentDir + '/' + musicName
    this.playerAudio = new Player(filePath, { autoDestroy: false, continuesToPlayInBackground: true })
    this.playerAudio.looping = true
    this.playerAudio.volume = this.state.volmusic
    if (Platform.OS === 'android') this.playerAudio.speed = 0.0
    await new Promise(resolve =>
      this.playerAudio.prepare(err => {
        resolve()
      }),
    )
  }

  _initializeTone = (dirs, toneName) => {
    const filePath = 'file://' + dirs.DocumentDir + '/' + toneName
    this.playerTone = new Player(filePath, { autoDestroy: false, continuesToPlayInBackground: true })
    this.playerTone.looping = true
    this.playerTone.volume = this.state.voltone
    if (Platform.OS === 'android') this.playerTone.speed = 0.0
    this.playerTone.prepare()
  }

  startPlayer = async () => {
    KeepAwake.activate()
    this.phrasesForSend = []
    const started_at = new Date()
    const completed_at = Moment(started_at).add(this.totalTime, 's').toDate()
    this.started_at = this._getActualDateTime(started_at)
    this.completed_at = this._getActualDateTime(completed_at)

    var data = this.props.user

    this.setState({
      applang: this.props.user.default_language,
    })
    //Part to get language
    var auxlang = 'get_screens_translations_es'
    var tiempo = 'Tiempo'
    var frases = 'Frases'
    var affirmations = 'Afirmación'
    var gratitude = 'Gratitud'
    var tono = 'Tono'
    var musica = 'Música'
    if (this.props.user.default_language == 'en') {
      auxlang = 'get_screens_translations_en'
      tiempo = 'Time'
      frases = 'Phrases'
      affirmations = 'Affirmation'
      gratitude = 'Gratitude'
      tono = 'Tone'
      musica = 'Music'
    }
    if (this.props.user.default_language == 'pt') {
      auxlang = 'get_screens_translations_pt'
      tiempo = 'Tempo'
      frases = 'Frases'
      affirmations = 'Afirmação'
      gratitude = 'Gratidão'
      tono = 'Tono'
      musica = 'Music'
    }
    var playerVolText = ''
    if (this.mode_label == 'affirmation' || this.mode_label == 'creative_visualization') {
      playerVolText = affirmations
    } else {
      playerVolText = gratitude
    }
    let lng = await AsyncStorage.getItem(auxlang)
    var data = JSON.parse(lng).result
    await this.setState({
      label1: data.informationScreen.header.label,
      label2: data.informationScreen.search_button.label,
      tiempo: tiempo,
      frases: frases,
      httono: tono,
      htmusica: musica,
      playerVolText: playerVolText,
    })

    let isConnected = await NetInfo.isConnected.fetch()

    await this.setState({
      checked: true,
      isConnected,
    })

    await TrackPlayer.setupPlayer({
      iosCategoryMode: 'spokenAudio',
    })
    const trackPlayerCapabilities = [TrackPlayer.CAPABILITY_PLAY, TrackPlayer.CAPABILITY_PAUSE]
    TrackPlayer.updateOptions({
      stopWithApp: true,
      notificationCapabilities: trackPlayerCapabilities,
    })
    TrackPlayer.setVolume(this.state.volphrase)
    // if (Platform.OS !== "ios") {
    TrackPlayer.registerPlaybackService(() => require('../../app/playerService.js'))
    // }
    this.onTrackChange = TrackPlayer.addEventListener('playback-track-changed', async data => {
      var actualTrack
      if (data.nextTrack == null) {
        return
      }
      actualTrack = data.nextTrack.split('_')
      if (actualTrack[0] == 'track') {
        const phraseIndex = parseInt(actualTrack[1])
        const trackIndex = parseInt(actualTrack[2])
        const started_at = new Date()
        const completed_at = Moment(started_at).add(this.wsphrases[trackIndex].phraseTime, 's').toDate()
        this.phrasesForSend.push({
          id: this.wsphrases[trackIndex].id,
          muser_routine_id: this.wsphrases[trackIndex].muser_routine_id,
          phrase_type: this.wsphrases[trackIndex].phrase_type,
          muser_id: this.wsphrases[trackIndex].muser_id,
          phrase_pause_time: this.wsphrases[trackIndex].phrase_pause_time,
          started_at: this._getActualDateTime(started_at),
          completed_at: this._getActualDateTime(completed_at),
        })
        //console.log('[nPhrases]', this.nPhrases)
        //console.log('[actual track]', actualTrack)
        //console.log('[current nPhrase]', this.nPhrases[actualTrack[2]])
        if (this.backgroundMode && this.nPhrases[actualTrack[2]]) {
          let dirs = RNFetchBlob.fs.dirs
          const image_uri = 'file://' + this.nPhrases[actualTrack[2]].uri
          //console.log('[phrase image url]', image_uri)
          this.setState({ bgImage: { uri: image_uri }, hasBackgroundImage: true, bgtextcolor: 'white' })
        } else if (this.backgroundMode && this.backgroundImage) {
          let dirs = RNFetchBlob.fs.dirs
          const image_uri = 'file://' + dirs.DocumentDir + '/' + this.backgroundImage
          //console.log('[routine image url]', image_uri)
          this.setState({ bgImage: { uri: image_uri }, hasBackgroundImage: true, bgtextcolor: 'white' })
        } else {
          this.setState({ bgImage: this.state.nightMode ? require('img/bg_excercise.png') : require('img/bg_day_excercise.png') })
        }
        try {
          this.setState({
            phrase: this.wsphrases[trackIndex].text,
            repeticiones: parseInt(trackIndex) + 1,
          })
        } catch (err) {}
      } else {
        this.setState({
          phrase: '',
        })
      }
      //console.log('QUEUE:', await TrackPlayer.getQueue());
    })
    this.onQueueEnd = TrackPlayer.addEventListener('playback-queue-ended', data => {
      if (!this.state.lastRun) {
        this.setState({ phrase: '' })
      }
    })

    // TrackPlayer.addEventListener('playback-state', state=>{
    //     if (state != TrackPlayer.STATE_PLAYING) {
    //         if (this.interval) {
    //             this.interval.pause()
    //         }
    //     } else if (state == TrackPlayer.STATE_PLAYING) {
    //         if (this.interval) {
    //             this.interval.resume()
    //         }
    //     }
    // })
    AppState.addEventListener('change', this._handleAppStateChange)
    Orientation.unlockAllOrientations()
    Orientation.addOrientationListener(this._orientationDidChange)
    const dirs = RNFetchBlob.fs.dirs
    await this._initializeMusic(dirs, this.music.path)
    if (this.tone.id != 4) {
      this._initializeTone(dirs, this.tone.path)
    }

    if (this.shuffle) {
      for (var i1 = 0; i1 < this.repetitions_quantity; i1++) {
        this.routine_phrases.map((phrase, index) => {
          const audioTime =
            this.mode_label == 'affirmation' || this.mode_label == 'creative_visualization' ? phrase.audio_affirmative_time : phrase.audio_gratitude_time
          const spliteAudioTime = audioTime.split(':')
          const phraseTime = parseInt(spliteAudioTime[2]) + parseInt(spliteAudioTime[1]) * 60 + parseInt(spliteAudioTime[0]) * 3600
          const delayTimeStr = this.mode_label == 'creative_visualization' ? phrase.modes.creative_visualization : phrase.default_delay_time
          const splitDelayTime = delayTimeStr.split(':')
          const phrase_pause_time = parseInt(splitDelayTime[2]) + parseInt(splitDelayTime[1]) * 60 + parseInt(splitDelayTime[0]) * 3600
          this.wsphrases.push({
            index,
            id: phrase.id,
            muser_routine_id: phrase.muser_routine_id,
            muser_id: phrase.muser_id,
            phrase_type: phrase.phrase_type,
            text: this.mode_label == 'affirmation' || this.mode_label == 'creative_visualization' ? phrase.text_affirmative : phrase.text_gratitude,
            filePath:
              this.mode_label == 'affirmation' || this.mode_label == 'creative_visualization'
                ? dirs.DocumentDir + '/' + phrase.audio_affirmative
                : dirs.DocumentDir + '/' + phrase.audio_gratitude,
            phraseTime,
            phrase_pause_time: this.valuePausa ? this.valuePausa : phrase_pause_time,
            imagePath: this.phrasesImages[phrase.id],
          })
        })
      }
    } else {
      this.routine_phrases.map((phrase, index) => {
        const audioTime =
          this.mode_label == 'affirmation' || this.mode_label == 'creative_visualization' ? phrase.audio_affirmative_time : phrase.audio_gratitude_time
        const spliteAudioTime = audioTime.split(':')
        const phraseTime = parseInt(spliteAudioTime[2]) + parseInt(spliteAudioTime[1]) * 60 + parseInt(spliteAudioTime[0]) * 3600
        const delayTimeStr = this.mode_label == 'creative_visualization' ? phrase.modes.creative_visualization : phrase.default_delay_time
        const splitDelayTime = delayTimeStr.split(':')
        const phrase_pause_time = parseInt(splitDelayTime[2]) + parseInt(splitDelayTime[1]) * 60 + parseInt(splitDelayTime[0]) * 3600
        for (var i1 = 0; i1 < this.repetitions_quantity; i1++) {
          this.wsphrases.push({
            index,
            id: phrase.id,
            muser_routine_id: phrase.muser_routine_id,
            muser_id: phrase.muser_id,
            phrase_type: phrase.phrase_type,
            text: this.mode_label == 'affirmation' || this.mode_label == 'creative_visualization' ? phrase.text_affirmative : phrase.text_gratitude,
            filePath:
              this.mode_label == 'affirmation' || this.mode_label == 'creative_visualization'
                ? dirs.DocumentDir + '/' + phrase.audio_affirmative
                : dirs.DocumentDir + '/' + phrase.audio_gratitude,
            phraseTime,
            phrase_pause_time: this.valuePausa ? this.valuePausa : phrase_pause_time,
            imagePath: this.phrasesImages[phrase.id],
          })
        }
      })
    }
    //console.log('FRASES ===> ', this.wsphrases)
    this.setState({
      phrase: this.wsphrases[0].text,
      btnplaypause: require('img/btnpause.png'),
    })
    if (this.backgroundMode && this.backgroundImage && this.nPhrases == -1) {
      let dirs = RNFetchBlob.fs.dirs
      const image_uri = 'file://' + dirs.DocumentDir + '/' + this.backgroundImage
      this.setState({ bgImage: { uri: image_uri } })
    }
    await this._addToQueue()
    setTimeout(async () => {
      this._playerPrincipal()
      await TrackPlayer.play()
      if (!!this.playerTone && this.playerTone.canPlay) {
        setTimeout(() => {
          this.playerTone.play()
        }, 100)
      }

      if (!!this.playerAudio && this.playerAudio.canPlay) {
        setTimeout(() => {
          this.playerAudio.play()
          //console.log('playerAudioState: 1 ', this.playerAudio)
        }, 100)
      }
      this.setState({ isPlayEnabled: true })
    }, 500)
  }

  _addToQueue = async () => {
    for (let i = 0; i < this.wsphrases.length; i++) {
      const phrase = this.wsphrases[i]

      //console.log('phrase to add to queue', phrase)
      await TrackPlayer.add({
        id: 'track_' + phrase.index + '_' + i,
        url: 'file://' + phrase.filePath,
        title: phrase.text,
        description: phrase.text,
        artist: 'Infinite Power',
      })
      this.nPhrases[i] = phrase.imagePath ? phrase.imagePath : null
      var valuePausa = this.valuePausa
      if (Platform.OS == 'ios') {
        valuePausa--
      }
      for (var ii = 0; ii < valuePausa; ii++) {
        await TrackPlayer.add({
          id: 'pause_' + ii,
          url: 'file://' + RNFetchBlob.fs.dirs.DocumentDir + '/' + silent1Sec,
          title: 'Infinite Power',
          description: '',
          artist: 'Infinite Power',
        })
      }
    }
  }

  changeBackground = async () => {
    //console.log('current', await TrackPlayer.getCurrentTrack())
  }

  _orientationDidChange = orientation => {
    TrackPlayer.pause()
    if (orientation === 'LANDSCAPE') {
      this.setState({
        ori: 'LANDSCAPE',
        nol: 2,
        nol2: 0.5,
      })
      TrackPlayer.play()
    } else {
      this.setState({
        ori: 'PORTRAIT',
        nol: 10,
        nol2: 0.9,
      })
      TrackPlayer.play()
    }
  }

  _handleAppStateChange = nextAppState => {
    //console.log('_handleAppStateChange ===> ', nextAppState)
    /*if (nextAppState == 'background') {
            this.setState({
                btnplaypause: require('img/btnplay.png'),
                usuarioParo: true,
            })
            TrackPlayer.setVolume(0)
            TrackPlayer.pause()
            if (this.playerAudio != null) {
                this.playerAudio.pause()
            }
            if (this.playerTone != null) {
                this.playerTone.pause()
            }
            this.interval.pause();
        }*/
  }

  async componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange)
    KeepAwake.deactivate()
    Orientation.removeOrientationListener(this._orientationDidChange)
    Orientation.lockToPortrait()
    clearTimeout(this.intervalTone)
    clearTimeout(this.intervalMusic)
    clearTimeout(this.interval2)
    clearTimeout(this.interval)
    if (!!this.interval) this.interval.stop()
    try {
      await TrackPlayer.stop()
      await TrackPlayer.reset()
      if (!!this.playerAudio) {
        this.playerAudio.destroy()
      }

      if (!!this.playerTone) {
        this.playerTone.destroy()
      }
      await TrackPlayer.destroy()
    } catch (err) {}
  }

  _sendToServer = async () => {
    try {
      let user = await AsyncStorage.getItem('user')
      user = JSON.parse(user)
      const newObj = {}
      newObj['lang'] = user.default_language
      newObj['timezone'] = user.timezone
      newObj['imei'] = user.imei
      newObj['played_phrases'] = this.phrasesForSend
      newObj['routine'] = {
        id: this.routineData.routine.id,
        music_id: this.music.id,
        tone_id: this.tone.id,
        name: this.routineData.routine.name,
        mode: this.mode_label,
        routine_mode: this.routineData.routine.routine_mode,
        duration_time: this.hhmmss(this.totalTime),
        routine_configuration_id: this.props.navigation.state.params.routine_configuration_id,
      }
      newObj['tone_id'] = this.tone.id
      newObj['music_id'] = this.music.id
      newObj['routine_mode'] = this.routineData.routine.routine_mode
      newObj['started_at'] = this.started_at
      newObj['completed_at'] = this.completed_at
      newObj['duration_time'] = this.hhmmss(this.totalTime)
      newObj['repetitions_quantity'] = this.repetitions_quantity
      newObj['routine_id'] = this.routineData.routine.id
      if (!this.state.isConnected) {
        AsyncStorage.getItem('reproducciones').then(value => {
          value = JSON.parse(value)
          if (value == null) {
            value = []
          }
          value.push(newObj)
          AsyncStorage.setItem('reproducciones', JSON.stringify(value))
        })
        return
      }
      //console.log('sending server:', JSON.stringify(newObj))
      let { data, error } = await request({
        url: 'mobile/users/save_reproduction_data',
        method: 'POST',
        data: newObj,
        //debug: true,
      })
      //console.log('save_reproduction_data ===> ', data)
      if (!error) AsyncStorage.setItem('reprocess', 'true')
    } catch (err) {}
  }

  musicVolDownFunc = () => {
    this.intervalMusic = setTimeout(() => {
      try {
        this.playerAudio.volume = this.playerAudio.volume - 0.002
        if (this.playerAudio.volume <= 0) {
          this.playerAudio.stop()
        } else {
          this.musicVolDownFunc()
        }
      } catch (err) {}
    }, 5)
  }

  toneVolDownFunc = () => {
    this.intervalTone = setTimeout(() => {
      try {
        this.playerTone.volume = this.playerTone.volume - 0.001
        if (this.playerTone.volume <= 0) {
          this.playerTone.stop()
        } else {
          this.toneVolDownFunc()
        }
      } catch (err) {}
    }, 5)
  }

  _finalizarPlayers = () => {
    KeepAwake.activate()
    this.interval2 = setTimeout(() => {
      if (this.tiempo == Math.round(this.valuePausa / 2) - 1) {
        clearTimeout(this.intervalTone)
        clearTimeout(this.intervalMusic)
        clearTimeout(this.interval2)
        this.tiempo = 0
      } else {
        this.tiempo++
        try {
          this._finalizarPlayers()
        } catch (err) {}
      }
    }, 1000)
  }

  _playerPrincipal = async () => {
    this.cntplayerPrinciple++
    this.interval = new fn.Timer(async () => {
      const aux1 = this.state.currentvalue + 1
      const aux2 = this.hhmmss(aux1)
      if (this.state.isNoche) {
        var time = Math.round(this.totalTime * 0.1)
        if (Math.round(this.totalTime * 0.1) == aux1) {
          await TrackPlayer.setVolume(0.9)
          this.setState({
            volphrase: 0.9,
          })
        }
        if (Math.round(this.totalTime * 0.2) == aux1) {
          await TrackPlayer.setVolume(0.8)
          this.setState({
            volphrase: 0.8,
          })
        }
        if (Math.round(this.totalTime * 0.3) == aux1) {
          await TrackPlayer.setVolume(0.7)
          this.setState({
            volphrase: 0.7,
          })
        }
        if (Math.round(this.totalTime * 0.4) == aux1) {
          await TrackPlayer.setVolume(0.6)
          this.setState({
            volphrase: 0.6,
          })
        }
        if (Math.round(this.totalTime * 0.5) == aux1) {
          await TrackPlayer.setVolume(0.5)
          this.setState({
            volphrase: 0.5,
          })
        }
        if (Math.round(this.totalTime * 0.6) == aux1) {
          await TrackPlayer.setVolume(0.4)
          this.setState({
            volphrase: 0.4,
          })
        }
        if (Math.round(this.totalTime * 0.7) == aux1) {
          await TrackPlayer.setVolume(0.3)
          this.setState({
            volphrase: 0.3,
          })
        }
      }
      if (Math.round(this.totalTime) - 10 == aux1) {
        this.musicVolDownFunc()
        this.toneVolDownFunc()
      }
      if (Math.round(this.totalTime) - Math.round(this.valuePausa / 2) == aux1) {
        this._sendToServer()
        this.setState({
          donttouchplaybutton: true,
          lastRun: true,
        })
        this._finalizarPlayers()
      }
      if (Math.round(this.totalTime) == aux1) {
        this.interval.stop()
        KeepAwake.deactivate()
        this.setState({
          donttouchplaybutton: false,
          lastRun: false,
          playAgain: true,
          totalTime: 0,
          currentvalue: this.state.currentvalue,
          timeValue: this.state.currentvalue,
          currentvaluetext: aux2,
          btnplaypause: require('img/btnplay.png'),
          repeticiones: 0,
        })
        TrackPlayer.pause()
        if (!!this.playerAudio) {
          this.playerAudio.pause()
          //console.log('playerAudioState: 2', this.playerAudio)
          this.playerAudio.seek()
          this.props.navigation.pop(3)
          /*this.props.navigation.dispatch(
            StackActions.reset({
              index: 1,
              actions: [NavigationActions.navigate({ routeName: 'Main' }), NavigationActions.navigate({ routeName: 'TodayActivitiesScreen' })],
            }),
          )*/
        }
        if (!!this.playerTone) {
          this.playerTone.pause()
          this.playerTone.seek()
        }
        this.interval.pause()
        if (this.state.isRepeat) {
          setTimeout(() => {
            // this._screenPlay()
          }, 2000)
        }
      } else {
        this.setState({
          currentvalue: aux1,
          timeValue: aux1,
          currentvaluetext: aux2,
        })

        this._playerPrincipal()
      }
    }, 1000)
  }

  _screenPlay = async () => {
    if (!this.state.donttouchplaybutton) {
      KeepAwake.activate()
      if (this.state.btnplaypause == require('img/btnplay.png')) {
        if (this.state.playAgain) {
          this.phrasesForSend = []
          const started_at = new Date()
          const completed_at = Moment(started_at).add(this.totalTime, 's').toDate()
          completed_at.setSeconds(completed_at.getSeconds() + this.totalTime)
          this.started_at = this._getActualDateTime(started_at)
          this.completed_at = this._getActualDateTime(completed_at)
          await TrackPlayer.reset()
          await this._addToQueue()
          this.setState({
            phrase: this.wsphrases[0].text,
            currentvalue: 0,
            timeValue: 0,
            currentvaluetext: this.hhmmss(0),
            playAgain: false,
          })
          if (!this.state.mute) {
            await TrackPlayer.setVolume(1)
            this.setState({ volphrase: 1 })
            if (!!this.playerAudio) {
              this.playerAudio.volume = this.state.volmusic
            }
            if (!!this.playerTone) {
              this.playerTone.volume = this.state.voltone
            }
          }
        }
        await TrackPlayer.setVolume(this.state.volphrase)
        await TrackPlayer.play()
        if (!!this.playerTone) {
          setTimeout(() => {
            this.playerTone.play()
          })
        }
        if (!!this.playerAudio) {
          setTimeout(() => {
            this.playerAudio.play()
            //console.log('playerAudioState: 3', this.playerAudio)
          })
        }
        this.interval.resume()
        this.setState({ btnplaypause: require('img/btnpause.png') })
      } else {
        this.setState({
          btnplaypause: require('img/btnplay.png'),
          usuarioParo: true,
        })
        await TrackPlayer.pause()
        if (!!this.playerAudio) {
          this.playerAudio.pause()
          //console.log('playerAudioState: 4', this.playerAudio)
        }
        if (!!this.playerTone) {
          this.playerTone.pause()
        }
        this.interval.pause()
      }
    }
  }

  ProgressBar() {
    if (!!this.prog) this.prog++
    else this.prog = 0
    const progress = useTrackPlayerProgress()
    return (
      <View
        style={{
          height: 1,
          width: '90%',
          marginTop: 10,
          flexDirection: 'row',
        }}
      >
        <View style={{ flex: progress.position }} />
        <View
          style={{
            flex: progress.duration - progress.position,
            backgroundColor: 'grey',
          }}
        />
      </View>
    )
  }

  onPressBtnAux = () => {
    if (this.backgroundMode) {
      if (this.state.bgcolor == 'white') {
        this.setState({
          bgcolor: 'black',
          bgtextcolor: 'white',
          btnaux: require('img/btn_note_white.png'),
          btnshuffle: require('img/btnshuffle.png'),
          btnrepeat: require('img/btnrepeat.png'),
          btnnoche: require('img/btn_sleep_white.png'),
          btnspeaker:
            this.state.btnspeaker == require('img/btn_sound_black.png') ? require('img/btn_sound_white.png') : require('img/btn_sound_mute_white.png'),
          btnsetting: require('img/btn_setting_white.png'),
        })
      } else {
        this.setState({
          bgcolor: 'white',
          bgtextcolor: 'black',
          btnaux: require('img/btn_note_black.png'),
          btnshuffle: require('img/btnshuffle-active.png'),
          btnrepeat: require('img/btnrepeat-active.png'),
          btnnoche: require('img/btn_sleep_black.png'),
          btnspeaker:
            this.state.btnspeaker == require('img/btn_sound_white.png') ? require('img/btn_sound_black.png') : require('img/btn_sound_mute_black.png'),
          btnsetting: require('img/btn_setting_black.png'),
        })
      }
    } else {
      if (this.state.nightMode) {
        this.setState({
          nightMode: false,
          bgImage: this.backgroundMode ? this.state.bgImage : require('img/bg_day_excercise.png'),
          bgcolor: 'white',
          bgtextcolor: 'black',
          btnaux: require('img/btn_note_black.png'),
          btnshuffle: require('img/btnshuffle-active.png'),
          btnrepeat: require('img/btnrepeat-active.png'),
          btnnoche: require('img/btn_sleep_black.png'),
          btnspeaker:
            this.state.btnspeaker == require('img/btn_sound_white.png') ? require('img/btn_sound_black.png') : require('img/btn_sound_mute_black.png'),
          btnsetting: require('img/btn_setting_black.png'),
        })
      } else {
        this.setState({
          nightMode: true,
          bgImage: this.backgroundMode ? this.state.bgImage : require('img/bg_excercise.png'),
          bgcolor: 'black',
          bgtextcolor: 'white',
          btnaux: require('img/btn_note_white.png'),
          btnshuffle: require('img/btnshuffle.png'),
          btnrepeat: require('img/btnrepeat.png'),
          btnnoche: require('img/btn_sleep_white.png'),
          btnspeaker:
            this.state.btnspeaker == require('img/btn_sound_black.png') ? require('img/btn_sound_white.png') : require('img/btn_sound_mute_white.png'),
          btnsetting: require('img/btn_setting_white.png'),
        })
      }
    }
  }

  onPressSpeaker = () => {
    if (this.backgroundMode) {
      if (this.state.btnspeaker == require('img/btn_sound_white.png')) {
        this.setState({
          mute: true,
          btnspeaker: require('img/btn_sound_mute_white.png'),
        })
        try {
          TrackPlayer.setVolume(0)
          if (this.playerAudio) {
            this.playerAudio.volume = 0
          }
          if (this.playerAudio) {
            this.playerTone.volume = 0
          }
        } catch (err) {}
      } else if (this.state.btnspeaker == require('img/btn_sound_mute_white.png')) {
        this.setState({
          mute: false,
          btnspeaker: require('img/btn_sound_white.png'),
        })
        try {
          TrackPlayer.setVolume(this.state.volphrase)
          if (this.playerAudio) {
            this.playerAudio.volume = this.state.volmusic
          }
          if (this.playerTone) {
            this.playerTone.volume = this.state.voltone
          }
        } catch (err) {}
      } else if (this.state.btnspeaker == require('img/btn_sound_black.png')) {
        this.setState({
          mute: true,
          btnspeaker: require('img/btn_sound_mute_black.png'),
        })
        try {
          TrackPlayer.setVolume(0)
          if (this.playerAudio) {
            this.playerAudio.volume = 0
          }
          if (this.playerAudio) {
            this.playerTone.volume = 0
          }
        } catch (err) {}
      } else if (this.state.btnspeaker == require('img/btn_sound_mute_black.png')) {
        this.setState({
          mute: false,
          btnspeaker: require('img/btn_sound_black.png'),
        })
        try {
          TrackPlayer.setVolume(this.state.volphrase)
          if (this.playerAudio) {
            this.playerAudio.volume = this.state.volmusic
          }
          if (this.playerTone) {
            this.playerTone.volume = this.state.voltone
          }
        } catch (err) {}
      }
    } else {
      if (this.state.btnspeaker == require('img/btn_sound_white.png')) {
        this.setState({
          mute: true,
          btnspeaker: require('img/btn_sound_mute_white.png'),
        })
        try {
          TrackPlayer.setVolume(0)
          if (this.playerAudio) {
            this.playerAudio.volume = 0
          }
          if (this.playerAudio) {
            this.playerTone.volume = 0
          }
        } catch (err) {}
      } else if (this.state.btnspeaker == require('img/btn_sound_mute_white.png')) {
        this.setState({
          mute: false,
          btnspeaker: require('img/btn_sound_white.png'),
        })
        try {
          TrackPlayer.setVolume(this.state.volphrase)
          if (this.playerAudio) {
            this.playerAudio.volume = this.state.volmusic
          }
          if (this.playerTone) {
            this.playerTone.volume = this.state.voltone
          }
        } catch (err) {}
      } else if (this.state.btnspeaker == require('img/btn_sound_black.png')) {
        this.setState({
          mute: true,
          btnspeaker: require('img/btn_sound_mute_black.png'),
        })
        try {
          TrackPlayer.setVolume(0)
          if (this.playerAudio) {
            this.playerAudio.volume = 0
          }
          if (this.playerAudio) {
            this.playerTone.volume = 0
          }
        } catch (err) {}
      } else if (this.state.btnspeaker == require('img/btn_sound_mute_black.png')) {
        this.setState({
          mute: false,
          btnspeaker: require('img/btn_sound_black.png'),
        })
        try {
          TrackPlayer.setVolume(this.state.volphrase)
          if (this.playerAudio) {
            this.playerAudio.volume = this.state.volmusic
          }
          if (this.playerTone) {
            this.playerTone.volume = this.state.voltone
          }
        } catch (err) {}
      }
    }
  }

  renderOld() {
    return (
      <ImageBackground
        source={this.state.bgImage}
        style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
        blurRadius={this.backgroundMode && this.state.bgImage !== require('img/bg_day_excercise.png') ? this.state.bgBlur : 0}
      >
        <Loader loading={this.state.loading} modalText={this.state.modalText} />
        <SafeAreaView
          style={{
            flex: 1,
            alignItems: 'stretch',
            justifyContent: 'flex-start',
          }}
        >
          {/* <View style={ styles.titleBar}>
                          <Text style={{fontSize : 20,color:'white'}}>{global?.language?.title_my_routines}</Text>
                     </View> */}
          <Toast
            ref='toast'
            style={{ backgroundColor: this.authButtonColor }}
            fadeInDuration={750}
            fadeOutDuration={1000}
            opacity={0.8}
            textStyle={{ color: 'white' }}
          />
          <View style={{ flex: 1 }}>
            {this.backgroundMode && this.state.bgImage !== require('img/bg_day_excercise.png') && (
              <View style={{ width: '100%', paddingHorizontal: 20, marginTop: 20, position: 'absolute' }}>
                <Image
                  source={this.state.bgImage}
                  style={{ width: '100%', height: 500, borderRadius: 2, shadowColor: 'black', shadowRadius: 2, shadowOffset: { width: 2, height: 2 } }}
                  resizeMode='contain'
                />
              </View>
            )}
            <View style={{ flex: 1, padding: 10, paddingTop: 0, paddingBottom: 0, justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
              <Text
                style={{ textAlign: 'center', fontSize: 30, padding: 20, color: this.state.bgtextcolor }}
                adjustsFontSizeToFit={true}
                numberOfLines={this.state.nol}
                minimumFontScale={this.state.nol2}
              >
                {this.state.phrase}
                {/* Improve my thought.Change my beliefs.Become a better version of myself */}
              </Text>
            </View>

            <View style={{ padding: 40 }}>
              <Slider
                // step={this.state.currentvalue}
                step={0.1}
                maximumValue={this.state.maxvalue}
                onValueChange={this.change.bind(this)}
                value={this.state.timeValue}
                disabled
              />

              <View style={{ flexDirection: 'row' }}>
                <View>
                  <View style={{ width: 70 }}>
                    <Text style={{ textAlign: 'center', color: this.state.bgtextcolor }}>{this.state.currentvaluetext}</Text>
                  </View>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: this.state.bgtextcolor }}>{this.state.tiempo}:</Text>
                    <View style={{ width: 70, marginLeft: 10 }}>
                      <Text style={{ textAlign: 'center', color: this.state.bgtextcolor }}>{this.state.maxvaluetext}</Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'center', alignSelf: 'center', marginTop: 10 }}>
                    <Text style={{ color: this.state.bgtextcolor }}>{this.state.frases}:</Text>
                    <View style={{ width: 70, marginLeft: 10, alignItems: 'center' }}>
                      <Text style={{ textAlign: 'center', color: this.state.bgtextcolor }}>
                        {this.state.repeticiones} / {this.repeticiones_total}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              {/* <View style={{}}> */}
              <TouchableOpacity
                style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 35 }}
                onPress={() => {
                  this._screenPlay()
                }}
                disabled={!this.state.isPlayEnabled}
              >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Image source={this.state.btnplaypause} style={{ width: 60, height: 60 }} />
                </View>
              </TouchableOpacity>
              {/* </View> */}
              <View style={{ flexDirection: 'row', marginTop: 45 }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <View style={{ flexDirection: 'row' }}>
                    {this.state.isShuffle && (
                      <View style={{ marginLeft: 6 }}>
                        <Image source={this.state.btnshuffle} style={{ width: 34, height: 34, marginRight: 15 }} />
                      </View>
                    )}
                    {this.state.isRepeat && (
                      <View style={{ marginLeft: 6 }}>
                        <Image source={this.state.btnrepeat} style={{ width: 34, height: 34, marginRight: 15 }} />
                      </View>
                    )}
                    {this.state.isNoche && (
                      <View style={{ marginLeft: 6 }}>
                        <Image source={this.state.btnnoche} style={{ width: 34, height: 34, marginRight: 15 }} />
                      </View>
                    )}
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.goBack()
                      }}
                    >
                      <View style={{ marginLeft: 10 }}>
                        {this.backgroundMode ? (
                          <Image
                            source={this.state.bgcolor == 'black' ? require('img/btn_setting_white.png') : require('img/btn_setting_black.png')}
                            style={{ opacity: 0.5, width: 34, height: 34, marginRight: 15, transform: [{ rotate: '-90deg' }] }}
                          />
                        ) : (
                          <Image
                            source={this.state.bgcolor == 'black' ? require('img/btn_setting_white.png') : require('img/btn_setting_black.png')}
                            style={{ opacity: 0.5, width: 34, height: 34, marginRight: 15, transform: [{ rotate: '-90deg' }] }}
                          />
                        )}
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{}} onPress={this.onPressBtnAux}>
                      <View style={{ marginLeft: 10 }}>
                        <Image source={this.state.btnaux} style={{ opacity: 0.5, width: 34, height: 34, marginRight: 15 }} />
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{}} onPress={this.onPressSpeaker}>
                      <View style={{ marginLeft: 10 }}>
                        <Image source={this.state.btnspeaker} style={{ opacity: 0.5, width: 34, height: 34, marginRight: 15 }} />
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{}}
                      onPress={() => {
                        this.setState({
                          showVolumenes: !this.state.showVolumenes,
                        })
                      }}
                    >
                      <View style={{ marginLeft: 6 }}>
                        <Image
                          source={this.state.btnsetting}
                          style={{
                            opacity: 0.5,
                            width: 34,
                            height: 34,
                            transform: this.state.showVolumenes == true ? [{ rotate: '0deg' }] : [{ rotate: '180deg' }],
                          }}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              {this.renderVolumes()}
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    )
  }

  render() {
    return (
      <View style={tailwind('w-full h-full relative flex flex-col')}>
        <Loader loading={this.state.loading} />
        <ImageBackground source={require('img/bg_day_excercise.png')} imageStyle={{ resizeMode: 'cover' }} style={tailwind('absolute h-full w-full ')} />

        <SafeAreaView style={tailwind('flex flex-grow relative')}>
          <View style={tailwind('flex flex-grow relative')}>
            <View style={tailwind('flex flex-grow flex-col justify-end')}>
              <View style={tailwind('flex flex-grow flex-col justify-end relative  px-6 pt-6 ')}>
                <LinearGradient
                  style={tailwind('absolute left-0 right-0 top-0 bottom-0 left-0')}
                  colors={['transparent', secondaryColor(0.5), secondaryColor(1)]}
                ></LinearGradient>
                {/* phrase */}
                {this.renderPhrase()}
                {/* reproduction line */}
                {this.renderReproductionLine()}
                {/* phrase state */}
                {this.renderPhraseState()}
                {/* controls */}
                {this.renderControls()}
              </View>
              <View style={[tailwind('flex flex-col justify-end relative  px-6 pb-6 '), { backgroundColor: secondaryColor(1) }]}>
                {/* volumen config */}
                {this.renderVolumes()}
              </View>
            </View>
          </View>
          <View style={[tailwind('h-24 w-full'), { backgroundColor: secondaryColor(1) }]}></View>
        </SafeAreaView>
        <BottomNavigationBar hasPlay={this.state.hasPlay} hasBack />
      </View>
    )
  }

  renderPhrase = () => {
    return (
      <View>
        <Text
          style={[
            tailwind('p-5 text-3xl text-center text-white'),
            {
              textShadowColor: secondaryColor(1),
              textShadowOffset: { width: -1, height: 1 },
              textShadowRadius: 10,
            },
          ]}
          adjustsFontSizeToFit={true}
          numberOfLines={this.state.nol}
          minimumFontScale={this.state.nol2}
        >
          {this.state.phrase}
          {/* Improve my thought.Change my beliefs.Become a better version of myself */}
        </Text>
      </View>
    )
  }

  renderReproductionLine = () => {
    return (
      <View>
        <Slider
          // step={this.state.currentvalue}
          step={0.1}
          maximumValue={this.state.maxvalue}
          onValueChange={this.change.bind(this)}
          value={this.state.timeValue}
          disabled
        />
      </View>
    )
  }

  renderPhraseState = () => {
    return (
      <View style={tailwind('flex flex-row justify-between mb-3')}>
        <View>
          <Text style={[tailwind('text-xl font-bold text-white')]}>{this.state.currentvaluetext}</Text>
        </View>
        <View style={tailwind('flex flex-col items-end')}>
          <View style={tailwind('flex flex-row')}>
            <Text style={[tailwind('text-xl font-bold text-white')]}>{this.state.tiempo}: </Text>
            <Text style={[tailwind('text-xl font-bold text-white')]}>{this.state.maxvaluetext}</Text>
          </View>
          <View style={tailwind('flex flex-row')}>
            <Text style={[tailwind('text-xl font-bold text-white')]}>{this.state.frases}: </Text>
            <Text style={[tailwind('text-xl font-bold text-white')]}>
              {this.state.repeticiones} / {this.repeticiones_total}
            </Text>
          </View>
        </View>
      </View>
    )
  }

  isPlaying = () => {
    return this.state.btnplaypause == require('img/btnplay.png')
  }

  renderPlayButton = () => {
    let isPlaying = this.isPlaying()
    return (
      <TouchableOpacity
        style={tailwind('')}
        onPress={() => {
          this._screenPlay()
        }}
        disabled={!this.state.isPlayEnabled}
      >
        {!isPlaying && <Icon type='Ionicons' name={'pause-circle'} style={tailwind('text-white mx-2 text-7xl')} />}
        {!!isPlaying && <Icon type='Ionicons' name={'play-circle'} style={tailwind('text-white mx-2 text-7xl')} />}
      </TouchableOpacity>
    )
  }

  renderControls = () => {
    return (
      <View style={tailwind('flex flex-row justify-center items-center')}>
        <TouchableOpacity style={tailwind('mx-2  flex justify-start pr-2')} onPress={this.onPressSpeaker}>
          {!this.state.mute && <Icon type='Ionicons' name={'volume-high'} style={tailwind('text-white text-5xl')} />}
          {!!this.state.mute && <Icon type='Ionicons' name={'volume-mute'} style={tailwind('text-white text-5xl')} />}
        </TouchableOpacity>
        {/* Play */}
        {this.renderPlayButton()}
        <TouchableOpacity
          style={tailwind('mx-2')}
          onPress={() => {
            this.setState({
              showVolumenes: !this.state.showVolumenes,
            })
          }}
        >
          <View style={tailwind('flex flex-col items-center -mt-1')}>
            <Icon type='MaterialCommunityIcons' name={'text-short'} style={tailwind('text-white h-8 -mt-3 -mb-3 text-5xl')} />
            <Icon type='MaterialCommunityIcons' name={'text-short'} style={tailwind('text-white h-8 text-5xl')} />
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  renderVolumes = () => {
    if (this.state.ori == 'LANDSCAPE') {
      return null
    } else {
      if (this.state.showVolumenes) {
        return (
          <View>
            <View style={{ flexDirection: 'row', marginTop: 3 }}>
              <View style={{ justifyContent: 'center', alignItems: 'flex-start', width: 100 }}>
                <Text style={tailwind('text-white')}>{this.state.playerVolText}</Text>
              </View>
              <View style={{ flex: 1 }}>{this._playerVolComponent()}</View>
            </View>
            {this.renderAffirmationVolume()}
            {this.renderMusicVolume()}
          </View>
        )
      } else {
        return null
      }
    }
  }

  renderAffirmationVolume = () => {
    const music = this.props.navigation.getParam('music')
    if (!fn.isEmpty(music)) {
      return (
        <View style={{ flexDirection: 'row', marginTop: 18 }}>
          <View style={{ justifyContent: 'center', alignItems: 'flex-start', width: 100 }}>
            <Text style={tailwind('text-white')}>{this.state.htmusica}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Slider step={0.1} maximumValue={1} onValueChange={this.changePlayerMusicVol.bind(this)} value={this.state.volmusic} />
          </View>
        </View>
      )
    } else {
      return null
    }
  }

  renderMusicVolume = () => {
    if (this.playerTone) {
      return (
        <View style={{ flexDirection: 'row', marginTop: 18 }}>
          <View style={{ justifyContent: 'center', alignItems: 'flex-start', width: 100 }}>
            <Text style={tailwind('text-white')}>{this.state.httono}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Slider step={0.1} maximumValue={1} onValueChange={this.changePlayerToneVol.bind(this)} value={this.state.voltone} />
          </View>
        </View>
      )
    }
    return null
  }
}

const mapStateToProps = state => ({
  user: datasetSelector(state, 'user'),
  imei: datasetSelector(state, 'imei'),
  timezone: datasetSelector(state, 'timezone'),
  routines: datasetSelector(state, 'routines'),
})
const mapDispatchToProps = dispatch => ({
  //setRoutines: data => dispatch(setDatasetToReducer(data, 'routines')),
})

export default connect(mapStateToProps, mapDispatchToProps)(PlayRoutineScreen)
