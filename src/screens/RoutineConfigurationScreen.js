import React from 'react'
import { Text, View, TouchableOpacity, Image, ScrollView, Switch, Platform, FlatList } from 'react-native'
import Slider from '@react-native-community/slider'
import AsyncStorage from '@react-native-community/async-storage'
import { SafeAreaView } from 'react-navigation'
import * as fn from 'helpers/scripts'
import { TimePicker } from 'react-native-wheel-picker-android'
import DatePicker from 'react-native-datepicker'
import Loader from 'helpers/loader'
import { globalStyles } from '../helpers/styles'
import RNFetchBlob from 'rn-fetch-blob'
import RNMusicMetadata from 'react-native-music-metadata'
import DateTimePicker from '@react-native-community/datetimepicker'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import Card from '../components/Card'
import ImagePicker from 'react-native-image-crop-picker'
import Moment from 'moment'
import { Toast } from 'native-base'
import { Appearance, useColorScheme } from 'react-native-appearance'
import Dialog, { DialogTitle, DialogContent, DialogFooter, DialogButton } from 'react-native-popup-dialog'
import TrashWhiteImage from '../img/trash-white.png'
import capitalizeWords from '../helpers/capitalizeWords'
import { connect } from 'react-redux'
import { setDatasetListToObjectReducer } from '../redux/actions'
import { datasetSelector } from '../redux/selectors'
import BottomNavigationBar from '../components/BottomNavigationBar'
import request from '../helpers/request'
import ImageBtnNightBlack from '../img/btn_noche_black.png'
Appearance.getColorScheme()

class RoutineConfigurationScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      modal: false,
      selectedHours: 8,
      selectedMinutes: 0,
      repetition_quantity: 5,
      dom: false,
      lun: false,
      mar: false,
      mie: false,
      jue: false,
      vie: false,
      sab: false,
      sw1: true,
      sw2: false,
      sw3: false,
      sw4: false,
      sw5: true,
      sw6: false,
      sw7: false,
      sw8: true,
      sw9: false,
      sw10: false,
      timecolap: true,
      musiccolap: true,
      tonecolap: true,
      modecolap: true,
      othercolap: true,
      backgroundcolap: true,
      colapimg0: require('img/expand.png'),
      colapimg1: require('img/expand.png'),
      colapimg2: require('img/expand.png'),
      colapimg3: require('img/expand.png'),
      colapimg4: require('img/expand.png'),
      colapimg5: require('img/expand.png'),
      modeId: 1,
      mode: 'affirmation',
      editar: 0,
      pause_duration_time: 5,
      music_name: '',
      tone_name: '',
      routine_id: null,
      enableScrollViewScroll: true,
      newTotalTime: '00:00:00',
      valuePausa: 0,
      phrases_total_duration_seconds: 0,
      auxiliar: 'sw8',
      music_id: -1,
      tone_id: -1,
      initDate: new Date().toISOString(),
      initTime: new Moment().format('HH:mm'),
      btnshuffle: require('img/btnshuffle.png'),
      shuffle: false,
      btnrepeat: require('img/btnrepeat.png'),
      repeat: false,
      btnnoche: require('img/btn_noche_white.png'),
      btnsleep: require('img/btn_sleep_white.png'),
      noche: false,
      sleep: false,

      showTimer: false,
      pickerTimestamp: new Date(),
      routineImg: null,
      routineImgUri: null,
      rutina: null,
      phrases: [],
      phrasesImgs: {},
      phrasesImgsUris: {},
      visibleDialog: false,
      textDialogType: null,
      textDialogTitle: null,
      showDatePicker: false,
      colorScheme: Appearance.getColorScheme(),
    }
    this.wsphrases = []
    this.edit = false
  }

  elegirImagen = () => {
    ImagePicker.openPicker({
      cropping: true,
      includeBase64: true,
    }).then(
      image => {
        //console.log('imagen', image)
        //console.log(image.path.split('/').pop())
        this.setState({ routineImg: image, routineImgUri: { uri: image.path } })
        AsyncStorage.getItem('routine_list').then(async value => {
          let valor = JSON.parse(value)

          const newRoutineList = valor.map((rutina, index) => {
            //console.log('jeje', valor)
            if (rutina.id == this.state.routine_id) {
              return { ...rutina, routineImg: { uri: image.path } }
            } else return rutina
          })

          AsyncStorage.setItem('routine_list2', JSON.stringify(newRoutineList))
          //this.uploadImage(image.data)
        })
        this.uploadImage(image.data)
      },
      err => console.log(err),
    )
  }

  elegirImagenPhrase = pid => {
    ImagePicker.openPicker({
      cropping: true,
      includeBase64: true,
    }).then(
      image => {
        //console.log('imagen', image)
        //console.log(image.path.split('/').pop())
        this.setState({
          phrasesImgs: { ...this.state.phrasesImgs, [pid]: image },
          phrasesImgsUris: { ...this.state.phrasesImgsUris, [pid]: { uri: image.path } },
        })
        this.uploadImagePhrase(image.data, pid)
      },
      err => console.log(err),
    )
  }

  uploadImage = source => {
    var pic = source
    instance = this
    //uploading Profile Photo
    //fetch(fn.url + 'mobile/users/upload_profile_photo',{
    //console.log('________photouploading started_________');
    this.setState({ loading: true })
    AsyncStorage.getItem('userToken').then(token => {
      AsyncStorage.getItem('userTokenType').then(tokenType => {
        AsyncStorage.getItem('user').then(imei => {
          //console.log('________loading imei_________');
          imei = JSON.parse(imei)
          // //console.log('------fetching success.uploading photo-------')
          //console.log(instance.state.routine_id)
          RNFetchBlob.fetch(
            'POST',
            fn.url + 'mobile/users/upload_routine_image',
            {
              Authorization: tokenType + ' ' + token,
              'Content-Type': 'multipart/form-data',
              otherHeader: 'foo',
            },
            [
              { name: 'photo', filename: 'photo.png', type: 'image/png', data: pic },
              { name: 'tag', data: `${instance.state.routine_id}` },
            ],
          )
            .uploadProgress({ interval: 250 }, (written, total) => {
              //console.log('written : ' + written + ' total : ' + total);
            })
            .then(resp => resp.json())
            .then(json => {
              //console.log('image uploaded:result : ' + json);
              //console.log('json', json)
              instance.setState({
                loading: false,
              })
            })
            .catch(err => {
              console.log('error')
              instance.setState({
                loading: false,
              })
              //console.log('error', err)
            })
        })
      })
    })
  }

  removeImage = () => {
    instance = this
    //uploading Profile Photo
    //fetch(fn.url + 'mobile/users/upload_profile_photo',{
    //console.log('________photouploading started_________');
    this.setState({ loading: true })
    AsyncStorage.getItem('userToken').then(token => {
      AsyncStorage.getItem('userTokenType').then(tokenType => {
        AsyncStorage.getItem('user').then(imei => {
          //console.log('________loading imei_________');
          imei = JSON.parse(imei)
          // //console.log('------fetching success.uploading photo-------')
          //console.log(instance.state.routine_id)
          RNFetchBlob.fetch(
            'POST',
            fn.url + 'mobile/users/remove_routine_image',
            {
              Authorization: tokenType + ' ' + token,
              'Content-Type': 'multipart/form-data',
              otherHeader: 'foo',
            },
            [{ name: 'tag', data: `${instance.state.routine_id}` }],
          )
            .then(resp => resp.json())
            .then(json => {
              //console.log('image uploaded:result : ' + json);
              //console.log('json', json)
              instance.setState({
                loading: false,
                routineImg: null,
                routineImgUri: null,
              })
            })
            .catch(err => {
              console.log('error')
              instance.setState({
                loading: false,
              })
              //console.log('error', err)
            })
        })
      })
    })
  }

  uploadImagePhrase = (source, pid) => {
    var pic = source
    instance = this
    //uploading Profile Photo
    //fetch(fn.url + 'mobile/users/upload_profile_photo',{
    //console.log('________photouploading started_________');
    this.setState({ loading: true })
    AsyncStorage.getItem('userToken').then(token => {
      AsyncStorage.getItem('userTokenType').then(tokenType => {
        AsyncStorage.getItem('user').then(imei => {
          //console.log('________loading imei_________');
          imei = JSON.parse(imei)
          // //console.log('------fetching success.uploading photo-------')
          //console.log(instance.state.routine_id)
          RNFetchBlob.fetch(
            'POST',
            fn.url + 'mobile/users/upload_phrase_image',
            {
              Authorization: tokenType + ' ' + token,
              'Content-Type': 'multipart/form-data',
              otherHeader: 'foo',
            },
            [
              { name: 'photo', filename: 'photo.png', type: 'image/png', data: pic },
              { name: 'routine_id', data: `${instance.state.routine_id}` },
              { name: 'phrase_id', data: `${pid}` },
            ],
          )
            .uploadProgress({ interval: 250 }, (written, total) => {
              //console.log('written : ' + written + ' total : ' + total);
            })
            .then(resp => resp.json())
            .then(json => {
              //console.log('image uploaded:result : ' + json);
              //console.log('json', json)
              instance.setState({
                loading: false,
              })
            })
            .catch(err => {
              console.log('error')
              instance.setState({
                loading: false,
              })
              //console.log('error', err)
            })
        })
      })
    })
  }

  removeImagePhrase = pid => {
    instance = this
    //uploading Profile Photo
    //fetch(fn.url + 'mobile/users/upload_profile_photo',{
    //console.log('________photouploading started_________');
    this.setState({ loading: true })
    AsyncStorage.getItem('userToken').then(token => {
      AsyncStorage.getItem('userTokenType').then(tokenType => {
        AsyncStorage.getItem('user').then(imei => {
          //console.log('________loading imei_________');
          imei = JSON.parse(imei)
          // //console.log('------fetching success.uploading photo-------')
          //console.log(instance.state.routine_id)
          RNFetchBlob.fetch(
            'POST',
            fn.url + 'mobile/users/remove_phrase_image',
            {
              Authorization: tokenType + ' ' + token,
              'Content-Type': 'multipart/form-data',
              otherHeader: 'foo',
            },
            [
              { name: 'routine_id', data: `${instance.state.routine_id}` },
              { name: 'phrase_id', data: `${pid}` },
            ],
          )
            .then(resp => resp.json())
            .then(json => {
              //console.log('image uploaded:result : ' + json);
              //console.log('json', json)
              instance.setState({
                loading: false,
                phrasesImgs: { ...instance.state.phrasesImgs, [pid]: null },
                phrasesImgsUris: { ...instance.state.phrasesImgsUris, [pid]: null },
              })
            })
            .catch(err => {
              console.log('error')
              instance.setState({
                loading: false,
              })
              //console.log('error', err)
            })
        })
      })
    })
  }

  UNSAFE_componentWillMount = async () => {
    let id = this.props.navigation.getParam('routine_id')
    let rutina = this.props.navigation.getParam('rutina')
    let phrases = this.props.navigation.getParam('phrases')
    let auxmuser = this.props.navigation.getParam('item')
    console.log('RoutineConfigurationScreen componentWillMount === >', { routine_id: id, rutina, phrases, auxmuser })

    let phrasesImgs = {}
    let phrasesImgsUris = {}
    phrases.map(phrase => {
      phrasesImgs[phrase.id] = phrase.image
      phrasesImgsUris[phrase.id] = { uri: phrase.image }
    })
    let user = await AsyncStorage.getItem('user')
    user = JSON.parse(user)
    //console.log('language', value)
    let auxlang = `get_screens_translations_${user.default_language}`
    let lang = await AsyncStorage.getItem(auxlang)
    lang = JSON.parse(lang)
    lang = lang.result
    this.setState({
      routine_id: id,
      rutina: rutina,
      phrases: phrases,
      routineImg: rutina.image,
      routineImgUri: { uri: rutina.image },
      phrasesImgs,
      phrasesImgsUris: phrasesImgsUris,
      nombre: user.name,
      applang: user.default_language,
      label1: lang.addNewRoutineConfigurationScreen.schedule.label,
      label2: lang.addNewRoutineConfigurationScreen.repeat.label,
      label3: lang.addNewRoutineConfigurationScreen.time_adjustment.label,
      label4: lang.addNewRoutineConfigurationScreen.musics.label,
      label5: lang.addNewRoutineConfigurationScreen.tones.label,
      label6: lang.addNewRoutineConfigurationScreen.mode.label,
      label7: lang.addNewRoutineConfigurationScreen.save.label,
      htwd0: lang.homeScreen.week_days.sunday,
      htwd1: lang.homeScreen.week_days.monday,
      htwd2: lang.homeScreen.week_days.tuesday,
      htwd3: lang.homeScreen.week_days.wednesday,
      htwd4: lang.homeScreen.week_days.thursday,
      htwd5: lang.homeScreen.week_days.friday,
      htwd6: lang.homeScreen.week_days.saturday,
    })
    if (auxmuser != undefined) {
      horaMinuto = auxmuser.schedule_time.split(':')
      duration = auxmuser.duration_time.split(':')

      this.setState({
        selectedHours: parseInt(horaMinuto[0]),
        selectedMinutes: parseInt(horaMinuto[1]),
        dom: auxmuser.sunday,
        lun: auxmuser.monday,
        mar: auxmuser.tuesday,
        mie: auxmuser.wednesday,
        jue: auxmuser.thursday,
        vie: auxmuser.friday,
        sab: auxmuser.saturday,
        repetition_quantity: auxmuser.repetitions_quantity,
        shuffle: auxmuser.shuffle,
        repeat: auxmuser.repeat,
        noche: auxmuser.background,
        sleep: auxmuser.sleep,
        editar: auxmuser.id,
        btnshuffle: auxmuser.shuffle ? require('img/btnshuffle-active.png') : require('img/btnshuffle.png'),
        btnrepeat: auxmuser.repeat ? require('img/btnrepeat-active.png') : require('img/btnrepeat.png'),
        btnnoche: auxmuser.background ? ImageBtnNightBlack : require('img/btn_noche_white.png'),
        btnsleep: auxmuser.sleep ? require('img/btn_sleep_black.png') : require('img/btn_sleep_white.png'),
      })
      if (auxmuser.routine_mode == 1) {
        this._changeModeSwitch('sw8')
        this.setState({ auxiliar: 'sw8' })
      }
      if (auxmuser.routine_mode == 2) {
        this._changeModeSwitch('sw9')
        this.setState({ auxiliar: 'sw9' })
      }
      if (auxmuser.routine_mode == 3) {
        this._changeModeSwitch('sw10')
        this.setState({ auxiliar: 'sw10' })
      }

      //Load saved data;
      now = new Date()
      now.setHours(horaMinuto[0])
      now.setMinutes(horaMinuto[1])

      this.setState({ initDate: now.toISOString() })
      this.setState({
        repetition_quantity: auxmuser.repetitions_quantity,
        pause_duration_time: parseInt(duration[2]),
      })
      this.edit = true
    } else {
      this.setState({
        selectedHours: 8,
        selectedMinutes: 0,
        dom: false,
        lun: false,
        mar: false,
        mie: false,
        jue: false,
        vie: false,
        sab: false,
        repetition_quantity: 5,
        editar: 0,
      })
      this._changeModeSwitch('sw8')
    }
    let profileData = await AsyncStorage.getItem('get_profile_data')
    profileData = JSON.parse(profileData)
    let imei = await AsyncStorage.getItem('user')
    imei = JSON.parse(imei)
    this.setState({
      loading: true,
      nombre: imei.name,
      desde: '',
    })
    let { data, message, error } = await request({
      url: 'mobile/users/play_routine',
      method: 'POST',
      data: {
        lang: global.lange,
        imei: this.props.imei,
        timezone: this.props.timezone,
        routine_configuration_id: profileData.result.routine.id,
        routine_id: id,
      },
      debug: true,
    })
    await this.setState({
      loading: false,
    })
    if (error) return alert(message)

    const update = {}
    data.tones.map(map => {
      if (auxmuser != undefined) {
        if (auxmuser.tone_id == map.id) {
          update[map.id] = true
          this._changeToneSwitch(map.id, true, map.name)
        }
      } else {
        if (data.routine.tone_id == map.id) {
          update[map.id] = true
          this._changeToneSwitch(map.id, true, map.name)
        }
      }
    })
    const update2 = {}
    data.musics.map(map => {
      if (auxmuser != undefined) {
        if (auxmuser.music_id == map.id) {
          update2[map.id] = true
          this._changeMusicSwitch(map.id, true, map.name)
        }
      } else {
        if (data.routine.music_id == map.id) {
          update2[map.id] = true
          this._changeMusicSwitch(map.id, true, map.name)
        }
      }
    })
    this.setState({
      data,
      tones: data.tones,
      musics: data.musics,
      repetition_quantity: !this.edit ? data.routine.repetitions_quantity : this.state.repetition_quantity,
    })
    this.getPhrases()
  }

  recargarDatos = async () => {
    let imei = await AsyncStorage.getItem('user')

    imei = JSON.parse(imei)
    let { data, error, response } = await request({
      url: 'mobile/users/get_profile_data',
      method: 'POST',
      data: {
        lang: global.lange,
        imei: this.props.imei,
        timezone: this.props.timezone,
        routine_id: this.state.routine_id,
      },
    })
    await this.setState({
      loading: false,
    })
    if (error)
      return Toast.show({
        text: 'Error al guardar',
        duration: 2000,
        type: 'warning',
      })
    await AsyncStorage.setItem('get_profile_data', JSON.stringify(response))

    Toast.show({
      text: 'Cambios guardados',
      duration: 2000,
      type: 'success',
    })
  }
  _cargarFrases = async auxiliar => {
    //console.log('_cargarFrases is called');
    instance = this
    this.wsphrases = []
    this.wsphrases2 = []
    let dirs = RNFetchBlob.fs.dirs
    const result = this.state.data.routine_phrases.map(async (routine_phrase, index) => {
      filepathaux = ''
      filepathaux2 = ''
      if (auxiliar == 'sw8' || auxiliar == 'sw10') {
        filepathaux = dirs.DocumentDir + '/' + routine_phrase.audio_affirmative
        filepathaux2 = routine_phrase.audio_affirmative_file
        audiotime = routine_phrase.audio_affirmative_time
      } else {
        filepathaux = dirs.DocumentDir + '/' + routine_phrase.audio_gratitude
        filepathaux2 = routine_phrase.audio_gratitude_file
        audiotime = routine_phrase.audio_gratitude_time
      }
      if (auxiliar == 'sw9') {
        item = this.props.navigation.getParam('item')
        delayTime = this.state.data.modes.creative_visualization.split(':')
        hour = 0
        minute = 0
        if (parseInt(delayTime[0]) > 0) {
          hour = parseInt(delayTime[0]) * 3600
        }
        if (parseInt(delayTime[1]) > 0) {
          minute = parseInt(delayTime[1]) * 60
        }
        delayTime = hour + minute + parseInt(delayTime[2])
        aux_default_delay_time = delayTime
      } else {
        if (this.state.valuePausa == 0) {
          aux_default_delay_time = routine_phrase.default_delay_time.split(':')
          hour = 0
          minute = 0
          if (parseInt(aux_default_delay_time[0]) > 0) {
            hour = parseInt(aux_default_delay_time[0]) * 3600
          }
          if (parseInt(aux_default_delay_time[1]) > 0) {
            minute = parseInt(aux_default_delay_time[1]) * 60
          }
          aux_default_delay_time = hour + minute + parseInt(aux_default_delay_time[2])
        } else {
          aux_default_delay_time = this.state.valuePausa
        }
      }
      aux_phrase_time = audiotime.split(':')
      hour = 0
      minute = 0
      if (parseInt(aux_phrase_time[0]) > 0) {
        hour = parseInt(aux_phrase_time[0]) * 3600
      }
      if (parseInt(aux_phrase_time[1]) > 0) {
        minute = parseInt(aux_phrase_time[1]) * 60
      }
      aux_phrase_time = hour + minute + parseInt(aux_phrase_time[2])
      if (this.state.mode == 'affirmation' || this.state.mode == 'creative_visualization') {
        this.wsphrases.push([
          filepathaux,
          routine_phrase.text_affirmative,
          aux_default_delay_time,
          routine_phrase.id,
          routine_phrase.muser_id,
          routine_phrase.muser_routine_id,
          routine_phrase.phrase_type,
          aux_phrase_time + aux_default_delay_time,
        ])
      } else
        this.wsphrases.push([
          filepathaux,
          routine_phrase.text_gratitude,
          aux_default_delay_time,
          routine_phrase.id,
          routine_phrase.muser_id,
          routine_phrase.muser_routine_id,
          routine_phrase.phrase_type,
          aux_phrase_time + aux_default_delay_time,
        ])

      if (index == this.state.data.routine_phrases.length - 1) {
        sizeArray = []
        totalTime = 0
        this.wsphrases.map((value, i) => {
          sizeArray.push(value[0])
        })
        // if(Platform.OS === 'ios') {
        var _index = 0
        let tracks = await RNMusicMetadata.getMetadata(sizeArray)

        tracks.forEach(track => {
          totalTime += track.duration
          //console.log('' + _index +'th: duration:' + track.duration);
          //console.log('total time:' + totalTime);
          _index++
        })
        // }
        this.setState({
          phrases_total_duration_seconds: totalTime,
          loading: false,
        })
        this.calculateRoutineTotalTime()
      }
    })
  }

  getPhrases = async () => {
    let dirs = RNFetchBlob.fs.dirs
    instance = this
    mode = this.state.mode
    if (!this.state.data.routine_phrases.length)
      await this.setState({
        loading: false,
      })

    var cnt_phrase = this.state.data.routine_phrases.length
    var downloaded = 0
    const result = this.state.data.routine_phrases.map((map2, index) => {
      this.setState({
        loading: true,
      })
      filepathaux = ''
      filepathaux2 = ''
      if (mode == 'affirmation' || mode == 'creative_visualization') {
        filepathaux = dirs.DocumentDir + '/' + map2.audio_affirmative
        filepathaux2 = map2.audio_affirmative_file
      } else {
        filepathaux = dirs.DocumentDir + '/' + map2.audio_gratitude
        filepathaux2 = map2.audio_gratitude_file
      }
      aux_default_delay_time = map2.default_delay_time.split(':')
      hour = 0
      minute = 0
      if (parseInt(aux_default_delay_time[0]) > 0) {
        hour = parseInt(aux_default_delay_time[0]) * 3600
      }
      if (parseInt(aux_default_delay_time[1]) > 0) {
        minute = parseInt(aux_default_delay_time[1]) * 60
      }
      aux_default_delay_time = hour + minute + parseInt(aux_default_delay_time[2])

      var stroage_path = filepathaux
      var net_path = filepathaux2

      RNFetchBlob.fs.exists(stroage_path).then(exist => {
        //console.log('check file exist:' + stroage_path);
        if (!exist) {
          //console.log('does not exist downloading..')
          RNFetchBlob.config({
            path: stroage_path,
          })
            .fetch('GET', net_path)
            .progress((received, total) => {
              instance.setState({
                loading: true,
                modalText: global?.language?.msg_loading,
              })
              // //console.log(' ' + index + 'th phrase loading...');
            })
            .then(res => {
              instance.setState({
                loading: false,
              })
              //console.log('' + index + 'th phrase downloaded.');
              downloaded++
              if (downloaded == cnt_phrase) {
                //console.log('checking phrases started.')
                this._cargarFrases(instance.state.auxiliar)
              }
            })
            .catch(err => {
              instance.setState({
                loading: false,
              })
              //console.log('' + index + 'th phrase error.');
              downloaded++
              if (downloaded == cnt_phrase) {
                //console.log('checking phrases started.')
                this._cargarFrases(instance.state.auxiliar)
              }
            })
        } else {
          //console.log('' + index + 'th phrase already exist.');
          downloaded++
          if (downloaded == cnt_phrase) {
            //console.log('checking phrases started.')
            this._cargarFrases(instance.state.auxiliar)
          }
        }
      })
    })
  }

  pad(num) {
    return ('0' + num).slice(-2)
  }

  repetition_quantity_change = async value => {
    await this.setState({ repetition_quantity: parseFloat(value) })
    this.calculateRoutineTotalTime()
  }

  pause_duration_time_change = async value => {
    await this.setState({ pause_duration_time: parseFloat(value) })
    this.calculateRoutineTotalTime()
  }
  _changeMusicSwitch = (sw, val, name) => {
    if (val) {
      this.setState({
        musics: {
          [sw]: val,
        },
        music_name: name,
        music_id: sw,
      })
    } else {
      this.setState({
        musics: {},
      })
    }
  }
  _changeToneSwitch = (sw, val, name) => {
    if (!val) {
      val = true
    }
    this.setState({
      tones: {
        [sw]: val,
      },
      tone_name: name,
      tone_id: sw,
    })
  }
  _changeModeSwitch = sw => {
    instance = this
    if (sw == 'sw8') {
      this.setState({
        sw8: true,
        sw9: false,
        sw10: false,
        mode: 'affirmation',
        modeId: 1,
      })
    }
    if (sw == 'sw9') {
      this.setState({
        sw8: false,
        sw9: true,
        sw10: false,
        mode: 'gratitude',
        modeId: 2,
      })
    }
    if (sw == 'sw10') {
      this.setState({
        sw8: false,
        sw9: false,
        sw10: true,
        mode: 'creative_visualization',
        modeId: 3,
      })
    }
  }
  _renderBlock1 = () => {
    if (this.state.musiccolap) {
      return null
    } else {
      return (
        <View style={{ padding: 10 }}>
          {this.state.data != null &&
            this.state.data.musics.map(music => {
              return (
                <View key={music.id} style={{ flexDirection: 'row', marginBottom: 10, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ flex: 1, color: 'white' }}>{music.name}</Text>
                  <View style={{ textAlign: 'right' }}>
                    <Switch
                      trackColor={{ false: 'white', true: '#5c9c93' }}
                      thumbColor={{ false: 'white', true: '#5c9c93' }}
                      value={music.id == instance.state.music_id}
                      onValueChange={value => {
                        this._changeMusicSwitch(music.id, value, music.name)
                      }}
                    ></Switch>
                  </View>
                </View>
              )
            })}
        </View>
      )
    }
  }
  _renderBlock2 = () => {
    if (this.state.tonecolap) {
      return null
    } else {
      return (
        <View style={{ padding: 10 }}>
          {this.state.data != null &&
            this.state.data.tones.map(tone => {
              return (
                <View key={tone.id} style={{ flexDirection: 'row', marginBottom: 10, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ flex: 1, color: 'white' }}>{tone.name}</Text>
                  <View style={{ textAlign: 'right' }}>
                    <Switch
                      trackColor={{ false: 'white', true: '#5c9c93' }}
                      thumbColor={{ false: 'white', true: '#5c9c93' }}
                      value={tone.id == instance.state.tone_id}
                      onValueChange={value => {
                        this._changeToneSwitch(tone.id, value, tone.name)
                      }}
                    ></Switch>
                  </View>
                </View>
              )
            })}
        </View>
      )
    }
  }
  _renderBlock3 = () => {
    if (this.state.modecolap) {
      return null
    } else {
      return (
        <View style={{ padding: 10 }}>
          <View style={{ flexDirection: 'row', marginBottom: 10, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ flex: 1, color: 'white' }}>{this.state.label1}</Text>
            <View style={{ textAlign: 'right' }}>
              <Switch
                trackColor={{ false: 'white', true: '#5c9c93' }}
                thumbColor={{ false: 'white', true: '#5c9c93' }}
                value={this.state.sw8}
                onValueChange={() => {
                  this._changeModeSwitch('sw8')
                }}
              ></Switch>
            </View>
          </View>
          <View style={{ flexDirection: 'row', marginBottom: 10, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ flex: 1, color: 'white' }}>{this.state.data.routine_modes.gratitude.label}</Text>
            <View style={{ textAlign: 'right' }}>
              <Switch
                trackColor={{ false: 'white', true: '#5c9c93' }}
                thumbColor={{ false: 'white', true: '#5c9c93' }}
                value={this.state.sw9}
                onValueChange={() => {
                  this._changeModeSwitch('sw9')
                }}
              ></Switch>
            </View>
          </View>
        </View>
      )
    }
  }
  _renderBlock0 = () => {
    if (this.state.timecolap) {
      return null
    } else {
      return (
        <View style={{ padding: 10, backgroundColor: 'black' }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 10 }}>
            <Text style={{ color: 'white' }}>{global?.language?.label_total_duration}</Text>
            <Text style={{ color: 'white' }}>{this.state.newTotalTime}</Text>
          </View>
          <View style={{ backgroundColor: '#111', borderRadius: 10, flexDirection: 'column', margin: 5, padding: 10 }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginTop: 10, marginBottom: 10 }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ flex: 1, textAlign: 'left', color: 'white' }}>{global?.language?.label_repeat}:</Text>
                <Text style={{ fontWeight: 'bold', color: 'white' }}>{this.state.repetition_quantity}</Text>
              </View>
            </View>
            <View style={{ flex: 5 }}>
              <Slider
                step={1}
                minimunValue={5}
                maximumValue={59}
                onValueChange={val => this.repetition_quantity_change(val)}
                value={this.state.repetition_quantity}
              />
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginTop: 10, marginBottom: 10 }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ flex: 1, textAlign: 'left', color: 'white' }}>Duration of pauses in seconds</Text>
                <Text style={{ fontWeight: 'bold', color: 'white' }}>{this.state.pause_duration_time}</Text>
              </View>
            </View>
            <View style={{ flex: 5 }}>
              <Slider
                step={5}
                minimunValue={5}
                maximumValue={59}
                onValueChange={val => this.pause_duration_time_change(val)}
                value={this.state.pause_duration_time}
              />
            </View>
          </View>
        </View>
      )
    }
  }
  onTimeSelected = date => {
    if (date !== undefined) {
      var d = Moment(date, 'HH:mm')
      this.setState({
        selectedHours: d.hour(),
        selectedMinutes: d.minute(),
        initTime: d.format('HH:mm'),
        pickerTimestamp: date,
        showTimer: false,
      })
    }
  }
  calculateRoutineTotalTime = () => {
    let totalTime =
      this.state.phrases_total_duration_seconds * this.state.repetition_quantity +
      this.state.pause_duration_time * this.wsphrases.length * this.state.repetition_quantity
    console.log(
      `phrases_total_duration_seconds=${this.state.phrases_total_duration_seconds} * repetition_quantity=${this.state.repetition_quantity} + duration_time=${this.state.pause_duration_time} * wsphrases_count=${this.wsphrases.length} * repetition_quantity=${this.state.repetition_quantity}, 
    totalTime=${totalTime}`,
    )
    let minutesSeconds = Moment.duration(Math.round(totalTime), 'seconds')
    this.setState({
      newTotalTime: this.pad(minutesSeconds.hours()) + ':' + this.pad(minutesSeconds.minutes()) + ':' + this.pad(minutesSeconds.seconds()),
    })
  }
  _renderBackgroundBlock = () => {
    if (this.state.backgroundcolap) {
      return null
    } else {
      return (
        <View style={{ padding: 10 }}>
          <View style={{ flexDirection: 'row', marginBottom: 10, justifyContent: 'space-between', alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => {
                this.setState({ textDialogType: global?.language?.dialog_background, textDialogTitle: global?.language?.background_mode, visibleDialog: true })
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ marginTop: 3, marginBottom: 3, color: 'white' }}>{global?.language?.background_mode}</Text>
                <Image source={require('img/btninfo.png')} style={{ marginLeft: 5, width: 20, height: 20 }} />
              </View>
            </TouchableOpacity>
            <View style={{ textAlign: 'right' }}>
              <Switch
                trackColor={{ false: 'white', true: '#5c9c93' }}
                thumbColor={{ false: 'white', true: '#5c9c93' }}
                value={this.state.noche}
                onValueChange={value => {
                  this.setState({ noche: value })
                }}
              />
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 10 }}>
            <Text style={{ color: 'white', fontSize: 20 }}>{global?.language?.label_background_title}</Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <TouchableOpacity
              style={{ flex: 0.33, alignItems: 'center', justifyContent: 'center' }}
              onPress={() => {
                this.elegirImagen()
              }}
            >
              {this.state.routineImg ? (
                <Card
                  width={120}
                  height={180}
                  title={this.state.rutina.name}
                  no={this.state.rutina.phrases_length}
                  fullImg
                  edit
                  image={this.state.routineImgUri}
                />
              ) : (
                <Card
                  width={120}
                  height={180}
                  title={this.state.rutina.name}
                  no={this.state.rutina.phrases_length}
                  fullImg
                  edit
                  image={require('img/slideimages/card1-min.jpg')}
                />
              )}
              {this.state.routineImg && (
                <TouchableOpacity onPress={() => this.removeImage()} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                  <Image source={TrashWhiteImage} style={{ width: 16, height: 16 }} />
                  <Text style={{ color: 'white', fontSize: 16 }}>{global?.language?.label_remove_image}</Text>
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          </View>
          {this.state.phrases && (
            <FlatList
              style={{
                padding: 10,
              }}
              data={this.state.phrases}
              renderItem={({ item, index }) => {
                return (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 10,
                      justifyContent: 'space-between',
                      borderBottomColor: '#5c9c93',
                      borderWidth: 1,
                    }}
                  >
                    <View style={{ width: '15%', marginBottom: 10 }}>
                      <TouchableOpacity onPress={() => this.elegirImagenPhrase(item.id)}>
                        {this.state.phrasesImgs[item.id] ? (
                          <Card height={120} width={80} fullImg edit image={this.state.phrasesImgsUris[item.id]} />
                        ) : this.state.routineImg ? (
                          <Card height={120} width={80} fullImg edit image={this.state.routineImgUri} />
                        ) : (
                          <Card height={120} width={80} fullImg edit image={require('img/slideimages/card1-min.jpg')} />
                        )}
                        {this.state.phrasesImgs[item.id] && (
                          <TouchableOpacity onPress={() => this.removeImagePhrase(item.id)} style={{ marginTop: 10 }}>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                              <View style={{ paddingLeft: 25 }}>
                                <Image source={TrashWhiteImage} style={{ width: 14, height: 14 }} />
                              </View>
                              <View>
                                <Text style={{ fontSize: 13 }}>Eliminar</Text>
                              </View>
                            </View>
                          </TouchableOpacity>
                        )}
                      </TouchableOpacity>
                    </View>

                    <Text
                      style={{
                        paddingLeft: 40,
                        paddingRight: 10,
                        fontSize: 16,
                        color: 'white',
                        width: '75%',
                        paddingVertical: 10,
                      }}
                    >
                      {item.text_affirmative}
                    </Text>
                    <View style={{ width: '10%', justifyContent: 'center' }}>
                      {item.is_audio_app ? (
                        <Image source={require('img/microphone.png')} style={{ width: 20, height: 20, marginLeft: 5 }} />
                      ) : (
                        <Image source={require('img/btnrecord.png')} style={{ width: 30, height: 30 }} />
                      )}
                    </View>
                  </View>
                )
              }}
            />
          )}
        </View>
      )
    }
  }

  _renderOtherBlock = () => {
    if (this.state.othercolap) {
      return null
    } else {
      return (
        <View style={{ padding: 10 }}>
          <View style={{ flexDirection: 'row', marginBottom: 10, justifyContent: 'space-between', alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => {
                this.setState({ textDialogType: global?.language?.dialog_sleep, textDialogTitle: global?.language?.sleep_mode, visibleDialog: true })
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ marginTop: 3, marginBottom: 3, color: 'white' }}>{global?.language?.sleep_mode}</Text>
                <Image source={require('img/btninfo.png')} style={{ marginLeft: 5, width: 20, height: 20 }} />
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
                <Image source={require('img/btninfo.png')} style={{ marginLeft: 5, width: 20, height: 20 }} />
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

  renderHeader = () => (
    <View style={globalStyles.titleBar}>
      <Text style={{ fontSize: 20, color: 'white' }}>{capitalizeWords(global?.language?.schedule)}</Text>
    </View>
  )

  saveRoutineConfiguration = async () => {
    let anyDaySelected = this.state.dom || this.state.lun || this.state.mar || this.state.mie || this.state.jue || this.state.vie || this.state.sab
    if (!anyDaySelected) return alert(global?.language?.msg_err_fill_information)

    let imei = await AsyncStorage.getItem('user')

    imei = JSON.parse(imei)
    let newObj = {}
    newObj['lang'] = imei.default_language
    newObj['timezone'] = this.props.timezone
    newObj['imei'] = this.props.imei
    let newObj2 = {}
    newObj2['routine_mode'] = this.state.modeId
    ;(newObj2['tone_id'] = this.state.tone_id),
      (newObj2['music_id'] = this.state.music_id),
      (newObj2['schedule_time'] = this.pad(this.state.selectedHours) + ':' + this.pad(this.state.selectedMinutes))
    newObj2['duration_time'] = this.state.pause_duration_time.toString()
    newObj2['repetitions_quantity'] = this.state.repetition_quantity.toString()
    newObj2['pause_time'] = this.state.pause_duration_time.toString()
    ;(newObj2['tone_id'] = this.state.tone_id), (newObj2['shuffle'] = this.state.shuffle), (newObj2['repeat'] = this.state.repeat)
    newObj2['noche'] = this.state.noche
    newObj2['sleep'] = this.state.sleep
    let newObj3 = []
    let actualArrayIndex = 0
    for (let x = 0; x < 7; x++) {
      switch (x) {
        case 0:
          if (this.state.dom) {
            newObj3[actualArrayIndex] = {
              name: 'Sunday',
              slug: 'sunday',
              value: true,
            }
            actualArrayIndex++
          }
          break
        case 1:
          if (this.state.lun) {
            newObj3[actualArrayIndex] = {
              name: 'Monday',
              slug: 'monday',
              value: true,
            }
            actualArrayIndex++
          }
          break
        case 2:
          if (this.state.mar) {
            newObj3[actualArrayIndex] = {
              name: 'Tuesday',
              slug: 'tuesday',
              value: true,
            }
            actualArrayIndex++
          }
          break
        case 3:
          if (this.state.mie) {
            newObj3[actualArrayIndex] = {
              name: 'Wednesday',
              slug: 'wednesday',
              value: true,
            }
            actualArrayIndex++
          }
          break
        case 4:
          if (this.state.jue) {
            newObj3[actualArrayIndex] = {
              name: 'Thursday',
              slug: 'thursday',
              value: true,
            }
            actualArrayIndex++
          }
          break
        case 5:
          if (this.state.vie) {
            newObj3[actualArrayIndex] = {
              name: 'Friday',
              slug: 'friday',
              value: true,
            }
            actualArrayIndex++
          }
          break
        case 6:
          if (this.state.sab) {
            newObj3[actualArrayIndex] = {
              name: 'Saturday',
              slug: 'saturday',
              value: true,
            }
            actualArrayIndex++
          }
          break
      }
    }
    newObj2['weeks'] = newObj3
    if (this.state.editar > 0) {
      newObj2['routine_configuration_id'] = this.state.editar
    }
    newObj['config'] = newObj2
    newObj['routine_id'] = this.state.routine_id
    await this.setState({
      loading: true,
    })
    let { error } = await request({
      url: 'mobile/users/save_schedule_configuration',
      method: 'POST',
      data: newObj,
      //debug: true,
    })
    await this.setState({
      loading: false,
    })

    if (error) alert(global?.['language']?.['unexpected_error'])
    else {
      AsyncStorage.setItem('reprocess', 'true')
      this.recargarDatos()
      this.props.navigation.goBack()
    }
  }

  render() {
    let infoDialog = (
      <Dialog
        width={0.8}
        visible={this.state.visibleDialog}
        onTouchOutside={() => {
          this.setState({ visibleDialog: false, textDialogTitle: '', textDialogType: '' })
        }}
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
            <DialogButton
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
            />
          </DialogFooter>
        }
      >
        <DialogContent style={{ flexDirection: 'column', minHeight: 100, justifyContent: 'center', color: 'white', backgroundColor: 'white' }}>
          <View>
            <Text style={{ marginVertical: 10, color: 'black' }}>{this.state.textDialogType}</Text>
          </View>
        </DialogContent>
      </Dialog>
    )

    return (
      <View
        style={[globalStyles.informationLayout, { width: '100%', height: '100%', backgroundColor: 'black' }]}
        onStartShouldSetResponderCapture={() => {
          this.setState({ enableScrollViewScroll: true })
        }}
      >
        <Loader loading={this.state.loading} />
        <SafeAreaView
          style={{
            flex: 1,
            alignItems: 'stretch',
            justifyContent: 'flex-start',
          }}
        >
          {infoDialog}
          {this.renderHeader()}
          <ScrollView
            style={{ paddingLeft: 15, paddingRight: 15, paddingTop: 10 }}
            scrollEnabled={this.state.enableScrollViewScroll}
            ref={myScroll => (this._myScroll = myScroll)}
          >
            <View
              style={globalStyles.timePickerContainer}
              onStartShouldSetResponderCapture={() => {
                this.setState({ enableScrollViewScroll: false })
                if (this._myScroll.contentOffset === 0 && this.state.enableScrollViewScroll === false) {
                  this.setState({ enableScrollViewScroll: true })
                }
              }}
            >
              <Text style={{ marginTop: 10, marginBottom: 10, color: 'white', flex: 6 }}>{global?.language?.label_adjust_time}</Text>
              <View style={{ flex: 4, paddingLeft: 15, paddingRight: 15, paddingTop: 25, paddingBottom: 10 }}>
                <TouchableOpacity
                  style={{ borderColor: 'white', borderWidth: 1, marginTop: -10, marginBottom: 5, paddingTop: 5, paddingBottom: 5, borderRadius: 5 }}
                  onPress={() => {
                    this.setState({ showTimer: true })
                  }}
                >
                  <Text style={{ textAlign: 'center', color: 'white' }}>{this.state.initTime}</Text>
                </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={this.state.showTimer}
                  date={this.state.pickerTimestamp}
                  mode='time'
                  is24Hour={true}
                  onConfirm={date => this.onTimeSelected(date)}
                  onCancel={() => {
                    this.setState({ showTimer: false })
                  }}
                  isDarkModeEnabled={Platform.OS === 'android' ? true : this.state.colorScheme === 'dark'}
                  cancelTextIOS='Cancelar'
                  confirmTextIOS='Confirmar'
                  headerTextIOS='Escoja una hora'
                />
              </View>
            </View>

            <View style={{ marginTop: 10 }}>
              <View style={{ flex: 1, marginTop: 30, marginBottom: 20 }}>
                <View style={{ position: 'absolute', bottom: 0, width: '85.7%', height: 2, backgroundColor: 'white', alignSelf: 'center' }}></View>
                <View style={{ position: 'absolute', top: -27, width: '100%' }}>
                  <View style={{ width: '100%', flexDirection: 'row' }}>
                    <TouchableOpacity
                      style={{ flex: 1 }}
                      onPress={() => {
                        this.setState({
                          dom: !this.state.dom,
                        })
                      }}
                    >
                      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ marginBottom: 3, color: 'white' }}>{this.state.htwd0}</Text>
                        <Image source={!this.state.dom ? require('img/daysnoselected.png') : require('img/dot.png')} style={{ width: 13, height: 13 }}></Image>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{ flex: 1 }}
                      onPress={() => {
                        this.setState({
                          lun: !this.state.lun,
                        })
                      }}
                    >
                      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ marginBottom: 3, color: 'white' }}>{this.state.htwd1}</Text>
                        <Image source={!this.state.lun ? require('img/daysnoselected.png') : require('img/dot.png')} style={{ width: 13, height: 13 }}></Image>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{ flex: 1 }}
                      onPress={() => {
                        this.setState({
                          mar: !this.state.mar,
                        })
                      }}
                    >
                      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ marginBottom: 3, color: 'white' }}>{this.state.htwd2}</Text>
                        <Image source={!this.state.mar ? require('img/daysnoselected.png') : require('img/dot.png')} style={{ width: 13, height: 13 }}></Image>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{ flex: 1 }}
                      onPress={() => {
                        this.setState({
                          mie: !this.state.mie,
                        })
                      }}
                    >
                      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ marginBottom: 3, color: 'white' }}>{this.state.htwd3}</Text>
                        <Image source={!this.state.mie ? require('img/daysnoselected.png') : require('img/dot.png')} style={{ width: 13, height: 13 }}></Image>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{ flex: 1 }}
                      onPress={() => {
                        this.setState({
                          jue: !this.state.jue,
                        })
                      }}
                    >
                      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ marginBottom: 3, color: 'white' }}>{this.state.htwd4}</Text>
                        <Image source={!this.state.jue ? require('img/daysnoselected.png') : require('img/dot.png')} style={{ width: 13, height: 13 }}></Image>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{ flex: 1 }}
                      onPress={() => {
                        this.setState({
                          vie: !this.state.vie,
                        })
                      }}
                    >
                      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ marginBottom: 3, color: 'white' }}>{this.state.htwd5}</Text>
                        <Image source={!this.state.vie ? require('img/daysnoselected.png') : require('img/dot.png')} style={{ width: 13, height: 13 }}></Image>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{ flex: 1 }}
                      onPress={() => {
                        this.setState({
                          sab: !this.state.sab,
                        })
                      }}
                    >
                      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ marginBottom: 3, color: 'white' }}>{this.state.htwd6}</Text>
                        <Image source={!this.state.sab ? require('img/daysnoselected.png') : require('img/dot.png')} style={{ width: 13, height: 13 }}></Image>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>

            <View style={[globalStyles.borderItemStyle, { padding: 10, marginTop: 10 }]}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ marginTop: 3, marginBottom: 3, color: 'white' }}>{global?.language?.label_time_routine}</Text>
                <TouchableOpacity
                  style={{ flex: 1 }}
                  onPress={() => {
                    if (this.state.timecolap) {
                      this.setState({
                        timecolap: false,
                        colapimg0: require('img/collapse.png'),
                      })
                    } else {
                      this.setState({
                        timecolap: true,
                        colapimg0: require('img/expand.png'),
                      })
                    }
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      paddingLeft: 10,
                      paddingTop: 3,
                      paddingRight: 0,
                      alignItems: 'flex-end',
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      alignSelf: 'flex-end',
                    }}
                  >
                    <Text style={globalStyles.grayTextStyle}>{this.state.newTotalTime}</Text>
                    <Image source={this.state.colapimg0} style={{ width: 20, height: 20 }}></Image>
                  </View>
                </TouchableOpacity>
              </View>
              {this._renderBlock0()}
            </View>
            <View style={[globalStyles.borderItemStyle, { padding: 10, marginTop: 10 }]}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ marginTop: 3, marginBottom: 3, color: 'white' }}>{global?.language?.label_music}</Text>
                <TouchableOpacity
                  style={{ flex: 1 }}
                  onPress={() => {
                    if (this.state.musiccolap) {
                      this.setState({
                        musiccolap: false,
                        colapimg1: require('img/collapse.png'),
                      })
                    } else {
                      this.setState({
                        musiccolap: true,
                        colapimg1: require('img/expand.png'),
                      })
                    }
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      paddingLeft: 10,
                      paddingTop: 3,
                      paddingRight: 0,
                      alignItems: 'flex-end',
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      alignSelf: 'flex-end',
                    }}
                  >
                    <Text style={globalStyles.grayTextStyle}>{this.state.music_name}</Text>
                    <Image source={this.state.colapimg1} style={{ width: 20, height: 20 }}></Image>
                  </View>
                </TouchableOpacity>
              </View>
              {this._renderBlock1()}
            </View>
            <View style={[globalStyles.borderItemStyle, { padding: 10, marginTop: 10 }]}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ marginTop: 3, marginBottom: 3, color: 'white' }}>{global?.language?.label_tones}</Text>
                <TouchableOpacity
                  style={{ flex: 1 }}
                  onPress={() => {
                    if (this.state.tonecolap) {
                      this.setState({
                        tonecolap: false,
                        colapimg2: require('img/collapse.png'),
                      })
                    } else {
                      this.setState({
                        tonecolap: true,
                        colapimg2: require('img/expand.png'),
                      })
                    }
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      paddingLeft: 10,
                      paddingTop: 3,
                      paddingRight: 0,
                      alignItems: 'flex-end',
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      alignSelf: 'flex-end',
                    }}
                  >
                    <Text style={globalStyles.grayTextStyle}>{this.state.tone_name}</Text>
                    <Image source={this.state.colapimg2} style={{ width: 20, height: 20 }}></Image>
                  </View>
                </TouchableOpacity>
              </View>
              {this._renderBlock2()}
            </View>
            <View style={[globalStyles.borderItemStyle, { padding: 10, marginTop: 10 }]}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ marginTop: 3, marginBottom: 3, color: 'white' }}>{global?.language?.label_mode}</Text>
                <TouchableOpacity
                  style={{ flex: 1 }}
                  onPress={() => {
                    if (this.state.modecolap) {
                      this.setState({
                        modecolap: false,
                        colapimg3: require('img/collapse.png'),
                      })
                    } else {
                      this.setState({
                        modecolap: true,
                        colapimg3: require('img/expand.png'),
                      })
                    }
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      paddingLeft: 10,
                      paddingTop: 3,
                      paddingRight: 0,
                      alignItems: 'flex-end',
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      alignSelf: 'flex-end',
                    }}
                  >
                    <Text style={globalStyles.grayTextStyle}>{this.state.mode}</Text>
                    <Image source={this.state.colapimg3} style={{ width: 20, height: 20 }}></Image>
                  </View>
                </TouchableOpacity>
              </View>
              {this._renderBlock3()}
            </View>
            <View style={[globalStyles.borderItemStyle, { padding: 10, marginTop: 10 }]}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ marginTop: 3, marginBottom: 3, color: 'white' }}>{global?.language?.label_background_image}</Text>
                <TouchableOpacity
                  style={{ flex: 1 }}
                  onPress={() => {
                    if (this.state.backgroundcolap) {
                      this.setState({
                        backgroundcolap: false,
                        colapimg4: require('img/collapse.png'),
                      })
                    } else {
                      this.setState({
                        backgroundcolap: true,
                        colapimg4: require('img/expand.png'),
                      })
                    }
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      paddingLeft: 10,
                      paddingTop: 3,
                      paddingRight: 0,
                      alignItems: 'flex-end',
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      alignSelf: 'flex-end',
                    }}
                  >
                    <Image source={this.state.colapimg4} style={{ width: 20, height: 20 }}></Image>
                  </View>
                </TouchableOpacity>
              </View>
              {this._renderBackgroundBlock()}
            </View>
            <View style={[globalStyles.borderItemStyle, { padding: 10, marginTop: 10 }]}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ marginTop: 3, marginBottom: 3, color: 'white' }}>{global?.language?.label_others}</Text>
                <TouchableOpacity
                  /* disabled={!this.state.hasRoutine} */
                  style={{ flex: 1 }}
                  onPress={() => {
                    if (this.state.othercolap) {
                      this.setState({
                        othercolap: false,
                        colapimg5: require('img/collapse.png'),
                      })
                    } else {
                      this.setState({
                        othercolap: true,
                        colapimg5: require('img/expand.png'),
                      })
                    }
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      paddingLeft: 10,
                      paddingTop: 3,
                      paddingRight: 0,
                      alignItems: 'flex-end',
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      alignSelf: 'flex-end',
                    }}
                  >
                    <Image source={this.state.colapimg5} style={{ width: 20, height: 20 }}></Image>
                  </View>
                </TouchableOpacity>
              </View>
              {this._renderOtherBlock()}
            </View>

            <View style={{ marginTop: 30, justifyContent: 'center', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => this.saveRoutineConfiguration()}>
                <View style={{ backgroundColor: global.authButtonColor, padding: 10, width: 150, borderRadius: 10 }}>
                  <Text style={{ textAlign: 'center', fontWeight: 'bold', color: 'white' }}>{global?.language?.label_save}</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{ height: 100 }} />
          </ScrollView>
          <BottomNavigationBar hasBack />
        </SafeAreaView>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  imei: datasetSelector(state, 'imei'),
  timezone: datasetSelector(state, 'timezone'),
})
const mapDispatchToProps = dispatch => ({
  setRoutines: data => dispatch(setDatasetListToObjectReducer(data, 'routines')),
})

export default connect(mapStateToProps, mapDispatchToProps)(RoutineConfigurationScreen)
