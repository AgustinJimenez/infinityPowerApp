import React from 'react'
import { NavigationEvents, SafeAreaView } from 'react-navigation'
import { View, Text, Image, TouchableOpacity, TextInput, Alert, ActivityIndicator, RefreshControl } from 'react-native'
import styles, { scale } from '../../helpers/styles'
import { ScrollView } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-community/async-storage'
import * as fn from 'helpers/scripts'
import Dialog, { DialogContent, DialogFooter, DialogButton, DialogTitle } from 'react-native-popup-dialog'
import { PhrasesContext } from '../../context/PhrasesProvider'
import ModalSelector from 'react-native-modal-selector'
import Modal from '../../helpers/modal2'
import OrderModal from '../../components/OrderModal'
import { connect } from 'react-redux'
import request from '../../helpers/request'
import { secondaryColor } from '../../helpers/styles'
import { datasetSelector } from '../../redux/selectors'
import { setDatasetListToObjectReducer, setDatasetToReducer } from '../../redux/actions'
import RightArrowImage from 'img/icon_rightarrow.png'
import { Icon, Switch, Toast } from 'native-base'
import BtnRecordImage from 'img/btnrecord.png'
import MicrophoneImage from 'img/microphone.png'
import CrossImage from 'img/cross.png'
import BottomNavigationBar from '../../components/BottomNavigationBar'
import capitalizeWords from '../../helpers/capitalizeWords'
import { tailwind } from '../../tailwind'
import MeditationsPercentage from './components/MeditationsPercentage'
import LineDotsChartAchievedLast7Days from './components/LineDotsChartAchievedLast7Days'

import { NotificationCountIcon } from '../../components/NotificationIconComponent'
import { ImageBackground } from 'react-native'

import BgMainIconImg from '../../img/background-home.jpg'
import BgAffirmation from '../../img/bg_affirmation_default.png'
import DraggableFlatlist from '../../components/DraggableFlatlist'
class MeditationHomeScreen extends React.Component {
  state = {
    phrases: [],
    displayRoutine: null,
    newRoutineName: '',
    modalText1: '',
    modalText2: '',
    modalText3: '',
    modalText4: '',
    modal3: false,
    enableRemovePhrase: false,
    scrollOffset: 0,
    scrollEnable: true,
    showEditRoutineName: false,
    showReorderRoutinesModal: false,
    loadingRoutineList: false,
    addRoutineDialog: false,
    routines: [],
  }

  constructor(props) {
    super(props)

    if (props.navigation?.state?.params?.['createRoutineDialogIsOpen']) this.state.addRoutineDialog = true
    this.state.routines = props.routines || []
  }

  static contextType = PhrasesContext

  disableScroll = () => this.setState({ scrollEnable: false })
  enableScroll = () => this.setState({ scrollEnable: true })

  loadRoutineList = async () => {
    await this.setState({ loadingRoutineList: true }, async () => {
      let { data, error } = await request({
        url: 'mobile/users/routine_list',
        method: 'POST',
        data: {
          lang: global.lange,
          imei: this.props.imei,
          timezone: this.props.timezone,
        },
        //debug: true,
      })

      if (!error && !!data && !!data.data) {
        this.props.setRoutines(data.data)
      }

      await this.setState({ loadingRoutineList: false, routines: data.data })
    })
  }

  loadRoutinePhrases = async (routineId, displayPhrases) => {
    if (!routineId) return

    let { data, response } = await request({
      url: 'mobile/users/get_profile_data',
      method: 'POST',
      data: {
        lang: this.props.app_configuration.language,
        imei: this.props.imei,
        timezone: this.props.timezone,
        routine_id: routineId,
      },
      //debug: true,
    })
    if (!error) {
      //AsyncStorage.setItem('reprocess', 'true')
      AsyncStorage.setItem('get_profile_data', JSON.stringify(response.data))
      const phrases = data.routinePhrases.items
      this.props.setRoutinesPhrases(phrases)
    }
  }

  saveRoutineHandler = async () => {
    this.setState({ loading: true })

    let { error } = await request({
      url: 'mobile/users/new_routine',
      method: 'POST',
      data: {
        lang: global.lang,
        imei: this.props.imei,
        timezone: this.props.timezone,
        routine_name: this.state.newRoutineName,
      },
      //debug: true
    })
    await this.setState({
      loading: false,
    })
    if (!error) {
      this.loadRoutineList()
      Toast.show({
        text: global?.language?.created_correctly,
        type: 'success',
        duration: 4000,
      })
    } else {
      Toast.show({
        text: global?.language?.unexpected_error,
        type: 'danger',
        duration: 4000,
      })
    }
  }

  removeRoutineHandler = async routineId => {
    if (!routineId) return
    await this.setState({ loading: true })

    let user = await AsyncStorage.getItem('user')
    user = JSON.parse(user)
    let { error } = await request({
      url: 'mobile/users/remove_routine',
      method: 'POST',
      data: {
        lang: global.lang,
        imei: this.props['imei'],
        routine_id: routineId,
        timezone: this.props.timezone,
      },
      //debug: true
    })
    await this.setState({
      loading: false,
    })
    if (error) return alert(global?.language?.msg_removed_failed + ' third')
    else
      Toast.show({
        text: global?.language?.deleted_correctly,
        type: 'success',
        duration: 4000,
      })

    this.setState({
      scrollEnable: false,
    })

    this.loadRoutinePhrases(this['state']['displayRoutineId'], true)
    this.loadRoutineList()
  }

