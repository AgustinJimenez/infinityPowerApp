import React from 'react'
import { TouchableOpacity, View, Image, Text } from 'react-native'
import { globalStyles, scale } from '../../helpers/styles'
import { NavigationContext } from 'react-navigation'
import ImageUserProf from '../../img/user_no_border.png'
import ImageProfStar from '../../img/prof_star.png'
import moment from 'moment'
import { datasetSelector } from '../../redux/selectors'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

const BeltWeeksProgress = ({ nextBelt }) => {
  const { t } = useTranslation()
  const todayWeekNumber = React.useMemo(() => moment().week(), [moment])
  const requiredWeeksSlots = [...Array(nextBelt?.consecutive_weeks).keys()]
  let last_consecutives_achieved_weeks = useSelector(state => datasetSelector(state, 'last_consecutives_achieved_weeks', { default_value: [] }))
  last_consecutives_achieved_weeks = last_consecutives_achieved_weeks.sort((a, b) => +a['week_number'] - +b['week_number'])

  // console.log('BeltWeeksProgress ===> ', { last_consecutives_achieved_weeks, nextBelt })

  return requiredWeeksSlots.map((weekSlotsNumber = 0, key) => {
    let week = last_consecutives_achieved_weeks?.[key]
    return (
      <View
        key={weekSlotsNumber}
        style={[
          {
            backgroundColor: week?.['week_achieved_days_count'] >= 5 ? 'rgba(115,221,98, 1)' : 'rgba(97,99,101, 1)',
            height: 15,
            borderRadius: 15 / 2,
            flex: 1,
            margin: 2,
            justifyContent: 'center',
            alignItems: 'center',
          },
          +week?.['week_number'] === todayWeekNumber
            ? {
                borderWidth: 0.8,
                borderColor: 'rgba(255, 255, 255, 1)',
              }
            : {},
        ]}
      >
        {/* {+week?.['week_number'] === todayWeekNumber && (
          <Text style={[globalStyles.centerText, { textAlign: 'center', width: '100%' }, { fontSize: scale(0.22), color: 'white' }]}>{t('current_week')}</Text>
        )} */}
      </View>
    )
  })
}

const BeltProgressSection = ({}) => {
  const navigation = React.useContext(NavigationContext)
  const currentBelt = useSelector(state => datasetSelector(state, 'belt'))
  const belts = useSelector(state => datasetSelector(state, 'belts', { list_format: true }))
  const nextBelt = React.useMemo(() => {
    let beltsSortedByRequiredAmountsWeeksAsc = belts.sort((a, b) => a['consecutive_weeks'] - b['consecutive_weeks'])
    return beltsSortedByRequiredAmountsWeeksAsc.find(({ consecutive_weeks }) => consecutive_weeks > currentBelt['consecutive_weeks'])
  }, [belts, currentBelt])
  const goToNavigationInfo = React.useCallback(() => {
    navigation.navigate('BeltInfoScreen')
  }, [])

  const hasStar = true //this.state.hasStar

  return (
    <TouchableOpacity
      onPress={goToNavigationInfo}
      style={[
        globalStyles.dailyMeterContainer,
        {
          height: scale(1.5),
          width: '100%',
          alignItems: 'flex-start',
          marginTop: -10,
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 5,
        },
      ]}
    >
      <View
        style={{
          width: scale(0.75),
          height: scale(0.75),
          marginLeft: 30,
          borderWidth: 2,
          borderRadius: scale(1) / 2,
          borderColor: currentBelt?.['colour'],
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <Image source={ImageUserProf} resizeMode='contain' style={{ width: '70%', height: '70%', marginBottom: 2 }} />
      </View>
      <View style={[{ flex: 1, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', margin: 15, marginTop: 20 }]}>
        <BeltWeeksProgress nextBelt={nextBelt} />
      </View>
      <View
        style={{
          width: scale(0.75),
          height: scale(0.75),
          marginRight: 30,
          borderWidth: 2,
          borderRadius: scale(1) / 2,
          borderColor: nextBelt?.['colour'],
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <Image source={ImageUserProf} resizeMode='contain' style={{ width: '70%', height: '70%', marginBottom: 2 }} />
        {nextBelt?.['name_slug']?.includes?.('star') ? (
          <View style={{ width: '100%', height: '100%', justifyContent: 'flex-end', alignItems: 'flex-end', position: 'absolute' }}>
            <Image
              source={ImageProfStar}
              resizeMode='contain'
              style={{ width: scale(0.35), height: scale(0.35), marginBottom: scale(-0.02), marginRight: scale(-0.075) }}
            />
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  )
}

export default BeltProgressSection
