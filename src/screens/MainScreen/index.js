import React from 'react'
import { Text, View, TouchableOpacity, Image, ScrollView, RefreshControl, Linking, Platform, Dimensions } from 'react-native'
import { NavigationEvents } from 'react-navigation'
import * as fn from '../../helpers/scripts'
import Orientation from 'react-native-orientation-locker'
import AsyncStorage from '@react-native-community/async-storage'
import { scale, globalStyles } from '../../helpers/styles'
import NetInfo from '@react-native-community/netinfo'
import request from '../../helpers/request'
import { datasetSelector } from '../../redux/selectors'
import { setDatasetToReducer } from '../../redux/actions'
import { fetchUsersPendingQuestionsSagaAction, updateHomeDataSagaAction, updateHabitsHomeDataSagaAction } from '../../sagas/actions'
import { connect, useSelector } from 'react-redux'
import WeekDaysMarker from '../../components/WeekDaysMarker'
import PillarPercentage from './PillarPercentage'
import { NavigationActions, StackActions } from 'react-navigation'
import * as RNLocalize from 'react-native-localize'
import moment from 'moment'
import HomeBase from '../../components/HomeBase'
import { withTranslation, useTranslation } from 'react-i18next'
import info from '../../img/info_new.png'
import edit from '../../img/edit_new.png'
import user_prof from '../../img/user_no_border.png'
import prof_star from '../../img/prof_star.png'
import BeltProgressSection from './BeltProgressSection'

const height = Dimensions.get('window').height

