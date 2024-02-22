import React, { Component } from 'react'
import { Text, StyleSheet, ScrollView, View, SafeAreaView } from 'react-native'
import { CalendarList } from 'react-native-calendars'
import * as fn from 'helpers/scripts'
import BottomNavigationBar from '../components/BottomNavigationBar'
import request from '../helpers/request'
import capitalizeWords from '../helpers/capitalizeWords'
import moment from 'moment'
import { datasetSelector } from '../redux/selectors'
import { connect } from 'react-redux'

class CalendarScreen extends Component {
  state = {
    activity: {},
  }
  constructor(props) {
    super(props)
    this.onDayPress = this.onDayPress.bind(this)
  }
  static navigationOptions = {
    //To hide the NavigationBar from current Screen
    header: null,
  }

  componentDidMount() {
    this.loadCalendarData()
  }
  achievedPercentage = () => this.objective_stats()?.achieved?.percentage || 0
  objective_stats = () => this.props['objectives_stats'][this.objective_id()]
  archived = () => this.objective_stats()?.achieved?.split || '-'
  objective = () => this.props.objectives[this.objective_id()]
  objective_id = () => this.props.navigation.getParam('objective_id')
  loadCalendarData = async () => {
    this.setState({ loading: true })
    let { data, error } = await request({
      url: 'actions/evaluation_history',
      method: 'POST',
      data: {
        lang: this.props.app_configuration.language,
        imei: this.props.imei,
        timezone: this.props.timezone,
        objectives_ids: [this.objective_id()]
      },
      //debug: true,
    })
    if(error)
    return

    this.setState({activity: data})
  }

  calendarDoneAndAchievedDayMarkStyles = () => ({
    customStyles: {
      container: {
        backgroundColor: global.mainColor,
      },
      text: {
        color: 'white',
      },
    },
  })
  calendarDoneAndNotAchievedDayMarkStyles = () => ({
    customStyles: {
      container: {
        backgroundColor: 'gray',
      },
      text: {
        color: 'white',
      },
    },
  })
  calendarNotDoneAndNotAchievedDayMarkStyles = () => ({
    customStyles: {
      container: {
        backgroundColor: 'transparent',
        borderColor: 'gray',
        borderWidth: 1,
      },
      text: {
        color: 'black',
      },
    },
  })

  getCalendarMarkedDates = () => {
    let markedDates = {}
    /* 
    console.log('CALENDAR-MARKED-DATES ===> ', {
      EVAS: this['state']['activity']['evaluations'],
      NOTES: this['state']['activity']['notes'],
    });
 */
    if (!!this['state']['activity'] && !!this['state']['activity']['evaluations'])
      this['state']['activity']['evaluations'].map(evaluation => {
        let evaluation_level = 0

        if (evaluation.evaluation_done && evaluation.achieved) evaluation_level = 2
        else if (evaluation.evaluation_done && !evaluation.achieved) evaluation_level = 1

        let date = moment(evaluation.evaluation_date).format('YYYY-MM-DD')
        if (!!markedDates[date]) {
          let markeDateLevel = 0
          if (markedDates[date]['done'] && markedDates[date]['achieved']) markeDateLevel = 2
          else if (markedDates[date]['done'] && !markedDates[date]['achieved']) markeDateLevel = 1

          if (evaluation_level <= markeDateLevel) return
        }
        //console.log('HERE ===> ', date, this.getNewDate(), isToday);
        if (evaluation_level === 2)
          markedDates[date] = {
            ...this.calendarDoneAndAchievedDayMarkStyles(),
            achieved: true,
            done: true,
          }
        else if (evaluation_level === 1)
          markedDates[date] = {
            ...this.calendarDoneAndNotAchievedDayMarkStyles(),
            achieved: false,
            done: true,
          }
        else if (evaluation_level === 0)
          markedDates[date] = {
            ...this.calendarNotDoneAndNotAchievedDayMarkStyles(),
            achieved: false,
            done: false,
          }
      })

    /* 
    if (!!this['state']['activity']['notes'])
      this['state']['activity']['notes'].map((note) => {
        let date = moment(note.created_at).format('YYYY-MM-DD');
        if (!!markedDates[date]) return;
        //console.log('HERE ===> ', date, this.getNewDate(), isToday);
        markedDates[date] = this.calendarNotDoneAndNotAchievedDayMarkStyles();
      }); 
    */
    return markedDates
  }