  removePhrase = item => {
    Alert.alert(
      global?.language?.label_warning,
      global?.language?.delete_phrase_warning,
      [
        { text: 'NO' },
        {
          text: global?.language?.yes,
          onPress: async () => {
            await this.setState({
              loading: true,
            })
            let { error } = await request({
              url: 'mobile/users/remove_phrase_from',
              method: 'POST',
              data: {
                lang: this.props.app_configuration.language,
                imei: this.props.imei,
                timezone: this.props.timezone,
                source: 'myRoutine',
                phrase_id: item['id'],
                routine_id: item['muser_routine_id'],
              },
              //debug: true,
            })
            await this.setState({
              loading: false,
            })
            if (!error) {
              Toast.show({
                text: global?.language?.deleted_correctly,
                type: 'success',
                duration: 4000,
              })
              this.loadRoutinePhrases(this.state['displayRoutineId'], true)
              this.setState({
                enableRemovePhrase: true,
              })
            }
          },
        },
      ],
      { cancelable: true },
    )
  }
  loadDatas = async () => {
    await this.setState({ loading: true })
    await this.loadRoutineList()
    if (!!this['state']['displayRoutineId']) await this.loadRoutinePhrases(this['state']['displayRoutineId'], true)
    await this.setState({ loading: false })
  }
  modalOnChange = async option => {
    if (option.value != 'quitar') return
    await this.setState({
      loading: true,
    })

    let user = await AsyncStorage.getItem('user')
    user = JSON.parse(user)
    let { data, error } = await request({
      url: 'mobile/users/remove_phrase_from',
      method: 'POST',
      data: {
        lang: global.lang,
        imei: this.props.imei,
        timezone: user.timezone,
        source: 'myRoutine',
        phrase_id: item['id'],
        routine_id: item['muser_routine_id'],
      },
    })

    await this.setState({
      loading: false,
    })
  }
  renderModal = item => {
    return (
      <ModalSelector data={[{ key: 0, value: 'quitar', label: global?.language?.label_remove }]} onChange={option => this.modalOnChange(option)}>
        <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}>
          <Image source={require('img/send.png')} style={{ width: 20, height: 20 }} />
        </View>
      </ModalSelector>
    )
  }

  showModal = item => {
    this.setState({
      modalText1: global?.language?.label_affirmation,
      modalText2: item.text_affirmative,
      modalText3: global?.language?.label_gratitude,
      modalText4: item.text_gratitude,
      modal3: true,
    })
  }
  handleMoveRoutine = async data => {
    await this.setState({
      loading: true,
    })
    let routinesNewOrder = []
    data.data.map((value, index) => {
      let newObj = {}
      newObj['id'] = value.id
      newObj['order_by'] = index + 1

      routinesNewOrder.push(newObj)
    })

    let user = await AsyncStorage.getItem('user')
    user = JSON.parse(user)
    let newObj = {}
    newObj['lang'] = user.default_language
    newObj['imei'] = user.imei
    newObj['timezone'] = user.timezone
    newObj['routines'] = routinesNewOrder
    var { data, error } = await request({
      url: 'mobile/users/reorder_routines',
      method: 'POST',
      data: newObj,
      //debug: true
    })
    await this.setState({
      loading: false,
    })

    if (!error) this.loadRoutineList()
    else
      setTimeout(() => {
        alert(json.message + ' first ')
      }, 200)
  }

  handleMove = async move => {
    await this.setState({
      loading: true,
      phrases: move.data,
    })

    let phrases = []
    let newObj = {}
    phrases = move.data.map((phrase, index) => ({ phrase_id: phrase['id'], order_by: index + 1 }))
    console.log('handleMove ===> ', { move, phrases: phrases })
    let routines_phrases = this.props.routines_phrases.map(phrase => {
      if (move['id'] === phrase['id']) {
        phrase['order_by'] = move['to']
      } else if (phrase['order_by'] === move['to']) {
        phrase['order_by'] = move['from']
      }

      return phrase
    })
    this.props.setRoutinesPhrases(routines_phrases)

    let user = await AsyncStorage.getItem('user')
    user = JSON.parse(user)
    newObj['lang'] = user.default_language
    newObj['imei'] = user.imei
    newObj['timezone'] = user.timezone
    newObj['phrases'] = phrases
    newObj['routine_id'] = this['state']['displayRoutineId']
    newObj['name'] = this.props['routinesObjs'][newObj.routine_id]['name']
    var { error } = await request({
      url: 'mobile/users/save_routine',
      method: 'POST',
      data: newObj,
      show_message: true,
      //debug: true
    })
    await this.setState({
      loading: false,
    })

    if (error) return this.loadRoutinePhrases(newObj['routine_id'], true)

    this.loadRoutinePhrases(this['state']['displayRoutineId'], true)
    this.loadRoutineList()
  }

  editPhraseHandler = (phrase = [], routineId = null) =>
    this.props.navigation.navigate('Affirmations', {
      item: phrase,
      routineId,
      editRoutinePhrase: true,
      phrases: this.state.phrases,
      newRoutine: false,
    })

  routineNameHandler = async index => {
    await this.setState({ loading: true })

    let { error } = await request({
      url: 'mobile/users/change_routine_name',
      method: 'POST',
      data: {
        lang: this.props.app_configuration.language,
        imei: this.props.imei,
        timezone: this.props.timezone,
        name: this.state['newRoutineName'],
        routine_id: this['state']['displayRoutineId'],
      },
    })

    if (!error) await this.loadRoutineList()

    this.setState({
      loading: false,
    })
  }

  onRoutineEnabledSwitch = routine => async index => {
    let { routines = [] } = this.state

    let new_enabled = !routine.enabled

    routines = routines.map(r => {
      if (r.id == routine.id) {
        r.enabled = !r.enabled
      }
      return r
    })

    await this.setState({ loading: true, routines, displayRoutineId: null }, async () => {
      console.log({ enabled: routine.enabled })
      let { error } = await request({
        url: 'mobile/users/change_routine_enabled',
        method: 'POST',
        data: {
          lang: this.props.app_configuration.language,
          imei: this.props.imei,
          timezone: this.props.timezone,
          enabled: new_enabled,
          routine_id: routine.id,
        },
      })
      console.log({ error })

      if (!error) await this.loadRoutineList()

      this.setState({
        loading: false,
      })
    })
  }

  routinesPhrasesByRoutineId = id => {
    let routines_phrases = []
    routines_phrases = this.props.routines_phrases

    routines_phrases = routines_phrases.filter(({ muser_routine_id }) => muser_routine_id === id).sort((a, b) => a['order_by'] - b['order_by'])

    return routines_phrases
  }
  openRoutineItem = async routine_id => {
    //console.log('openRoutineItem ===> ', { routine_id, displayRoutineId: this.state.displayRoutineId })
    if (this.state.displayRoutineId === routine_id) return await this.setState({ displayRoutineId: undefined })
    else await this.setState({ displayRoutineId: routine_id, loading: true })

    await this.loadRoutinePhrases(routine_id)
    await this.setState({ loading: false })
  }
  renderHeaderOld = () => {
    return (
      <View style={{ flexDirection: 'row', width: '100%', height: 50, justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'white', fontSize: 22 }}> {global?.language?.title_my_routines} </Text>
        </View>

        <ModalSelector
          data={[
            { key: 0, value: 'newRoutine', label: global?.language?.label_create_new_routine },
            { key: 1, value: 'addToDraft', label: global?.language?.label_create_affirmation },
          ]}
          onChange={option => {
            if (option.value === 'newRoutine') {
              this.setState({ addRoutineDialog: true })
            }
            if (option.value === 'addToDraft') {
              this.props.navigation.navigate('Affirmations', {
                new: true,
                phrases: [],
                routineId: null,
              })
            }
          }}
        >
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('img/icon_plus.png')} style={{ height: 28, width: 28, marginRight: 10, padding: 10 }} />
            {/*  <Text style={{ fontSize: 25, paddingRight: 10 }}>+</Text> */}
          </View>
        </ModalSelector>
      </View>
    )
  }
  renderReorderRoutinesModal = () => (
    <OrderModal
      rutinas={this.state.routines}
      handleShow={() => this.setState({ showReorderRoutinesModal: false })}
      handleMoveRoutine={data => this.handleMoveRoutine(data)}
      show={this.state.showReorderRoutinesModal}
    />
  )
  renderAddAffirmationModal = () => (
    <Dialog
      dialogStyle={{
        position: 'absolute',
        top: 200,
      }}
      width={0.8}
      visible={this.state.addRoutineDialog || false}
      onTouchOutside={() => {
        this.setState({ addRoutineDialog: false })
      }}
      dialogTitle={
        <DialogTitle
          title={global?.language?.create_routine}
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
        <DialogFooter>
          <DialogButton
            text={capitalizeWords(global?.language?.close)}
            style={{
              backgroundColor: 'white',
            }}
            textStyle={{
              color: 'black',
            }}
            onPress={() => this.setState({ addRoutineDialog: false })}
          />

          <DialogButton
            text={global?.language?.label_save}
            style={{
              backgroundColor: 'white',
            }}
            textStyle={{
              color: 'black',
            }}
            onPress={() => {
              this.setState({ addRoutineDialog: false })
              this.saveRoutineHandler()
            }}
          />
        </DialogFooter>
      }
    >
      <DialogContent style={{ color: 'black', backgroundColor: 'white', minHeight: 100, justifyContent: 'center' }}>
        <View>
          <TextInput
            returnKeyType='done'
            textAlign='left'
            placeholder={global?.language?.label_inser_name}
            placeholderTextColor='gray'
            onChangeText={text => this.setState({ newRoutineName: text })}
            style={{ paddingTop: 15, color: 'black' }}
          />
        </View>
      </DialogContent>
    </Dialog>
  )
  editRoutineNameModal = () => (
    <Dialog
      width={0.8}
      visible={this.state.showEditRoutineName || false}
      onTouchOutside={() => {
        this.setState({ showEditRoutineName: false })
      }}
      dialogTitle={
        <DialogTitle
          title={global?.language?.edit_routine_name}
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
        <DialogFooter>
          <DialogButton
            text={global?.language?.close}
            style={{
              backgroundColor: 'white',
            }}
            textStyle={{
              color: 'black',
            }}
            onPress={() => {
              this.setState({ showEditRoutineName: false })
            }}
          />

          <DialogButton
            text={global?.language?.label_save}
            style={{
              backgroundColor: 'white',
            }}
            textStyle={{
              color: 'black',
            }}
            onPress={() => {
              this.setState({ showEditRoutineName: false })
              this.routineNameHandler()
            }}
          />
        </DialogFooter>
      }
    >
      <DialogContent style={{ color: 'black', backgroundColor: 'white', minHeight: 100, justifyContent: 'center' }}>
        <View>
          <TextInput
            returnKeyType='done'
            textAlign='left'
            placeholder={global?.language?.label_inser_name}
            placeholderTextColor='gray'
            value={this.state.newRoutineName}
            onChangeText={text => this.setState({ newRoutineName: text })}
            style={{ paddingTop: 15, color: 'black' }}
          />
        </View>
      </DialogContent>
    </Dialog>
  )
  renderRoutinesListOld = () => {
    if (!this.state.routines) return null

    return this.state.routines.map((routine, index) => {
      let routineIsDisabled = !routine['phrases_length']
      //console.log('RENDER ROUTINE ===> ', routine)
      return (
        <View key={index}>
          <View
            style={{
              flexDirection: 'row',
              borderColor: 'white',
              borderRadius: 10,
              height: 80,
              borderWidth: 2,
              marginTop: 10,
              justifyContent: 'space-between',
            }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '65%' }}>
              <TouchableOpacity
                disabled={routineIsDisabled}
                onPress={() => {
                  this.props.navigation.navigate('PrePlayRoutineScreen', {
                    routineSelectedId: routine['id'],
                  })
                }}
              >
                {/* <Image source={require('img/home-play.png')} style={{ width: 50, height: 50, marginLeft: 10, opacity: !routineIsDisabled ? 1 : 0.25 }} /> */}
                <Image source={require('img/home-play.png')} style={tailwind('w-12 h-12 ml-2 ' + (!routineIsDisabled ? '' : ' opacity-25'))} />
              </TouchableOpacity>

              <TouchableOpacity
                style={{ justifyContent: 'center', alignItems: 'center' }}
                onPress={() => {
                  this.loadRoutinePhrases(routine['id'])
                  this.setState({ scrollEnable: true, enableRemovePhrase: false })
                }}
              >
                <Text style={{ color: 'white', paddingHorizontal: 10, fontSize: 20 }}>
                  {routine['name'].length >= 25 ? routine['name'].slice(0, 25) + '..' : routine['name']}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', width: '30%' }}>
              {this.renderListItemRightIcon(routine['id'])}
            </View>
          </View>
          <View>{this.renderRoutineAffirmations(routine)}</View>
        </View>
      )
    })
  }

  renderListItemRightIcon = routine_id => {
    //console.log('renderListItemRightIcon ===> ', { routine_id, displayRoutineId: this.state.displayRoutineId })
    if (this.state['displayRoutineId'] === routine_id && this.state['enableRemovePhrase'])
      return (
        <>
          <TouchableOpacity
            style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
            onPress={() => this.setState({ showEditRoutineName: true, newRoutineName: this.props['routinesObjs'][this.state.displayRoutineId]['name'] })}
          >
            <Image source={require('img/edit.png')} style={{ height: 18, width: 18 }} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            onPress={() => this.removeRoutineHandler(routine_id)}
          >
            <Image source={CrossImage} style={{ height: 18, width: 18 }} />
          </TouchableOpacity>
        </>
      )

    return (
      <TouchableOpacity
        style={{ justifyContent: 'center', alignItems: 'center', padding: 20, marginRight: 5 }}
        onPress={() => this.openRoutineItem(routine_id)}
      >
        <Icon
          type='SimpleLineIcons'
          name={this.state.displayRoutineId === routine_id ? 'arrow-up' : 'arrow-down'}
          style={{ color: 'white', fontSize: scale(0.5) }}
        />
      </TouchableOpacity>
    )
  }

  renderRoutineAffirmations = routine => {
    if (routine.id !== this.state.displayRoutineId) {
      return null
    }

    if (!routine.enabled) {
      return null
    }

    let phrases = this.routinesPhrasesByRoutineId(routine.id)

    //console.log('renderRoutineAffirmations ===> ', {routine.id, phrases: phrases.map(({id, text_affirmative, text_gratitude, order_by}) => ({id, text_affirmative, text_gratitude, order_by}))})
    return (
      <View style={tailwind('mb-4')}>
        {this.state.loading && !phrases.length && <ActivityIndicator size='large' style={{ alignSelf: 'center', marginVertical: scale(0.5) }} />}
        <AffirmationList
          loading={this.state.loading}
          handleScroll={() => this.handleScroll()}
          scrollOffset={this.state.scrollOffset}
          showModal={item => this.showModal(item)}
          phrases={phrases}
          renderModal={item => this.renderModal(item)}
          displayRoutineId={this.state.displayRoutineId}
          enableRemove={this.state.enableRemovePhrase}
          removePhrase={item => this.removePhrase(item)}
          handleMove={data => this.handleMove(data)}
          editPhrase={phrase => this.editPhraseHandler(phrase, routine.id)}
          disableScroll={() => this.disableScroll()}
          enableScroll={() => this.enableScroll()}
          isScrolling={!this.state.scrollEnable}
        />
        {/*   {this.state.phrases.length < 5 ? */}
      </View>
    )
  }

  renderOld() {
    return (
      <View style={[styles.informationLayout, { width: '100%', height: '100%', paddingTop: 30 }]}>
        <NavigationEvents
          onDidFocus={() => {
            this.setState({ editRoutinePhrase: false })
            this.loadDatas()
          }}
        />
        <SafeAreaView
          style={{
            flex: 1,
            alignItems: 'stretch',
            justifyContent: 'flex-start',
            padding: 20,
            //paddingTop: 40,
          }}
        >
          <ScrollView
            onScrollEndDrag={({ nativeEvent }) => this.setState({ scrollOffset: nativeEvent.contentOffset['y'] })}
            onMomentumScrollEnd={({ nativeEvent }) => this.setState({ scrollOffset: nativeEvent.contentOffset['y'] })}
            scrollEnabled={this.state.scrollEnable}
            horizontal={false}
            showsVerticalScrollIndicator
            scrollEnabled={this.state.scrollEnable}
            refreshControl={<RefreshControl tintColor='white' refreshing={this['state']['loadingRoutineList']} onRefresh={() => this.loadRoutineList()} />}
          >
            <Modal state={this} />
            {this.renderReorderRoutinesModal()}
            {this.renderAddAffirmationModal()}
            {this.editRoutineNameModal()}
            {this.renderHeader()}
            {this.renderRoutinesList()}

            <TouchableOpacity onPress={() => this.setState({ showReorderRoutinesModal: true })}>
              <View style={{ width: '100%', flex: 4, backgroundColor: '#5c9c93', borderRadius: 2, paddingHorizontal: 10, marginVertical: 15 }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', height: 50, paddingVertical: 10 }}>
                  <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: 18 }}>{global?.language?.label_reorder_routines}</Text>
                </View>
              </View>
            </TouchableOpacity>
            <View style={{ height: 75 }} />
          </ScrollView>
        </SafeAreaView>
        <BottomNavigationBar hasPlay={this.state.hasPlay} hasBack />
      </View>
    )
  }

  render() {
    return (
      <View style={tailwind('w-full h-full relative')}>
        <NavigationEvents
          onDidFocus={() => {
            this.setState({ editRoutinePhrase: false })
            this.loadDatas()
          }}
        />
        <ImageBackground source={BgMainIconImg} imageStyle={{ resizeMode: 'stretch' }} style={tailwind('absolute h-full w-full ')} />
        <View style={[tailwind('absolute w-full h-full'), { backgroundColor: secondaryColor(0.8) }]}></View>

        {this.renderAddAffirmationModal()}
        <SafeAreaView style={tailwind('flex')}>
          <ScrollView
            onScrollEndDrag={({ nativeEvent }) => this.setState({ scrollOffset: nativeEvent.contentOffset['y'] })}
            onMomentumScrollEnd={({ nativeEvent }) => this.setState({ scrollOffset: nativeEvent.contentOffset['y'] })}
            horizontal={false}
            showsVerticalScrollIndicator
            scrollEnabled={this.state.scrollEnable}
            refreshControl={
              !!this.state.scrollEnable ? (
                <RefreshControl tintColor='white' refreshing={this['state']['loadingRoutineList']} onRefresh={() => this.loadRoutineList()} />
              ) : null
            }
          >
            <View style={tailwind('flex p-6 flex-col justify-start pb-24')}>
              {/* Header */}
              {this.renderHeader()}
              {/* Graphic Percent */}
              {this.renderGraphicPercent()}
              {/* Routine List */}
              {this.renderRoutinesList()}
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
          {/* Title */}
          <View style={tailwind('flex flex-row justify-center')}>
            <Text style={tailwind('text-2xl font-bold text-white capitalize')}>{global?.language?.meditation}</Text>
          </View>
          <ModalSelector
            data={[
              { key: 0, value: 'newRoutine', label: global?.language?.label_create_new_routine },
              { key: 1, value: 'addToDraft', label: global?.language?.label_create_affirmation },
            ]}
            onChange={option => {
              if (option.value === 'newRoutine') {
                this.setState({ addRoutineDialog: true })
              }
              if (option.value === 'addToDraft') {
                this.props.navigation.navigate('Affirmations', {
                  new: true,
                  phrases: [],
                  routineId: null,
                })
              }
            }}
          >
            <Icon type='AntDesign' name={'plus'} style={[tailwind('text-white text-4xl')]} />
          </ModalSelector>
        </View>
      </View>
    )
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.routines != this.props.routines) {
      this.setState({ routines: nextProps.routines })
      console.log('========> actualizacion de rutinas')
    }
  }

  renderGraphicPercent = () => {
    let { routines = [] } = this.state
    routines = routines.filter(r => !!r.enabled)

    let percent = 0
    if (routines.length > 0) {
      let total_percent = routines.map(r => r.percent || 0).reduce((a, b) => a + b, 0)
      percent = total_percent / routines.length
    }

    return (
      <View style={tailwind('flex flex-row justify-center mt-4 mb-8')}>
        <View style={tailwind('w-32 h-32')}>
          <MeditationsPercentage progress={percent || 0}></MeditationsPercentage>
        </View>
      </View>
    )
  }

  renderRoutinesList = () => {
    return (
      <View>
        {/* Title List */}
        <View style={tailwind('flex flex-row items-center justify-between px-1 mb-4')}>
          <View>
            <Text style={tailwind('capitalize text-white text-2xl')}>{global?.language?.my_routines}</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('SongsListScreen')
            }}
          >
            <Icon type='FontAwesome' name={'music'} style={tailwind('text-white text-2xl')} />
          </TouchableOpacity>
        </View>
        {/* List */}
        <View style={tailwind('flex flex-col')}>
          {this.state.routines
            .filter(r => r.enabled)
            .map(
              /* Routine List Item */
              this.renderRoutineListItem,
            )}
          {this.state.routines
            .filter(r => !r.enabled)
            .map(
              /* Routine List Item */
              this.renderRoutineListItem,
            )}
        </View>
      </View>
    )
  }

  onToggleRoutine = routine => () => {
    let routineIsDisabled = !routine['phrases_length']

    let open = this.state.displayRoutineId == routine['id']

    if (open) {
      let { displayRoutineId = '' } = this.state
      this.setState({ displayRoutineId: displayRoutineId != routine['id'] ? displayRoutineId : null })
      return
    }

    this.loadRoutinePhrases(routine['id'])
    this.setState({ scrollEnable: true, displayRoutineId: routine['id'], enableRemovePhrase: false })
  }

  renderRoutineListItem = (routine, index) => {
    let routineIsDisabled = !routine['phrases_length']

    let open = this.state.displayRoutineId == routine['id']

    return (
      <View style={tailwind('relative mb-4 z-0')}>
        <View style={tailwind('mb-4')}>
          {/* bg transparent */}
          <View style={tailwind('absolute top-0 left-0 w-full h-full bg-black opacity-25 rounded-xl z-0')}></View>
          {/* Routine Percent */}
          {this.renderRoutinePercent(routine)}
          {/* Routine Info */}
          <TouchableOpacity style={tailwind('p-5 pb-3 ')} onPress={this.onToggleRoutine(routine)}>
            {/* Routine Title */}
            {this.renderRoutineTitle(routine)}
            {/* Routine Graphic */}
            {this.renderRoutineGraphic(routine)}
          </TouchableOpacity>
          {/* Routine Switch */}
          {this.renderRoutineSwitch(routine)}
          {/* Routine Affirmation */}
          <View style={tailwind('flex flex-row justify-center')}>{this.renderRoutineAffirmations(routine)}</View>
          {/* Show more */}
          <View style={tailwind('absolute bottom-0 w-full -mb-4')}>{/* Contianer */}</View>
        </View>

        {this.renderRoutineMenu(routine)}
      </View>
    )
  }

  renderRoutineTitle = routine => {
    let routineIsDisabled = !routine['phrases_length']

    let open = this.state.displayRoutineId == routine['id']

    return (
      <View style={tailwind('flex flex-row items-center mb-1')}>
        <View style={tailwind('flex flex-row flex-grow items-center pr-20')}>
          {!!routine.enabled && (
            <TouchableOpacity
              disabled={routineIsDisabled || this.loading}
              onPress={() => {
                this.props.navigation.navigate('PrePlayRoutineScreen', {
                  routineSelectedId: routine['id'],
                })
              }}
            >
              <View style={tailwind('-ml-2 mr-3 -mt-2 -mb-2 h-12 w-12 bg-white rounded-full flex justify-center items-center')}>
                <Icon type='FontAwesome' name='play' style={tailwind('ml-1 text-black text-2xl')} />
              </View>
            </TouchableOpacity>
          )}
          <View>
            {/*<Text style={tailwind('font-bold text-lg text-white')}>{routine['name'].length >= 25 ? routine['name'].slice(0, 25) + '..' : routine['name']}</Text>*/}
            <Text style={tailwind('font-bold text-lg text-white')}>{routine['name']}</Text>
          </View>
        </View>
        {this.state.displayRoutineId == routine.id && (
          <TouchableOpacity
            onPress={() => {
              this.setState({ enableRemovePhrase: !this.state.enableRemovePhrase })
            }}
            style={tailwind('flex flex-row items-center -mt-2 p-2 mr-0')}
          >
            {!this.state.enableRemovePhrase && <Icon type='FontAwesome' name={'pencil'} style={tailwind('text-white text-2xl')} />}
            {!!this.state.enableRemovePhrase && <Text style={tailwind('text-white text-green-500 text-lg capitalize')}>{global?.language?.ready}</Text>}
          </TouchableOpacity>
        )}

        <Icon type='FontAwesome' name={open ? 'chevron-up' : 'chevron-down'} style={tailwind('text-white -mt-2 text-xl')} />
      </View>
    )
  }

  renderRoutineGraphic = routine => {
    let open = this.state.displayRoutineId == routine['id']

    let data = routine.data_7_days || []
    data = [...data]
    // console.log({ routine })
    if (routine.data_today > 0) {
      data.push(routine.data_today)
    }

    if (open) {
      return
    }

    return (
      <View style={tailwind('')}>
        {!!routine.enabled && (
          <View style={tailwind('flex flex-row justify-end mb-1 pr-16')}>
            <View>
              <Text style={tailwind('text-sm font-bold text-white capitalize')}>
                {routine.data_today > 0 ? global?.language?.today : global?.language?.yesterday}
              </Text>
            </View>
          </View>
        )}
        {!!routine.enabled && (
          <View style={tailwind('w-full mb-3')}>
            <LineDotsChartAchievedLast7Days style={tailwind('w-full relative p-0 m-0')} data={data}></LineDotsChartAchievedLast7Days>
          </View>
        )}
        {/* Routine Legend */}
        <View style={tailwind('flex flex-row justify-between')}>
          <View>
            <Text style={tailwind('text-sm text-white opacity-50')}>
              {routine.enabled ? global?.language?.active_routine : global?.language?.deactive_routine}{' '}
              {routine.enabled ? routine.routine_active_days || 0 : routine.routine_inactive_days || 0} {global?.language?.active_routine_days}
            </Text>
          </View>
          {!!routine.enabled && (
            <View>
              <Text style={tailwind('text-sm text-white text-white opacity-50 capitalize')}>
                {global?.language?.streak}: {routine.streak || 0}
              </Text>
            </View>
          )}
        </View>
      </View>
    )
  }

  renderRoutineSwitch = routine => {
    let open = this.state.displayRoutineId == routine['id']

    if (!open) {
      return
    }

    return (
      <View style={tailwind('flex flex-row justify-start px-6  mt-2')}>
        <View style={tailwind('flex flex-row w-full items-center pb-6')}>
          <View>
            <Switch disabled={this.state.loading} value={routine.enabled} onValueChange={this.onRoutineEnabledSwitch(routine)} />
          </View>
          <View style={tailwind('ml-4')}>
            <Text style={tailwind('text-white text-base')}>
              {routine.enabled ? global?.language?.active_routine : global?.language?.deactive_routine}{' '}
              {routine.enabled ? routine.routine_active_days || 0 : routine.routine_inactive_days || 0} {global?.language?.active_routine_days}
            </Text>
          </View>
        </View>
      </View>
    )
  }

  renderRoutinePercent = routine => {
    let open = this.state.displayRoutineId == routine['id']

    if (open) {
      return
    }

    if (!routine.enabled) {
      return
    }

    return (
      <View style={tailwind('absolute top-0 right-0 -mr-2 h-full z-0')}>
        <TouchableOpacity style={tailwind('h-full')} onPress={this.onToggleRoutine(routine)}>
          {/* Container */}
          <View style={tailwind('flex flex-row h-full items-center')}>
            <View style={tailwind('flex flex-col relative rounded-lg py-1 px-4 justify-center items-center')}>
              {/* Shadow */}
              <View style={tailwind('absolute mt-1 ml-1 -mb-1 -mr-1 top-0 bottom-0 left-0 right-0 rounded-lg bg-black opacity-25')}></View>
              {/* BG */}
              <View style={tailwind('absolute top-0 bottom-0 left-0 right-0 rounded-lg bg-black')}></View>
              <Text style={tailwind('font-bold text-white')}>{routine.percent || 0}%</Text>
              <Text style={tailwind('text-sm text-white opacity-75')}>
                {routine.executions_days || 0}/{routine.routine_active_days || 0}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  renderRoutineMenu = routine => {
    let open = this.state.displayRoutineId == routine['id']
    let routine_id = routine['id']

    if (!open) {
      return
    }

    if (!routine.enabled) {
      return
    }

    return (
      <View style={tailwind('flex flex-row items-center justify-center mt-3 mb-4')}>
        <TouchableOpacity
          style={tailwind('mr-5')}
          onPress={() => {
            this.props.navigation.navigate('RoutineConfiguration', {
              routine_id: this.state['displayRoutineId'],
              rutina: this.props.routinesObjs[this.state.displayRoutineId],
              phrases: this.state.phrases,
            })
          }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
            <Icon type='FontAwesome' name={'bell'} style={tailwind('text-2xl text-white')} />
            <Icon
              type='FontAwesome'
              name={'plus-circle'}
              style={[
                tailwind('text-lg text-white absolute top-0 right-0 -mr-1 -mt-1'),
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
          </View>
        </TouchableOpacity>
        <ModalSelector
          data={[
            { key: 0, value: 'create', label: global?.language?.label_create_affirmation },
            { key: 1, value: 'add', label: global?.language?.label_categories },
          ]}
          onChange={option => {
            if (option['value'] === 'create')
              this.props.navigation.navigate('Affirmations', {
                routineId: this['state']['displayRoutineId'],
                phrases: this.state['phrases'],
                new: true,
              })
            else if (option['value'] === 'add' && routine_id) {
              this.props.navigation.navigate('AffirmationCategoryListScreen', {
                routineId: routine_id,
              })

              let phrases = this.routinesPhrasesByRoutineId(routine_id)

              if (!!this.context) {
                this.context.resetPhrases()
                this.context.storeNumberPhrases(phrases.length)
                this.context.storeRoutineSelected(routine_id)
                this.context.storeRoutinePhrases(phrases)
              }
            }
          }}
        >
          <View style={tailwind('border rounded-md border-white')}>
            <View style={tailwind('py-2 px-3')}>
              <Text style={tailwind('text-lg text-white font-bold')}>{global?.language?.label_add_affirmation}</Text>
            </View>
          </View>
        </ModalSelector>

        <TouchableOpacity style={tailwind('ml-5')}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
            <Icon type='FontAwesome' name={'picture-o'} style={tailwind('text-2xl text-white')} />
            <Icon
              type='FontAwesome'
              name={'plus-circle'}
              style={[
                tailwind('text-lg text-white absolute top-0 right-0 -mr-1 -mt-1'),
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
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const AffirmationList = props => {
  return (
    <DraggableFlatlist
      scrollingContainerOffset={props.scrollOffset}
      data={props.phrases}
      keyExtractor={item => `draggable-item-${item.id}`}
      /*  onMoveBegin={()=> props.handleScroll} */
      scrollPercent={5}
      onScrollOffsetChange={data => {}}
      renderItem={({ item, index, move, moveEnd }) => {
        //console.log('RENDER-AFIRMATION ===> ', { index, phrases: props.phrases, item, index })
        return (
          <AffirmationItem
            showModal={item => props.showModal(item)}
            renderModal={item => props.renderModal(item)}
            enableRemove={props.enableRemove}
            removePhrase={item => props.removePhrase(item)}
            moveEnd={moveEnd}
            move={() => {
              props.disableScroll()
              move()
            }}
            phrase={item}
            editPhrase={phrase => props.editPhrase(phrase)}
            isScrolling={props.isScrolling}
          />
        )
      }}
      onMoveEnd={data => {
        /*  props.handleScroll() */
        props.enableScroll()
        props.handleMove(data)
      }}
    />
  )
}

const AffirmationItem = props => {
  return (
    <TouchableOpacity style={tailwind('flex flex-row w-full border-t border-white')} onLongPress={props.move}>
      <View style={tailwind('flex flex-row items-center justify-center py-4')}>
        {props.enableRemove ? (
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', width: '10%', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => props.removePhrase(props.phrase)}>
              <Icon type='FontAwesome' name={'trash'} style={tailwind('text-white text-2xl mr-3')} />
            </TouchableOpacity>
          </View>
        ) : (
          <View />
        )}
        <ImageBackground
          source={BgAffirmation}
          style={tailwind('w-10 h-10 relative flex justify-center items-center ' + (props.enableRemove ? 'mr-4' : 'mr-8') + ' rounded-full')}
        >
          {!props.enableRemove && (
            <View style={tailwind('absolute top-0 right-0')}>
              {props.phrase.is_audio_app ? (
                <TouchableOpacity onPress={() => props.editPhrase(props.phrase)}>
                  <Image source={MicrophoneImage} style={tailwind('w-5 h-5 -mt-1 -mr-2')} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => props.editPhrase(props.phrase)}>
                  <Image
                    source={BtnRecordImage}
                    style={[
                      tailwind('w-6 h-6 -mt-1 -mr-2'),
                      {
                        opacity: props.phrase.audio_affirmative == 'tmp' || props.phrase.audio_gratitude == 'tmp' ? 0.4 : 1,
                      },
                    ]}
                  />
                </TouchableOpacity>
              )}
            </View>
          )}
        </ImageBackground>
        <TouchableOpacity
          style={{ width: '70%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}
          onPress={() => props.showModal(props.phrase)}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
            <Text style={tailwind('text-white text-left text-base')}>{props.phrase.text_affirmative}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )
}
const mapStateToProps = state => ({
  imei: datasetSelector(state, 'imei'),
  routines: datasetSelector(state, 'routines', { list_format: true }) || [],
  routines_phrases: datasetSelector(state, 'routines_phrases', { list_format: true }) || [],
  routinesObjs: datasetSelector(state, 'routines'),
  timezone: datasetSelector(state, 'timezone'),
  app_configuration: datasetSelector(state, 'app_configuration'),
  last_weeks_activity: datasetSelector(state, 'last_weeks_activity'),
})
const mapDispatchToProps = dispatch => ({
  setRoutines: data => dispatch(setDatasetListToObjectReducer(data, 'routines')),
  setRoutinesPhrases: data => dispatch(setDatasetListToObjectReducer(data, 'routines_phrases')),
  setRoutinePhrase: (data, id) => dispatch(setDatasetToReducer(data, 'routines_phrases', { key: id })),
})

export default connect(mapStateToProps, mapDispatchToProps)(MeditationHomeScreen)
