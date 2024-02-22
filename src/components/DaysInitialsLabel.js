import React from 'react'
import { Text } from 'react-native'
import capitalizeWords from '../helpers/capitalizeWords'

const DaysEvaluationsInitialsLabel = ({ daysNames = [], style = {}, self = true }) => {
  let daysLabel = ''
  if (daysNames.length === 7) daysLabel = capitalizeWords(global?.language?.[self ? 'evaluations_all_days' : 'evaluate_all_days'], { firstOnly: true })
  else {
    daysLabel = `${capitalizeWords(global?.language?.[self ? 'evaluations' : 'evaluate'])} ${self ? global?.language?.on : ''} ${daysNames
      .map?.(dayName => capitalizeWords(global?.language?.[dayName]).substring(0, 2))
      .join('. ')}.`
  }

  return <Text style={style}>{daysLabel}</Text>
}

export default DaysEvaluationsInitialsLabel