  render() {
    //console.log('newDate',newDate)

    let calendarExtraProps = {}

    if (this.state.finalMarked) {
      //console.log('[CalendarScree]:', this.state['finalMarked']);
      if (Object.entries(this.state.finalMarked).length > 0) {
        calendarExtraProps['markedDates'] = this.state['finalMarked']
      }
    }
    let markedDates = this.getCalendarMarkedDates()
    let markedDatesList = Object.keys(markedDates)
    let minDate = Object.keys(markedDates).shift()
    let maxDate = Object.keys(markedDates).pop()

    minDate = moment(minDate).startOf('month').format('YYYY-MM-DD')
    maxDate = moment(maxDate).endOf('month').format('YYYY-MM-DD')

    return (
      <View style={[styles.informationLayout, { width: '100%', height: '100%', backgroundColor: 'black' }]}>
        <SafeAreaView
          style={{
            alignItems: 'stretch',
            justifyContent: 'flex-start',
            flex: 1,
          }}
        >
          <ScrollView
            style={{ height: '100%' }}
            contentContainerStyle={{
              height: '100%',
              backgroundColor: 'white',
              alignItems: 'center',
              paddingBottom: 60,
            }}
          >
            <View
              style={{
                width: '100%',
                height: width / 6,
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

            <CalendarList
              markingType={'custom'}
              minDate={minDate}
              maxDate={maxDate}
              current={minDate}
              pastScrollRange={24}
              futureScrollRange={24}
              onDayPress={day => {
                /* console.log('HERE ===> ', {
                  SELECTED: day['dateString'],
                  DATES: markedDatesList,
                  markedDates,
                }) */
                if (!markedDatesList.includes(day['dateString'])) return
                this.props.navigation.navigate('CalendarDetail', {
                  day,
                  activity: this.state.activity,
                })
              }}
              markedDates={markedDates}
            />

            <View
              style={{
                position: 'absolute',
                top: width / 8,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  height: 35,
                  backgroundColor: 'white',
                  borderRadius: 8,
                  borderWidth: 5,
                  borderColor: global.mainColor,
                  paddingHorizontal: 5,
                }}
              >
                <View
                  style={{
                    width: 18,
                    height: 18,
                    backgroundColor: global.mainColor,
                    borderRadius: 10,
                  }}
                />
                <Text style={{ marginLeft: 10, color: 'black', fontSize: 14 }}>{this.archived()}</Text>
                <Text
                  style={{
                    marginLeft: 25,
                    color: global.mainColor,
                    fontSize: 14,
                    fontWeight: 'bold',
                  }}
                >
                  {this.achievedPercentage()}
                </Text>
              </View>
            </View>
          </ScrollView>
          <BottomNavigationBar hasPlay={this.state.hasPlay} hasBack invisiblePlayButton />
        </SafeAreaView>
      </View>
    )
  }

  onDayPress(day) {
    this.setState({
      selected: day.dateString,
    })
  }
}

const styles = StyleSheet.create({
  calendar: {
    borderTopWidth: 1,
    paddingTop: 5,
    borderBottomWidth: 1,
    borderColor: '#eee',
    height: 350,
  },
  text: {
    textAlign: 'center',
    borderColor: '#bbb',
    padding: 10,
    backgroundColor: '#eee',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
})

const mapStateToProps = state => ({
  app_configuration: datasetSelector(state, 'app_configuration'),
  timezone: datasetSelector(state, 'timezone'),
  imei: datasetSelector(state, 'imei'),
  questions: datasetSelector(state, 'objectives'),
  objectives_stats: datasetSelector(state, 'objectives_stats'),
})
const mapDispatchToProps = dispatch => ({
  //setObjectiveStatsAction: data => dispatch(setDatasetListToObjectReducer(data, 'objectives_stats')),
  //setQuestionsAction: data => dispatch(setDatasetListToObjectReducer(data, 'questions'))
})

export default connect(mapStateToProps, mapDispatchToProps)(CalendarScreen)
