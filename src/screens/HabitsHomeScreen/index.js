import React from 'react'
import { RefreshControl, Text, View, Image, ScrollView } from 'react-native'
import { NavigationEvents } from 'react-navigation'
import { useDispatch, useSelector } from 'react-redux'
import { datasetSelector } from '../../redux/selectors'
import { updateHabitsHomeDataSagaAction } from '../../sagas/actions'
import capitalizeWords from '../../helpers/capitalizeWords'
import HomeBase from '../../components/HomeBase'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { NavigationContext } from 'react-navigation'
import { globalStyles, scale } from '../../helpers/styles'
import { Icon, Toast } from 'native-base'
import { TouchableOpacity } from 'react-native'
import LineDotsChartAchievedLast7Days from '../../components/LineDotsChartAchievedLast7Days'
import ImageUsersGroup from '../../img/usersGroup.png'
import styles from './styles'
import DaysEvaluationsInitialsLabel from '../../components/DaysInitialsLabel'
import HabitsAverageByDaysPercentageCircle from './HabitsAverageByDaysPercentageCircle'
import { daysArray } from '../../constants'
import InviteCodeDialog from './InviteCodeDialog'
import { useTranslation } from 'react-i18next'

const Title = ({}) => {
  const { t } = useTranslation()
  return <Text style={styles.title}>{capitalizeWords(t('habits'))}</Text>
}

const PlusButton = ({}) => {
  const navigation = React.useContext(NavigationContext)
  return (
    <TouchableOpacity style={styles.addButtonIconContainer} onPress={() => navigation.navigate('HabitsCreateEditObjective')}>
      <Icon name='plus' type='AntDesign' style={styles.addButtonIcon} />
    </TouchableOpacity>
  )
}

const MiddleLeftLabel = ({}) => {
  const { t } = useTranslation()
  return <Text style={styles.myRoutinesLabel}>{capitalizeWords(t('my_objectives'))}</Text>
}

const MiddleRightButton = ({}) => {
  const navigation = React.useContext(NavigationContext)
  return (
    <TouchableOpacity style={styles.noteIconContainer} onPress={() => navigation.navigate('FriendsHabits')}>
      <Image source={ImageUsersGroup} resizeMode='contain' style={styles.middleRightButtonImage} />
    </TouchableOpacity>
  )
}
const ListRefreshControl = ({ isRefreshing = false, onRefresh }) => (
  <RefreshControl
    tintColor='white'
    refreshing={isRefreshing}
    //refreshing={this.props.is_refreshing_today_activity_list}
    progressViewOffset={0}
    onRefresh={onRefresh}
  />
)

const TopComponentsContainer = ({}) => {
  const habits_porcentage = useSelector(state => datasetSelector(state, 'habits_percentage') || 0)
  return (
    <View style={styles.topComponentsContainer}>
      <Title />
      <HabitsAverageByDaysPercentageCircle percentage={habits_porcentage} />
      <View style={styles.myRoutinesNoteIconContainer}>
        <MiddleLeftLabel />
        <MiddleRightButton />
      </View>
    </View>
  )
}

const HabitsHomeScreen = ({}) => {
  const { t } = useTranslation()
  const navigation = React.useContext(NavigationContext)
  const dispatch = useDispatch()
  const [addRoutineDialog, setAddRoutineDialog] = React.useState(false)

  const habits_home_is_loading = useSelector(state => datasetSelector(state, 'habits_home_is_loading'))
  const { objectives = [] } = useSelector(state => datasetSelector(state, 'habits_home_datas'))
  // const { objectives = [] } = useSelector(state => datasetSelector(state, 'objectives'))

  React.useEffect(() => {
    if (navigation?.state?.params?.['createRoutineDialogIsOpen']) setAddRoutineDialog(true)
  }, [])

  const fetchDatas = React.useCallback(() => {
    dispatch(updateHabitsHomeDataSagaAction())
  }, [])
  /*
    // Make changes based on - https://github.com/APSL/react-native-keyboard-aware-scroll-view/issues/269
    // NOTES : The KeyboardAwareScrollView just dissapears when adding refresh control.
   <KeyboardAwareScrollView
        refreshControl={<ListRefreshControl isRefreshing={habits_home_is_loading} onRefresh={fetchDatas} />}
        contentContainerStyle={styles.scrollContainer}
      >
  */
  //console.log("Vishal : objectives.length - " + objectives.length);
  return (
    <HomeBase showActionButton={false} hasBackButton>
      <NavigationEvents onWillFocus={() => fetchDatas()} />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContainer}
        refreshControl={<RefreshControl refreshing={habits_home_is_loading} onRefresh={fetchDatas} tintColor='white' />}
      >
        <TopComponentsContainer />
        <View style={styles.listContainer}>
          {!objectives.length && <Text style={styles.no_data_text}>{capitalizeWords(t('no_data'))}</Text>}
          {React.Children.toArray(
            objectives
              .map?.(objective => {
                const chartData = objective['evaluations_average_by_date_data']?.slice?.(-7)
                let average_achievements = 0

                let evaluations_average_by_date_data = objective['evaluations_average_by_date_data']
                let evaluations_average_by_date_data_achieved = objective['evaluations_average_by_date_data']?.filter?.(val => val >= 75)?.length || 0
                if (!!evaluations_average_by_date_data?.length) {
                  average_achievements = (evaluations_average_by_date_data_achieved / evaluations_average_by_date_data?.length) * 100
                  average_achievements = Math.round(average_achievements)
                }
                return {
                  id: objective.id,
                  label: objective['objective'],
                  evaluationsDays: daysArray.filter(dayName => objective[`evaluation_${dayName}`]),
                  chartData,
                  streak: objective['streak'],
                  average_achievements,
                }
              })
              .map(({ label, chartData, evaluationsDays, streak = 0, average_achievements = 0, id }) => {
                //console.log('Vishal value of label => ', label)
                return (
                  <TouchableOpacity style={globalStyles.darkTransparentBox} onPress={() => navigation.navigate('HabitsCreateEditObjective', { id })}>
                    <View style={styles.topListItemContainer}>
                      <Text style={styles.listItemTitle}>{label}</Text>
                    </View>
                    <View style={styles.middleListItemContainer}>
                      <View style={styles.chartContainer}>
                        <LineDotsChartAchievedLast7Days data={chartData} />
                      </View>
                    </View>
                    <View style={styles.bottomListItemContainer}>
                      <DaysEvaluationsInitialsLabel daysNames={evaluationsDays} style={styles.bottomListItemText} />
                    </View>
                    <TouchableOpacity
                      style={styles.averageAchievementPercentageContainer}
                      onPress={() => navigation.navigate('HabitsObjectiveDetails', { id })}
                    >
                      <Text style={styles.averageAchievementPercentageText}>{average_achievements || 0}%</Text>
                      <Text style={styles.averageAchievementPercentageSubtext}>
                        {capitalizeWords(t('streak'))}: {streak}
                      </Text>
                    </TouchableOpacity>
                  </TouchableOpacity>
                )
              }),
          )}
        </View>
      </KeyboardAwareScrollView>
      <PlusButton />
      <InviteCodeDialog />
    </HomeBase>
  )
}

export default HabitsHomeScreen
