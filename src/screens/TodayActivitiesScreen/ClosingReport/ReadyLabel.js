import React from 'react'
import { TouchableOpacity, View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import capitalizeWords from '../../../helpers/capitalizeWords'
import request from '../../../helpers/request'
import { scale } from '../../../helpers/styles'

const styles = StyleSheet.create({
  label: {
    fontSize: 15,
    fontWeight: '400',
    color: 'rgba(13,223,202,1)',
    textAlign: 'right',
  },
  container: {
    marginTop: scale(0.3),
    marginRight: scale(0.3),
  },
  loader: {
    alignSelf: 'flex-end',
  },
})

const ReadyLabel = ({ closing_report_id, reloadScreen }) => {
  const [isLoading, setLoader] = React.useState(false)
  const onPress = React.useCallback(async () => {
    setLoader(true)
    let { data, error } = await request({
      url: 'mobile/users/check_closing_report',
      method: 'POST',
      show_message: true,
      data: {
        id: closing_report_id,
      },
    })
    setLoader(false)
    if (!error) reloadScreen()
  }, [])

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {isLoading ? <ActivityIndicator style={styles.loader} /> : <Text style={styles.label}>{capitalizeWords(global['language']['ready'])}</Text>}
    </TouchableOpacity>
  )
}

export default ReadyLabel
