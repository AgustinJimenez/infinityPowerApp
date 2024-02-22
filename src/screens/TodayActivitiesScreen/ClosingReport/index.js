import React from 'react'
import { View, Text } from 'react-native'
import { useSelector } from 'react-redux'
import { datasetSelector } from '../../../redux/selectors'
import ProgressCircle, { achievedFailColor, achievedSuccessColor } from '../../../components/ProgressCircle'
import EvaluatorCheckAvatar from '../EvaluatorCheckAvatar'
import { scale } from '../../../helpers/styles'
import ReadyLabel from './ReadyLabel'

const ClosingReportEvaluations = ({ objective_evaluations = [], ahievementPercentage, countAchieved, objective_achievement_percentage = 0 }) => {
  //console.log('ClosingReportEvaluations ===> ', evaluations)
  //console.log('ClosingReportEvaluations ===> ', { objective_id, evaluations, evaluations })
  return (
    <View style={{ flex: 1, flexDirection: 'row', paddingBottom: scale(0.2) }}>
      <View style={{ width: '75%', flexDirection: 'row', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        {React.Children.toArray(
          objective_evaluations.map(evaluation => {
            return (
              <EvaluatorCheckAvatar
                evaluation_id={evaluation['id']}
                containerStyles={{ paddingHorizontal: scale(0.25), marginBotton: scale(0.2) }}
                switchColor={value => (!!value ? 'rgba(0,255,133,1)' : 'rgba(255,0,61,1)')}
              />
            )
          }),
        )}
      </View>
      <View style={{ width: '25%', justifyContent: 'center' }}>
        <ProgressCircle
          progress={ahievementPercentage}
          subtitle={`${countAchieved}/${objective_evaluations.length}`}
          achieved={ahievementPercentage >= 75}
          containerStyle={{ alignSelf: 'center' }}
          size={60}
        />
        <View
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: scale(0.1),
            paddingHorizontal: scale(0.3),
            paddingVertical: scale(0.1),
            marginTop: scale(0.1),
            elevation: 10,
            borderRadius: scale(0.2),
            /* 
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.5,
            shadowRadius: 2,
 */

            alignSelf: 'center',
          }}
        >
          <Text
            style={{
              color: 'rgba(255,255,255,1)',
              fontWeight: '700',
              fontSize: scale(0.4),
            }}
          >{`${objective_achievement_percentage}%`}</Text>
        </View>
      </View>
    </View>
  )
}

const Divider = ({ visible = true }) =>
  visible && <View style={{ height: 1, backgroundColor: 'rgba(196, 196, 196, 0.6)', width: '100%', marginBottom: scale(0.3), marginTop: scale(0.1) }} />

const ClosingReport = ({ data, reloadScreen }) => {
  const evaluations = useSelector(state => datasetSelector(state, 'evaluations', { ids: data['evaluations_ids'], list_format: true }))
  const evaluations_objectives_ids = evaluations.map?.(({ objective_id }) => objective_id)
  const evaluations_objectives = useSelector(state => datasetSelector(state, 'objectives', { ids: evaluations_objectives_ids, list_format: true }))

  return (
    <View style={{ flex: 1 }}>
      {React.Children.toArray(
        evaluations_objectives.map((objective, key) => {
          let objective_evaluations = evaluations.filter(evaluation => evaluation['objective_id'] === objective['id'])
          const countAchieved = objective_evaluations?.filter?.(({ evaluation_done, achieved }) => achieved && evaluation_done)?.length || 0
          if (countAchieved === objective_evaluations.length) return null
          const ahievementPercentage = Math.round((countAchieved * 100) / objective_evaluations.length)

          return (
            <View style={{ flex: 1 }}>
              <Divider visible={key !== 0} />
              <Text style={{ color: 'white', fontSize: scale(0.35), fontWeight: '400' }}>{objective.objective}</Text>
              <ClosingReportEvaluations
                objective_evaluations={objective_evaluations}
                ahievementPercentage={ahievementPercentage}
                countAchieved={countAchieved}
                evaluations_ids={data['evaluations_ids']}
                objective_achievement_percentage={data?.['objectives_achievement_percentages']?.[objective.id]}
              />
            </View>
          )
        }),
      )}
      <ReadyLabel closing_report_id={data['id']} reloadScreen={reloadScreen} />
    </View>
  )
}
export default ClosingReport
