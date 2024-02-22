import React from 'react'
import { Text, FlatList, View, TouchableOpacity, Image, ScrollView, Switch, Platform, TouchableHighlightBase } from 'react-native'
import Slider from '@react-native-community/slider'
import AsyncStorage from '@react-native-community/async-storage'
import { SafeAreaView } from 'react-navigation'
import * as fn from '../../helpers/scripts'
import Loader from '../../helpers/loader'
import RNFetchBlob from 'rn-fetch-blob'
import RNMusicMetadata from 'react-native-music-metadata'
import Moment from 'moment'
import NetInfo from '@react-native-community/netinfo'
import Configure from '../../api/Configure'
import { NavigationEvents } from 'react-navigation'
import Dialog, { DialogTitle, DialogContent, DialogFooter, DialogButton } from 'react-native-popup-dialog'
import Card1Image from '../../img/slideimages/card1-min.jpg'
import Card2Image from '../../img/slideimages/card2-min.jpg'
import Card3Image from '../../img/slideimages/card3-min.jpg'
import Card4Image from '../../img/slideimages/card4-min.jpg'
import Card5Image from '../../img/slideimages/card5-min.jpg'
import Card6Image from '../../img/slideimages/card6-min.jpg'
import Card7Image from '../../img/slideimages/card7-min.jpg'
import Card8Image from '../../img/slideimages/card8-min.jpg'
import Card9Image from '../../img/slideimages/card9-min.jpg'
import Card10Image from '../../img/slideimages/card10-min.jpg'
import Card11Image from '../../img/slideimages/card11-min.jpg'
import Card12Image from '../../img/slideimages/card12-min.jpg'
import Card13Image from '../../img/slideimages/card13-min.jpg'
import Card14Image from '../../img/slideimages/card14-min.jpg'
import Card15Image from '../../img/slideimages/card15-min.jpg'
import Card16Image from '../../img/slideimages/card16-min.jpg'
import Card17Image from '../../img/slideimages/card17-min.jpg'
import Card18Image from '../../img/slideimages/card18-min.jpg'
import Card19Image from '../../img/slideimages/card19-min.jpg'
import Card20Image from '../../img/slideimages/card20-min.jpg'
import Card21Image from '../../img/slideimages/card21-min.jpg'
import BtnShuffleImage from '../../img/btnshuffle.png'
import BtnRepeatImage from '../../img/btnrepeat.png'
import BtnNocheWhiteImage from '../../img/btn_noche_white.png'
import BtnSleepWhiteImage from '../../img/btn_sleep_white.png'
import ExpandImage from '../../img/expand.png'
import BtnInfoImage from '../../img/btninfo.png'
import CollapseImage from '../../img/collapse.png'
import request from '../../helpers/request'
import { datasetSelector } from '../../redux/selectors'
import { connect } from 'react-redux'
import { setDatasetListToObjectReducer } from '../../redux/actions'
import BottomNavigationBar from '../../components/BottomNavigationBar'
import { Icon } from 'native-base'
import { scale, globalStyles, secondaryColor } from '../../helpers/styles'
import { storage_url } from '../../../env.json'
import { getColor, tailwind } from '../../tailwind'
import { ImageBackground } from 'react-native'

import BgMainIconImg from '../../img/background-home.jpg'
import { NotificationCountIcon } from '../../components/NotificationIconComponent'

const silent1Sec = '1sec.mp3'
const silentMusicPath = `${storage_url}musics/1sec.mp3`

class PrePlayRoutineScreen extends React.Component {
  slideimages = [
    Card1Image,
    Card2Image,
    Card3Image,
    Card4Image,
    Card5Image,
    Card6Image,
    Card7Image,
    Card8Image,
    Card9Image,
    Card10Image,
    Card11Image,
    Card12Image,
    Card13Image,
    Card14Image,
    Card15Image,
    Card16Image,
    Card17Image,
    Card18Image,
    Card19Image,
    Card20Image,
    Card21Image,
  ]
  auxiliar = 'affirmation'
  nPhrases = -1
  backgroundImage = ''
  wsphrases = []

