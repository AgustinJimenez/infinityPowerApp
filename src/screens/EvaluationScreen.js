import React from 'react'
import { View, FlatList, Dimensions, Text, TextInput, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native'
import { globalStyles } from '../helpers/styles'
const { width } = Dimensions.get('window')
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Toast } from 'native-base'
import moment from 'moment'
import request from '../helpers/request'
import DayPicker, { weekDays } from '../components/DayPicker'
import capitalizeWords from '../helpers/capitalizeWords'
import { connect } from 'react-redux'
import { datasetSelector } from '../redux/selectors'
import BottomNavigationBar from '../components/BottomNavigationBar'

class EvaluationScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      objectiveLoaded: false,
    }
  }
  componentDidMount() {
    this.init()
  }
  init = async () => {
    let objective = this.props.objectives[this.props.navigation.getParam('objective_id')]
    /* 
    console.log('OBJECTIVE ===> ', {
      objectives: this.props.objectives, 
      objective_id: this.props.navigation.getParam('objective_id'), 
      objective
    }) */
    if (!objective) {
      Toast.show({
        text: global.language['no_data'],
        duration: 4000,
        type: 'danger',
      })
      return this.props.navigation.goBack()
    }
    //console.log('objective ===> ', objective)

    let days = { ...weekDays } //spread to avoid unexpected persistence
    days['Monday'] = objective['evaluation_monday']
    days['Tuesday'] = objective['evaluation_tuesday']
    days['Wednesday'] = objective['evaluation_wednesday']
    days['Thursday'] = objective['evaluation_thursday']
    days['Friday'] = objective['evaluation_friday']
    days['Saturday'] = objective['evaluation_saturday']
    days['Sunday'] = objective['evaluation_sunday']
    await this.setState(state => {
      state = {
        ...state,
        isSendingEvaluation: false,
        note: '',
        description: objective['description'],
        auto_evaluation: objective['auto_evaluation'],
        expand2: false,
        ach: true,
        evaluations: null,
        notes: [],
        canEvaluateToday: false,
        includeNote: false,
        usersInfo: {},
        submitValue: {
          id: objective['id'],
          objectiveName: objective['objective'],
          objective: '',
          share_results: false,
          include_note: false,
          days,
        },
      }

      return state
    })
    this.index = 0
    this.user = null
    this.token = null
    this.tokenType = null
    this.getObjectiveNotes(objective['id'])

    this.checkIfCanEvaluate()
    this.setState({ objectiveLoaded: true })
  }
  checkIfCanEvaluate = async () => {
    const objective_id = this.state['submitValue']['id']
    const onlyNotes = this.props.navigation.getParam('onlyNotes')
    const selfEvaluated = this.props.navigation.getParam('selfEvaluated')

    if (onlyNotes || (!selfEvaluated && !this.state['auto_evaluation'])) return

    await this.setState({ loading: true })
    let { error, data } = await request({
      url: 'actions/can_evaluate_today',
      method: 'POST',
      data: {
        lang: this.props.app_configuration.language,
        imei: this.props.imei,
        timezone: this.props.timezone,
        objective_id,
      },
      //debug: true,
    })

    this.setState({
      loading: false,
      canEvaluateToday: data?.can_evaluate,
    })
  }

  getObjectiveNotes = async objective_id => {
    newObj = {}
    newObj['lang'] = this.props.app_configuration.language
    newObj['imei'] = this.props.imei
    newObj['timezone'] = this.props.timezone

    this.setState({ loading: true })
    let formdata = new FormData()
    formdata.append('lang', newObj['lang'])
    formdata.append('imei', newObj['imei'])
    formdata.append('timezone', newObj['timezone'])
    formdata.append('objective_id', objective_id)
    //console.log(formdata);

    let { data = [] } = await request({
      url: 'actions/get_objective_notes',
      method: 'POST',
      data: formdata,
      //debug: true,
    })

    let usersInfo = await request({
      url: 'mobile/users/info',
      method: 'POST',
      data: { ids: data.map(({ muser_id }) => muser_id) },
    })

    this.setState(state => {
      usersInfo['data'].map(({ id, name }) => {
        state['usersInfo'][id] = { id, name }
      })
      state['loading'] = false
      state['notes'] = data.reverse()
      return state
    })
  }
  saveEvaluation = async () => {
    newObj = {}
    newObj['lang'] = this.props.app_configuration.language
    newObj['imei'] = this.props.imei
    newObj['timezone'] = this.props.timezone

    let data = {
      lang: newObj['lang'],
      imei: newObj['imei'],
      timezone: newObj['timezone'],
      objective_id: this.state.submitValue.id,
      achieved: this.state.ach,
      include_note: this.state.includeNote,
      note: this.state.note,
      canEvaluate: this.canEvaluateToday(),
    }
    /*
    var form_data = new FormData()
     
    Object.keys(data).map(field_name => {
      form_data.append(field_name, data[field_name])
    })
 */
    await this.setState({ isSendingEvaluaton: true })
    let { error } = await request({
      url: 'actions/create_evaluation',
      method: 'POST',
      data,
      //debug: true,
    })
    await this.setState({ isSendingEvaluaton: false })
    if (!error) {
      this.props.navigation.replace('ObjectiveDetailsScreen', {
        objective_id: this.state.submitValue.id,
      })
      await Toast.show({
        text: this.canEvaluateToday() ? global?.['language']?.['objective_evaluated_successfully'] : global?.['language']?.['note_created_successfully'],
        duration: 2000,
        type: 'success',
      })
    } else {
      await Toast.show({
        text: global?.['language']?.['unexpected_error'],
        duration: 2000,
        type: 'danger',
      })
      this.getObjectiveNotes(this.state.submitValue.id)
    }

    /*console.log(
      'src/screens/Action/EvaluationScreen saveEvaluation ===>',
      error,
    );
    */
  }

  renderEvaluationDaysLabel = () => (
    <Text
      style={{
        fontSize: 18,
        color: global.txtWhiteColor,
        fontWeight: '500',
        width: '100%',
        textAlign: 'center',
        marginTop: 15,
        marginBottom: 15,
      }}
    >
      {global?.language?.action_evaluation_days}
    </Text>
  )
  renderAchievedOrNot = () => {
    if (this.canEvaluateToday())
      return (
        <View
          style={{
            width: '90%',
            flexDirection: 'row',
            height: 40,
            borderColor: 'white',
            borderWidth: 1,
            borderRadius: 12,
            marginTop: 25,
          }}
        >
          <TouchableOpacity
            onPress={() => this.setState({ ach: true })}
            style={{
              width: '50%',
              height: '100%',
              backgroundColor: this.state.ach ? global.mainColor : null,
              justifyContent: 'center',
              alignItems: 'center',
              borderTopLeftRadius: 12,
              borderBottomLeftRadius: 12,
            }}
          >
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                fontWeight: '500',
              }}
            >
              {global?.language?.label_achieve}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.setState({ ach: false })}
            style={{
              width: '50%',
              height: '100%',
              backgroundColor: !this.state.ach ? global.mainColor : null,
              justifyContent: 'center',
              alignItems: 'center',
              borderTopRightRadius: 12,
              borderBottomEndRadius: 12,
            }}
          >
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                fontWeight: '500',
              }}
            >
              {global?.language?.label_not_achieve}
            </Text>
          </TouchableOpacity>
        </View>
      )
  }

  canEvaluateToday = () => this.state['canEvaluateToday']
  saveButtonIsDisabled = () => {
    let isDisabled = false
    if (this.state.note.trim().length < 3) isDisabled = true
    if (this.state.isSendingEvaluation) isDisabled = true

    return isDisabled
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

  renderContent = () => {
    if (!this.state.objectiveLoaded) return <ActivityIndicator />

    return (
      <View
        style={{
          width: '100%',
          borderRadius: 12,
          justifyContent: 'center',
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
          {global?.language?.title_objective}
        </Text>
        <Text
          style={{
            fontSize: 16,
            marginTop: 15,
            color: global.txtWhiteColor,
            fontWeight: '300',
            width: '100%',
            textAlign: 'center',
          }}
        >
          {this.state.submitValue.objectiveName}
        </Text>
        <View
          style={{
            backgroundColor: global.mainColor,
            width: '90%',
            height: 1,
            marginTop: 5,
          }}
        />
        {this.state.description !== null && (
          <View
            style={{
              width: '90%',
              marginVertical: 20,
              borderBottomColor: global.mainColor,
              borderBottomWidth: 1,
              paddingBottom: 20,
            }}
          >
            <Text
              style={{
                fontStyle: 'italic',
                textAlign: 'center',
                color: 'white',
              }}
            >
              {this.state.description}
            </Text>
          </View>
        )}
        {this.renderAchievedOrNot()}
        <DayPicker label={global?.language?.days_subtitle} days={this['state']['submitValue']['days']} disabled hideSelectAllButton />

        <TextInput
          returnKeyType='done'
          style={{
            height: 40,
            fontSize: 16,
            borderColor: 'white',
            color: '#fff',
            borderWidth: 1,
            width: '100%',
            marginTop: 20,
            borderRadius: 10,
            height: width / 4,
            textAlignVertical: 'top',
            padding: 20,
          }}
          onChangeText={note => this.setState({ note })}
          value={this.state.note}
          placeholder={global?.language?.label_comments}
          placeholderTextColor={'grey'}
        />

        {!this.canEvaluateToday() && (
          <TouchableOpacity
            disabled={this.saveButtonIsDisabled()}
            onPress={() => this.saveEvaluation()}
            style={{
              width: '27%',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              height: 35,
              backgroundColor: !this.saveButtonIsDisabled() ? global.mainColor : 'gray',
              marginLeft: '70%',
              marginTop: 10,
            }}
          >
            {this.state.isSendingEvaluation ? <ActivityIndicator /> : <Text style={{ color: 'white', fontSize: 18 }}>{global?.language?.label_save}</Text>}
          </TouchableOpacity>
        )}
        {/* this.canEvaluateToday() && (

          <View
          style={{
            alignItems: 'center',
            width: '100%',
            height: 35,
            backgroundColor: 'black',
            marginTop: 25,
            borderRadius: 10,
            flexDirection: 'row',
          }}
        >
          <Text style={[globalStyles.mainText, { width: '80%', marginLeft: 15 }]}>{global?.language?.include_note}</Text>
          <Switch
            value={this.state.includeNote}
            style={{ height: 30 }}
            trackColor={{ true: global.mainColor, false: 'grey' }}
            onValueChange={includeNote => this.setState({ includeNote })}
          />
        </View> 

      ) */}
        <View style={{ width: '100%', marginTop: 15, marginBottom: 80 }}>
          <FlatList
            data={this.state['notes']}
            renderItem={({ item }) => (
              <View
                style={{
                  width: '100%',
                  //height: 50,
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
                  {!!this.state['usersInfo'][item.muser_id] && (
                    <Text
                      style={{
                        fontSize: 15,
                        color: 'grey',
                        width: '50%',
                        textAlign: 'left',
                      }}
                    >
                      {this.state['usersInfo'][item.muser_id]['name']}
                    </Text>
                  )}
                  <Text
                    style={{
                      fontSize: 15,
                      color: 'grey',
                      width: '25%',
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
                    color: 'white',
                    width: '100%',
                  }}
                >
                  {item.note}
                </Text>
              </View>
            )}
            keyExtractor={item => item.id}
          />
        </View>
        {this.canEvaluateToday() && (
          <TouchableOpacity
            disabled={this.state.isSendingEvaluation}
            onPress={() => this.saveEvaluation()}
            style={{
              width: '27%',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              height: 35,
              backgroundColor: !this.state.isSendingEvaluation ? global.mainColor : 'gray',
              marginTop: 20,
              marginBottom: 60,
            }}
          >
            {this.state.isSendingEvaluation ? <ActivityIndicator /> : <Text style={{ color: 'white', fontSize: 18 }}>{global?.language?.label_send}</Text>}
          </TouchableOpacity>
        )}
      </View>
    )
  }

  render() {
    return (
      <View style={[globalStyles.informationLayout, { width: '100%', height: '100%' }]}>
        <SafeAreaView
          style={{
            flex: 1,
            alignItems: 'stretch',
            justifyContent: 'flex-start',
            paddingBottom: 75,
          }}
        >
          <KeyboardAwareScrollView>
            {this.renderHeader()}
            <View style={{ width: '100%', alignItems: 'center', marginTop: 20 }}>
              <View style={{ width: '90%' }}>{this.renderContent()}</View>
            </View>
          </KeyboardAwareScrollView>
          <BottomNavigationBar hasPlay={this.state.hasPlay} hasBack invisiblePlayButton />
        </SafeAreaView>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  objectives: datasetSelector(state, 'objectives'),
  imei: datasetSelector(state, 'imei'),
  timezone: datasetSelector(state, 'timezone'),
  app_configuration: datasetSelector(state, 'app_configuration'),
})
const mapDispatchToProps = dispatch => ({
  //setObjectiveStatsAction: (data, id) => dispatch(setDatasetToReducer(data, 'objectives_stats', { key: id })),
})

export default connect(mapStateToProps, mapDispatchToProps)(EvaluationScreen)
