import React from 'react'
import { View, Dimensions, ActivityIndicator, Text, TextInput, TouchableOpacity, Switch, SafeAreaView, Keyboard } from 'react-native'
import { Button, Icon } from 'native-base'
import * as fn from 'helpers/scripts'
import { globalStyles } from '../helpers/styles'
const { width } = Dimensions.get('window')
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import moment from 'moment'
import AsyncStorage from '@react-native-community/async-storage'
import request from '../helpers/request'
import BottomNavigationBar from '../components/BottomNavigationBar'
import Share from 'react-native-share'
import { Toast } from 'native-base'
import DayPicker, { weekDays } from '../components/DayPicker'
import { NavigationActions, StackActions } from 'react-navigation'
import capitalizeWords from '../helpers/capitalizeWords'
//import JSONTree from 'react-native-json-tree'

class CreateObjectiveScreen extends React.Component {
  static navigationOptions = {
    //To hide the NavigationBar from current Screen
    header: null,
  }
  constructor() {
    super()
    this.state = {
      objectiveName: '',
      description: '',
      objectiveError: false,
      dateError: false,
      descriptionError: false,
      trigger: '',
      dateError: false,
      habitId: null,
      deadline_date_text: null,
      auto_evaluation: false,
      share_results: false,
      inviteCode: '',
      lang: global.lang,
      imei: null,
      timezone: null,
      loading: false,
      daysPickerError: false,
      inviteCodeError: false,
      reminderDateTime: moment().set({ hour: 8, minutes: 0 }),
      reminderFieldModalVisible: false,
      selectedDays: { ...weekDays }, //spread to avoid unexpected persistence
    }

    this.index = 0
    this.user = null
    this.token = null
    this.tokenType = null
  }
  async UNSAFE_componentWillMount() {
    var newObj = {}
    let imei = await AsyncStorage.getItem('user')
    imei = JSON.parse(imei)
    await this.setState(state => {
      state['lang'] = global['lang']
      state['imei'] = imei['imei']
      state['timezone'] = imei['timezone']

      return state
    })
    this.fetchInviteCode()
  }

  fetchInviteCode = async () => {
    if (!!this.state.inviteCode) return

    let imei = await AsyncStorage.getItem('user')
    imei = JSON.parse(imei)
    let formdata = new FormData()
    formdata.append('lang', global['lang'])
    formdata.append('imei', imei['imei'])
    formdata.append('timezone', imei['timezone'])
    let { data, error } = await request({
      url: 'actions/get_invite_code',
      method: 'POST',
      data: formdata,
      show_message: true,
      //debug: true,
    })

    if (!error && !!data && !!data['code']) this.setState({ loading: false, inviteCodeError: false, inviteCode: data['code'] })
  }

  share = async () => {
    if (!this.state.inviteCode) return
    if (!this.state['insertedObjective'])
      await this.saveOrUpdateObjective({
        goBack: false,
        showToast: false,
      })

    const title = `${global?.language?.action_share_title}`
    const content = `${global?.language?.action_share_message}/${this.state.inviteCode}`
    const url = `infinitepower://code/${this.state.inviteCode}`
    const options = Platform.select({
      ios: {
        activityItemSources: [
          {
            placeholderItem: { type: 'text', content },
            item: {
              default: { type: 'text', content },
            },
            linkMetadata: {
              // For showing app icon on share preview.
              title,
            },
          },
        ],
      },
      default: {
        title: `${global?.language?.action_share_title}`,
        message: `${global?.language?.action_share_message}/${this.state.inviteCode}`,
        url,
      },
    })
    await Share.open(options)
    //.then((res) => console.log(res))
    //.then((err) => err && console.error(err));
    this.scrollView.scrollToEnd()
  }
  componentDidMount() {
    let habit = this.props.navigation.getParam('habit')
    //console.log('componentDidMount ===> ', { habit })
    if (habit) {
      this.setState({
        objectiveName: habit['objectiveName'],
        description: habit['description'],
        trigger: habit['trigger'],
        habitId: habit['habitId'], //THIS COMES FROM HABIT VIEW
      })
    }
  }
  getSelectedDaysArray = () => Object.keys(this.state['selectedDays']).filter(day_name => Boolean(this.state['selectedDays'][day_name]))
  getFormFieldsData = async () => {
    let imei = await AsyncStorage.getItem('user')
    imei = JSON.parse(imei)
    let form_fields_data = {
      lang: global['lang'],
      imei: imei['imei'],
      timezone: imei['timezone'],
      objective: this.state['objectiveName'],
      description: this.state['description'],
      trigger: this.state['trigger'],
      habit_id: this.state['habitId'] || null,
      code: this.state['inviteCode'],
      auto_evaluation: this.state['auto_evaluation'],
      share_results: this.state['share_results'],
      objective_id: this.state['insertedObjective'] || null,
      weeks: JSON.stringify(this.getSelectedDaysArray()),
      deadline: this.state['deadline_date_text'],
      reminder_time: this.state.reminderDateTime.format('HH:mm'),
    }
    return form_fields_data
  }

