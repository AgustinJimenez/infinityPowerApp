import React from 'react'
import { Text, View, RefreshControl } from 'react-native'
import HomeBase from '../../components/HomeBase'
import capitalizeWords from '../../helpers/capitalizeWords'
import { primaryColor, scale, globalStyles } from '../../helpers/styles'
import PillarsActivitiesListItems from '../../components/PillarsActivitiesListItems'
import { NavigationActions, NavigationEvents, StackActions } from 'react-navigation'
import { connect } from 'react-redux'
import { fetchTodayActivitiesDatasSagaAction } from '../../sagas/actions'
import { datasetSelector } from '../../redux/selectors'
import EvaluationInputs from './EvaluationInputs'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { setDatasetToReducer } from '../../redux/actions'
import NoteInputs from './NoteInputs'
import request from '../../helpers/request'
import { Toast } from 'native-base'
import moment from 'moment'
import EvaluationReport from './EvaluationReport'
import ModalImagePreview from '../../components/ModalImagePreview'
import AchievementSwitch from './EvaluationReport/AchievementSwitch'
import ClosingReport from './ClosingReport'
import TodayLabels from './TodayLabels'
import CompletedActivitiesProgressBars from './CompletedActivitiesProgressBars'

const timeToInt = (time = '') => {
  return +time.split(':').join('')
}
class TodayActivitiesScreen extends React.Component {
  onFetchDatas = () => {
    this.props.reloadTodaysActivities()
  }

  today_activities = () => {
    let today_activities = [...this.props.today_activities] //spread because some unexpected hook behavior
    today_activities = today_activities.map((activity, key) => {
      activity['dataset_index'] = key
      return activity
    })
    return today_activities
  }

  onFocusTestPressed = () => this.props.navigation.navigate('FocusQuestionaryScreen')

  onEvaluationPressed = (routineSelectedId, routine_configuration_id) =>
    this.props.navigation.dispatch(
      StackActions.reset({
        index: 2,
        actions: [
          NavigationActions.navigate({ routeName: 'Main' }),
          NavigationActions.navigate({ routeName: 'MeditationHome' }),
          NavigationActions.navigate({
            routeName: 'PrePlayRoutineScreen',
            params: { routineSelectedId, routine_configuration_id },
          }),
        ],
      }),
    )

  activities = () => {
    let activities = []
    let today_activities = []

    today_activities = this.today_activities()

    //console.log('HERE ===> ', { today_activities })

    if (!!this.props.questions?.length)
      today_activities?.unshift?.({
        title: capitalizeWords(global?.language?.focus_test),
        type: 'focus_test',
        onPressCard: this.onFocusTestPressed,
      })

    activities = today_activities?.map?.(
      ({
        title = '--',
        extra_title = null,
        subtitles = '',
        time = '',
        type = '',
        data = { id: 0 },
        onPressCard = null,
        onPressTitle = null,
        notification_id = 0,
        subtitlesStyle = {},
        titleStyle = {},
        dataset_index,
        id,
      }) => {
        let icon = ''
        let border_color = ''
        let right_title = null

        switch (type) {
          case 'self_evaluation':
            title = global.language['auto_evaluation']
            icon = 'focus'
            break

          case 'self_evaluation_report':
            //console.log('self_evaluation_report ===> ', data)
            title = capitalizeWords(global.language['auto_evaluation'], { firstOnly: true })
            icon = 'focus'
            //time = 'some'
            break

          case 'evaluation':
            title = capitalizeWords(global.language['evaluation']) + ' ' + capitalizeWords(global.language['to']) + ' ' + data['objective']['user']['name']
            icon = 'focus'
            break

          case 'evaluation_report':
            var user = this.props.getUserById(data['muser_id'])
            title = capitalizeWords(global.language['evaluation']) + ' ' + capitalizeWords(global.language['of']) + ' ' + user?.['name']
            extra_title = <AchievementSwitch evaluation_id={data['id']} />
            break

          case 'closing_report':
            title = capitalizeWords(global?.language?.['default_evaluations'], { firstOnly: true })
            subtitles = capitalizeWords(global?.language?.['evaluations_not_carried_out_are_considered_as_not_achieved'], { firstOnly: true })
            subtitlesStyle = { fontWeight: '300', fontSize: scale(0.4) }
            break

          case 'create_routine_reminder':
            onPressCard = async () => this.props.navigation.navigate('MeditationHome', { createRoutineDialogIsOpen: !!data['user_does_not_have_routines'] })
            break
          case 'routine_configuration':
            icon = 'play'
            onPressTitle = () => this.onEvaluationPressed(data['muser_routine_id'], data['id'])
            break

          case 'friend_made_note':
            var user = this.props.getUserById(data['muser_id'])
            icon = user?.['image']
            break

          case 'focus_test':
            icon = 'focus'
            border_color = primaryColor
            break

          case 'article':
            title = capitalizeWords(global?.language?.infinitepower_note)
            onPressCard = async activity => {
              var { data, error } = await request({
                url: 'actions/user_has_viewed_article',
                method: 'POST',
                data: {
                  article_id: activity.data.id,
                },
              })
              if (error)
                return Toast.show({
                  text: global?.['language']?.['unexpected_error'],
                  type: 'danger',
                  duration: 4000,
                })
              this.onFetchDatas()
              this.props.navigation.navigate('HtmlViewerScreen', {
                item: {
                  id: data.id,
                  title: activity.data.title,
                  description: activity.data.title,
                  content: activity.data.content,
                },
                type,
              })
            }
            border_color = 'white'
            break

          default:
            break
        }

        if (!!time && typeof time === 'string' && !right_title) right_title = !!time?.substring ? time?.substring(0, 5) : ''

        let activity = {
          title,
          extra_title,
          subtitles,
          right_title,
          type,
          icon,
          data,
          border_color,
          onPressTitle,
          onPressCard,
          notification_id,
          subtitlesStyle,
          titleStyle,
          dataset_index,
          id,
        }
        //console.log('HERE= ==> ', activity)
        return activity
      },
    )
    activities = this.orderActivities(activities)
    //console.log('ORDERED-ACTIVITIES ===> ', activities)
    return activities
  }

