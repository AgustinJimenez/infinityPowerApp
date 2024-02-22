import { useSelector } from 'react-redux'
import { datasetSelector } from '../../../redux/selectors'

export const evaluationRelatedInfoSelector = (state, {evaluation_id}) => {


    const evaluations_day_related_evaluations_ids = useSelector(state => datasetSelector(state, 'evaluations_day_related_evaluations', { id: evaluation_id }))
    const related_evaluations = useSelector(state => datasetSelector(state, 'evaluations', { ids: evaluations_day_related_evaluations_ids, list_format: true })) || []
    let count_related_evaluations = related_evaluations?.length || 0
    let achieved_evaluations_count = 0
    let not_achieved_evaluations_count = 0
    //let not_evaluated_count = 0

    related_evaluations
    ?.map(eva => {
        if(eva['achieved'] && eva['evaluation_done'])
            achieved_evaluations_count++
        else if(!eva['achieved'] && eva['evaluation_done'])
            not_achieved_evaluations_count++
        /* else if(!eva['evaluation_done'])
            not_evaluated_count++
         */
    })
    let evaluated_count = achieved_evaluations_count+not_achieved_evaluations_count
    let achieved_percentage = parseInt((100*achieved_evaluations_count)/count_related_evaluations) || 0
    let notAchievedPercentage = parseInt((100*not_achieved_evaluations_count)/evaluated_count) || 0
    let isAchievedDay = achieved_percentage > 75

    return { 
        evaluations_day_related_evaluations_ids, 
        related_evaluations, 
        count_related_evaluations, 
        achieved_evaluations_count,
        achieved_percentage,
        isAchievedDay,
        evaluated_count,
        notAchievedPercentage
    }
}