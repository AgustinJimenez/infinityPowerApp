import React from 'react'
import { Text, View, Dimensions } from 'react-native'
import { useSelector } from 'react-redux'
import { datasetSelector } from '../../redux/selectors'
import { NavigationContext } from 'react-navigation'
import capitalizeWords from '../../helpers/capitalizeWords'
import { scale, globalStyles } from '../../helpers/styles'
import ProgressCircle from '../../components/ProgressCircle'
import { useTranslation } from 'react-i18next'

const height = Dimensions.get('window').height

const PillarPercentage = ({ type, passedRoutines, onPress }) => {
  const { t } = useTranslation()
  const navigation = React.useContext(NavigationContext)
  const habits_porcentage = useSelector(state => datasetSelector(state, 'habits_percentage') || 0)
  const questions = useSelector(state => datasetSelector(state, 'questions', { list_format: true }))
  let mental_focus_percentage = useSelector(state => datasetSelector(state, 'mental_focus_percentage') || 0)

  let meditation_percent = 0
  if (type == 'meditation') {
    //console.log('PillarPercentage ==> ', { type, passedRoutines })
    let routines = passedRoutines ? passedRoutines : []
    routines = routines.filter(r => !!r.enabled)
    if (routines.length > 0) {
      let total_percent = routines.map(r => r.percent || 0).reduce((a, b) => a + b, 0)
      meditation_percent = total_percent / routines.length
    }
  }

  let finalValue = 0
  let screenRedirect = null

  switch (type) {
    case 'meditation':
      finalValue = meditation_percent
      screenRedirect = 'MeditationHome'
      break
    case 'habits':
      finalValue = habits_porcentage
      screenRedirect = 'HabitsHome'
      break
    case 'focus':
      finalValue = mental_focus_percentage
      screenRedirect = 'Activity2Screen'
      break

    default:
      break
  }

  if (!onPress) onPress = () => navigation.navigate(screenRedirect)

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ProgressCircle
        onPress={onPress}
        achieved={finalValue >= 75}
        progress={Math.round(finalValue)}
        size={scale(2.2)}
        titleSize={scale(0.8)}
        subtitle=''
        successColor={'#44d72d'}
        failColor={'#ff1a51'}
        checkmarkSize={scale(1.5)}
        showCheckFailIcon={finalValue >= 75}
        strokeWidth={scale(0.15)}
      />
      <View
        style={{
          height: 25,
          width: '80%',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#070708',
          margin: 5,
          paddingLeft: 5,
          paddingRight: 5,
          borderRadius: 5,
        }}
      >
        <Text style={[globalStyles.textDescription, { color: 'white', fontSize: scale(0.35), fontWeight: 'bold' }]}>
          {capitalizeWords(t(type).replace('Á', 'A'))}
        </Text>
      </View>
    </View>
  )
}

export default PillarPercentage