  state = {
    loading: true,
    repetitions_quantity: 5,
    valuePausa: 5,
    affirmation: true,
    gratitude: false,
    creative_visualization: false,
    btnshuffle: BtnShuffleImage,
    shuffle: false,
    btnrepeat: BtnRepeatImage,
    isRepeat: false,
    btnnoche: BtnNocheWhiteImage,
    btnsleep: BtnSleepWhiteImage,
    backgroundMode: false,
    sleep: false,
    routineData: null,
    modeId: 1,
    mode: 'affirmation',
    timecolap: false,
    musiccolap: true,
    tonecolap: true,
    modecolap: true,
    othercolap: true,
    colapimg1: ExpandImage,
    colapimg2: ExpandImage,
    colapimg3: ExpandImage,
    newTotalTime: '00:00:00',
    tiempofrases: 0,
    isConnected: true,
    tone_name: '',
    tone_id: 4,
    isSetTone: false,
    hasRoutine: false,
    music_index: 0,
    tone_index: 0,
    mode_label: 'affirmation',
    visibleDialog: false,
    textDialogType: null,
    textDialogTitle: null,
    phrasesImages: {},
  }
  init = async () => {
    await this.setState({ loading: true })
    this.fetchRoutineList()
    //console.log('PREP-PLAY-ROUTINE ===> ', {params: this.props.navigation.state.params})
  }
  fetchRoutineList = async () => {
    const routine_id = this.routineSelectedId()

    var { response, error, data } = await request({
      url: 'mobile/users/play_routine',
      method: 'POST',
      data: {
        lang: this.props.app_configuration.language,
        imei: this.props.imei,
        timezone: this.props.timezone,
        routine_configuration_id: this.props.navigation.state.params.routine_configuration_id,
        routine_id: routine_id,
      },
      //debug: true
    })

    if (!error) {
      console.log('routine_phrases==>', { routine_id, routine: data['routine'], routine_phrases: data['routine_phrases'], keys: Object.keys(data) })
      await AsyncStorage.setItem('play_routine', JSON.stringify(response.data))
      Configure.downloadMusics(data['musics'])
      Configure.downloadTones(data['tones'])
      Configure.downloadPhrases(data['routine_phrases'])
    }

    var lang = await AsyncStorage.getItem(`get_screens_translations_${this.props.user.default_language}`)
    lang = JSON.parse(lang)
    lang = lang.result
    if (!!lang && !!lang.playConfigurationScreen)
      await this.setState({
        label1: lang.playConfigurationScreen.routine_duration_time.label,
        label2: lang.playConfigurationScreen.phrase_repetitions_quantity.label,
        label3: lang.playConfigurationScreen.pause_duration_time.label,
        label4: lang.playConfigurationScreen.adjust_time.label,
        label5: lang.playConfigurationScreen.time.label,
        label6: lang.playConfigurationScreen.musics.label,
        label7: lang.playConfigurationScreen.tones.label,
        label8: lang.playConfigurationScreen.mode.label,
      })

    var { data, error } = await request({
      url: 'mobile/users/routine_list',
      method: 'POST',
      data: {
        lang: global.lange,
        imei: this.props.imei,
        timezone: this.props.timezone,
        ids: [routine_id],
      },
      //debug: true,
    })

    if (!error) {
      const routines = data.data
      if (routines.length == 0) await this.setState({ hasRoutine: false, timecolap: true })
      else await this.setState({ hasRoutine: true, timecolap: false })

      this.updateRoutineStatus()
      this.props.setRoutines(routines)
    }
  }
  routineSelectedId = () => this.props.navigation.getParam('routineSelectedId')
  updateRoutineStatus = async () => {
    const routine_id = this.routineSelectedId()
    //this.props.routines[]
    let isConnected = await NetInfo.isConnected.fetch()
    if (!isConnected) {
      let json = await AsyncStorage.getItem('play_routine')
      json = JSON.parse(json)
      await this.setState({
        loading: false,
      })
      if (json.status == 1) {
        const routineData = json.result
        this.setState({
          routineData,
        })
        await this.loadSavedConfiguration(routine_id, routineData)
      } else alert(json.message)
    } else {
      await this.setState({
        loading: true,
      })
      let { data, error } = await request({
        url: 'mobile/users/play_routine',
        method: 'POST',
        data: {
          lang: global.lange,
          imei: this.props.imei,
          timezone: this.props.timezone,
          routine_configuration_id: this.props.navigation.state.params.routine_configuration_id,
          routine_id,
        },
        //debug: true
      })
      await this.setState({
        loading: false,
      })

      if (!error) {
        //console.log('UPDATING ROUTINE DATA ===> ', data)
        await this.setState({
          routineData: data,
        })
        console.log('Routine data assigned')
        await this.cargarFrases('affirmation')
        await this.cargarFrases('gratitude')
        await this.loadSavedConfiguration(routine_id, data)
      }
    }
  }

  loadSavedConfiguration = async (routine_id, routineData) => {
    let value = await Configure.loadSetting(`routine_setting_${routine_id}`)

    try {
      if (value) {
        const savedData = JSON.parse(value)

        if (savedData) {
          //console.log('savedData yes:')
          await this.setState({
            repetitions_quantity: savedData.repetitions_quantity,
            valuePausa: savedData.valuePausa,
            backgroundMode: savedData.backgroundMode,
            shuffle: savedData.shuffle,
          })

          var tone_index = 0
          routineData?.tones.map((tone, index) => {
            if (savedData.tone_id == tone.id) tone_index = index
          })
          var music_index = 0
          routineData?.musics.map((music, index) => {
            if (savedData.music_id == music.id) music_index = index
          })
          var mode_label = 'affirmation'
          for (const key in routineData?.routine_modes) if (savedData.mode_label == key) mode_label = key

          await this.setState({
            loading: true,
          })
          try {
            await this.checkIfDownloadBackground()
            await this.downloadSilentAudio()
            await this.downloadTone(tone_index)
            await this.downloadMusic(music_index)
            await this.downloadPhrase(mode_label)
          } finally {
            await this.setState({
              tone_index,
              music_index,
              mode_label,
              loading: false,
            })
          }
        } else {
          //console.log('savedData no:')
          await this.setState({
            loading: true,
          })
          try {
            await this.checkIfDownloadBackground()
            await this.downloadSilentAudio()
            // this.downloadTone(0),
            await this.downloadMusic(0)
            await this.downloadPhrase('affirmation')
          } finally {
            await this.setState({
              tone_index: 0,
              music_index: 0,
              mode_label: 'affirmation',
              loading: false,
            })
          }
        }
      } else {
        try {
          await this.setState({
            loading: true,
          })
          await this.checkIfDownloadBackground()
          await this.downloadSilentAudio()
          // this.downloadTone(0),
          await this.downloadMusic(0)
          await this.downloadPhrase('affirmation')
        } finally {
          await this.setState({
            tone_index: 0,
            music_index: 0,
            mode_label: 'affirmation',
            loading: false,
          })
        }
      }
    } catch (e) {
      this.setState({
        loading: true,
      })

      try {
        await this.checkIfDownloadBackground()
        await this.downloadSilentAudio()
        // this.downloadTone(0),
        await this.downloadMusic(0)
        await this.downloadPhrase('affirmation')
      } finally {
        await this.setState({
          tone_index: 0,
          music_index: 0,
          mode_label: 'affirmation',
          loading: false,
        })
      }
    }
  }

