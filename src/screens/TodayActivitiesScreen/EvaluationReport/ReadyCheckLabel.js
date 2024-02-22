import React from 'react'
import { View, Touchable, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import capitalizeWords from '../../../helpers/capitalizeWords'
import request from '../../../helpers/request'
import { scale } from '../../../helpers/styles'
import { setDatasetToReducer } from '../../../redux/actions'
import { datasetSelector } from '../../../redux/selectors'

const ReadyCheckLabel = ({ evaluation_id, reloadScreen, dataset_index }) => {
  let today_activities = useSelector(state => datasetSelector(state, 'today_activities'))
  const dispatch = useDispatch()

  const [isLoading, setLoader] = React.useState(false)

  const userHasCheckedReport = React.useCallback(async () => {
    setLoader(true)
    let { error } = await request({
      url: 'mobile/users/check_evaluation_report',
      method: 'POST',
      data: {
        evaluation_id,
      },
      //debug: true
    })
    setLoader(false)

    if (!error) {
      today_activities = today_activities.filter((a, key) => dataset_index !== key)
      dispatch(setDatasetToReducer(today_activities, 'today_activities'))
    }
  }, [today_activities])

  return (
    <TouchableOpacity
      style={{
        paddingTop: scale(0.3),
        width: scale(2),
        alignSelf: 'flex-end',
      }}
      onPress={userHasCheckedReport}
    >
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Text style={{ color: 'rgba(13,223,202,1))', fontSize: scale(0.5), fontWeight: '400', textAlign: 'center' }}>
          {capitalizeWords(global.language.ready)}
        </Text>
      )}
    </TouchableOpacity>
  )
}

export default ReadyCheckLabel
