import React from 'react'
import { TouchableOpacity, Text, View, Platform } from 'react-native'
import { Icon, Toast } from 'native-base'
import { scale } from '../../helpers/styles'
import { Recorder, Player } from '@react-native-community/audio-toolkit'
import sleep from '../../helpers/sleep'
import { check, request as permissionRequest, PERMISSIONS, RESULTS } from 'react-native-permissions'
import RNFetchBlob from 'rn-fetch-blob'
import PropTypes from 'prop-types'
import secondsToMinutesFormat from '../../helpers/secondsToMinutesFormat'

class MicrophoneInput extends React.Component {
  microphoneOpacityToggleTimer = null
  recorderTimeTimer = null

  fileName = () => `${this.props.id}_new_note_audio.mp4`
  audioRecorderPlayer = {
    recorder: new Recorder(),
    player: new Player(),
  }

  state = {
    seconds: null,
    filePath: '',
    microphoneOpacity: 1,
    microphoneOpacityIncrease: false,
    secondsRecording: null,
  }

  componentDidMount() {
    this.setRecordInstance()
  }
  setRecordInstance = () => {
    this.audioRecorderPlayer.recorder = new Recorder(this.fileName(), { format: 'mp4' })
      .on('ended', () => this.onRecorderEnded())
      .on('error', error => {
        console.log('ERROR-RECORDING ===> ', error)
        Toast.show({
          text: `${global?.language?.unexpected_error_recording} ${error}`,
          duration: 4000,
          type: 'danger',
        })
      })
  }
  setPlayerInstance = () => {
    this.audioRecorderPlayer.player = new Player(this.fileName(), { autoDestroy: false }).on('ended', this.onPlayerEnded)
    this.audioRecorderPlayer.player.prepare(() => {
      this.forceUpdate()
    })
  }

  onPlayerEnded = () => {
    //this.setPlayerInstance()
    this.forceUpdate()
  }
  stopMicrophoneOpacityToggle = () => {
    clearTimeout(this.microphoneOpacityToggleTimer)
    this.setState({
      microphoneOpacityIncrease: false,
      microphoneOpacity: 1,
    })
  }
  startMicrophoneOpacityToggle = () => {
    this.microphoneOpacityToggleTimer = setInterval(async () => {
      await this.setState(state => {
        if (state.microphoneOpacity <= 0.4) this.state.microphoneOpacityIncrease = true
        else if (state.microphoneOpacity >= 1) this.state.microphoneOpacityIncrease = false

        if (this.state.microphoneOpacityIncrease) state.microphoneOpacity += 0.1
        else state.microphoneOpacity -= 0.1

        return state
      })
    }, 70)
  }
  stopRecorderTime = async () => {
    clearTimeout(this.recorderTimeTimer)
    this.setState({ secondsRecording: null })
  }
  startRecorderTime = async () => {
    await this.setState({ secondsRecording: 0 })
    this.recorderTimeTimer = setInterval(async () => {
      await this.setState(state => {
        state['secondsRecording'] += 1

        return state
      })
    }, 1000)
  }
  onRecorderStart = async ({ filePath }) => {
    await this.setState({ seconds: null, filePath })
    this.startMicrophoneOpacityToggle()
    this.startRecorderTime()
  }
  onRecorderEnded = async () => {
    this.stopRecorderTime()
    this.stopMicrophoneOpacityToggle()
    this.setRecordInstance()
    this.setPlayerInstance()
    this.forceUpdate(async () => {
      let audioData = await RNFetchBlob.fs.readFile(this.state.filePath, 'base64')
      this.props.onSave(audioData)
    })
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
  microphoneOnPress = async () => {
    let hasPermission = await this.hasPermissionToRecord()
    if (!hasPermission) return

    if (this.audioRecorderPlayer.recorder.isRecording)
      return this.audioRecorderPlayer.recorder.stop(() => {
        this.forceUpdate()
      })

    for (let seconds of Array.from(Array(4).keys()).reverse()) {
      await this.setState({ seconds })
      await sleep()
    }
    this.audioRecorderPlayer.recorder.prepare((err, filePath) =>
      this.audioRecorderPlayer.recorder.record(error => {
        if (error) {
          Toast.show({
            text: global?.['language']?.['unexpected_error_recording'],
            type: 'danger',
            duration: 4000,
          })
          console.log('ERROR RECORDING ==> ', error)
        }
        this.onRecorderStart({ filePath })
      }),
    )
  }
  renderRecorderIcon = () => {
    let isRecording = this.audioRecorderPlayer.recorder.isRecording
    if (this.state.seconds === null)
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity onPress={this.microphoneOnPress.bind(this)}>
            <Icon
              name='microphone'
              type='FontAwesome'
              style={{
                color: isRecording ? `rgba(255,0,0,${this.state.microphoneOpacity})` : `rgba(255,255,255,${this.state.microphoneOpacity})`,
                fontSize: scale(0.6),
                shadowOffset: { width: 1, height: 1 },
                shadowColor: 'rgba(0, 0, 0, 1)',
                shadowOpacity: 0.5,
              }}
            />
          </TouchableOpacity>
          {Number.isInteger(this.state.secondsRecording) && (
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                position: 'absolute',
                bottom: -scale(0.4),
                right: 0,
                left: 0,
              }}
            >
              {secondsToMinutesFormat(this.state.secondsRecording)}
            </Text>
          )}
        </View>
      )

    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          shadowOffset: { width: 1, height: 1 },
          shadowColor: 'rgba(0, 0, 0, 1)',
          shadowOpacity: 0.5,
        }}
      >
        <Text style={{ color: 'white', fontSize: scale(0.6), textAlign: 'center' }}>{this.state.seconds}</Text>
      </View>
    )
  }

  renderPlayPauseIcon = () => {
    let isPlaying = this.audioRecorderPlayer.player.isPlaying
    let isRecording = this.audioRecorderPlayer.recorder.isRecording
    let canPlay = this.audioRecorderPlayer.player.canPlay

    if (canPlay && !isRecording && this.state.seconds === null)
      return (
        <TouchableOpacity
          onPress={() => this.audioRecorderPlayer.player.playPause(() => this.forceUpdate())}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            shadowOffset: { width: 1, height: 1 },
            shadowColor: 'rgba(0, 0, 0, 1)',
            shadowOpacity: 0.5,
          }}
        >
          <Icon name={isPlaying ? 'pause' : 'play'} type='FontAwesome' style={{ color: 'white', fontSize: scale(0.5) }} />
        </TouchableOpacity>
      )
  }
  render() {
    return (
      <View style={[{ flex: 1, flexDirection: 'row' }, this.props.containerStyles]}>
        {this.props.visible && (
          <>
            {this.renderRecorderIcon()}
            {this.renderPlayPauseIcon()}
          </>
        )}
      </View>
    )
  }
}

MicrophoneInput.propTypes = {
  id: PropTypes.any.isRequired,
  onSave: PropTypes.func.isRequired,
  visible: PropTypes.bool,
  containerStyles: PropTypes.object,
}
MicrophoneInput.defaultProps = {
  id: 'default',
  containerStyles: {},
  visible: true,
}
export default MicrophoneInput