  repetitionChange = async value => {
    const repetitions_quantity = value == 0 ? 1 : parseFloat(value)
    await this.setState({ repetitions_quantity })

    await this.setState({ loading: true })
    try {
      await this.cargarFrases(this.state.mode_label)
    } catch (e) {}
    this.setState({ loading: false })
  }

  intervalChange = async value => {
    const valuePausa = value == 0 ? 5 : parseFloat(value)
    await this.setState({ valuePausa })
    await this.setState({ loading: true })
    try {
      await this.cargarFrases(this.state.mode_label)
    } catch (e) {}
    this.setState({ loading: false })
  }

  _changeMusicSwitch = async music_index => {
    await this.setState({ music_index, loading: true })
    await this.downloadSilentAudio()
    try {
      await this.downloadMusic(music_index)
    } catch (e) {}
    this.setState({ loading: false })
  }

  _changeToneSwitch = async tone_index => {
    await this.setState({ tone_index, loading: true })
    try {
      await this.downloadTone(tone_index)
    } catch (e) {}
    this.setState({ loading: false })
  }

  changeModeSwitch = async mode_label => {
    await this.setState({ mode_label, loading: true })
    await this.downloadPhrase(mode_label)
    await this.cargarFrases(mode_label)
    this.setState({ loading: false })
  }

