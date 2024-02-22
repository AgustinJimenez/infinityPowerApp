import collect from 'collect.js'

export const prepareObjectiveEvaluationsStats = ({ objectives = [] } = {}) => {
  objectives = objectives?.map?.(objective => {
    let objective_streak = 0
    objective['evaluations_average_by_date'] = {}
    objective['evaluations_average_by_date_data'] = []

    Object.keys(objective?.['evaluations_by_date'])?.map?.(evaluation_date => {
      let day_evaluations = collect(objective['evaluations_by_date'][evaluation_date])
      let day_achievement_average = (100 * day_evaluations.where('achieved', true).where('evaluation_done', true).count()) / day_evaluations.count()
      if (day_achievement_average >= 75) objective_streak++
      else objective_streak = 0
      objective['evaluations_average_by_date_data'].push(day_achievement_average)
      objective['evaluations_average_by_date'][evaluation_date] = day_achievement_average
    })

    objective['streak'] = objective_streak
    let evaluations = collect(objective['evaluations'])
    objective['evaluations_count'] = evaluations.count()
    objective['evaluations_achieved_count'] = evaluations.where('achieved', true).where('evaluation_done', true).count()
    objective['average_achievements'] = (100 * evaluations.where('achieved', true).where('evaluation_done', true).count()) / evaluations.count()
    //console.log('objective ===> ', { objective })
    return objective
  })

  return objectives
}