  formIsValid = async () => {
    let daysPickeds = Object.keys(this.state['selectedDays']).filter(day_name => this.state['selectedDays'][day_name]).length

    //console.log('HERE ===> ', { daysPickeds, daysPickerIsZero })
    if (this.state['objectiveName'] == '' || !this.state['objectiveName']) {
      await this.setState({ objectiveError: true })
      this.scrollView.scrollToPosition(0, 100)
      return false
    } else if (!daysPickeds) {
      await this.setState({ daysPickerError: true })
      this.scrollView.scrollToPosition(0, 200)
      return false
    } else if (this.state['deadline_date_text'] == '' || !this.state['deadline_date_text']) {
      this.scrollView.scrollToPosition(0, 600)
      await this.setState({ dateError: true })
      return false
    } else if (!this.state['inviteCode']) {
      this.scrollView.scrollToPosition(0, 600)
      //await this.setState({ inviteCodeError: true })
      return false
    }
    //console.log('HERE ===> ', this.state['deadline_date_text']);

    return true
  }

  saveOrUpdateObjective = async ({ goBack = true, showToast = true } = {}) => {
    await this.setState({ loading: true })
    let formIsValid = await this.formIsValid()
    if (!formIsValid) return this.setState({ loading: false })

    let data = await this.getFormFieldsData()
    let response = null
    if (!data['objective_id']) {
      // objective is not created yet
      response = await request({
        url: 'actions/create_objective',
        method: 'POST',
        data,
        show_message: true,
        //debug: true,
      })

      if (!response['error'])
        await this.setState({
          insertedObjective: response.data['inserted_objective_id'],
        })
    } else
      response = await request({
        url: 'actions/update_objective',
        method: 'POST',
        data,
        //debug: true,
      })

    if (!response['error'] && showToast)
      await Toast.show({
        text: global?.['language']?.['save_objective_success'],
        duration: 2000,
        type: 'success',
      })
    else if (response['error'] && showToast)
      await Toast.show({
        text: global?.['language']?.['save_objective_error'],
        duration: 2000,
        type: 'danger',
      })

    await this.setState({ loading: false })

    if (goBack && !response['error']) this.resetNavigationToHomeAndActionIndex()
  }

  resetNavigationToHomeAndActionIndex = () => {
    let resetAction = StackActions.reset({
      index: 1,
      actions: [NavigationActions.navigate({ routeName: 'Main' }), NavigationActions.navigate({ routeName: 'HabitsHome' })],
    })
    this.props.navigation.dispatch(resetAction)
  }

