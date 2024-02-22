import React from 'react'
import { SafeAreaView, ImageBackground, View, Image, TouchableOpacity, Text } from 'react-native'
import { scale, primaryColor, secondaryColor } from '../helpers/styles'
import capitalizeWords from '../helpers/capitalizeWords'
import NotificationIconComponent from '../components/NotificationIconComponent'
import ActionButton from 'react-native-action-button'
import { Icon } from 'native-base'
import { NavigationContext } from 'react-navigation'
import CheckIconImg from '../img/CheckIcon.png'
import logo from '../img/infinite-power.png'
import info from '../img/info_new.png'
import edit from '../img/edit_new.png'

import FocusIconImg from '../img/Infinite-power_focus.png'
import MindIcon from '../img/MindIcon.png'
import ResourcesIcon from '../img/resources_icon.png'
import BgMainIconImg from '../img/background-home.jpg'
import { useSelector } from 'react-redux'
import { datasetSelector } from '../redux/selectors'
import { useTranslation } from 'react-i18next'

const HomeBase = ({
  children,
  hasNotificationBellIcon = true,
  onPressNotificationsBell = null,
  containerStyle = {},
  showActionButton = true,
  showInfoButton = false,
  showEditButton = false,
  showLogo = false,
  hasBackButton = false,
  hasShowBG = true,
}) => {
  const { t } = useTranslation()
  const questions = useSelector(state => datasetSelector(state, 'questions', { list_format: true }))
  const navigation = React.useContext(NavigationContext)

  if (!onPressNotificationsBell) onPressNotificationsBell = () => navigation.navigate('TodayActivitiesScreen')

  return (
    <>
      {
        <ImageBackground
          source={!!hasShowBG && BgMainIconImg}
          style={[{ width: '100%', height: '100%' }, containerStyle]}
          imageStyle={{ resizeMode: 'stretch' }}
        >
          <View style={{ flex: 1, backgroundColor: secondaryColor(0.8) }}>
            <SafeAreaView>
              {children}
              {hasNotificationBellIcon && <NotificationIconComponent onPress={onPressNotificationsBell} />}
              {showLogo && (
                <Image
                  source={logo}
                  resizeMode='contain'
                  style={{ width: scale(2), height: scale(2), position: 'absolute', marginLeft: scale(7), marginTop: scale(0.7) }}
                />
              )}
            </SafeAreaView>
          </View>
        </ImageBackground>
      }
      {!!showInfoButton && (
        <View
          style={{
            width: scale(1.75),
            height: scale(1.75),
            borderRadius: scale(1.75) / 2,
            borderWidth: 5,
            borderColor: '#292c33',
            backgroundColor: '#232324',
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            bottom: scale(2.75),
            marginLeft: 10,
          }}
        >
          <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} onPress={() => navigation.navigate('InfoScreen')}>
            <Image source={info} resizeMode='contain' style={{ width: scale(0.75), height: scale(0.75) }} />
          </TouchableOpacity>
        </View>
      )}
      {!!showEditButton && (
        <View
          style={{
            width: scale(1.75),
            height: scale(1.75),
            borderRadius: scale(1.75) / 2,
            borderWidth: 5,
            borderColor: '#292c33',
            backgroundColor: '#232324',
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            bottom: scale(2.75),
            right: 10,
          }}
        >
          <Image source={edit} resizeMode='contain' style={{ width: scale(0.75), height: scale(0.75) }} />
        </View>
      )}

      {!!showActionButton && (
        <ActionButton
          position='center'
          bgColor='rgba(50,53,60,0.9)'
          buttonColor={primaryColor}
          spacing={scale(1.5)}
          offsetY={scale(3)}
          size={scale(2)}
          hideShadow
          renderIcon={() => <Icon name='plus' type='Octicons' style={{ color: 'white', fontSize: scale(1.3) }} />}
        >
          <ActionButton.Item onPress={() => navigation.navigate('HabitsHome')} size={scale(1.4)}>
            <View style={{ zIndex: 10, marginLeft: 25, marginRight: 25 }}>
              <Image source={CheckIconImg} style={{ width: scale(2), height: scale(2) }} />
            </View>
            <Text style={{ color: 'white', marginBottom: -scale(0.4) }}>{capitalizeWords(t('habits'))}</Text>
          </ActionButton.Item>
          <ActionButton.Item
            onPress={() => {
              navigation.navigate(questions.length ? 'FocusQuestionaryScreen' : 'Habits')
            }}
            size={scale(1.4)}
          >
            <View style={{ zIndex: 10, marginLeft: 25, marginRight: 25 }}>
              <Image source={FocusIconImg} style={{ width: scale(1.8), height: scale(1.8) }} resizeMode='contain' />
            </View>
            <Text style={{ color: 'white', marginBottom: -scale(0.4) }}>{capitalizeWords(t('focus'))}</Text>
          </ActionButton.Item>

          <ActionButton.Item onPress={() => navigation.navigate('MeditationHome')} size={scale(1.4)}>
            <View style={{ zIndex: 10, marginLeft: 25, marginRight: 25, overflow: 'hidden' }}>
              <Image source={MindIcon} style={{ width: scale(1.5), height: scale(1.5) }} resizeMode='contain' />
            </View>
            <Text style={{ color: 'white', marginBottom: -scale(0.5), width: '150%', textAlign: 'center' }}>{capitalizeWords(t('meditation'))}</Text>
          </ActionButton.Item>

          <ActionButton.Item onPress={() => navigation.navigate('InfoScreen')} size={scale(1.4)}>
            <View style={{ zIndex: 10, marginLeft: 25, marginRight: 25 }}>
              <Image source={ResourcesIcon} style={{ width: scale(1.8), height: scale(1.8) }} resizeMethod='auto' resizeMode='contain' />
            </View>
            <Text style={{ color: 'white', marginBottom: -scale(0.4) }}>{capitalizeWords(t('info'))}</Text>
          </ActionButton.Item>
        </ActionButton>
      )}
    </>
  )
}

export default HomeBase