  _renderBlockMusic = () => {
    if (this.state.musiccolap) {
      return null
    } else {
      return (
        <View style={tailwind('w-full px-5')}>
          {!!this.state.routineData?.musics &&
            this.state.routineData?.musics.map((music, index) => {
              return (
                <View key={music.id} style={tailwind('flex flex-row mb-2')}>
                  <Text style={tailwind('text-white flex-grow text-lg')}>{music.name}</Text>
                  <View style={{ textAlign: 'right' }}>
                    <Switch
                      trackColor={{ false: 'white', true: '#5c9c93' }}
                      thumbColor={{ false: 'white', true: '#5c9c93' }}
                      value={index == this.state.music_index}
                      onValueChange={value => {
                        if (value) {
                          this._changeMusicSwitch(index)
                        }
                      }}
                    />
                  </View>
                </View>
              )
            })}
        </View>
      )
    }
  }
  routineData = () => this.state?.routineData
  _renderBlockTone = () => {
    if (this.state.tonecolap) {
      return null
    } else {
      return (
        <View style={tailwind('w-full px-5')}>
          {!!this.state?.routineData?.tones &&
            this.routineData()?.tones.map((tone, index) => {
              return (
                <View key={tone.id} style={{ flexDirection: 'row', marginBottom: 10, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={tailwind('text-white flex-grow text-lg')}>{tone.name}</Text>
                  <View style={{ textAlign: 'right' }}>
                    <Switch
                      trackColor={{ false: 'white', true: '#5c9c93' }}
                      thumbColor={{ false: 'white', true: '#5c9c93' }}
                      value={index == this.state.tone_index}
                      onValueChange={value => {
                        if (value) {
                          this._changeToneSwitch(index)
                        }
                      }}
                    />
                  </View>
                </View>
              )
            })}
        </View>
      )
    }
  }

  _renderModeBlock = () => {
    if (this.state.modecolap) {
      return null
    } else {
      return (
        <View style={tailwind('w-full px-5')}>
          <View style={{ flexDirection: 'row', marginBottom: 10, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={tailwind('text-white flex-grow text-lg')}>{this.state.routineData?.routine_modes?.affirmation?.label}</Text>
            <View style={{ textAlign: 'right' }}>
              <Switch
                trackColor={{ false: 'white', true: '#5c9c93' }}
                thumbColor={{ false: 'white', true: '#5c9c93' }}
                value={this.state.mode_label == 'affirmation'}
                onValueChange={value => {
                  if (value) {
                    this.changeModeSwitch('affirmation')
                  }
                }}
              />
            </View>
          </View>
          <View style={{ flexDirection: 'row', marginBottom: 10, justifyContent: 'space-between', alignItems: 'center' }}>
            <TouchableOpacity disabled={this.state.loading}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ marginTop: 3, marginBottom: 3, color: 'white' }}>{this.state.routineData?.routine_modes?.gratitude?.label}</Text>

                <TouchableOpacity style={tailwind('rounded-full bg-gray-500 w-4 h-4 flex justify-center items-center ml-2')}>
                  <Icon type='FontAwesome' style={tailwind('text-sm text-white')} name='question'></Icon>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
            <View style={{ textAlign: 'right' }}>
              <Switch
                trackColor={{ false: 'white', true: '#5c9c93' }}
                thumbColor={{ false: 'white', true: '#5c9c93' }}
                value={this.state.mode_label == 'gratitude'}
                onValueChange={value => {
                  this.changeModeSwitch('affirmation')
                  if (value) this.changeModeSwitch('gratitude')
                }}
              />
            </View>
          </View>
        </View>
      )
    }
  }

  _renderOtherBlock = () => {
    if (this.state.othercolap) {
      return null
    } else {
      return (
        <View style={tailwind('w-full px-5')}>
          <View style={{ flexDirection: 'row', marginBottom: 10, justifyContent: 'space-between', alignItems: 'center' }}>
            <TouchableOpacity
              disabled={this.state.loading}
              onPress={() => {
                this.setState({ textDialogType: global?.language?.dialog_background, textDialogTitle: global?.language?.background_mode, visibleDialog: true })
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ marginTop: 3, marginBottom: 3, color: 'white' }}>{global?.language?.background_mode}</Text>

                <View style={tailwind('rounded-full bg-gray-500 w-4 h-4 flex justify-center items-center ml-2')}>
                  <Icon type='FontAwesome' style={tailwind('text-sm text-white')} name='question'></Icon>
                </View>
              </View>
            </TouchableOpacity>

            <View style={{ textAlign: 'right' }}>
              <Switch
                trackColor={{ false: 'white', true: '#5c9c93' }}
                thumbColor={{ false: 'white', true: '#5c9c93' }}
                value={this.state.backgroundMode}
                onValueChange={value => {
                  this.setState({ backgroundMode: value })
                }}
              />
            </View>
          </View>
          <View style={{ flexDirection: 'row', marginBottom: 10, justifyContent: 'space-between', alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => {
                this.setState({ textDialogType: global?.language?.dialog_sleep, textDialogTitle: global?.language?.sleep_mode, visibleDialog: true })
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ marginTop: 3, marginBottom: 3, color: 'white' }}>{global?.language?.sleep_mode}</Text>

                <View style={tailwind('rounded-full bg-gray-500 w-4 h-4 flex justify-center items-center ml-2')}>
                  <Icon type='FontAwesome' style={tailwind('text-sm text-white')} name='question'></Icon>
                </View>
              </View>
            </TouchableOpacity>

            <View style={{ textAlign: 'right' }}>
              <Switch
                trackColor={{ false: 'white', true: '#5c9c93' }}
                thumbColor={{ false: 'white', true: '#5c9c93' }}
                value={this.state.sleep}
                onValueChange={value => {
                  this.setState({ sleep: value })
                }}
              />
            </View>
          </View>
          <View style={{ flexDirection: 'row', marginBottom: 10, justifyContent: 'space-between', alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => {
                this.setState({ textDialogType: global?.language?.dialog_random, textDialogTitle: global?.language?.random, visibleDialog: true })
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ marginTop: 3, marginBottom: 3, color: 'white' }}>{global?.language?.random}</Text>

                <View style={tailwind('rounded-full bg-gray-500 w-4 h-4 flex justify-center items-center ml-2')}>
                  <Icon type='FontAwesome' style={tailwind('text-sm text-white')} name='question'></Icon>
                </View>
              </View>
            </TouchableOpacity>

            <View style={{ textAlign: 'right' }}>
              <Switch
                trackColor={{ false: 'white', true: '#5c9c93' }}
                thumbColor={{ false: 'white', true: '#5c9c93' }}
                value={this.state.shuffle}
                onValueChange={value => {
                  this.setState({ shuffle: value })
                }}
              />
            </View>
          </View>
        </View>
      )
    }
  }

  _renderBackgroundBlock = () => {
    if (this.state.backgroundcolap) {
      return null
    } else {
      return (
        <View style={tailwind('w-full px-5')}>
          <View style={{ flexDirection: 'row', marginBottom: 10, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={tailwind('text-white flex-grow text-lg')}>{this.state.routineData?.routine_modes?.affirmation?.label}</Text>
            <View style={{ textAlign: 'right' }}>
              <Switch
                trackColor={{ false: 'white', true: '#5c9c93' }}
                thumbColor={{ false: 'white', true: '#5c9c93' }}
                value={this.state.mode_label == 'affirmation'}
                onValueChange={value => {
                  if (value) {
                    this.changeModeSwitch('affirmation')
                  }
                }}
              />
            </View>
          </View>
        </View>
      )
    }
  }

  _renderAndroidBug = () => {
    if (Platform.OS === 'ios') {
      return (
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>{this.state['newTotalTime']}</Text>
          <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>{this.state['label1']}</Text>
        </View>
      )
    } else {
      return null
    }
  }

  renderTimeBlockBody = () => {
    if (this.state.timecolap) {
      return null
    } else {
      return (
        <View style={tailwind('w-full px-5')}>
          {/* Repetitions Resume */}
          <View style={tailwind('flex flex-col items-center justify-center mb-5')}>
            <Text style={tailwind('text-white text-lg')}>{global?.language?.label_total_duration}</Text>
            <Text style={tailwind('text-white text-lg')}>{this.state['newTotalTime']}</Text>
          </View>
          {/* {this._renderAndroidBug()} */}
          {/* Repetitions*/}
          <View style={tailwind('flex flex-col w-full mb-5')}>
            <View style={tailwind('flex justify-center items-start mb-2')}>
              <View style={tailwind('flex flex-row')}>
                <Text style={tailwind('text-white flex flex-grow text-left text-lg')}>{global?.language?.label_number_repetition}</Text>
                <Text style={tailwind('text-white font-bold text-right')}>{this.state.repetitions_quantity}</Text>
              </View>
            </View>
            <View>
              <Slider
                step={1}
                minimunValue={5}
                maximumValue={59}
                onValueChange={value => this.repetitionChange(value)}
                value={this.state.repetitions_quantity}
                onSlidingComplete={this.repetitionComplete.bind(this)}
              />
            </View>
          </View>
          {/* Pauses */}
          <View style={tailwind('flex flex-col w-full mb-5')}>
            <View style={tailwind('flex justify-center items-start mb-2')}>
              <View style={tailwind('flex flex-row')}>
                <Text style={tailwind('text-white flex flex-grow text-left text-lg')}>{global?.language?.label_duration_pause}:</Text>
                <Text style={tailwind('text-white font-bold text-right')}>{this.state.valuePausa}</Text>
              </View>
            </View>
            <View>
              <Slider
                step={5}
                minimunValue={0}
                maximumValue={55}
                onValueChange={value => this.intervalChange(value)}
                value={this.state.valuePausa}
                onSlidingComplete={this.intervalComplete.bind(this)}
              />
            </View>
          </View>
        </View>
      )
    }
  }
  routine = () => this.props.routines[this.routineSelectedId()] || {}
  checkIfDownloadBackground = async () => {
    const image_url = this.routine().image
    if (!image_url) return
    this.backgroundImage = !!image_url && image_url.substring(image_url.lastIndexOf('/') + 1)
    const dirs = RNFetchBlob.fs.dirs
    let exists = false
    try {
      let path = `${dirs.DocumentDir}/${this.backgroundImage}`
      exists = RNFetchBlob.fs.exists(path)
      if (!exists) await RNFetchBlob.config({ path }).fetch('GET', image_url)
    } catch (error) {
      console.log('checkIfDownloadBackground ===> ', { error })
      this.backgroundImage = ''
    }
  }

  cargarFrases = async mode_label => {
    const dirs = RNFetchBlob.fs.dirs
    var tiempofrases = 0
    const routinePhrases = this.routinePhrases()
    for (const phrase of routinePhrases) {
      const audioTime = mode_label == 'affirmation' || mode_label == 'creative_visualization' ? phrase.audio_affirmative_time : phrase.audio_gratitude_time

      const spliteAudioTime = audioTime.split(':')
      const phraseTime0 = parseInt(spliteAudioTime[2]) + parseInt(spliteAudioTime[1]) * 60 + parseInt(spliteAudioTime[0]) * 3600
      const filePath =
        mode_label == 'affirmation' || mode_label == 'creative_visualization'
          ? dirs.DocumentDir + '/' + phrase.audio_affirmative
          : dirs.DocumentDir + '/' + phrase.audio_gratitude
      const track = await RNMusicMetadata.getMetadata([filePath])
      const phraseTime1 = track[0].duration
      tiempofrases += Math.ceil(phraseTime1) + this.state.valuePausa
    }

    const totalTime = tiempofrases * this.state.repetitions_quantity
    const minutesSeconds = Moment.duration(Math.ceil(totalTime), 'seconds')
    const newTotalTime = this.pad(minutesSeconds.hours()) + ':' + this.pad(minutesSeconds.minutes()) + ':' + this.pad(minutesSeconds.seconds())
    /*  
   /console.log('cargarFrases ===> ', {
      routinePhrases,
      mode_label,
      tiempofrases,
      repetitions_quantity: this.state.repetitions_quantity,
      newTotalTime,
    })
    */
    await this.setState({
      totalTime,
      tiempofrases,
      newTotalTime,
    })
  }

  repetitionComplete = value => {
    const repetitions_quantity = value == 0 ? 1 : parseFloat(value)
    const totalTime = this.state.tiempofrases * repetitions_quantity + this.state.valuePausa * this.wsphrases.length * repetitions_quantity
    const minutesSeconds = Moment.duration(Math.round(totalTime), 'seconds')
    const newTotalTime = this.pad(minutesSeconds.hours()) + ':' + this.pad(minutesSeconds.minutes()) + ':' + this.pad(minutesSeconds.seconds())
    /* 
    //console.log('intervalComplete ===> ', {
      newTotalTime,
      repetitions_quantity,
    }) */
    this.setState({
      totalTime,
      newTotalTime,
      repetitions_quantity,
    })
  }

  intervalComplete = value => {
    const valuePausa = value == 0 ? 5 : parseFloat(value)
    const totalTime = this.state.tiempofrases * this.state.repetitions_quantity + valuePausa * this.wsphrases.length * this.state.repetitions_quantity
    const minutesSeconds = Moment.duration(Math.round(totalTime), 'seconds')
    const newTotalTime = this.pad(minutesSeconds.hours()) + ':' + this.pad(minutesSeconds.minutes()) + ':' + this.pad(minutesSeconds.seconds())
    /* 
    //console.log('intervalComplete ===> ', {
      newTotalTime,
      valuePausa,
    }) */
    this.setState({
      newTotalTime,
      valuePausa,
    })
  }

  pad = num => ('0' + num).slice(-2)

  hhmmss(secs) {
    var minutes = Math.floor(secs / 60)
    secs = secs % 60
    var hours = Math.floor(minutes / 60)
    minutes = minutes % 60
    return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(secs)}`
  }

  downloadSilentAudio = async () => {
    let exists = false
    exists = await RNFetchBlob.fs.exists(RNFetchBlob.fs.dirs.DocumentDir + '/' + silent1Sec)
    if (!exists) await RNFetchBlob.config({ path: RNFetchBlob.fs.dirs.DocumentDir + '/' + silent1Sec }).fetch('GET', silentMusicPath)
  }

  downloadMusic = async music_index => {
    const music = this.state.routineData?.musics?.[music_index]
    if (!music) return
    const musicName = music.path
    const musicPath = music.path_file

    const dirs = RNFetchBlob.fs.dirs
    const filePath = dirs.DocumentDir + '/' + musicName
    let exists = false
    try {
      exists = await RNFetchBlob.fs.exists(filePath)
    } catch (error) {
      console.log('downloadMusic ===> ', { music_index, filePath, error })
    }

    if (!exists) await RNFetchBlob.config({ path: dirs.DocumentDir + '/' + musicName }).fetch('GET', musicPath)
  }

  downloadTone = tone_index => {
    return new Promise((resolve, reject) => {
      if (tone_index == 0) {
        resolve()
        return
      }
      const tone = this.routineData()?.tones[tone_index]
      const toneName = tone.path
      const tonePath = tone.path_file

      const dirs = RNFetchBlob.fs.dirs
      RNFetchBlob.fs
        .exists(dirs.DocumentDir + '/' + toneName)
        .then(exists => {
          if (exists) {
            resolve()
          } else {
            RNFetchBlob.config({
              path: dirs.DocumentDir + '/' + toneName,
            })
              .fetch('GET', tonePath)
              .then(() => {
                resolve()
              })
              .catch(err => {
                resolve()
              })
          }
        })
        .catch(err => {
          resolve()
        })
    })
  }
  routinePhrases = () => this.state.routineData?.routine_phrases || []

  downloadPhrase = async mode_label => {
    //console.log('downloadPhrase ===> ', { mode_label })

    const dirs = RNFetchBlob.fs.dirs
    const routinePhrases = this.routinePhrases()
    const cnt_phrase = routinePhrases.length
    var downloaded = 0

    for (const [index, map2] of routinePhrases.entries()) {
      var filepathaux = ''
      var filepathaux2 = ''
      var imagepathaux = ''
      var imagepathaux2 = ''
      let storage_image_path = ''
      let image_path
      if (mode_label == 'affirmation' || mode_label == 'creative_visualization') {
        filepathaux = dirs.DocumentDir + '/' + map2.audio_affirmative
        filepathaux2 = map2.audio_affirmative_file
      } else {
        filepathaux = dirs.DocumentDir + '/' + map2.audio_gratitude
        filepathaux2 = map2.audio_gratitude_file
      }
      //console.log('[map2.image]', map2.image)
      if (!!map2.image) {
        imagepathaux = !!map2.image && dirs.DocumentDir + '/' + map2.image.substring(map2.image.lastIndexOf('/') + 1)
        imagepathaux2 = map2.image
        storage_image_path = imagepathaux
        image_path = imagepathaux2
        //console.log('[storage_image_path]', storage_image_path)
        //console.log('[image_path]', image_path)
      }
      const stroage_path = filepathaux
      const net_path = filepathaux2
      //console.log('downloaded 0:', downloaded)
      //console.log('downloadPhrase ===> ', { imagepathaux, storage_image_path, filepathaux })
      var exists = false
      try {
        exists = await RNFetchBlob.fs.exists(storage_image_path)
      } catch (error) {
        console.log('downloadPhrase ===> ', { error, storage_image_path })
      }
      //console.log('[path exists]', storage_image_path)
      var set
      if (exists) {
        set = { ...this.state.phrasesImages, [map2.id]: { uri: storage_image_path } }
      } else {
        try {
          await RNFetchBlob.config({ path: storage_image_path }).fetch('GET', image_path)
          set = { ...this.state.phrasesImages, [map2.id]: { uri: storage_image_path } }
        } catch (err) {
          set = { ...this.state.phrasesImages, [map2.id]: { uri: null } }
        }
      }
      await this.setState({ phrasesImages: set })
      //console.log('downloadPhrase ===> ', { stroage_path })
      exists = false
      try {
        exists = await RNFetchBlob.fs.exists(stroage_path)
      } catch (error) {
        console.log('downloadPhrase ===> ', { error })
      }

      if (!exists) await RNFetchBlob.config({ path: stroage_path }).fetch('GET', net_path)

      downloaded++
      if (downloaded == cnt_phrase) await this.cargarFrases(mode_label)
    }
  }
  renderHeaderOld = () => {
    return (
      <View style={globalStyles.titleBar}>
        <Text style={{ fontSize: 20, color: 'white' }}>{this.routine().name}</Text>
      </View>
    )
  }

  renderHeader = () => {
    return (
      <View style={tailwind('flex flex-col')}>
        {/* Top Buttons */}
        <View style={tailwind('flex flex-row justify-start mb-2')}>
          <TouchableOpacity
            style={tailwind('relative')}
            onPress={() => {
              this.props.navigation.navigate('TodayActivitiesScreen')
            }}
          >
            <Icon
              type='MaterialCommunityIcons'
              name={'bell'}
              style={[
                tailwind('text-white  text-4xl'),
                {
                  shadow: { elevation: 10 },
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.5,
                  shadowRadius: 2,
                },
              ]}
            />
            <View style={tailwind('absolute right-0 top-0')}>
              <NotificationCountIcon></NotificationCountIcon>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  playButtonOnPress = async () => {
    if (!this.state.routineData?.musics[this.state?.music_index] || !this.state?.routineData?.routine?.id) return

    const saveSetting = {
      shuffle: this.state.shuffle,
      valuePausa: this.state.valuePausa,
      tone_id: this.routineData()?.tones[this.state.tone_index].id,
      music_id: this.state.routineData.musics[this.state.music_index].id,
      repetitions_quantity: this.state.repetitions_quantity,
      mode_label: this.state.mode_label,
      backgroundMode: this.state.backgroundMode,
    }
    Configure.saveSetting(`routine_setting_${this.state.routineData.routine.id}`, saveSetting)
    const image = this.routine().image
    const backgroundImage = !!image ? image.substring(image.lastIndexOf('/') + 1) : ''
    const nPhrases = this.routine().nPhrases
    let params = {
      routineData: this.state.routineData,
      shuffle: this.state.shuffle,
      music: this.state.routineData.musics[this.state.music_index],
      tone: this.routineData()?.tones[this.state.tone_index],
      repetitions_quantity: this.state.repetitions_quantity,
      mode_label: this.state.mode_label,
      backgroundMode: this.state.backgroundMode,
      nightMode: this.state.sleep,
      isRepeat: this.state.isRepeat,
      routine_configuration_id: this.props.navigation.state.params.routine_configuration_id,
      valuePausa: this.state.valuePausa,
      totalTime: this.state.totalTime,
      nPhrases,
      backgroundImage,
      routine_phrases: this.routinePhrases(),
      routine_phrases_images: this.state.phrasesImages,
    }
    //console.log('HERE ===> ', params)
    this.props.navigation.navigate('PlayRoutineScreen', params)
  }
  renderPlayButton = () => {
    let disabled = this.playButtonIsDisabled()
    return (
      <TouchableOpacity style={tailwind('flex flex-row items-center justify-center mt-6 mb-10')} disabled={disabled} onPress={() => this.playButtonOnPress()}>
        <View>
          <View
            style={{
              backgroundColor: disabled ? 'gray' : getColor('white'),
              width: scale(1.5),
              height: scale(1.5),
              borderRadius: scale(1.5) / 2,
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              flexDirection: 'row',
            }}
          >
            <Icon name='play' style={{ fontSize: scale(), color: 'black', marginBottom: -scale(0.1), marginRight: -scale(0.1) }} />
          </View>
        </View>
        {/* Title */}
        <View style={tailwind('flex flex-row justify-center ml-4')}>
          <Text style={tailwind('text-2xl font-bold text-white capitalize')}>{this.routine().name}</Text>
        </View>
      </TouchableOpacity>
    )
  }
  playButtonIsDisabled = () => this.state.loading && !this.state?.hasRoutine && !this.state.routineData && !this.state.routineData?.musics

  renderMusicBlock = () => {
    let colapse_name = 'musiccolap'
    let text_1 = global?.language?.label_music
    let text_2 = this.state['routineData'] ? this.state['routineData']['musics'][this.state.music_index]['name'] : ''
    let body = this._renderBlockMusic()

    return this.renderBlock({ colapse_name, text_1, text_2, body })
  }

  renderToneBlock = () => {
    let colapse_name = 'tonecolap'
    let text_1 = global?.language?.label_tones
    let text_2 = this.state.routineData ? this.routineData()?.tones[this.state.tone_index].name : ''
    let body = this._renderBlockTone()

    let help = (
      <TouchableOpacity style={tailwind('rounded-full bg-gray-500 w-4 h-4 flex justify-center items-center ml-2')}>
        <Icon type='FontAwesome' style={tailwind('text-sm text-white')} name='question'></Icon>
      </TouchableOpacity>
    )

    return this.renderBlock({ colapse_name, text_1, text_2, body, help })
  }

  renderModeBlock = () => {
    let colapse_name = 'modecolap'
    let text_1 = global?.language?.label_mode
    let text_2 = this.state.mode_label
    let body = this._renderModeBlock()

    return this.renderBlock({ colapse_name, text_1, text_2, body })
  }

  renderOtherBlock = () => {
    let colapse_name = 'othercolap'
    let text_1 = global?.language?.label_others
    let text_2 = ''
    let body = this._renderOtherBlock()

    return this.renderBlock({ colapse_name, text_1, body })
  }

  renderListInfoBlocks = () => {
    return (
      <>
        {this.renderMusicBlock()}
        {this.renderToneBlock()}
        {this.renderModeBlock()}
        {this.renderOtherBlock()}
      </>
    )
  }

  renderBlock = ({ colapse_name, text_1, text_2, body, help }) => {
    let open = !this.state[colapse_name]
    return (
      <View style={tailwind('relative mb-4')}>
        <View style={tailwind('mb-4')}>
          {/* bg transparent */}
          <View style={tailwind('absolute top-0 left-0 w-full h-full bg-black opacity-25 rounded-xl')}></View>
          {/* Routine Info */}
          <View style={tailwind('p-5')}>
            {/* Routine Title */}
            <View style={tailwind('flex flex-row items-center mb-1')}>
              <View style={tailwind('flex flex-row justify-between flex-grow items-center')}>
                <View style={tailwind('flex flex-row items-center')}>
                  <Text style={tailwind('text-lg text-white font-bold')}>{text_1}</Text>
                  {help}
                </View>
                <View>
                  <Text style={tailwind('text-lg text-white capitalize ' + (colapse_name == 'timecolap' ? 'font-bold' : ''))}>{text_2}</Text>
                </View>
              </View>
            </View>
          </View>
          {/* Routine Affirmation */}
          <View style={tailwind('flex flex-row justify-center')}>{body}</View>
          {/* Show more */}
          <View style={tailwind('absolute bottom-0 w-full -mb-4')}>
            {/* Contianer */}
            <View style={tailwind('flex flex-row justify-center w-full')}>
              <TouchableOpacity
                style={{ justifyContent: 'center', alignItems: 'center' }}
                onPress={() => {
                  this.setState({
                    [colapse_name]: !!open,
                  })
                }}
              >
                <View style={tailwind('w-8 h-8 bg-gray-900 border border-gray-800 rounded-full flex justify-center items-center')}>
                  <View>
                    <Icon type='FontAwesome' name={open ? 'chevron-up' : 'chevron-down'} style={tailwind('text-white text-xs')} />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    )
  }

  renderTimeBlock = () => {
    let colapse_name = 'timecolap'
    let text_1 = global?.language?.label_tiempo
    let text_2 = this.state.newTotalTime
    let body = this.renderTimeBlockBody()

    return this.renderBlock({ colapse_name, text_1, text_2, body })
  }
  renderDialog = () => {
    return (
      <Dialog
        width={0.8}
        visible={this.state.visibleDialog || false}
        onTouchOutside={() => this.setState({ visibleDialog: false, textDialogTitle: '', textDialogType: '' })}
        dialogTitle={
          <DialogTitle
            title={this.state.textDialogTitle}
            hasTitleBar={false}
            style={{
              backgroundColor: 'white',
              color: 'black',
              justifyContent: 'center',
            }}
            textStyle={{
              color: 'black',
            }}
            align='left'
          />
        }
        footer={
          <DialogFooter style={{ color: '#FFFFFF' }}>
            {[
              <DialogButton
                key={1}
                text={global?.language?.understood}
                style={{
                  backgroundColor: 'white',
                }}
                textStyle={{
                  color: 'black',
                }}
                onPress={() => {
                  this.setState({ visibleDialog: false, textDialogType: '', textDialogTitle: '' })
                }}
              />,
            ]}
          </DialogFooter>
        }
      >
        <DialogContent style={{ flexDirection: 'column', minHeight: 150, justifyContent: 'center', backgroundColor: 'white' }}>
          <View>
            <Text style={{ marginVertical: 10, color: 'black' }}>{this.state.textDialogType}</Text>
          </View>
        </DialogContent>
      </Dialog>
    )
  }
  renderOld() {
    return (
      <View style={[globalStyles.informationLayout, { width: '100%', height: '100%' }]}>
        <NavigationEvents onDidFocus={this.init.bind(this)} />
        <Loader loading={this.state.loading} />
        <SafeAreaView
          style={{
            flex: 1,
            alignItems: 'stretch',
            justifyContent: 'flex-start',
          }}
        >
          {this.renderDialog()}
          {this.renderHeader()}
          <ScrollView style={{ paddingLeft: 15, paddingRight: 15, paddingTop: 10 }}>
            {this.renderPlayButton()}
            {!!this.state.routineData && (
              <>
                {this.renderTimeBlock()}
                {this.renderListInfoBlocks()}
                <View style={{ height: 100 }} />
              </>
            )}
          </ScrollView>
          <BottomNavigationBar invisiblePlayButton hasBack />
        </SafeAreaView>
      </View>
    )
  }

  render() {
    return (
      <View style={tailwind('w-full h-full relative')}>
        <NavigationEvents onDidFocus={this.init.bind(this)} />
        <Loader loading={this.state.loading} />
        <ImageBackground source={BgMainIconImg} imageStyle={{ resizeMode: 'stretch' }} style={tailwind('absolute h-full w-full ')} />
        <View style={[tailwind('absolute w-full h-full'), { backgroundColor: secondaryColor(0.8) }]}></View>

        {this.renderDialog()}
        <SafeAreaView style={tailwind('flex')}>
          <ScrollView>
            <View style={tailwind('flex p-6 flex-col justify-start pb-24')}>
              {/* Header */}
              {this.renderHeader()}
              {/* Play */}
              {this.renderPlayButton()}
              {!!this.state.routineData && (
                <>
                  {this.renderTimeBlock()}
                  {this.renderListInfoBlocks()}
                  <View style={{ height: 100 }} />
                </>
              )}
            </View>
          </ScrollView>
        </SafeAreaView>
        <BottomNavigationBar hasPlay={this.state.hasPlay} hasBack />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  app_configuration: datasetSelector(state, 'app_configuration'),
  user: datasetSelector(state, 'user'),
  imei: datasetSelector(state, 'imei'),
  timezone: datasetSelector(state, 'timezone'),
  routines: datasetSelector(state, 'routines'),
  routines_phrases: datasetSelector(state, 'routines_phrases', { list_format: true }) || [],
})
const mapDispatchToProps = dispatch => ({
  setRoutines: data => dispatch(setDatasetListToObjectReducer(data, 'routines')),
})

export default connect(mapStateToProps, mapDispatchToProps)(PrePlayRoutineScreen)
