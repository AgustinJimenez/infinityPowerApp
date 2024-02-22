import React from 'react'
import { View, Image, Text } from 'react-native'
import { useSelector } from 'react-redux'
import Switch from '../../components/Switch'
import { scale } from '../../helpers/styles'
import { datasetSelector } from '../../redux/selectors'

const Avatar = ({ uri = '', name = '' }) => (
  <View
    style={{
      backgroundColor: 'rgba(154,154,154,1)',
      alignItems: 'center',
      justifyContent: 'center',
      width: scale(0.95),
      height: scale(0.95),
      borderRadius: scale(0.95) / 2,
      marginTop: scale(0.3),
      elevation: 10,
      /* 
      shadowOffset: {
        width: 5,
        height: 2,
      },
      shadowOpacity: 0.5,
      shadowRadius: 2,
 */
    }}
  >
    {!uri ? (
      <Text style={{ color: 'white', fontWeight: '700', fontSize: 19 }}>
        {name
          ?.split(' ')
          .map(word => word[0])
          .join('')}
      </Text>
    ) : (
      <Image
        source={{ uri }}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: scale(1.2) / 2,
        }}
      />
    )}
  </View>
)

const EvaluatorCheckAvatar = ({ evaluation_id, containerStyles = {}, avatarStyle = {}, switchColor }) => {
  const evaluation = useSelector(state => datasetSelector(state, 'evaluations', { id: evaluation_id }))
  const user = useSelector(state => datasetSelector(state, 'users', { id: evaluation['muser_id'] }))

  if (!user) return null

  let value = null

  if (!evaluation.evaluation_done) value = null
  else if (evaluation.evaluation_done && evaluation.achieved) value = true
  else if (evaluation.evaluation_done && !evaluation.achieved) value = false

  //console.log('EvaluatorCheck ===> ', {evaluation_id, value, evaluation, user, name: user?.name})
  return (
    <View style={[{ paddingHorizontal: scale(0.45), alignItems: 'center', justifyContent: 'center' }, containerStyles]}>
      <Avatar uri={user?.image} name={user.name} style={avatarStyle} />
      <Switch
        disabled
        value={value}
        containerStyle={{ width: scale(0.8), height: scale(0.4), marginTop: scale(0.2) }}
        iconContainerStyle={{ height: scale(0.4), width: scale(0.4), borderWidth: 1 }}
        iconStyle={{ fontSize: scale(0.3), width: scale(value === null ? 0.15 : 0.3) }}
        switchColor={switchColor}
      />
    </View>
  )
}
export default EvaluatorCheckAvatar
