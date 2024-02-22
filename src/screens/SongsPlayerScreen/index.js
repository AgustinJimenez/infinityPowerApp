import React from 'react'
import { Text, View, TouchableOpacity, Image, Platform } from 'react-native'
import Slider from '@react-native-community/slider'
import { SafeAreaView } from 'react-navigation'
//import { Player } from 'react-native-audio-toolkit';
import { Player } from '@react-native-community/audio-toolkit'
import TrackPlayer from 'react-native-track-player'
import Loader from 'helpers/loader'
import { globalStyles } from '../../helpers/styles'

const asyncIntervals = []

const runAsyncInterval = async (cb, interval, intervalIndex) => {
  await cb()
  if (asyncIntervals[intervalIndex]) {
    setTimeout(() => runAsyncInterval(cb, interval, intervalIndex), interval)
  }
}

const setAsyncInterval = (cb, interval) => {
  if (cb && typeof cb === 'function') {
    const intervalIndex = asyncIntervals.length
    asyncIntervals.push(true)
    runAsyncInterval(cb, interval, intervalIndex)
    return intervalIndex
  } else {
    throw new Error('Callback must be a function')
  }
}

const clearAsyncInterval = intervalIndex => {
  if (asyncIntervals[intervalIndex]) {
    asyncIntervals[intervalIndex] = false
  }
}

