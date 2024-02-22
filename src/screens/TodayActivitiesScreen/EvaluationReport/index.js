import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import LineDotsChartAchievedLast7Days from '../../../components/LineDotsChartAchievedLast7Days'
import ProgressCircle, { achievedFailColor, achievedSuccessColor } from '../../../components/ProgressCircle'
import capitalizeWords from '../../../helpers/capitalizeWords'
import { scale } from '../../../helpers/styles'
import { datasetSelector } from '../../../redux/selectors'
import EvaluationNotesList from '../EvaluationNotesList'
import EvaluatorCheckAvatar from '../EvaluatorCheckAvatar'
import Last7DaysAverageAchievementPercentage from './Last7DaysAverageAchievementPercentage'
import ReadyCheckLabel from './ReadyCheckLabel'
import { evaluationRelatedInfoSelector } from './selectors'

const styles = StyleSheet.create({
  subtitle: { color: 'white', fontWeight: '300', fontSize: scale(0.4) },
})

const EvaluationReport = ({ evaluation_id, type, reloadScreen, dataset_index }) => {
  const is_self_evaluation_report = type === 'self_evaluation_report'
  const evaluation = useSelector(state => datasetSelector(state, 'evaluations', { id: evaluation_id }))
  const evaluation_streak = useSelector(state => datasetSelector(state, 'evaluations_streaks', { id: evaluation?.id, expected_type: 'number' })) || 0
  const evaluation_last_7_days_evaluations_achievements_percentages = useSelector(state =>
    datasetSelector(state, 'evaluations_last_7_days_evaluations_achivements_percentages', { id: evaluation?.id, default_value: {} }),
  )
  //console.log('evaluation_streak ===> ', {evaluation_id, evaluation, OID: evaluation?.objective_id, evaluation_streak, objective_last_7_days_evaluations_achivements_percentages})
  let last_7_days_achievement_percentages = []
  Object.keys(evaluation_last_7_days_evaluations_achievements_percentages || {}).map(date =>
    last_7_days_achievement_percentages.push({ percentage: evaluation_last_7_days_evaluations_achievements_percentages[date], date }),
  )
  last_7_days_achievement_percentages = last_7_days_achievement_percentages
    .sort((prev, next) => +prev.date.split('-').join('') - +next.date.split('-').join(''))
    .map(({ percentage }) => percentage)
  //console.log('HERE ===> ', last_7_days_achievement_percentages)
  let {
    related_evaluations,
    evaluations_day_related_evaluations_ids = [],
    achieved_evaluations_count,
    count_related_evaluations,
    achieved_percentage,
    isAchievedDay,
  } = useSelector(state => evaluationRelatedInfoSelector(state, { evaluation_id: evaluation?.id }))

  //console.log('EvaluationReport ===> ', { evaluation_id, evaluation, evaluations_day_related_evaluations_ids, related_evaluations, evaluation_streak })
  return (
    <View style={{ flex: 1 }}>
      {<EvaluationNotesList objective_id={evaluation?.objective_id || null} allow_show_one_note={false} />}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
        {!!evaluations_day_related_evaluations_ids &&
          evaluations_day_related_evaluations_ids.map((evaluation_id, key) => <EvaluatorCheckAvatar evaluation_id={evaluation_id} key={key} />)}
      </View>

      {related_evaluations.length ===
        related_evaluations.reduce((accum, item) => {
          return item.evaluation_done == true ? accum + 1 : accum
        }, 0) && (
        <>
          <Text style={{ color: 'white', fontSize: scale(0.45), textAlign: 'center', marginVertical: scale(0.6) }}>
            {capitalizeWords(global.language.day_results_for_objective)}
          </Text>

          <ProgressCircle
            progress={achieved_percentage}
            title={capitalizeWords(global.language.achievement)}
            subtitle={`${achieved_evaluations_count}/${count_related_evaluations}`}
            achieved={isAchievedDay}
            ringBgColor={isAchievedDay ? achievedSuccessColor : achievedFailColor}
            containerStyle={{ alignSelf: 'center' }}
          />

          <Text style={{ color: 'white', fontSize: scale(0.4), textAlign: 'center', marginVertical: scale(0.6) }}>
            {capitalizeWords(global.language.last_7_evaluations_achievements, { firstOnly: true })}
          </Text>

          <View style={{ width: '90%' }}>
            <LineDotsChartAchievedLast7Days
              data={last_7_days_achievement_percentages}
              right_top_label={`${last_7_days_achievement_percentages[last_7_days_achievement_percentages.length - 1] || 0}%`}
              right_bottom_label={capitalizeWords(global.language.today)}
              style={{ height: scale(2) }}
            />
          </View>

          <Text style={[styles.subtitle, { textAlign: 'right', marginHorizontal: scale(0.6), fontWeight: '400', marginTop: scale(0.4) }]}>
            {capitalizeWords(global.language.streak)}: {evaluation_streak}
          </Text>
          <Text style={[{ textAlign: 'center', color: 'white', fontSize: scale(0.4), marginVertical: scale(0.5), fontWeight: '400' }]}>
            {capitalizeWords(global.language.objective_average_achievement)}
          </Text>
          <Last7DaysAverageAchievementPercentage last_7_days_achievement_percentages={last_7_days_achievement_percentages} />
        </>
      )}
      <ReadyCheckLabel evaluation_id={evaluation_id} reloadScreen={reloadScreen} dataset_index={dataset_index} />
    </View>
  )
}
export default EvaluationReport