  renderHeader = () => {
    return (
      <View
        style={{
          width: '100%',
          height: width / 5,
          backgroundColor: 'black',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            fontSize: 22,
            color: '#fff',
            textAlign: 'center',
            fontWeight: '600',
          }}
        >
          {capitalizeWords(global?.language?.habit)}
        </Text>
      </View>
    )
  }
  onDateSelected = deadline_date => {
    if (deadline_date !== undefined) {
      var d = moment(deadline_date, 'YYYY-MM-DD')
      this.setState({
        deadline_date_text: d.format('YYYY-MM-DD'),
        deadline_date,
        showPicker: false,
      })
    }
  }
  renderObjectiveField = () => {
    return (
      <>
        <Text style={globalStyles.mainText}>{global?.['language']?.['label_objective']}</Text>
        <TextInput
          keyboardType='default'
          returnKeyType='done'
          blurOnSubmit
          multiline
          onSubmitEditing={() => {
            Keyboard.dismiss()
          }}
          style={{
            paddingHorizontal: 10,
            paddingVertical: 30,

            fontSize: 16,
            borderColor: this.state.objectiveError ? 'red' : 'gray',
            color: '#fff',
            borderWidth: 1,
            width: '100%',
            marginTop: 5,
            borderRadius: 10,
            //height: width / 4,
            textAlignVertical: 'top',
          }}
          onChangeText={objectiveName =>
            this.setState({
              objectiveName,
              objectiveError: false,
            })
          }
          onFocus={() => this.setState({ objectiveError: false })}
          value={this.state['objectiveName']}
          placeholder={global?.language?.placeholder_objective}
          placeholderTextColor='grey'
        />
        {this.state.objectiveError ? <Text style={{ marginTop: 5, color: 'red' }}>*{global?.['language']?.['required']}</Text> : null}
      </>
    )
  }
  renderDescriptionField = () => {
    return (
      <>
        <Text style={[globalStyles.mainText, { marginTop: 30 }]}>{global?.language?.action_description}</Text>
        <TextInput
          returnKeyType='done'
          allowFontScaling
          keyboardType='default'
          blurOnSubmit
          multiline
          onSubmitEditing={() => {
            Keyboard.dismiss()
          }}
          style={{
            paddingBottom: 20,
            paddingHorizontal: 10,
            paddingVertical: 30,
            fontSize: 16,
            borderColor: this.state.descriptionError ? 'red' : 'gray',
            color: '#fff',
            borderWidth: 1,
            width: '100%',
            marginTop: 5,
            borderRadius: 10,
            textAlignVertical: 'top',
          }}
          onChangeText={description =>
            this.setState({
              description,
              descriptionError: false,
            })
          }
          value={this.state.description}
          placeholder={global?.['language']?.['placeholder_description']}
          placeholderTextColor={'grey'}
        />
        {this.state.descriptionError ? <Text style={{ marginTop: 5, color: 'red' }}>*{global?.['language']?.['required']}</Text> : null}
      </>
    )
  }
  renderTriggerField = () => {
    return (
      <>
        <Text style={[globalStyles.mainText, { marginTop: 30 }]}>{global?.language?.action_trigger}</Text>
        <TextInput
          keyboardType='default'
          returnKeyType='done'
          blurOnSubmit
          multiline
          onSubmitEditing={() => {
            Keyboard.dismiss()
          }}
          style={{
            fontSize: 16,
            paddingHorizontal: 10,
            paddingVertical: 30,
            borderColor: 'gray',
            color: '#fff',
            borderWidth: 1,
            width: '100%',
            marginTop: 5,
            borderRadius: 10,
            textAlignVertical: 'top',
          }}
          onChangeText={trigger => this.setState({ trigger })}
          value={this.state.trigger}
          placeholder={global?.language?.placeholder_trigger}
          placeholderTextColor='grey'
        />
      </>
    )
  }
  renderDeadlineField = () => (
    <>
      <Text style={[globalStyles.subText, { marginTop: 50 }]}>{global?.language?.deadline_subtitle}</Text>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'space-around',
          width: '100%',
          borderWidth: 1,
          borderColor: this.state.dateError ? 'red' : 'grey',
          marginTop: 10,
          paddingVertical: 10,
          borderRadius: 10,
          flexDirection: 'row',
        }}
      >
        <Text style={[globalStyles.mainText, { width: '70%', marginLeft: 15 }]}>{global?.language?.label_deadline}</Text>
        <TouchableOpacity
          style={{
            borderColor: 'grey',
            borderWidth: 1,
            paddingVertical: 5,
            paddingHorizontal: 10,
            marginRight: 15,
            borderRadius: 5,
          }}
          onPress={() => {
            this.setState({ showPicker: true, dateError: false })
          }}
        >
          <Text style={{ textAlign: 'right', color: 'white' }}>{this.state['deadline_date_text'] || global?.['language']?.['no_date']}</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          minimumDate={new Date()}
          isVisible={this.state['showPicker']}
          value={this.state['deadline_date']}
          mode='date'
          onConfirm={date => this.onDateSelected(date)}
          onCancel={() => this.setState({ showPicker: false })}
          cancelTextIOS='Cancelar'
          confirmTextIOS='Confirmar'
          headerTextIOS='Escoja una fecha'
        />
      </View>
      {this.state['dateError'] && <Text style={{ marginTop: 5, color: 'red' }}>*{global?.['language']?.['required']}</Text>}
    </>
  )
  renderAutoEvaluateField = () => (
    <>
      <View style={{ width: '90%', marginTop: 75 }}>
        <Text style={[globalStyles.subText, { textAlign: 'left' }]}>{global?.language?.tester_statement}</Text>
      </View>
      <View
        style={{
          alignItems: 'center',
          width: '100%',
          height: 35,
          backgroundColor: 'black',
          marginTop: 10,
          borderRadius: 10,
          flexDirection: 'row',
        }}
      >
        <Text style={[globalStyles.mainText, { textAlign: 'left', width: '80%', marginLeft: 15 }]}>{global?.language?.auto_evaluation}</Text>
        <Switch
          value={this.state['auto_evaluation']}
          style={{ height: 30 }}
          trackColor={{ true: global.mainColor, false: 'grey' }}
          onValueChange={auto_evaluation => this.setState({ auto_evaluation })}
        />
      </View>
    </>
  )
  copyToClipboard = text => {
    Clipboard.setString(text)
    Toast.show({
      text: 'Código copiado',
      duration: 2000,
      type: 'success',
    })
  }
  renderShareField = () => (
    //fetchInviteCode
    <>
      <Text style={[globalStyles.subText, { marginTop: 75 }]}>{global?.language?.title_share_statement}</Text>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            disabled={!this.state.inviteCode}
            onPress={this.share}
            style={{
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              padding: 5,
              backgroundColor: !!this.state.inviteCode ? global.mainColor : 'gray',
              marginTop: 20,
            }}
          >
            <Text style={{ color: 'white', fontSize: 18 }}>{global?.language?.label_share}</Text>
          </TouchableOpacity>
          {!this.state.inviteCode && (
            <Button transparent style={{ position: 'absolute', top: 0, right: 0 }} onPress={this.sharWarningWasPressed}>
              <Icon name='warning' style={{ color: 'red' }} />
            </Button>
          )}
        </View>
      </View>
    </>
  )
  sharWarningWasPressed = () => {
    this.fetchInviteCode()
  }
  renderShareResultsField = () => (
    <>
      <View style={{ width: '90%', marginTop: 75 }}>
        <Text style={[globalStyles.subText, { textAlign: 'left' }]}>{global?.language?.agree_share_results}</Text>
      </View>
      <View
        style={{
          alignItems: 'center',
          width: '100%',
          height: 35,
          backgroundColor: 'black',
          marginTop: 10,
          borderRadius: 10,
          flexDirection: 'row',
        }}
      >
        <Text style={[globalStyles.mainText, { textAlign: 'left', width: '80%', marginLeft: 15 }]}>{global?.language?.title_share_results}</Text>
        <Switch
          value={this.state['share_results']}
          style={{ height: 30 }}
          trackColor={{ true: global.mainColor, false: 'grey' }}
          onValueChange={share_results => this.setState({ share_results })}
        />
      </View>
    </>
  )

  renderDayPicker = () => {
    return (
      <>
        <DayPicker
          label={global?.language?.days_subtitle}
          days={this.state['selectedDays']}
          onSelectDay={(day_name, value) => {
            this.setState(state => {
              state['daysPickerError'] = false
              state['selectedDays'][day_name] = value
              return state
            })
          }}
        />
        <View style={{ paddingTop: 10 }}>
          {this.state.daysPickerError && <Text style={{ color: 'red' }}>*{global?.['language']?.['msg_err_fill_information']}</Text>}
        </View>
      </>
    )
  }
  renderReminderTimeField = () => (
    <>
      <Text style={[globalStyles.mainText, { marginTop: 30 }]}>{global?.language?.you_will_receive_a_reminder_at + ':'}</Text>

      <View style={{ flex: 4, paddingHorizontal: 15, paddingTop: 25 }}>
        <TouchableOpacity
          style={{
            borderColor: 'white',
            borderWidth: 1,
            marginTop: -10,
            paddingVertical: 15,
            borderRadius: 5,
          }}
          onPress={() => {
            this.setState({ reminderFieldModalVisible: true })
          }}
        >
          <Text style={{ textAlign: 'center', color: 'white' }}>{this.state.reminderDateTime.format('HH:mm')}</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={this.state.reminderFieldModalVisible}
          date={this.state.reminderDateTime.toDate()}
          mode='time'
          is24Hour
          onConfirm={date => {
            let reminderDateTime = moment(date)
            this.setState({ reminderDateTime, reminderFieldModalVisible: false })
          }}
          onCancel={() => this.setState({ reminderFieldModalVisible: false })}
          //isDarkModeEnabled={Platform.OS === 'android' ? true : this.state.colorScheme === 'dark'}
          cancelTextIOS={global?.language?.cancel}
          confirmTextIOS={capitalizeWords(global?.language?.confirm)}
          headerTextIOS={capitalizeWords(global?.language?.select_time)}
        />
      </View>
    </>
  )
  renderSaveButton = () => (
    <TouchableOpacity
      disabled={this.state.loading}
      onPress={this.saveOrUpdateObjective}
      style={{
        width: '27%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: 35,
        backgroundColor: !this.state.loading ? global.mainColor : 'gray',
        marginTop: 75,
        marginBottom: 60,
      }}
    >
      {this.state.loading ? <ActivityIndicator color='white' /> : <Text style={{ color: 'white', fontSize: 18 }}>{global?.['language']?.['label_save']}</Text>}
    </TouchableOpacity>
  )
  render() {
    return (
      <View style={[globalStyles.informationLayout, { width: '100%', height: '100%', marginBottom: 40 }]}>
        <SafeAreaView
          style={{
            flex: 1,
            alignItems: 'stretch',
            justifyContent: 'flex-start',
          }}
        >
          <KeyboardAwareScrollView
            ref={ref => {
              if (!!ref) this.scrollView = ref
            }}
            style={{
              marginBottom: 100,
            }}
            showsVerticalScrollIndicator
          >
            {this.renderHeader()}

            <View style={{ width: '100%', alignItems: 'center', marginTop: 30 }}>
              <View style={{ width: '90%' }}>
                {this.renderObjectiveField()}
                {this.renderDescriptionField()}
                {this.renderTriggerField()}
                {this.renderDayPicker()}
                {this.renderReminderTimeField()}
                {this.renderDeadlineField()}
                {this.renderAutoEvaluateField()}
                {this.renderShareField()}
                {this.renderShareResultsField()}
              </View>
              {this.renderSaveButton()}
            </View>
            {/* <JSONTree data={this.state} /> */}
          </KeyboardAwareScrollView>
          <BottomNavigationBar hasPlay={this.state.hasPlay} hasBack invisiblePlayButton />
        </SafeAreaView>
      </View>
    )
  }
}

export default CreateObjectiveScreen
