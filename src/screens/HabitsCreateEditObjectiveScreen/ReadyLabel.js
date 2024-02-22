import React from 'react'
import { TouchableOpacity, ActivityIndicator } from 'react-native'
import capitalizeWords from '../../helpers/capitalizeWords'
import * as Animatable from 'react-native-animatable'
import styles from './styles'
import { useSelector } from 'react-redux'
import { datasetSelector } from '../../redux/selectors'

const ReadyLabel = ({ onPress }) => {
  const ref = React.useRef(null)
  const create_edit_objective_is_loading = useSelector(state => datasetSelector(state, 'create_edit_objective_is_loading'))
  const effectOut = () => ref?.current?.bounceOut(800)
  const effectIn = () => ref?.current?.bounceIn(800)

  React.useEffect(() => {
    effectIn()
    return () => effectOut()
  }, [])

  return (
    <TouchableOpacity disabled={create_edit_objective_is_loading} onPress={onPress} style={[styles.righTopButtonContainer]}>
      {!!create_edit_objective_is_loading && <ActivityIndicator size='large' />}
      {!create_edit_objective_is_loading && (
        <Animatable.Text ref={ref} style={styles.readyLabelText}>
          {capitalizeWords(global?.language?.ready)}
        </Animatable.Text>
      )}
    </TouchableOpacity>
  )
}

export default ReadyLabel
