import { collect } from 'collect.js'
import React from 'react'
import { View } from 'react-native'
import UserEvaluationsStatus from '../../components/UserEvaluationsStatus'
import { useSelector } from 'react-redux'
import { datasetSelector } from '../../redux/selectors'

const EvaluatorsStatusList = ({ objective_id = null, containerStyle = {} }) => {
  const objective = useSelector(state => datasetSelector(state, 'objectives', { id: objective_id }))
  const user = useSelector(state => datasetSelector(state, 'user'))
  let { evaluations = [], evaluators = [] } = objective
  evaluations = collect(evaluations)

  //console.log('EvaluatorsStatusList ===> ', { objective_id, objective })

  return (
    <View style={[containerStyle]}>
      {evaluators.map((evaluator, key) => {
        let user_id = evaluator['muser_id']
        let evas = evaluations.where('muser_id', user_id)
        let evaluations_count = evas.count()
        let evaluations_achieved_count = evas.where('achieved', true).where('evaluation_done', true).count()
        let achieved_percentage = Math.round((100 * evaluations_achieved_count) / evaluations_count)
        let evaluations_not_achieved_count = evas.where('achieved', false).where('evaluation_done', true).count()
        let not_achieved_percentage = Math.round((100 * evaluations_not_achieved_count) / evaluations_count)
        let evaluations_not_done_count = evas.where('evaluation_done', false).count()
        let not_done_percentage = Math.round((100 * evaluations_not_done_count) / evaluations_count)

        return (
          <UserEvaluationsStatus
            user_id={user_id}
            evaluator={evaluator}
            evaluations_count={evaluations_count}
            evaluations_not_achieved_count={evaluations_not_achieved_count}
            not_achieved_percentage={not_achieved_percentage}
            evaluations_achieved_count={evaluations_achieved_count}
            achieved_percentage={achieved_percentage}
            evaluations_not_done_count={evaluations_not_done_count}
            not_done_percentage={not_done_percentage}
            key={key}
          />
        )
      })}
    </View>
  )
}

export default EvaluatorsStatusList
