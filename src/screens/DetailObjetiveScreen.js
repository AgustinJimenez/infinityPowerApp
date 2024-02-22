import React, { Fragment } from 'react'
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView, Platform, Clipboard } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import * as fn from 'helpers/scripts'
import { globalStyles } from '../helpers/styles'
import { Toast } from 'native-base'
import moment from 'moment'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import Share from 'react-native-share'
import { Appearance } from 'react-native-appearance'
import request from '../helpers/request'
import DayPicker, { weekDays } from '../components/DayPicker'
import capitalizeWords from '../helpers/capitalizeWords'
import BottomNavigationBar from '../components/BottomNavigationBar'

Appearance.getColorScheme()

class DetailObjetiveScreen extends React.Component {
  static navigationOptions = {
    //To hide the NavigationBar from current Screen
    header: null,
  }
  constructor() {
    super()
    this.state = {
      reminderFieldModalVisible: false,
      editable: false,
      note: '',
      description: '',
      expand2: false,
      ach: true,
      evaluations: null,
      notes: [],
      canEvaluate: false,
      includeNote: false,
      showPicker: false,
      weekArray: [],
      colorScheme: Appearance.getColorScheme(),
      submitValue: {
        id: null,
        objective: '',
        evaluation_monday: false,
        evaluation_tuesday: false,
        evaluation_wednesday: false,
        evaluation_thursday: false,
        evaluation_friday: false,
        evaluation_saturday: false,
        evaluation_sunday: false,
        share_results: false,
        include_note: false,
        reminderDateTime: moment(),
      },
    }
    this.index = 0
    this.user = null
    this.token = null
    this.tokenType = null
  }
  componentDidMount() {
    const objective = this.props.navigation.getParam('objective')
    const onlyNotes = this.props.navigation.getParam('onlyNotes')
    const editable = this.props.navigation.getParam('editable')

    this.loadInviteCode(objective)

    let days = { ...weekDays } //spread to avoid unexpected persistence

    ;(days.Monday = objective.evaluation_monday),
      (days.Tuesday = objective.evaluation_tuesday),
      (days.Wednesday = objective.evaluation_wednesday),
      (days.Thursday = objective.evaluation_thursday)
    days.Friday = objective.evaluation_friday
    days.Saturday = objective.evaluation_saturday
    days.Sunday = objective.evaluation_sunday

    this.setState({
      editable: editable,
      description: objective.description,
      deadline: objective.deadline ? objective.deadline.split(' ')[0] : null,
      trigger: objective.trigger,
      auto_evaluation: objective.auto_evaluation,
      submitValue: {
        id: objective.id,
        objectiveName: objective.objective,
        days,
        evaluation_monday: objective.evaluation_monday,
        evaluation_tuesday: objective.evaluation_tuesday,
        evaluation_wednesday: objective.evaluation_wednesday,
        evaluation_thursday: objective.evaluation_thursday,
        evaluation_friday: objective.evaluation_friday,
        evaluation_saturday: objective.evaluation_saturday,
        evaluation_sunday: objective.evaluation_sunday,
        reminderDateTime: moment().set({ hour: objective.reminder_time.split(':')[0], minutes: objective.reminder_time.split(':')[1] }),
      },
    })
  }

  loadInviteCode = async objective => {
    let user = await AsyncStorage.getItem('user')
    user = JSON.parse(user)
    let formdata = new FormData()
    formdata.append('lang', global.lang)
    formdata.append('imei', user?.imei)
    formdata.append('objective_id', objective.id)
    formdata.append('timezone', user.timezone)
    await this.setState({ loading: true })
    let { data } = await request({
      url: 'actions/get_invite_code',
      method: 'POST',
      data: formdata,
      //debug: true,
    })
    this.setState({ loading: false, inviteCode: data.code })
  }

  share = () => {
    const title = `${global?.language?.action_share_title}`
    const message = `${global?.language?.action_share_message}/${this.state.inviteCode}`
    const url = `infinitepower://code/${this.state.inviteCode}`
    const options = Platform.select({
      ios: {
        activityItemSources: [
          {
            placeholderItem: { type: 'text', content: message },
            item: {
              default: { type: 'text', content: message },
            },
            linkMetadata: {
              // For showing app icon on share preview.
              title: title,
            },
          },
        ],
      },
      default: {
        title: `${global?.language?.action_share_title}`,
        message: `${global?.language?.action_share_message}/${this.state.inviteCode}`,
        url: url,
      },
    })
    Share.open(options)
      .then(res => {
        /* //console.log(res) */
      })
      .then(err => {
        /* err && //console.error(err) */
      })
  }