  orderActivities = (activities = []) => {
    let activities_with_time = []
    let activities_without_time = []
    let past_activities = []
    let future_activities = []
    let time_num_now = +moment().format('HHmm')

    activities.map(activity => {
      if (!!activity['right_title'] && typeof activity['right_title'] === 'string' && Number.isInteger(timeToInt(activity['right_title'])))
        activities_with_time.push(activity)
      else activities_without_time.push(activity)
    })
    activities_with_time.map(activity => {
      let right_title = activity['right_title']
      if (right_title.includes('00:')) right_title = right_title.replace('00:', '24:')

      if (time_num_now >= timeToInt(right_title)) past_activities.push(activity)
      else future_activities.push(activity)
    })
    past_activities.sort((prevAct, nextAct) => {
      let right_title = prevAct['right_title']
      if (right_title.includes('00:')) right_title = right_title.replace('00:', '24:')

      let prevTimeDiff = time_num_now - timeToInt(right_title)
      let nextTimeDiff = time_num_now - timeToInt(nextAct['right_title'])

      return prevTimeDiff - nextTimeDiff
    })
    future_activities.sort((prevAct, nextAct) => {
      let right_title = prevAct['right_title']
      if (right_title.includes('00:')) right_title = right_title.replace('00:', '24:')

      let prevTimeDiff = timeToInt(right_title) - time_num_now
      let nextTimeDiff = timeToInt(nextAct['right_title']) - time_num_now

      return prevTimeDiff - nextTimeDiff
    })

    activities_with_time = [...past_activities, ...future_activities]
    activities = [...activities_without_time, ...activities_with_time]

    activities = activities
      .sort((prevAct, nextAct) => (prevAct['type'] === 'article' ? -1 : 0))
      .sort((prevAct, nextAct) => (prevAct['type'] === 'focus_test' ? -1 : 0))

    return activities
  }

  render = () => {
    let activities = this.activities()
    //console.log('TodayActivitiesScreen ===> ', { activities })
    return (
      <HomeBase hasNotificationBellIcon={false} showActionButton={false} hasBackButton onPressNotificationsBell={() => {}}>
        <NavigationEvents onDidFocus={() => this.onFetchDatas()} />
        <KeyboardAwareScrollView
          refreshControl={
            <RefreshControl
              tintColor='white'
              refreshing={this.props.is_refreshing_today_activity_list}
              progressViewOffset={0}
              onRefresh={() => this.onFetchDatas()}
            />
          }
        >
          <TodayLabels containerStyle={{ alignSelf: 'center', marginTop: scale(0.6) }} />
          <Text style={globalStyles.title}>{capitalizeWords(global?.language?.today_activities)}</Text>
          <CompletedActivitiesProgressBars />
          <PillarsActivitiesListItems
            items={activities}
            useScroll={false}
            renderBottomSection={({ type, data, dataset_index, id }, key) => {
              let component_key = `${type}_${data?.id}`
              if (type === 'evaluation' || type === 'self_evaluation')
                return (
                  <EvaluationInputs evaluation_id={data['id']} reloadScreen={() => this.onFetchDatas()} key={component_key} dataset_index={dataset_index} />
                )
              else if (type === 'friend_made_note') {
                return (
                  <NoteInputs
                    data={data['source']}
                    activity_id={id}
                    notification_id={data['id']}
                    reloadScreen={() => this.onFetchDatas()}
                    key={component_key}
                  />
                )
              } else if (type === 'self_evaluation_report' || type === 'evaluation_report')
                return (
                  <EvaluationReport
                    evaluation_id={data['id']}
                    reloadScreen={() => this.onFetchDatas()}
                    key={component_key}
                    type={type}
                    dataset_index={dataset_index}
                  />
                )
              else if (type === 'closing_report') return <ClosingReport data={data} reloadScreen={() => this.onFetchDatas()} key={component_key} type={type} />
            }}
          />
          <View style={{ height: scale(10) }} />
        </KeyboardAwareScrollView>
        <ModalImagePreview
          showPreview={this.props.today_activities_photo_preview_must_show}
          source={this.props.today_activities_photo_preview_source}
          onClose={() => this.props.setNewPhotoPreviewShow(false)}
        />
      </HomeBase>
    )
  }
}

const mapStateToProps = state => ({
  today_activities_photo_preview_must_show: datasetSelector(state, 'today_activities_photo_preview_must_show'),
  today_activities_photo_preview_source: datasetSelector(state, 'today_activities_photo_preview_source'),
  is_refreshing_today_activity_list: datasetSelector(state, 'is_refreshing_today_activity_list'),
  today_activities: datasetSelector(state, 'today_activities') || [],
  getUserById: id => datasetSelector(state, 'users', { id }),
  questions: datasetSelector(state, 'questions', { list_format: true }),
})
const mapDispatchToProps = dispatch => ({
  setNewPhotoPreviewShow: value => dispatch(setDatasetToReducer(value, 'today_activities_photo_preview_must_show')),
  setNewPhotoPreviewSource: value => dispatch(setDatasetToReducer(value, 'today_activities_photo_preview_source')),
  reloadTodaysActivities: () => dispatch(fetchTodayActivitiesDatasSagaAction()),
})
export default connect(mapStateToProps, mapDispatchToProps)(TodayActivitiesScreen)
