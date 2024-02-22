import React, { Component } from 'react'
import { View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import SegmentedControl from '@react-native-community/segmented-control'
import * as fn from 'helpers/scripts'
import request from '../helpers/request'
//import Debug from 'react-native-json-tree'
import { connect } from 'react-redux'
import { datasetSelector } from '../redux/selectors'
import { setDatasetListToObjectReducer } from '../redux/actions'
import {
  fetchFocusingMediumsSagaAction,
  fetchUsersPendingQuestionsSagaAction,
  callbackVoidSagaAction,
  fetchMentalFocusPercentageSagaAction,
} from '../sagas/actions'
import { NavigationEvents } from 'react-navigation'
import BottomNavigationBar from '../components/BottomNavigationBar'
import { Toast } from 'native-base'
class FocusQuestionaryScreen extends Component {
  state = {
    loading: false,
    selected_answers_indexs: {},
    focus: 0,
    graph: {
      percepcion: 0,
      bloqueo: 0,
      atencion: 0,
    },
  }
  componentDidMount() {
    if (!this.questions().length) this.props.navigation.goBack()
  }
  fetchDatas = async () => {
    await this.setState({ loading: true })
    this.props.fetchDatas(async () => {
      await this.fetchAnswersTypes()
      await this.setState({ loading: false })
    })
  }
  fetchAnswersTypes = async () => {
    let { data, error } = await request({
      url: 'actions/answers_types',
      method: 'POST',
      //debug: true,
    })
    if (!error && !!data) this.props.setAnswersTypesAction(data)
  }

  sendQuestionaryAnswers = async () => {
    let selectedAnswers = this.questionaryResult()
    await this.setState({ loading: true })
    let { error } = await request({
      url: 'mobile/users/submit_focus_questionary_answers',
      method: 'POST',
      data: selectedAnswers,
      //debug: true,
    })
    await this.setState({ loading: false })

    if (error) {
      await Toast.show({
        text: global?.language?.unexpected_error,
        type: 'danger',
        duration: 3000,
      })
      return
    }

    await Toast.show({
      text: global?.language?.answers_were_sended_successfully,
      type: 'success',
      duration: 3000,
    })
    this.props.setQuestionsAction([])
    this.props.fetchMentalFocusPercentage()
    this.props.navigation.replace('FocusingMediumsStatsScreen')
  }

  updateArrayItem = (question_index, answer_index) =>
    this.setState(state => {
      state['questions'][question_index] = answer_index
      return state
    })
  questions = () => {
    let questions = Object.keys(this.props.questions).map(id => this.props.questions[id])
    //console.log('QUESTIONS ===> ', questions)
    return questions
  }

  renderQuestions = (questions = [], answers_types = []) => {
    if (!questions?.length || !answers_types?.length)
      return (
        <Text
          style={{
            fontSize: 16,
            paddingHorizontal: 20,
            marginBottom: 20,
            color: 'white',
            textAlign: 'center',
          }}
        >
          {global?.language?.no_data}
        </Text>
      )

    return questions.map((question, key) => {
      return (
        <>
          <Text
            style={{
              fontSize: 16,
              paddingHorizontal: 20,
              marginBottom: 20,
              color: 'white',
            }}
          >
            {`${key + 1}. ${question.description}`}
          </Text>

          <SegmentedControl
            selectedIndex={this.state.selected_answers_indexs?.[question.id] || 0}
            values={answers_types.map(this.answersTypeCodeInitials)}
            onChange={event => {
              let selected_index = event.nativeEvent.selectedSegmentIndex
              this.setState(state => {
                state['selected_answers_indexs'][question.id] = selected_index
                return state
              })
            }}
            style={{ height: 50, marginBottom: 50 }}
            backgroundColor='#CCCCCC'
            tintColor={global.mainColor}
            fontStyle={{ fontSize: 16, color: '#3c3c3c' }}
            activeFontStyle={{ color: 'white' }}
          />
        </>
      )
    })
  }
  questionaryResult = () => {
    let answers = []
    const answers_types = this.answersTypesListOrderedByOrder()

    this.questions().map(question => {
      let selected_answer_index = this.state.selected_answers_indexs[question.id] || 0
      let selected_answer_type = answers_types[selected_answer_index]
      answers.push({
        answer_type_id: selected_answer_type['id'],
        question_id: question['id'],
        code: selected_answer_type['code'],
      })
    })

    return answers
  }
  answersTypes = () => Object.keys(this.props.answers_types).map(id => this.props.answers_types[id])
  answersTypesListOrderedByOrder = () =>
    this.answersTypes().sort((a, b) => {
      if (a.order < b.order) return -1

      if (a.order > b.order) return 1

      return 0
    })

  renderAnswersTypesGuide = answers_types => {
    if (!answers_types?.length) return

    return (
      <View
        style={{
          backgroundColor: global.mainColor,
          borderWidth: 2,
          borderColor: '#999999',
          marginHorizontal: 30,
          marginBottom: 50,
          padding: 10,
        }}
      >
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 16,
            marginBottom: 7,
            color: 'white',
          }}
        >
          {global?.language?.guide_for_answers}
        </Text>
        {answers_types.map(answer_type => {
          let codeWordsInitials = this.answersTypeCodeInitials(answer_type)
          let codeInWords = this.answerTypeCodeInWords(answer_type)
          //console.log('ANSWER-TYPE ===> ', { answer_type, codeWordsInitials, codeInWords })
          return <Text style={{ color: 'white' }}>{`${codeWordsInitials}: ${codeInWords}`}</Text>
        })}
      </View>
    )
  }

  renderSaveAnswersButton = (answers_types, questions) => {
    if (answers_types?.length && questions?.length)
      return (
        <TouchableOpacity
          disabled={this.state.loading}
          onPress={this.sendQuestionaryAnswers}
          style={{
            width: 250,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            height: 35,
            backgroundColor: !this.state.loading ? global.mainColor : 'gray',
            marginTop: 20,
            marginBottom: 100,
          }}
        >
          {this.state.loading ? <ActivityIndicator animating={true} /> : <Text style={{ color: 'white', fontSize: 18 }}>{global?.language?.send_response}</Text>}
        </TouchableOpacity>
      )
  }

  answerTypeCodeInWords = answer_type => {
    let code = answer_type?.['code']?.toLowerCase()
    let translated_words = global.language[code] || ''
    return translated_words
  }

  answersTypeCodeInitials = answer_type => {
    let code = answer_type?.['code'].toLowerCase()
    let translated_words = global.language[code] || ''
    return translated_words
      .split(' ')
      ?.map(word => word.charAt(0).toUpperCase())
      ?.join('')
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
        {global?.language?.focusing_questionary.toUpperCase()}
      </Text>
    </View>
  )

  render() {
    const questions = this.questions()
    const answers_types = this.answersTypesListOrderedByOrder()
    //console.log('RENDER ===> ', { answers_types, questions })

    return (
      <View style={[styles.informationLayout, { width: '100%', height: '100%' }]}>
        <NavigationEvents onWillFocus={payload => this.fetchDatas()} />
        <SafeAreaView
          style={{
            flex: 1,
            alignItems: 'stretch',
            justifyContent: 'flex-start',
          }}
        >
          {this.renderHeader()}
          {this.state.loading && <ActivityIndicator />}
          <ScrollView
            contentContainerStyle={{
              width: '100%',
              alignItems: 'center',
              marginTop: 10,
            }}
          >
            <View
              style={{
                width: '95%',
                backgroundColor: 'black',
                marginTop: 8,
                borderRadius: 10,
              }}
            >
              {this.renderAnswersTypesGuide(answers_types)}
              {this.renderQuestions(questions, answers_types)}
              {/* <Debug data={this.state} /> */}
            </View>
            {this.renderSaveAnswersButton(answers_types, questions)}
          </ScrollView>
          <BottomNavigationBar hasPlay={this.state.hasPlay} hasBack />
        </SafeAreaView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  screen: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
  },
  titleContainer: {},
  title: {
    textAlign: 'center',
    color: 'white',
    fontSize: 22,
  },
  button: {
    backgroundColor: global.mainColor,
    borderRadius: 10,
    height: 75,
    marginVertical: 20,
    width: '60%',
    justifyContent: 'center',
  },
  text: {
    color: global.txtWhiteColor,
    fontSize: 22,
    textAlign: 'center',
  },
})

const mapStateToProps = state => ({
  questions: datasetSelector(state, 'questions', { list_format: true }),
  answers_types: datasetSelector(state, 'answers_types', { list_format: true }),
  focusing_mediums: datasetSelector(state, 'focusing_mediums', { list_format: true }),
})
const mapDispatchToProps = dispatch => ({
  setQuestionsAction: data => dispatch(setDatasetListToObjectReducer(data, 'questions')),
  setAnswersTypesAction: data => dispatch(setDatasetListToObjectReducer(data, 'answers_types')),
  fetchFocusingMediums: () => dispatch(fetchFocusingMediumsSagaAction()),
  fetchUsersPendingQuestionsSagaAction: () => dispatch(fetchUsersPendingQuestionsSagaAction()),
  fetchMentalFocusPercentage: () => dispatch(fetchMentalFocusPercentageSagaAction()),
  fetchDatas: callback => dispatch(callbackVoidSagaAction([fetchFocusingMediumsSagaAction(), fetchUsersPendingQuestionsSagaAction()], callback)),
})

export default connect(mapStateToProps, mapDispatchToProps)(FocusQuestionaryScreen)