  onDateSelected = date => {
    //console.log('La fecha', date);
    if (date !== undefined) {
      var d = moment(date, 'YYYY-MM-DD')
      this.setState({
        deadline: d.format('YYYY-MM-DD'),
        showPicker: false,
      })
    }
  }

  copyToClipboard = text => {
    Clipboard.setString(text)
    Toast.show({
      text: global?.language?.copy_code,
      duration: 2000,
      type: 'success',
    })
  }

  toUTC = date => {
    var newDate = new Date()
    newDate.setTime(date.getTime() + date.getTimezoneOffset() * 60 * 1000)
    return newDate
  }
  renderReminderTimeField = () => {
    return (
      <View
        style={{
          width: '90%',
          marginTop: 20,
          paddingBottom: 20,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            color: global.txtWhiteColor,
            fontWeight: '500',
            width: '100%',
            textAlign: 'center',
          }}
        >
          {global?.language?.you_will_receive_a_reminder_at}
        </Text>
        <TouchableOpacity style={{ width: '100%', alignItems: 'center' }} onPress={() => this.setState({ reminderFieldModalVisible: true })}>
          <View
            style={{
              width: '90%',
              marginVertical: 20,
              paddingVertical: 15,
              color: 'white',
              borderColor: 'white',
              borderRadius: 10,
              borderWidth: 0.5,
            }}
          >
            <Text
              style={{
                width: '100%',
                fontStyle: 'italic',
                textAlign: 'center',
                color: 'white',
              }}
            >
              {this.state.submitValue?.reminderDateTime?.format('HH:mm')}
            </Text>
          </View>
        </TouchableOpacity>
        {!!this.state.editable && (
          <DateTimePickerModal
            isVisible={this.state.reminderFieldModalVisible}
            date={this.state.submitValue.reminderDateTime.toDate()}
            mode='time'
            is24Hour
            onConfirm={date => {
              let reminderDateTime = moment(date)

              this.setState(state => {
                state['submitValue']['reminderDateTime'] = reminderDateTime
                state['reminderFieldModalVisible'] = false
                return state
              })
            }}
            onCancel={() => this.setState({ reminderFieldModalVisible: false })}
            //isDarkModeEnabled={Platform.OS === 'android' ? true : this.state.colorScheme === 'dark'}
            cancelTextIOS={global?.language?.cancel}
            confirmTextIOS={capitalizeWords(global?.language?.confirm)}
            headerTextIOS={capitalizeWords(global?.language?.select_time)}
          />
        )}
      </View>
    )
  }
  getSelectedDaysArray = () => Object.keys(this.state['submitValue']['days']).filter(day_name => Boolean(this.state['submitValue']['days'][day_name]))
  editedObjectiveHandler = async () => {
    let newObj = {}
    //console.log('editar');
    this.setState({ loading: true })
    let submitObjective = {
      id: this.state.submitValue.id,
      reminder_time: this.state.submitValue.reminderDateTime.format('HH:mm'),
      objectiveName: this.state.submitValue.objectiveName ? this.state.submitValue.objectiveName : '',
      description: this.state.description ? this.state.description : '',
      trigger: this.state.trigger ? this.state.trigger : '',
    }

    //console.log('enviar', submitObjective);

    let imei = await AsyncStorage.getItem('user')
    imei = JSON.parse(imei)
    newObj['lang'] = global.lang
    newObj['imei'] = imei.imei
    newObj['timezone'] = imei.timezone
    let formdata = new FormData()
    formdata.append('lang', newObj['lang'])
    formdata.append('imei', newObj['imei'])
    formdata.append('timezone', newObj['timezone'])
    formdata.append('objective_id', submitObjective.id)
    formdata.append('description', submitObjective.description)
    formdata.append('trigger', submitObjective.trigger)
    formdata.append('objective', submitObjective.objectiveName)
    formdata.append('reminder_time', submitObjective.reminder_time)
    formdata.append('weeks', JSON.stringify(this.getSelectedDaysArray()))
    formdata.append('deadline', this.state.deadline)
    formdata.append('auto_evaluation', this.state.auto_evaluation)

    let { error } = await request({
      url: 'actions/update_objective',
      method: 'POST',
      data: formdata,
      debug: request,
    })
    await this.setState({ loading: false })

    if (error) {
      Toast.show({
        text: global?.language?.edited_error,
        duration: 2000,
        type: 'danger',
      })
      return
    }
    this.props.navigation.goBack()
    Toast.show({
      text: global?.language?.edited_success,
      duration: 2000,
      type: 'success',
    })
  }
  render() {
    return (
      <View style={[globalStyles.informationLayout, { width: '100%', height: '100%' }]}>
        <SafeAreaView
          style={{
            flex: 1,
            alignItems: 'stretch',
            justifyContent: 'flex-start',
          }}
        >
          <ScrollView>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                marginTop: 20,
                paddingBottom: 60,
              }}
            >
              <View style={{ width: '90%' }}>
                <View
                  style={{
                    width: '100%',
                    borderRadius: 12,

                    alignItems: 'center',
                    marginBottom: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      color: global.txtWhiteColor,
                      fontWeight: '500',
                      width: '100%',
                      textAlign: 'center',
                    }}
                  >
                    {global?.language?.action_objective}
                  </Text>
                  {this.state.editable ? (
                    <TextInput
                      returnKeyType='done'
                      editable={this.state.editable}
                      value={this.state.submitValue.objectiveName}
                      onChangeText={text => {
                        const submitValue = {
                          ...this.state.submitValue,
                          objectiveName: text,
                        }
                        this.setState({ submitValue: submitValue })
                      }}
                      style={{
                        width: '90%',
                        marginVertical: 20,
                        color: 'white',
                        borderColor: 'white',
                        borderRadius: 10,
                        borderWidth: 0.5,
                        padding: 10,
                      }}
                    />
                  ) : (
                    <Text
                      style={{
                        fontSize: 16,
                        marginTop: 15,
                        color: global.txtWhiteColor,
                        fontWeight: '300',
                        width: '90%',
                        marginVertical: 20,
                        textAlign: 'center',
                      }}
                    >
                      {this.state.submitValue.objectiveName}
                    </Text>
                  )}
                  <View
                    style={{
                      backgroundColor: global.mainColor,
                      width: '90%',
                      height: 1,
                      marginTop: 5,
                    }}
                  />
                  <Text
                    style={{
                      marginTop: 15,
                      fontSize: 18,
                      color: global.txtWhiteColor,
                      fontWeight: '500',
                      width: '100%',
                      textAlign: 'center',
                    }}
                  >
                    {global?.language?.action_description}
                  </Text>
                  {/*  {this.state.description !== null && ( */}
                  <View
                    style={{
                      width: '90%',
                      marginVertical: 20,
                      borderBottomColor: global.mainColor,
                      borderBottomWidth: 1,
                      paddingBottom: 20,
                    }}
                  >
                    {this.state.editable ? (
                      <TextInput
                        returnKeyType='done'
                        editable={this.state.editable}
                        style={{
                          color: 'white',
                          borderColor: 'white',
                          borderRadius: 10,
                          borderWidth: 0.5,
                          padding: 10,
                        }}
                        value={this.state.description}
                        onChangeText={text => this.setState({ description: text })}
                      />
                    ) : (
                      <Text
                        style={{
                          fontSize: 16,
                          color: global.txtWhiteColor,
                          fontWeight: '300',
                          marginVertical: 10,
                          textAlign: 'center',
                        }}
                      >
                        {this.state.description}
                      </Text>
                    )}
                  </View>

