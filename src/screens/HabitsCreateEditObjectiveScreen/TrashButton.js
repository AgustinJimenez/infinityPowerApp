import React from 'react'
import { TouchableOpacity, Alert } from 'react-native'
import capitalizeWords from '../../helpers/capitalizeWords'
import { useDispatch, useSelector } from 'react-redux'
import { datasetSelector } from '../../redux/selectors'
import * as Animatable from 'react-native-animatable'
import request from '../../helpers/request'
import { Toast } from 'native-base'
import { NavigationContext } from 'react-navigation'
import ImageTrash from '../../img/trash2.png'
import { setDatasetToReducer } from '../../redux/actions'
import styles from './styles'

const TrashButton = ({}) => {
  const navigation = React.useContext(NavigationContext)
  const dispatch = useDispatch()
  const create_edit_objective_is_loading = useSelector(state => datasetSelector(state, 'create_edit_objective_is_loading'))
  const setIsLoadingRightTop = React.useCallback(is_loading => dispatch(setDatasetToReducer(is_loading, 'create_edit_objective_is_loading')), [
    create_edit_objective_is_loading,
  ])
  let objectives = useSelector(state => datasetSelector(state, 'objectives'))

  const deleteObjective = React.useCallback(async () => {
    setIsLoadingRightTop(true)
    let { error } = await request({
      url: 'actions/delete_objective',
      method: 'post',
      data: {
        objective_id: navigation?.state?.params?.id,
      },
    })
    if (error)
      return Toast.show({
        text: global?.['language']?.['delete_objective_error'],
        duration: 2000,
        type: 'danger',
      })

    Toast.show({
      text: global?.['language']?.['delete_objective_success'],
      duration: 2000,
      type: 'success',
    })

    delete objectives[navigation?.state?.params?.id]
    dispatch(setDatasetToReducer(objectives, 'objectives'))
    setIsLoadingRightTop(false)
    navigation.goBack()
  })

  const ref = React.useRef(null)
  const effectOut = () => ref?.current?.bounceOut(800)
  const effectIn = () => ref?.current?.bounceIn(800)

  React.useEffect(() => {
    effectIn()
    return () => effectOut()
  }, [])

  return (
    <TouchableOpacity
      onPress={() =>
        Alert.alert(
          capitalizeWords(global?.language?.confirmation),
          capitalizeWords(global?.language?.are_you_sure_about_delete, { firstOnly: true }),
          [
            {
              text: capitalizeWords(global?.language?.cancel),
            },
            { text: capitalizeWords(global?.language?.yes, { excludeWordWithLength: 0 }), onPress: deleteObjective },
          ],
          { cancelable: true },
        )
      }
      style={[styles.righTopButtonContainer]}
    >
      <Animatable.Image ref={ref} source={ImageTrash} resizeMode='contain' style={styles.imageTrash} />
    </TouchableOpacity>
  )
}

export default TrashButton
