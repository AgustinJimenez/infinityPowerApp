import React from 'react'
import { View, FlatList, Dimensions, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native'
import * as fn from 'helpers/scripts'
const { width } = Dimensions.get('window')
import Loader from 'helpers/loader'
import { NavigationEvents } from 'react-navigation'
import request from '../helpers/request'
import { connect } from 'react-redux'
import { datasetSelector } from '../redux/selectors'
import { Toast } from 'native-base'
import capitalizeWords from '../helpers/capitalizeWords'
import { setDatasetToReducer } from '../redux/actions'
import BottomNavigationBar from '../components/BottomNavigationBar'
class ObjectiveDetailsScreen extends React.Component {
  static navigationOptions = {
    //To hide the NavigationBar from current Screen
    header: null,
  }
  constructor() {
    super()
    this.state = {
      objectiveName: '',
      description: '',
      expand2: false,
      loading: true,
    }

    this.index = 0
    this.user = null
  }
  onScreenFocus = async () => {
    await this.objectiveStats()
    await this.loadEvaluationData()
  }
  objectiveStats = async () => {
    await this.setState({ loading: true })
    let { data } = await request({
      url: 'actions/get_objective_stats',
      method: 'POST',
      data: {
        lang: global.lang,
        imei: this.props.imei,
        timezone: this.props.timezone,
        objective_id: this.objective_id(),
      },
      //debug: true,
    })
    if (error) {
      await Toast.show({
        text: global?.language?.unexpected_error,
        type: 'danger',
        duration: 3500,
      })
      this.props.navigation.goBack()
    }
    let keys = Object.keys(data['evaluations'] || {})
    let evaluations = []
    keys.forEach(key => {
      const obj = {
        user: key,
        ...data['evaluations'][key],
      }
      evaluations.push(obj)
    })

    this.props.setObjectiveStatsAction(data, this.objective_id())

    this.setState({
      loading: false,
    })
  }
  objective_id = () => this.props.navigation.getParam('objective_id')
  objective = () => this.props.objectives[this.objective_id()]
  objective_stats = () => this.props['objectives_stats'][this.objective_id()]
  evaluations = () => {
    let objective_stats = this.objective_stats()
    let evaluations = objective_stats?.evaluations
    evaluations = Object.keys(evaluations || {}).map(userName => ({ ...evaluations[userName], user: userName }))
    return evaluations
  }
  achievedPercentage = () => this.objective_stats()?.achieved?.percentage || 0
  consistencyPercentage = () => this.objective_stats()?.consistency?.percentage || 0
  achievedSplit = () => this.objective_stats()?.achieved?.split || '-'
  consistencySplit = () => this.objective_stats()?.consistency?.split || '-'
  loadEvaluationData = async () => {
    let newObj = {}
    let { data, error } = await request({
      url: 'actions/evaluation_history',
      method: 'POST',
      data: {
        lang: newObj['lang'],
        imei: this.props.imei,
        timezone: this.props.timezone,
        objectives_ids: [this.objective_id()],
      },
      //debug: true,
    })
    if (error) return
    let obj = {
      achieved: true,
      evaluation_date: '2020-04-24 07:12:12+00',
      evaluation_done: true,
      id: 42,
      muser_id: 28,
      objective_id: 33,
    }
    data.evaluations.push(obj)
    let array = data.evaluations
  }
  renderTotalEvaluations = item => (
    <View
      style={{
        width: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        borderLeftWidth: 1,
        borderLeftColor: global.mainColor,
      }}
    >
      <Text
        style={{
          color: 'white',
          fontSize: 16,
          marginLeft: 5,
        }}
        numberOfLines={1}
      >
        {item.total}
      </Text>
    </View>
  )
  renderNotEvaluatedCircle = item => (
    <View
      style={{
        width: '15%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          height: 36,
          width: 36,
          borderColor: 'white',
          borderWidth: 1,
          borderRadius: 18,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white', fontSize: 16 }} numberOfLines={1}>
          {item.not_evaluated}
        </Text>
      </View>
    </View>
  )
  renderNotAchievedCircle = item => (
    <View
      style={{
        width: '15%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          height: 36,
          width: 36,
          backgroundColor: 'gray',
          borderRadius: 18,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white', fontSize: 16 }} numberOfLines={1}>
          {item.not_achieved}
        </Text>
      </View>
    </View>
  )
  renderAchievedCircle = item => {
    return (
      <View
        style={{
          width: '15%',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <View
          style={{
            height: 36,
            width: 36,
            backgroundColor: global.mainColor,
            borderRadius: 18,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white', fontSize: 16 }} numberOfLines={1}>
            {item.achieved}
          </Text>
        </View>
      </View>
    )
  }

  renderHeader = () => (
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

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          alignItems: 'stretch',
          justifyContent: 'flex-start',
          backgroundColor: 'black',
        }}
      >
        <NavigationEvents
          onWillFocus={payload => {
            this.onScreenFocus()
          }}
        />
        <Loader loading={this.state.loading} />
        <ScrollView
          style={{
            margin: 0,
          }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={true}
        >
          {this.renderHeader()}
          <View style={{ width: '100%', alignItems: 'center', marginTop: 30 }}>
            <View style={{ width: '90%' }}>
              <View
                style={{
                  width: '100%',
                  borderRadius: 12,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    color: global.txtWhiteColor,
                    fontWeight: '400',
                    width: '50%',
                    textAlign: 'center',
                  }}
                >
                  {global?.['language']?.['achieve']}
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    color: global.txtWhiteColor,
                    fontWeight: '400',
                    width: '50%',
                    textAlign: 'center',
                  }}
                >
                  {global?.['language']?.['consistency']}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('CalendarScreen', {
                    objective_id: this.objective_id(),
                  })
                }
                style={{
                  height: 100,
                  backgroundColor: 'black',
                  width: '100%',
                  borderRadius: 12,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <View
                  style={{
                    width: '49%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 35,
                      color: global.txtWhiteColor,
                      fontWeight: 'bold',
                    }}
                  >
                    {this.achievedPercentage()}%
                  </Text>
                  <Text
                    style={{
                      fontSize: 22,
                      color: global.txtWhiteColor,
                      fontWeight: '400',
                    }}
                  >
                    {this.achievedSplit()}
                  </Text>
                </View>
                <View
                  style={{
                    width: '0.7%',
                    height: '80%',
                    backgroundColor: global.mainColor,
                  }}
                />
                <View
                  style={{
                    width: '49%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 35,
                      color: global.txtWhiteColor,
                      fontWeight: 'bold',
                    }}
                  >
                    {this.consistencyPercentage()}%
                  </Text>
                  <Text
                    style={{
                      fontSize: 22,
                      color: global.txtWhiteColor,
                      fontWeight: '400',
                    }}
                  >
                    {this.consistencySplit()}
                  </Text>
                </View>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  marginTop: 30,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    paddingVertical: 10,
                    alignItems: 'center',
                  }}
                >
                  <View
                    style={{
                      height: 18,
                      width: 18,
                      backgroundColor: global.mainColor,
                      borderRadius: 9,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  />
                  <Text
                    style={{
                      marginLeft: 15,
                      color: global.mainColor,
                      fontSize: 15,
                    }}
                  >
                    {global?.language?.obs_achieved}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingVertical: 10,
                    alignItems: 'center',
                  }}
                >
                  <View
                    style={{
                      height: 18,
                      width: 18,
                      backgroundColor: 'gray',
                      borderRadius: 9,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  />
                  <Text
                    style={{
                      marginTop: 1,
                      marginLeft: 15,
                      color: 'grey',
                      fontSize: 15,
                    }}
                  >
                    {global?.language?.obs_not_achieved}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingVertical: 10,
                    alignItems: 'center',
                  }}
                >
                  <View
                    style={{
                      height: 18,
                      width: 18,
                      borderColor: 'white',
                      borderWidth: 1,
                      borderRadius: 9,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  />
                  <Text
                    style={{
                      marginTop: 1,
                      marginLeft: 15,
                      color: global.txtWhiteColor,
                      fontSize: 15,
                    }}
                  >
                    {global?.language?.obs_not_evaluated}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  width: '100%',
                  backgroundColor: 'black',
                  maxHeight: 200,
                  marginTop: 8,
                  borderRadius: 10,
                  borderColor: 'white',
                  borderWidth: 2,
                }}
              >
                {
                  <FlatList
                    data={this.evaluations()}
                    renderItem={({ item }) => {
                      //console.log('ITEM ===> ', item)
                      return (
                        <View
                          style={{
                            width: '100%',
                            height: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <View
                            style={{
                              width: '100%',
                              flexDirection: 'row',
                              height: '100%',
                            }}
                          >
                            <View
                              style={{
                                width: '40%',
                                justifyContent: 'center',
                                alignItems: 'flex-start',
                                marginLeft: 10,
                              }}
                            >
                              <Text
                                style={{
                                  color: 'white',
                                  fontSize: 16,
                                  marginLeft: 5,
                                  textAlign: 'left',
                                }}
                                numberOfLines={1}
                              >
                                {item.user}
                              </Text>
                            </View>
                            {this.renderAchievedCircle(item)}
                            {this.renderNotAchievedCircle(item)}
                            {this.renderNotEvaluatedCircle(item)}
                            {this.renderTotalEvaluations(item)}
                          </View>
                          <View
                            style={{
                              backgroundColor: 'black',
                              width: '90%',
                              height: 3,
                            }}
                          />
                        </View>
                      )
                    }}
                    keyExtractor={item => item.user}
                  />
                }
              </View>

              <Text
                style={{
                  marginTop: 35,
                  width: '100%',
                  color: global.txtWhiteColor,
                  fontSize: 17,
                  textAlign: 'center',
                  marginBottom: 50,
                }}
              >
                {global?.['language']?.['bottom_statement']}
              </Text>
            </View>
          </View>
        </ScrollView>
        <BottomNavigationBar hasPlay={this.state.hasPlay} hasBack invisiblePlayButton />
      </SafeAreaView>
    )
  }
}

const mapStateToProps = state => ({
  imei: datasetSelector(state, 'imei'),
  timezone: datasetSelector(state, 'timezone'),
  objectives: datasetSelector(state, 'objectives'),
  objectives_stats: datasetSelector(state, 'objectives_stats'),
})
const mapDispatchToProps = dispatch => ({
  setObjectivesAction: data => dispatch(setDatasetToReducer(data, 'objectives')),
  setObjectiveStatsAction: (data, id) => dispatch(setDatasetToReducer(data, 'objectives_stats', { key: id })),
})

export default connect(mapStateToProps, mapDispatchToProps)(ObjectiveDetailsScreen)