                  <Text
                    style={{
                      fontSize: 18,
                      color: global.txtWhiteColor,
                      fontWeight: '500',
                      width: '100%',
                      textAlign: 'center',
                    }}
                  >
                    {global?.language?.action_trigger}
                  </Text>
                  {/*  {this.state.trigger !== null && ( */}
                  <View
                    style={{
                      width: '90%',
                      marginTop: 20,
                      borderBottomColor: global.mainColor,
                      borderBottomWidth: 1,
                      paddingBottom: 20,
                    }}
                  >
                    {this.state.editable ? (
                      <TextInput
                        returnKeyType='done'
                        editable={this.state.editable}
                        style={{
                          color: 'white',
                          borderColor: 'white',
                          borderRadius: 10,
                          borderWidth: 0.5,
                          padding: 10,
                        }}
                        value={this.state.trigger}
                        onChangeText={text => this.setState({ trigger: text })}
                        edtiable={this.state.editable}
                      />
                    ) : (
                      <Text
                        style={{
                          fontSize: 16,
                          color: global.txtWhiteColor,
                          fontWeight: '300',
                          marginVertical: 10,
                          textAlign: 'center',
                        }}
                      >
                        {this.state.trigger}
                      </Text>
                    )}
                  </View>

                  {!this.state.editable ? (
                    <View
                      style={{
                        width: '90%',
                        marginTop: 20,
                        borderBottomColor: global.mainColor,
                        borderBottomWidth: 1,
                        paddingBottom: 20,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 18,
                          color: global.txtWhiteColor,
                          fontWeight: '500',
                          width: '100%',
                          textAlign: 'center',
                        }}
                      >
                        {global?.language?.action_deadline}
                      </Text>
                      <View
                        style={{
                          width: '90%',
                          borderBottomColor: global.mainColor,
                          borderBottomWidth: 1,
                          paddingBottom: 10,
                        }}
                      >
                        <Text
                          style={{
                            fontStyle: 'italic',
                            textAlign: 'center',
                            color: 'white',
                            paddingVertical: 15,
                          }}
                        >
                          {this.state.deadline}
                        </Text>
                      </View>
                    </View>
                  ) : (
                    <View
                      style={{
                        width: '90%',
                        marginTop: 20,
                        borderBottomColor: global.mainColor,
                        borderBottomWidth: 1,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 18,
                          color: global.txtWhiteColor,
                          fontWeight: '500',
                          width: '100%',
                          textAlign: 'center',
                        }}
                      >
                        {global?.language?.action_deadline}
                      </Text>
                      <TouchableOpacity style={{ width: '100%', alignItems: 'center' }} onPress={() => this.setState({ showPicker: true })}>
                        <View
                          style={{
                            width: '90%',

                            marginVertical: 20,
                            paddingVertical: 15,

                            color: 'white',
                            borderColor: 'white',
                            borderRadius: 10,
                            borderWidth: 0.5,
                          }}
                        >
                          <Text
                            style={{
                              width: '100%',
                              fontStyle: 'italic',
                              textAlign: 'center',
                              color: 'white',
                            }}
                          >
                            {this.state.deadline}
                          </Text>
                        </View>
                      </TouchableOpacity>
                      <DateTimePickerModal
                        isVisible={this.state.showPicker}
                        value={this.state.deadline}
                        date={this.state.deadline ? this.toUTC(new Date(this.state.deadline)) : new Date()}
                        mode='date'
                        onConfirm={date => this.onDateSelected(date)}
                        onCancel={() => this.setState({ showPicker: false })}
                        isDarkModeEnabled={Platform.OS === 'android' ? true : this.state.colorScheme === 'dark'}
                        cancelTextIOS='Cancelar'
                        confirmTextIOS='Confirmar'
                        headerTextIOS='Escoja una fecha'
                      />
                    </View>
                  )}