export default class MusicPlayer extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: true,
      info: null,
      isPlaying: false,
      currentTimeInt: 0,
      currentTimeString: '00:00:00',
      durationInt: 0,
      durationString: '00:00:00',
      loopEnabled: false,
      volume: 100,
      volumeVisible: false,
      donePlaying: false,
      currentTrackId: null,
    }
    this.onQueueEnd = null
    this.track = {}
  }

  static navigationOptions = {
    header: null,
  }

  async componentDidMount() {
    let info = this.props.navigation.getParam('info')
    this.track = {
      id: info.id,
      url: info.path_file,
      title: info.name,
      artist: 'Infinite Power',
    }
    console.log('info', info)
    this.setState({ info: info })

    let player = new Player(info.path_file)
    player.prepare(err => {
      const instance = this
      const duration = player.duration
      console.log('duration before', duration)
      player.volume = 0
      player.play(() => {
        console.log('duration after', player.duration)
        instance.setState({ durationInt: player.duration / 1000, durationString: this.hhmmss(player.duration / 1000) })
      })
      player.stop()
    })

    TrackPlayer.destroy()
    TrackPlayer.setupPlayer({
      iosCategoryMode: 'spokenAudio',
    })
    const trackPlayerCapabilities = [
      TrackPlayer.CAPABILITY_PLAY,
      TrackPlayer.CAPABILITY_PAUSE,
      TrackPlayer.CAPABILITY_SEEK_TO,
      TrackPlayer.CAPABILITY_JUMP_BACKWARD,
      TrackPlayer.CAPABILITY_JUMP_FORWARD,
    ]
    TrackPlayer.updateOptions({
      stopWithApp: true,
      capabilities: trackPlayerCapabilities,
      notificationCapabilities: [...trackPlayerCapabilities, TrackPlayer.CAPABILITY_SEEK_TO],
      jumpInterval: 10,
    })
    TrackPlayer.registerPlaybackService(() => require('../../app/songsService.js'))
    await TrackPlayer.add(this.track)
    await TrackPlayer.play()
    const current = await TrackPlayer.getCurrentTrack()
    console.log('Track ID', current)
    this.setState({ loading: false, isPlaying: true, currentTrackId: current })
    setAsyncInterval(async () => {
      await this.setCurrentTime()
    }, 500)
    this.onQueueEnd = TrackPlayer.addEventListener('playback-queue-ended', async data => {
      console.log('Queue ended')
      this.setState({ currentTimeInt: 0, currentTimeString: '00:00:00', loading: false, isPlaying: false, donePlaying: true })
      console.log('loop enabled?', this.state.loopEnabled)
      await TrackPlayer.stop()
      console.log('Queue when ended', await TrackPlayer.getQueue())
      if (this.state.loopEnabled) {
        console.log('loop enabled... why?', this.state.loopEnabled)
        if (Platform.OS === 'ios') {
          await TrackPlayer.add(this.track)
          console.log('Queue iOS', await TrackPlayer.getQueue())
        }
        await TrackPlayer.play()
        this.setState({ currentTimeInt: 0, currentTimeString: '00:00:00', isPlaying: true, donePlaying: false })
      }
    })
  }

  componentWillUnmount() {
    TrackPlayer.stop()
    TrackPlayer.reset()
    TrackPlayer.destroy()
    asyncIntervals.forEach((interval, i) => {
      clearAsyncInterval(i)
    })
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

  async setPosition(value) {
    console.log('value', value)
    console.log('value in hhmms', this.hhmmss(value))
    await TrackPlayer.seekTo(value)
  }

  async setVolume(value) {
    await TrackPlayer.setVolume(value / 100)
  }

  async setCurrentTime(secs) {
    let position = Math.ceil(await TrackPlayer.getPosition())
    this.setState({ currentTimeInt: position, currentTimeString: this.hhmmss(position) })
  }

  async togglePlayPause() {
    if (this.state.isPlaying) {
      await TrackPlayer.pause()
      this.setState({ isPlaying: false })
    } else {
      if (this.state.donePlaying) {
        if (Platform.OS === 'ios') {
          await TrackPlayer.add(this.track)
          console.log('Queue iOS', await TrackPlayer.getQueue())
        }
        await TrackPlayer.skip(this.state.currentTrackId)
        this.setState({ currentTimeInt: 0, currentTimeString: '00:00:00', isPlaying: false, donePlaying: false })
      }
      await TrackPlayer.play()
      this.setState({ isPlaying: true })
      this.setState({ donePlaying: false })
    }
  }

  toggleLoop() {
    if (this.state.loopEnabled) {
      this.setState({ loopEnabled: false })
    } else {
      this.setState({ loopEnabled: true })
    }
  }

  toggleVolume() {
    if (this.state.volumeVisible) {
      this.setState({ volumeVisible: false })
    } else {
      this.setState({ volumeVisible: true })
    }
  }

  render() {
    return (
      <View style={{ width: '100%', height: '100%', backgroundColor: 'black' }}>
        <Loader loading={this.state.loading} />
        {this.state.info && (
          <SafeAreaView
            style={{
              flex: 1,
            }}
          >
            <View style={[globalStyles.titleBar, { height: 'auto', marginTop: 50, backgroundColor: '#3c3c3c', paddingVertical: 30, paddingHorizontal: 10 }]}>
              <Text style={{ fontSize: 20, color: 'white', textAlign: 'center' }}>{this.state.info.name}</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end' }}>
              {this.state.volumeVisible && (
                <View style={{ paddingHorizontal: 20, marginVertical: 40 }}>
                  <View style={[{ borderWidth: 1, borderColor: 'white', borderRadius: 75, paddingVertical: 20 }, { transform: [{ rotate: '0deg' }] }]}>
                    <Slider step={1} minimumValue={0} maximumValue={100} onValueChange={this.setVolume.bind(this)} value={this.state.volume} style={{}} />
                  </View>
                </View>
              )}
              <View style={{ paddingHorizontal: 20 }}>
                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                  <Slider
                    step={0.1}
                    maximumValue={this.state.durationInt}
                    onValueChange={this.setPosition.bind(this)}
                    onSlidingStart={async () => TrackPlayer.pause()}
                    onSlidingComplete={async () => TrackPlayer.play()}
                    value={this.state.currentTimeInt}
                  />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View>
                    <Text style={{ color: 'white' }}>{this.state.currentTimeString}</Text>
                  </View>
                  <View>
                    <Text style={{ color: 'white' }}>{this.state.durationString}</Text>
                  </View>
                </View>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                  <View style={{ zIndex: 10, width: 65, height: 65, marginHorizontal: 10 }}>
                    <Image source={require('img/circle-back.png')} style={{ width: 65, height: 65 }}></Image>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.togglePlayPause()}>
                  <View style={{ zIndex: 10, width: 65, height: 65, marginHorizontal: 10 }}>
                    {this.state.isPlaying ? (
                      <Image source={require('img/circle-pause.png')} style={{ width: 65, height: 65 }}></Image>
                    ) : (
                      <Image source={require('img/circle-play.png')} style={{ width: 65, height: 65 }}></Image>
                    )}
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.toggleLoop()}>
                  <View style={{ zIndex: 10, width: 65, height: 65, marginHorizontal: 10 }}>
                    {this.state.loopEnabled ? (
                      <Image source={require('img/circle-loop-active.png')} style={{ width: 65, height: 65 }}></Image>
                    ) : (
                      <Image source={require('img/circle-loop.png')} style={{ width: 65, height: 65 }}></Image>
                    )}
                  </View>
                </TouchableOpacity>
                <View>
                  <TouchableOpacity onPress={() => this.toggleVolume()}>
                    <View style={{ zIndex: 10, width: 65, height: 65, marginHorizontal: 10 }}>
                      <Image source={require('img/circle-volume.png')} style={{ width: 65, height: 65 }}></Image>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </SafeAreaView>
        )}
      </View>
    )
  }
}
