import React from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
import { globalStyles } from '../../../helpers/styles'
import { useDispatch, useSelector } from 'react-redux'
import { datasetSelector } from '../../../redux/selectors'
import { setDatasetToReducer } from '../../../redux/actions'
import { NavigationContext, NavigationEvents } from 'react-navigation'
import request from '../../../helpers/request'
import capitalizeWords from '../../../helpers/capitalizeWords'
import { scale } from '../../../helpers/styles'
import { ProgressCircle as Circle } from 'react-native-svg-charts'
import { getColor } from 'tailwind-rn'
import { tailwind } from '../../../tailwind'

import Modal from 'react-native-modal'

const fetchMeditationsPercentage = async ({ dispatch }) => {
  let { data, error } = await request({
    url: 'mobile/users/meditations_percentage',
    method: 'POST',
    //debug: true,
  })
  if (error) return

  dispatch(setDatasetToReducer(data, 'meditations_percentage'))
}

const ProgressCircle = ({ progress, onPress }) => {
  return (
    <TouchableOpacity style={tailwind('w-full h-full flex items-center justify-center')} onPress={onPress}>
      <Circle
        progress={progress / 100}
        progressColor={getColor('red-600')}
        strokeWidth={12}
        backgroundColor={'rgba(49, 50, 54, 1)'}
        style={tailwind('w-full h-full absolute')}
        startAngle={8}
        endAngle={90}
      >
        {/* <WhiteDotStart /> */}
      </Circle>
      <Text style={[globalStyles.textPercentage, { color: 'white' }]}>{`${Math.round(progress)}%`}</Text>
    </TouchableOpacity>
  )
}

const MeditationsPercentage = ({ progress = 10 }) => {
  const dispatch = useDispatch()
  const navigation = React.useContext(NavigationContext)
  // const meditations_porcentage = useSelector(state => datasetSelector(state, 'meditations_percentage') || 0)

  const [showModal, setShowModal] = React.useState(false)

  return (
    <>
      {/* <NavigationEvents onDidFocus={() => fetchMeditationsPercentage({ dispatch })} /> */}
      <ProgressCircle progress={progress} onPress={() => setShowModal(true)}></ProgressCircle>
      <Modal
        isVisible={showModal}
        onBackdropPress={() => setShowModal(false)}
        animationIn='fadeIn'
        animationOut='fadeOut'
        style={tailwind('items-center m-0')}
        backdropColor={'rgba(0,0,0,0.7)'}
      >
        <View
          style={{
            ...globalStyles.darkTransparentBox,
            position: 'absolute',
            width: '90%',
            top: scale(1.3),
            backgroundColor: 'rgba(35, 35, 36, 1)',
            alignItems: 'center',
          }}
        >
          <Text style={tailwind('text-2xl w-full text-center text-white font-bold mb-6 mt-1')}>% de Meditación</Text>
          <View style={tailwind('relative h-32 w-32 mb-1')}>
            <ProgressCircle progress={progress} onPress={() => setShowModal(false)}></ProgressCircle>
          </View>
          <Text style={tailwind('text-white pt-4 text-center text-lg')}>Es el promedio de logro de las rutinas activas</Text>
        </View>
      </Modal>
    </>
  )
}

export default MeditationsPercentage
