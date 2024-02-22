import React from 'react'
import { View, Text } from 'react-native'
import HomeBase from '../../components/HomeBase'
import { NavigationContext } from 'react-navigation'
import { datasetSelector } from '../../redux/selectors'
import { useDispatch, useSelector } from 'react-redux'
import { NavigationEvents } from 'react-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { scale } from '../../helpers/styles'
import ProgressCircle from '../../components/ProgressCircle'
import capitalizeWords from '../../helpers/capitalizeWords'
import LineDotsChartAchievedLast7Days from '../../components/LineDotsChartAchievedLast7Days'
import moment from 'moment'
import DaysEvaluationsInitialsLabel from '../../components/DaysInitialsLabel'
import { daysArray } from '../../constants'
import EvaluatorsStatusList from './EvaluatorsStatusList'
import { styles } from './styles'

const getData = ({ objective } = {}) => {
  let chartData = []
  let tmpStreak = 0
  let maxStreak = 0
  for (let index = objective?.evaluations?.length - 1; index >= 0; index--) {
    const evaluation = objective?.evaluations?.[index]

    //if (chartData.length < 7) chartData.push(evaluation?.achieved && evaluation?.evaluation_done ? 100 : 0)
    //chartData?.reverse?.()
    chartData = objective['evaluations_average_by_date_data']?.slice?.(-7)

    if (evaluation?.achieved) {
      tmpStreak++
      if (tmpStreak > maxStreak) maxStreak = tmpStreak
    }

    //console.log('HRE ===> ', { evaluation, evaluation_date: evaluation.evaluation_date, isAchieved })
  }

  let daysActive = false
  let expired = moment().isSameOrAfter(moment(objective?.deadline))
  if (!expired) daysActive = Math.abs(moment(objective.created_at).diff(moment(), 'days'))

  //console.log('HERE ====> ', { maxStreak, chartData, daysActive })
  return {
    maxStreak,
    chartData,
    evaluationsDays: daysArray.filter(dayName => objective[`evaluation_${dayName}`]),
    daysActive,
  }
}

const HabitsObjectiveDetailsScreen = ({}) => {
  const navigation = React.useContext(NavigationContext)
  const isFromFriendsObjectiveScreen = !!navigation?.state?.params?.isFromFriendsObjectiveScreen
  let objective = useSelector(state => datasetSelector(state, 'objectives', { id: navigation?.state?.params?.id }))
  let { chartData, maxStreak, evaluationsDays = [], daysActive = false } = getData({ objective })
  let evaluations_average_by_date_data = objective['evaluations_average_by_date_data']
  let evaluations_average_by_date_data_achieved = objective['evaluations_average_by_date_data']?.filter?.(val => val >= 75)?.length || 0

  let progress = 0
  if (!!evaluations_average_by_date_data?.length) {
    progress = (evaluations_average_by_date_data_achieved / evaluations_average_by_date_data?.length) * 100
    progress = Math.round(progress)
  }
  /* 
  console.log('HabitsObjectiveDetailsScreen ===> ', {
    aqui: `${evaluations_average_by_date_data_achieved || 0} / ${evaluations_average_by_date_data?.length || 0}`,
    evaluations_average_by_date_data_achieved,
    evaluations_average_by_date_data,
    progress,
  })
 */

  //console.log("Vishal : HabitsObjectiveDetailsScreen");

  return (
    <HomeBase style={styles.container} hasBackButton showActionButton={false}>
      <KeyboardAwareScrollView contentContainerStyle={styles.scrollContainer}>
        <NavigationEvents
          onDidFocus={() => {
            /* fetchDatas() */
          }}
        />
        <Text style={styles.title}>{objective.objective}</Text>
        <Text style={styles.smallText}>{capitalizeWords(global?.language?.achievements)}</Text>
        <ProgressCircle
          subtitle={`${evaluations_average_by_date_data_achieved || 0}/${evaluations_average_by_date_data?.length || 0}`}
          containerStyle={styles.achievedPercentage}
          //onPress={}
          achieved={objective.ahieved_average >= 75}
          progress={progress}
          size={scale(3.3)}
          titleSize={scale()}
          showCheckFailIcon={false}
          strokeWidth={scale(0.3)}
        />
        {!!chartData?.length && (
          <>
            <Text style={styles.smallText}>{capitalizeWords(global?.language?.last_7_evaluations_achievements)}</Text>
            <LineDotsChartAchievedLast7Days data={chartData} style={styles.last7daysEvaluations} />
          </>
        )}

        <View style={styles.streakBlock}>
          <Text style={styles.strakInfo}>
            {capitalizeWords(global?.language?.current_streak)}: {objective.streak || 0}
          </Text>
          <Text style={styles.strakInfo}>
            {capitalizeWords(global?.language?.historical_streak)}: {maxStreak}
          </Text>
        </View>

        {!isFromFriendsObjectiveScreen && (
          <>
            <Text style={[styles.smallText, styles.howEvaluatedMe]}>¿{capitalizeWords(global?.language?.how_they_evaluated_me, { firstOnly: true })}?</Text>

            <EvaluatorsStatusList objective_id={objective.id} containerStyle={{ width: '80%', alignSelf: 'center', marginBottom: scale() }} />
          </>
        )}

        <Text style={[styles.smallText, styles.bottomLabel]}>
          {capitalizeWords(global?.language?.objective_defined_at, { firstOnly: true })} {moment(objective.created_at).format('LL')}{' '}
        </Text>
        {daysActive !== false && (
          <Text style={[styles.smallText, styles.bottomLabel]}>
            {daysActive} {global?.language?.['days']} {global?.language?.active}
          </Text>
        )}
        <DaysEvaluationsInitialsLabel daysNames={evaluationsDays} style={[styles.smallText, styles.bottomLabel]} />
      </KeyboardAwareScrollView>
    </HomeBase>
  )
}

export default HabitsObjectiveDetailsScreen
