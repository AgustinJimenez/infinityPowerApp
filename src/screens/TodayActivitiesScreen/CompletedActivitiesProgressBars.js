import React from 'react'
import { useSelector } from 'react-redux'
import SplitedProgressBar from '../../components/SplitedProgressBar'
import { scale } from '../../helpers/styles'
import { datasetSelector } from '../../redux/selectors'

const CompletedActivitiesProgressBars = ({}) => {
  let { done_count = 0, todo_count = 0 } = useSelector(state => datasetSelector(state, 'today_activities_numbers', { default_value: {} }))
  //if (done_count === todo_count) return null
  if (done_count === todo_count) return null

  return (
    <SplitedProgressBar
      totalSlots={todo_count}
      completedSlots={done_count}
      containerStyle={{
        marginVertical: scale(0.3),
      }}
    />
  )
}
export default CompletedActivitiesProgressBars