class MainScreen extends React.Component {
  mainScroll = null
  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
      applang: 'es',
      monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      daysNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      beltColor: 'transparent',
      nextBeltColor: 'transparent',
      hasStar: true,
      user: null,
      tokenType: '',
      token: '',
      data: [],
      routine_list: [],
    }

    this.monthnames_spa = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    this.daysNames_spa = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']
  }

  componentDidMount() {
    this.setDeviceTimezone()
    Linking.addEventListener('url', this.handleOpenURL)
    /* Linking.getInitialURL()
      .then(url => {
        console.log('Initial url is: ' + url)
        if (url) {
        }
      })
      .catch(err => console.error('An error occurred', err))
      */
  }
  componentWillUnmount() {
    Linking.removeAllListeners('url')
  }
  //         powermind://code/3TcQjvzCJu
  handleOpenURL = event => !!event?.url && this.deepLinkingNavigate(event.url)
  deepLinkingNavigate = url => {
    const route = url.replace(/.*?:\/\//g, '')
    const id = route.match(/\/([^\/]+)\/?$/)[1]
    const routeName = route.split('/')[0]

    //console.log('deepLinkingNavigate ===', { url, route, id, routeName })

    if (routeName === 'code' && !!id) {
      let resetAction = StackActions.reset({
        index: 1,
        actions: [NavigationActions.navigate({ routeName: 'Main' }), NavigationActions.navigate({ routeName: 'HabitsHome', params: { code: id } })],
      })
      this.props.navigation.dispatch(resetAction)
    }
  }
  setDeviceTimezone = async () => this.props.setTimezone(RNLocalize.getTimeZone())
  getHabitData = async () => {
    let { data, error } = await request({
      url: 'mobile/users/habits_home_datas',
      method: 'POST',
      //debug: true,
    })
    let habits_home_datas = null
    if (!error) habits_home_datas = data
    //console.log('habits_home_datas : ' + habits_home_datas)
    return { habits_home_datas }
  }
  get_home_data = async () => {
    let { data, error } = await request({
      url: 'mobile/users/get_home_data',
      method: 'POST',
      data: {
        lang: this.props.app_configuration.language,
        imei: this.props.imei,
        timezone: this.props.timezone,
        date: moment().format('YYYY-MM-DD'),
      },
      //debug: true,
    })
    if (error || !data) return
    this.props.setGeneralDatas(data)
    this.setState({
      week_number: data.week_number,
      year_number: data.week_year,
      weekDays: data.week_days,
    })
  }
  getHabitPerentage = async () => {
    //console.log("Vishal : getHabitPerentage called")
    let { error, data } = await request({
      url: 'mobile/users/habits_percentage',
      method: 'POST',
    })
    if (error) return
    //console.log("Vishal : getHabitPerentage data => " + data)
    this.props.setHabitsPercentage(data)
  }

  get_profile_data = () => {
    return new Promise((resolve, reject) => {
      fetch(fn.url + 'mobile/users/get_profile_data', {
        method: 'POST',
        headers: new Headers({
          Authorization: this.state.tokenType + ' ' + this.state.token,
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
        body: 'lang=' + global.lange + '&imei=' + this.props.imei + '&timezone=' + this.props.timezone,
      })
        .then(response => response.json())
        .then(async json => {
          if (json.status == 1) {
            this.setState({})

            await AsyncStorage.setItem('get_profile_data', JSON.stringify(json))
            //console.log('Main Page fetch profile data ...');
            //console.log('Main Page fetch play routine ...');
          }
          resolve(json)
        })
        .catch(e => {
          reject(e)
        })
    })
  }
  get_app_configuration = async () => {
    let { error, data } = await request({
      url: 'mobile/get_app_configuration',
      method: 'POST',
      data: {
        lang: this.props.app_configuration.language,
        imei: this.props.imei,
        timezone: this.props.timezone,
      },
    })
    if (error) return
    this.props.setAppConfiguration(data)
  }
  get_consecutive_details_to_achieve_next_level = async () => {
    let { data, error } = await request({
      url: 'mobile/get_consecutive_details_to_achieve_next_level',
      method: 'POST',
      data: {
        lang: this.props.app_configuration.language,
        imei: this.props.imei,
        timezone: this.props.timezone,
        year_number: moment().year(),
      },
      //debug: true
    })
    if (error) return
    this.props.setConsecutiveDetailsToAchieveNextLevel(data)

    var color = 'transparent'
    var nextBeltColor = 'transparent'
    var hasStar = false
    if (data.items.white.achieved) {
      color = 'white'
      nextBeltColor = 'yellow'
    } else if (data.items.yellow.achieved) {
      color = 'yellow'
      nextBeltColor = 'green'
    } else if (data.items.green.achieved) {
      nextBeltColor = 'black'
      color = 'green'
    } else if (data.items.black.achieved) {
      nextBeltColor = 'white'
      color = 'black'
    } else if (data.items.black_star.achieved) {
      nextBeltColor = 'white'
      color = 'white'
      hasStar = true
    }
    this.setState({
      beltColor: color,
      nextBeltColor: nextBeltColor,
      hasStar: hasStar,
    })
  }
  get_last_21_days_activity_percentage = async () => {
    let { error, data } = await request({
      url: 'mobile/get_last_weeks_activity',
      method: 'POST',
      data: {
        lang: this.props.app_configuration.language,
        imei: this.props.imei,
        timezone: this.props.timezone,
        date: moment().format('YYYY-MM-DD hh:mm:ss'),
      },
      //debug: true,
    })
    if (error) return
    this.props.setLastWeeksActivity(data)
  }

  get_last_twelve_weeks_activity = async () => {
    let { data, error, response } = await request({
      url: 'mobile/get_last_twelve_weeks_activity',
      method: 'POST',
      data: {
        lang: this.props.app_configuration.language,
        imei: this.props.imei,
        timezone: this.props.timezone,
      },
    })

    if (error) return
    AsyncStorage.setItem('get_last_twelve_weeks_activity', JSON.stringify(response.data))
    this.props.setLastTwelveWeeksActivities(data)
  }

  get_routine_list = () => {
    //console.log('Vishal get_routine_list called')
    return new Promise((resolve, reject) => {
      fetch(fn.url + 'mobile/users/routine_list', {
        method: 'POST',
        headers: new Headers({
          Authorization: this.state.tokenType + ' ' + this.state.token,
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
        body: 'lang=' + global.lange + '&imei=' + this.state.user.imei + '&timezone=' + this.props.timezone,
      })
        .then(response => response.json())
        .then(json => {
          if (json.status == 1) {
            var data = json.data
            this.setState({ routine_list: data })
            AsyncStorage.setItem('routine_list', JSON.stringify(data))
            if (!error && !!data && !!data.data) {
              this.props.setRoutines(data)
            }
          }
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  getDatas = async () => {
    let isConnected = await NetInfo.isConnected.fetch()

    if (!isConnected) {
      await this.getHome(true)
      return
    }

    let token = await AsyncStorage.getItem('userToken')
    let tokenType = await AsyncStorage.getItem('userTokenType')
    let value = await AsyncStorage.getItem('user')
    const user = JSON.parse(value)
    await this.setState({
      token: token,
      tokenType: tokenType,
      user,
    })
    let reproducciones = await AsyncStorage.getItem('reproducciones')

    if (!!reproducciones) {
      reproducciones = JSON.parse(reproducciones)
      for (let reproduccion of reproducciones) {
        let response = await request({
          url: 'mobile/users/save_reproduction_data',
          method: 'POST',
          data: JSON.stringify(reproduccion),
          //debug: true,
        })
      }
      AsyncStorage.removeItem('reproducciones')
    }

    this.get_home_data()
    this.getHabitPerentage()
    await this.get_profile_data()
    await this.getHabitData()
    this.get_app_configuration()
    this.get_consecutive_details_to_achieve_next_level()
    this.get_last_21_days_activity_percentage()
    this.get_last_twelve_weeks_activity()
    await this.get_routine_list()
    await this.getHome(true)
  }

  focusItemWasTapped = type => {
    //console.log('focusItemWasTapped')
    //console.log(this.props.questions)

    if (type === 'focusbtn') this.props.navigation.navigate(this.props.questions.length ? 'FocusQuestionaryScreen' : 'Habits')
    else this.props.navigation.navigate(this.props.questions.length ? 'FocusQuestionaryScreen' : 'FocusingMediumsStatsScreen')
  }
  loadObjectives = async (manageLoadingState = true) => {
    //console.log('Vishal : loadObjectives called')
    let newObj = {}

    let imei = await AsyncStorage.getItem('user')
    imei = JSON.parse(imei)
    newObj['lang'] = global.lang
    newObj['imei'] = imei.imei
    newObj['timezone'] = imei.timezone

    let formdata = new FormData()
    formdata.append('lang', newObj['lang'])
    formdata.append('imei', newObj['imei'])
    formdata.append('timezone', newObj['timezone'])

    let { data, error } = await request({
      url: 'actions/get_objective_list',
      method: 'POST',
      data: formdata,
      //debug: true,
    })
    if (!error) {
      let obj = {}
      data.map(objective => {
        obj[objective.id] = objective
      })

      //console.log('Vishal objective data => ' + obj)
      this.props.setObjectivesAction(obj)
    }
  }

  onRefresh = () => {
    this.props.updateHomeData()
    console.log('Vishal updateHabitsHomeData called from main screen')
    this.language()
    this.getDatas()
    this.getHabitPerentage()
    this.props.updateHabitsHomeData()
    // this.loadObjectives()
    this.props.fetchUsersPendingQuestionsSagaAction()
  }

  async UNSAFE_componentWillMount() {
    Orientation.lockToPortrait()

    //
    //load greeting letter
    if (global.lange == 'es') this.setState({ monthNames: this.monthnames_spa, daysNames: this.daysNames_spa })

    var user = this.props.navigation.getParam('user')
    var token = this.props.navigation.getParam('token')
    var tokenType = this.props.navigation.getParam('tokenType')

    if (user != null)
      this.setState({
        user: JSON.parse(user),
        token: token,
        tokenType: tokenType,
      })

    var color = 'transparent'
    var nextBeltColor = 'transparent'
    var hasStar = false

    if (this.props?.consecutive_details_to_achieve_next_level?.items?.white?.achieved) {
      color = 'white'
      nextBeltColor = 'yellow'
    } else if (this?.props?.consecutive_details_to_achieve_next_level?.items?.yellow?.achieved) {
      color = 'yellow'
      nextBeltColor = 'green'
    } else if (this?.props?.consecutive_details_to_achieve_next_level?.items?.green?.achieved) {
      color = 'green'
      nextBeltColor = 'black'
    } else if (this?.props?.consecutive_details_to_achieve_next_level?.items?.black?.achieved) {
      color = 'black'
      nextBeltColor = 'white'
    } else if (this?.props?.consecutive_details_to_achieve_next_level?.items?.black_star?.achieved) {
      color = 'white'
      nextBeltColor = 'white'
      hasStar = true
    }
    this.setState({
      beltColor: color,
      nextBeltColor: nextBeltColor,
      hasStar: hasStar,
    })
  }
  prepareDatas = async () => {
    let value = await AsyncStorage.getItem('isFirst')
    if (value) {
      //console.log('App started for the first time');
      this.onRefresh()
      AsyncStorage.setItem('isFirst', 'false')
    } else {
      this.getUserInfo()
      this.language()
      await this.getHome(true)
    }
    //capsule's score
    var capsule_score = await AsyncStorage.getItem('capsule_score')
    //console.log('THERE ===> ', {ta_con: global.ta_con, ta_pra: global.ta_pra});
    if (!capsule_score) {
      //this.props.setHomeMentalFocusPorcentageAction(0);
    } else {
      score = JSON.parse(capsule_score)

      bnt = (score.bnt_con + score.bnt_pra) / 2
    }

    //consecutive weeks data
    var last_12_weeks = await AsyncStorage.getItem('get_last_twelve_weeks_activity')

    var capsule_day = await AsyncStorage.getItem('capsule_day')
    if (capsule_day != null) {
      var savedDate = new Date(Date.parse(capsule_day))
      //console.log('saved date:' + savedDate.getTime() + ' month:' + savedDate.getMonth() +' date:' + savedDate.getDate());
      var d = new Date()

      //console.log('today date:' + d.getTime() + ' month:' + d.getMonth() +' date:' + d.getDate());

      let day = d.getDay()
      const currentMonday = new Date(d.getFullYear(), d.getMonth(), d.getDate() + (day == 0 ? -6 : 1) - day)
      const nextMonday = moment(currentMonday).add(7, 'd').toDate()

      if (savedDate.getTime() >= currentMonday.getTime() && savedDate.getTime() < nextMonday.getTime()) this.setState({ isCapsuleVisible: false })
    }

    let routine_list = await AsyncStorage.getItem('routine_list')
    if (!!routine_list) {
      routine_list = JSON.parse(routine_list)
      this.setState({ routine_list })
    } else this.get_routine_list()
  }

  getUserInfo = async () => {
    let token = await AsyncStorage.getItem('userToken')
    let tokenType = await AsyncStorage.getItem('userTokenType')
    let user = await AsyncStorage.getItem('user')
    user = JSON.parse(user)
    this.setState({
      tokenType,
      token,
      user,
      desde: '',
    })
  }

  language = async () => {
    let user = this.props.user
    await this.setState({
      applang: this.props.app_configuration.language,
    })

    let lang = await AsyncStorage.getItem(`get_screens_translations_${user.default_language}`)
    lang = JSON.parse(lang)
    //console.log('Main Page getting language....', value)
    lang = lang.result
    fecha = new Date()
    fechaDate = fecha.getDate()
    fechaHora = fecha.getHours()
    if (fechaHora >= 5 && fechaHora < 12) {
      fechaHora = lang.homeScreen.greetings[0].label
    } else if (fechaHora >= 12 && fechaHora < 18) {
      fechaHora = lang.homeScreen.greetings[1].label
    } else if (fechaHora >= 18 && fechaHora < 21) {
      fechaHora = lang.homeScreen.greetings[2].label
    } else {
      fechaHora = lang.homeScreen.greetings[3].label
    }
    newlabel = lang.homeScreen.consecutive_achievements_to_next_level.label
    newlabel = newlabel.replace(/(\r\n|\\n|\r)/gm, '')
    if (newlabel == 'Consecutivas faltantes') {
      newlabel = 'Consecutivas          faltantes'
    }
    this.setState({
      main_button: lang.homeScreen.main_button.label,
    })
  }
  getHome = async conProfile => {
    //console.log('getHome ===> ', { conProfile, json: this.props.general_datas })
    if (!!this.props?.general_datas?.week_days)
      await this.setState({
        week_number: this.props.general_datas.week_number,
        year_number: this.props.general_datas.week_year,
      })

    if (conProfile) this.getProfileData()
  }

  getProfileData = async () => {
    this.setState({
      desde: '',
    })

    AsyncStorage.getItem('get_profile_data').then(json => {
      json = JSON.parse(json)
      //console.log('get_profile_data ===> ', json)
      if (json.status !== 1) this.get_profile_data()
    })
  }
  pad = num => ('0' + num).slice(-2)

  renderInfoBlocks = () => {
    let newheight = Platform.OS === 'ios' ? height * 0.27 : height * 0.26
    return (
      <View style={[globalStyles.homePercentagesBox, { height: newheight }]}>
        <View style={[globalStyles.dailyMeterContainer, { height: newheight * 0.65, alignItems: 'flex-start', marginTop: 10, margin: 10 }]}>
          <PillarPercentage type='meditation' passedRoutines={this.props.routines.length > 0 ? this.props.routines : this.state.routine_list} />
          <PillarPercentage type='focus' onPress={this.focusItemWasTapped} />
          <PillarPercentage type='habits' />
          {/* <HabitsAverageByDaysPercentageCircle percentage={11} />*/}
        </View>
        <BeltProgressSection />
      </View>
    )
  }
  navigationEventWillFocus = async payload => {
    this.onRefresh()
  }
  render() {
    let d = new Date()
    let m = d.getMonth()
    let dayName = d.getDay()
    let curDate = d.getDate()
    let personURI
    let isUserImageAvailable = this.props.user.image ? true : false
    if (isUserImageAvailable) {
      personURI = { uri: this.props.user.image }
    } else {
      personURI = user_prof
    }
    return (
      <>
        <NavigationEvents onWillFocus={payload => this.navigationEventWillFocus(payload)} />
        <HomeBase showActionButton={false} showLogo={true}>
          <ScrollView
            ref={ref => {
              if (!!ref) this.mainScroll = ref
            }}
            //style={{ backgroundColor: 'black' }}
            scrollToOverflowEnabled
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator
            refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} tintColor='white' />}
          >
            {/* curved container */}
            <View style={[globalStyles.mainCurvedContainer, { marginTop: scale(1.5), marginBottom: Platform.OS === 'ios' ? scale(1.5) : scale(2.8) /* 50 */ }]}>
              <View style={{ flex: 1, flexDirection: 'column' }}>
                <View style={{ height: 80, width: '100%', flexDirection: 'row', marginBottom: height * 0.12 }}>
                  <View
                    style={{
                      alignItems: 'flex-start',
                      justifyContent: 'flex-start',
                      width: '50%',
                      height: '100%',
                      left: 25,
                      marginTop: 50,
                      marginBottom: 0,
                    }}
                  >
                    <Text
                      style={[
                        globalStyles.centerText,
                        { textAlign: 'left', width: '100%', marginLeft: 25, marginTop: 10 },
                        { color: 'white' },
                        globalStyles.textShadow,
                      ]}
                    >
                      {this.state.daysNames[dayName]}
                      {','} {this.state.monthNames[m]} {curDate}
                    </Text>
                    <Text
                      style={[
                        globalStyles.centerText,
                        { textAlign: 'left', width: '100%', marginLeft: 25 },
                        { fontSize: scale(0.5), fontWeight: 'bold', color: 'white' },
                        globalStyles.textShadow,
                      ]}
                    >
                      {this.props.user.name}
                    </Text>
                    {/*</TouchableOpacity>*/}
                  </View>
                  <View
                    style={{
                      alignItems: 'flex-end',
                      justifyContent: 'flex-start',
                      width: '50%',
                      height: '100%',
                      right: 25,
                      marginTop: 50,
                      marginBottom: 0,
                    }}
                  >
                    <TouchableOpacity disabled>
                      <View
                        style={{
                          width: scale(2),
                          height: scale(2),
                          borderRadius: scale(2) / 2,
                          marginRight: 25,
                          borderWidth: 5,
                          borderColor: this.props.belt.colour,
                          justifyContent: 'flex-end',
                          alignItems: 'center',
                        }}
                      >
                        <Image
                          source={personURI}
                          resizeMode='contain'
                          style={{ width: isUserImageAvailable ? '100%' : '85%', height: isUserImageAvailable ? '100%' : '85%', borderRadius: 100 }}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{ ...globalStyles.verticalContainer, marginTop: 0 }}>
                  {this.renderInfoBlocks()}
                  <View style={{ marginTop: height * 0.02 }}>
                    <WeekDaysMarker displayDate={false} onPress={() => this.props.navigation.navigate('Activity2Screen')} />
                  </View>
                  <View
                    style={{
                      flex: 1,
                      width: '100%',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexDirection: 'row',
                      marginTop: Platform.OS === 'ios' ? height * 0.085 : height < 600 ? height * 0.05 : height < 770 ? height * 0.075 : height * 0.13,
                    }}
                  >
                    <View
                      style={{
                        width: scale(1.5),
                        height: scale(1.5),
                        borderRadius: scale(1.5) / 2,
                        borderWidth: 5,
                        borderColor: '#292c33',
                        backgroundColor: '#232324',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 40,
                        marginBottom: 10,
                        marginLeft: 15,
                      }}
                    >
                      <TouchableOpacity
                        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => this.props.navigation.navigate('InfoScreen')}
                      >
                        <Image source={info} resizeMode='contain' style={{ width: scale(0.6), height: scale(0.6) }} />
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        width: scale(1.5),
                        height: scale(1.5),
                        borderRadius: scale(1.5) / 2,
                        borderWidth: 5,
                        borderColor: '#292c33',
                        backgroundColor: '#232324',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 40,
                        marginBottom: 10,
                        marginRight: 15,
                      }}
                    >
                      <TouchableOpacity
                        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => this.props.navigation.navigate('NewNoteScreen')}
                      >
                        <Image source={edit} resizeMode='contain' style={{ width: scale(0.6), height: scale(0.6) }} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </HomeBase>
      </>
    )
  }
}

const mapStateToProps = state => ({
  general_datas: datasetSelector(state, 'general_datas'),
  imei: datasetSelector(state, 'imei'),
  timezone: datasetSelector(state, 'timezone'),
  questions: datasetSelector(state, 'questions', { list_format: true }),
  app_configuration: datasetSelector(state, 'app_configuration'),
  last_weeks_activity: datasetSelector(state, 'last_weeks_activity'),
  today_activities_count_data: datasetSelector(state, 'today_activities_count_data'),
  user: datasetSelector(state, 'user'),
  objectives: datasetSelector(state, 'objectives'),
  routines: datasetSelector(state, 'routines', { list_format: true }) || [],
  consecutive_details_to_achieve_next_level: datasetSelector(state, 'consecutive_details_to_achieve_next_level'),
  belt: datasetSelector(state, 'belt'),
})
const mapDispatchToProps = dispatch => ({
  fetchUsersPendingQuestionsSagaAction: () => dispatch(fetchUsersPendingQuestionsSagaAction()),
  updateHabitsHomeData: () => dispatch(updateHabitsHomeDataSagaAction()),
  setGeneralDatas: data => dispatch(setDatasetToReducer(data, 'general_datas')),
  setTimezone: data => dispatch(setDatasetToReducer(data, 'timezone')),
  setAppConfiguration: data => dispatch(setDatasetToReducer(data, 'app_configuration')),
  setUserData: user => dispatch(setDatasetToReducer(user, 'user')),
  setHabitsPercentage: habits_percentage => dispatch(setDatasetToReducer(habits_percentage, 'habits_percentage')),
  setRoutines: data => dispatch(setDatasetListToObjectReducer(data, 'routines')),
  setLastWeeksActivity: user => dispatch(setDatasetToReducer(user, 'last_weeks_activity')),
  setConsecutiveDetailsToAchieveNextLevel: data => dispatch(setDatasetToReducer(data, 'consecutive_details_to_achieve_next_level')),
  setLastTwelveWeeksActivities: data => dispatch(setDatasetToReducer(data, 'last_twelve_weeks_activity')),
  setObjectivesAction: data => dispatch(setDatasetToReducer(data, 'objectives')),
  updateHomeData: () => dispatch(updateHomeDataSagaAction()),
})
MainScreen = withTranslation()(MainScreen)
MainScreen = connect(mapStateToProps, mapDispatchToProps)(MainScreen)
export default MainScreen
