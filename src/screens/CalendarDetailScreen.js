import React from 'react'
import { StyleSheet, SafeAreaView, ScrollView, View, Text, FlatList, ActivityIndicator } from 'react-native'
import * as fn from 'helpers/scripts'
import moment from 'moment'
import request from '../helpers/request'
import BottomNavigationBar from '../components/BottomNavigationBar'
class CalendarDetailScreen extends React.Component {
  state = {
    evaluations: [],
    day: null,
    dayName: null,
    notes: [],
    usersInfo: {},
    isLoadingUsersInfo: false,
  }

  static navigationOptions = {
    header: null,
  }

  componentDidMount() {
    this.prepareDatas()
  }

  prepareDatas = async () => {
    let day = this.props.navigation.getParam('day')
    let activity = this.props.navigation.getParam('activity')

    //console.log(day);
    //console.log(activity);
    let date = day.dateString

    if (activity.notes) {
      let notes = activity.notes.filter(note => note.created_at.split(' ')[0] == date)
      await this.setState({ notes })
    }

    if (activity.evaluations) {
      let circles = activity.evaluations.filter(e => e.evaluation_date.split(' ')[0] == date)
      circles = circles.map(el => ({
        ...el,
        name: el.name
          .split(' ')
          .map(el => el.charAt(0))
          .join('')
          .substring(0, 2),
      }))
      await this.setState({ evaluations: circles })
    }
    if (day) {
      let days = [
        global?.language?.day_monday,
        global?.language?.day_tue,
        global?.language?.day_wed,
        global?.language?.day_th,
        global?.language?.day_fri,
        global?.language?.day_sun,
        global?.language?.day_sat,
      ]
      let d = new Date(day.dateString)
      let dayName = days[d.getDay()]
      day = day.dateString.split('-')[2]

      await this.setState({ day: day, dayName: dayName })
    }

    //const evaluationsOfTheDay =
    await this.notesAndEvaluationsUsersIds()
  }

  notesAndEvaluationsUsersIds = async () => {
    let usersIdsObj = {}
    this['state']['evaluations'].map(({ muser_id }) => {
      usersIdsObj[muser_id] = true
    })
    this['state']['notes'].map(({ muser_id }) => {
      usersIdsObj[muser_id] = true
    })
    let ids = Object.keys(usersIdsObj)
    await this.setState({ isLoadingUsersInfo: true })
    let response = await request({
      url: 'mobile/users/info',
      method: 'POST',
      data: { ids },
    })

    await this.setState(state => {
      response['data'].map(({ id, name }) => {
        state['usersInfo'][id] = { id, name }
        state['isLoadingUsersInfo'] = false
      })
      return state
    })
  }

  render() {
    //console.log('HERE ==> ', {STATE: this.state});
    return (
      <View style={styles.screen}>
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
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>{global?.language?.results}</Text>
            </View>

            <View style={styles.card}>
              <View style={styles.cardHeaderContainer}>
                <Text style={styles.cardHeaderText}>{this.state.dayName}</Text>
              </View>
              <View style={styles.cardBody}>
                <Text style={styles.dateNumber}>{this.state.day}</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    height: '100%',
                    margin: 5,
                    flex: 1,
                    flexWrap: 'wrap',
                  }}
                >
                  {this.renderEvaluations()}
                </View>
              </View>
            </View>
            <Text
              style={{
                textAlign: 'left',
                color: global.mainColor,
                fontSize: 22,
                marginTop: 10,
              }}
            >
              {global?.language?.label_notes}
            </Text>
            <View
              style={{
                width: '100%',
                height: '40%',
                marginTop: 15,
                paddingBottom: 30,
              }}
            >
              {this.renderNotes()}
            </View>
          </ScrollView>
          <BottomNavigationBar hasPlay={this.state.hasPlay} hasBack invisiblePlayButton />
        </SafeAreaView>
      </View>
    )
  }
  renderEvaluations = () => {
    return this.state.evaluations.map((eva, key) => {
      if (eva.achieved)
        return (
          <View style={styles.circleArchived} key={key}>
            <Text style={styles.circleText}>{eva.name}</Text>
          </View>
        )

      return (
        <View style={styles.circleNotArchived} key={key}>
          <Text style={styles.circleText}>{eva.name}</Text>
        </View>
      )
    })
  }
  renderUserName = user_id => {
    if (!!this['state']['usersInfo'] && !!this['state']['usersInfo'][user_id]) return this['state']['usersInfo'][user_id]['name']
  }
  renderNotes = () => {
    if (!this.state.notes.length) return <Text style={{ fontSize: 16, color: 'gray', textAlign: 'center' }}>{global?.language?.no_notes}</Text>

    return (
      <FlatList
        data={this.state.notes}
        renderItem={({ item }) => (
          <View
            style={{
              width: '100%',
              //height: 50,
              paddingHorizontal: 10,
              borderBottomColor: global.mainColor,
              borderBottomWidth: 1,
              marginTop: 10,
            }}
          >
            <View
              style={{
                width: '100%',

                flexDirection: 'row',
              }}
            >
              <View
                style={{
                  color: 'grey',
                  width: '50%',
                }}
              >
                {this.state['isLoadingUsersInfo'] ? (
                  <ActivityIndicator color='gray' size='small' />
                ) : (
                  <Text
                    style={{
                      fontSize: 15,
                      color: 'grey',
                    }}
                  >
                    {this.renderUserName(item.muser_id)}
                  </Text>
                )}
              </View>

              <Text
                style={{
                  fontSize: 15,
                  color: 'grey',
                  width: '25%',
                  textAlign: 'right',
                }}
              >
                {moment(item.created_at).format('DD/MM/YYYY')}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  color: 'grey',
                  width: '25%',
                  textAlign: 'right',
                }}
              >
                {moment(item.created_at).format('HH:mm')} hs
              </Text>
            </View>
            <Text
              style={{
                fontSize: 17,
                color: 'gray',
                width: '100%',
              }}
            >
              {item.note}
            </Text>
          </View>
        )}
        keyExtractor={item => item.key}
      />
    )
  }
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'black',
    width: '100%',
    height: '100%',
    flex: 1,
  },
  headerContainer: {
    backgroundColor: 'gray',
    /*  position: 'absolute',
    top: 0, */
    marginBottom: 30,
    width: '100%',
  },
  headerText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 25,
  },
  card: {
    borderColor: global.mainColor,
    borderWidth: 10,
    borderRadius: 20,
    height: 280,
    width: '80%',
  },
  cardHeaderContainer: {
    backgroundColor: 'grey',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardHeaderText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 26,
  },
  cardBody: {
    paddingTop: 30,
    justifyContent: 'flex-start',
    height: '100%',
  },
  dateNumber: {
    color: global.mainColor,
    fontSize: 90,
    textAlign: 'center',
  },
  circleArchived: {
    height: 48,
    width: 48,
    borderRadius: 24,
    backgroundColor: global.mainColor,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleNotArchived: {
    height: 48,
    width: 48,
    borderRadius: 24,
    backgroundColor: 'gray',
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleText: {
    color: 'white',
    fontSize: 18,
  },
})

export default CalendarDetailScreen
