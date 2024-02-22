import React from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { SafeAreaView } from 'react-navigation'
import { Button } from 'native-base'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { globalStyles } from '../../helpers/styles'
import request from '../../helpers/request'
import { connect } from 'react-redux'
import { setDatasetListToObjectReducer } from '../../redux/actions'
import { fetchFocusingMediumsSagaAction } from '../../sagas/actions'
import { datasetSelector } from '../../redux/selectors'
import { NavigationEvents } from 'react-navigation'
import SearchInput from '../../components/SearchInput'
import CategoryList from '../../components/CategoryList'
import CheckIcon from 'img/home-action.png'
import ScreenTopLoader from '../../components/ScreenTopLoader'
import capitalizeWords from '../../helpers/capitalizeWords'

class HabitsListScreen extends React.Component {
  state = {
    loading: false,
    data: null,
    title: '',
    atention: [],
    block: [],
    perception: [],
    searchText: '',
  }
  arrayholder = []
  fetchDatas = async () => {
    await this.setState({ loading: true })
    this.props.fetchFocusingMediumsAction()
    await this.fetchHabits()
    await this.fetchActionHabits()
    await this.setState({ loading: false })
  }
  fetchHabits = async () => {
    let { data, error } = await request({
      url: 'habits',
      method: 'POST',
      //debug: true,
    })

    if (!error && !!data && data.length) this.props.setHabitsAction(data)
  }
  fetchActionHabits = async () => {
    let imei = await AsyncStorage.getItem('user')
    imei = JSON.parse(imei)

    let formdata = new FormData()
    formdata.append('lang', this.props.app_configuration.language)
    formdata.append('imei', this.props.imei)
    formdata.append('timezone', this.props.timezone)

    let { data, error } = await request({
      url: 'actions/get_action_habits_list',
      method: 'POST',
      data: formdata,
      //debug: true,
    })
    if (!error && !!data) this.props.setActionHabitsAction(data)
  }
  searchFilterFunction = searchText => this.setState({ searchText })
  habitIsValidForSearchedText = id => {
    let habit = this.props.habitsObj[id]
    let search_text = this.state.searchText.toUpperCase()
    let fulltext = `${habit.action_description} ${habit.action_title} ${habit.content}`.toUpperCase()
    return fulltext.indexOf(search_text) > -1
  }
  habitIsInActionHabits = id => {
    let existsHabitInActionHabits = false
    this.props.action_habits.some(action_habit => {
      if (+action_habit['habit_id'] === id) {
        existsHabitInActionHabits = true
        return true
      }

      return false
    })

    return existsHabitInActionHabits
  }
  habitsList = () => this.props.habits
  habitsByFocusingMediumId = focusing_medium_id_to_filter => {
    let habits = this.habitsList().filter(habit => habit['enabled'])
    let filtered_habits = habits.filter(({ focusing_medium_id }) => {
      //console.log(`COMPARING ===> ${focusing_medium_id}=${focusing_medium_id_to_filter}`, focusing_medium_id, focusing_medium_id_to_filter)
      return focusing_medium_id === focusing_medium_id_to_filter
    })
    //console.log('habitsByFocusingMediumId ===> ', { habits, filtered_habits })
    return filtered_habits
  }
  focusingMediumsList = () => {
    let focusing_mediums = []
    focusing_mediums = this.props.focusing_mediums.filter(({ code }) => code !== 'mental_focus')
    focusing_mediums.push({ id: null, code: '' })
    focusing_mediums.reverse()
    return focusing_mediums
  }

  convertHabitInObjective = habit => {
    let params = {
      habit: {
        objectiveName: habit.action_title,
        description: habit.action_description,
        trigger: habit.action_trigger,
        habitId: habit.id,
      },
    }
    this.props.navigation.navigate('CreateObjectiveScreen', params)
  }
  htmlViewerBottonButtonContent = habit => {
    if (!this.habitIsInActionHabits(habit.id))
      return (
        <>
          <Button
            onPress={() => this.convertHabitInObjective(habit)}
            style={{
              backgroundColor: global.mainColor,
              paddingHorizontal: 20,
              marginRight: 7,
            }}
          >
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>{capitalizeWords(global?.['language']?.['convert_to_habit'])}</Text>
          </Button>
          <TouchableOpacity onPress={() => this.convertHabitInObjective(habit)}>
            <Image source={CheckIcon} style={{ width: 36, height: 36, alignSelf: 'center' }} />
          </TouchableOpacity>
        </>
      )
  }
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
        <ScreenTopLoader isLoading={this.state.loading} />
        <NavigationEvents
          onWillFocus={payload => {
            this.fetchDatas()
          }}
        />
        {/* <View style={globalStyles.titleBar}>
          <Text style={{ fontSize: 20, color: 'white' }}>{this.state.title}</Text>
        </View> */}
        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={{
            justifyContent: 'flex-start',
            alignItems: 'stretch',
            padding: 10,
          }}
          scrollEnabled
          keyboardShouldPersistTaps='handled'
        >
          <SearchInput /* isLoading={this.state.loading} */ onChangeText={this.searchFilterFunction} value={this.state.searchText} />
          <View style={[globalStyles.infoBg, { marginBottom: 100 }]}>
            <CategoryList
              isLoading={this.state.loading}
              categoriesList={this.focusingMediumsList()}
              renderCategoryLabel={focusing_medium => capitalizeWords(global.language[focusing_medium.code])}
              renderCategoryListItemLabel={habit => habit.title}
              listItemsFromCategory={focusing_medium => this.habitsByFocusingMediumId(focusing_medium.id)}
              categoryListItemIsChecked={habit => this.habitIsInActionHabits(habit.id)}
              categoryListItemIsAllowed={habit => this.habitIsValidForSearchedText(habit.id)}
              sort={(prevHabit, postHabit) => prevHabit['order_by'] - postHabit['order_by']}
              onPressCategoryListItem={habit => {
                this.props.navigation.navigate('HtmlViewerScreen', {
                  item: {
                    id: habit.id,
                    title: habit.action_title,
                    description: habit.action_description,
                    trigger: habit.action_trigger,
                    content: habit.content,
                  },
                  type: this.state.title,
                  bottonButtonContent: !!habit.focusing_medium_id ? this.htmlViewerBottonButtonContent(habit) : null,
                })
              }}
            />
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = state => ({
  app_configuration: datasetSelector(state, 'app_configuration'),
  habitsObj: datasetSelector(state, 'habits'),
  imei: datasetSelector(state, 'imei'),
  timezone: datasetSelector(state, 'timezone'),
  habits: datasetSelector(state, 'habits', { list_format: true }),
  action_habits: datasetSelector(state, 'action_habits', { list_format: true }),
  focusing_mediums: datasetSelector(state, 'focusing_mediums', { list_format: true }),
})
const mapDispatchToProps = dispatch => ({
  setHabitsAction: data => dispatch(setDatasetListToObjectReducer(data, 'habits')),
  setActionHabitsAction: data => dispatch(setDatasetListToObjectReducer(data, 'action_habits')),
  fetchFocusingMediumsAction: () => dispatch(fetchFocusingMediumsSagaAction()),
})

export default connect(mapStateToProps, mapDispatchToProps)(HabitsListScreen)