                  {/*   {this.state.deadline !== null && ( */}
                  <DayPicker
                    label={global?.language?.action_evaluation_days}
                    days={this['state']['submitValue']['days']}
                    onSelectDay={(day_name, value) =>
                      this.setState(state => {
                        state['submitValue']['days'][day_name] = value
                        return state
                      })
                    }
                  />
                  <View
                    style={{
                      width: '90%',
                      borderBottomColor: global.mainColor,
                      borderBottomWidth: 1,
                      paddingBottom: 20,
                    }}
                  />
                  {this.renderReminderTimeField()}

                  <View style={{ marginTop: 10, width: '100%' }}>
                    <Text
                      style={{
                        fontSize: 18,
                        color: global.txtWhiteColor,
                        fontWeight: '500',
                        width: '100%',
                        textAlign: 'center',
                        marginTop: 40,
                        marginBottom: 10,
                      }}
                    >
                      {global?.language?.label_friend_code}
                    </Text>
                    <Text
                      style={{
                        marginTop: 10,
                        textAlign: 'center',
                        color: 'white',
                        fontSize: 24,
                        fontWeight: 'bold',
                      }}
                      onPress={() => this.copyToClipboard(this.state.inviteCode)}
                    >
                      {this.state.inviteCode}
                    </Text>
                    <TouchableOpacity
                      onPress={() => this.share()}
                      style={{
                        width: '27%',
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        height: 35,
                        backgroundColor: global.mainColor,
                        marginTop: 20,
                      }}
                    >
                      <Text style={{ color: 'white', fontSize: 18 }}>{global?.language?.label_share}</Text>
                    </TouchableOpacity>
                  </View>

                  {this.state.editable && (
                    <View
                      style={{
                        width: '100%',
                        alignItems: 'center',
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => this.editedObjectiveHandler()}
                        style={{
                          width: '27%',
                          borderRadius: 10,
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: 35,
                          backgroundColor: global.mainColor,
                          marginTop: 20,
                          marginBottom: 60,
                        }}
                      >
                        <Text style={{ color: 'white', fontSize: 18 }}>{global?.language?.label_save}</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
            </View>
          </ScrollView>
          <BottomNavigationBar hasPlay={this.state.hasPlay} hasBack invisiblePlayButton />
        </SafeAreaView>
      </View>
    )
  }
}

export default DetailObjetiveScreen
