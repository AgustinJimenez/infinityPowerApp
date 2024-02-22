import React from 'react'
import { Image, View } from 'react-native'
import { Icon } from 'native-base'
import { useSelector } from 'react-redux'
import { datasetSelector } from '../../redux/selectors'
import { primaryColor, scale } from '../../helpers/styles'
import FocusIconImg from '../../img/Infinite-power_focus.png'
import MindIconImg from '../../img/MindIcon.png'
import PlayIconImg from '../../img/PlayIcon.png'
import CheckIconImg from '../../img/CheckIcon.png'
import DocImg from '../../img/doc2.png'
import MindIcon from '../../img/MindIcon.png'
import ResourcesIcon from '../../img/resources_icon.png'

const ActiviityIconUserImage = ({ user_id }) => {
  let user = useSelector(state => datasetSelector(state, 'users', { id: user_id }))
  if (!user || !user.image) return null

  return <Image source={{ uri: user.image || '' }} style={{ width: '100%', height: '100%', alignSelf: 'center' }} resizeMode='contain' />
}

const ActivityIcon = ({ type, icon, data }) => {
  let iconBackgroundColor = primaryColor
  let IconComponent = Icon
  let iconProps = {}

  if (type === 'routine' || type === 'routine_configuration' || type === 'create_routine_reminder') {
    IconComponent = Image
    iconProps = {
      source: MindIconImg,
      style: { width: '100%', height: '100%', alignSelf: 'center' },
      resizeMode: 'contain',
    }
  } else if (type === 'evaluation_report') {
    IconComponent = () => <ActiviityIconUserImage user_id={data['muser_id']} />
  } else if (type === 'self_evaluation_report') {
    IconComponent = Image
    iconProps = {
      source:
        !!data?.['objective']?.['action_habit'] && !data?.['objective']?.['action_habit']?.['habit']?.['focusing_medium_id'] ? FocusIconImg : CheckIconImg,
      style: { width: '100%', height: '100%', alignSelf: 'center' },
      resizeMode: 'contain',
    }
  } else if (type === 'evaluation' || type === 'self_evaluation' || type === 'focus_test') {
    IconComponent = Image
    iconProps = {
      source:
        !!data?.['objective']?.['action_habit'] && !data?.['objective']?.['action_habit']?.['habit']?.['focusing_medium_id'] ? FocusIconImg : CheckIconImg,
      style: { width: '100%', height: '100%', alignSelf: 'center' },
      resizeMode: 'contain',
    }
  } else if (type === 'friend_made_note') {
    if (!!icon) {
      let user_image_url = icon
      IconComponent = Image
      iconProps = {
        source: { uri: user_image_url },
        style: { width: '100%', height: '100%', alignSelf: 'center' },
        resizeMode: 'contain',
      }
    } else {
      IconComponent = Icon
      iconProps = {
        name: 'user-o',
        type: 'FontAwesome',
        style: { alignSelf: 'center', color: 'white', alignItems: 'center', fontSize: scale(0.55) },
        resizeMode: 'contain',
      }
    }
  } else if (type === 'article') {
    iconBackgroundColor = 'white'
    IconComponent = Image
    iconProps = {
      source: DocImg,
      style: { width: scale(3), height: scale(3), alignSelf: 'center', right: scale(0.2), bottom: scale(0.09) },
      resizeMode: 'contain',
    }
  } else if (type === 'closing_report') {
    IconComponent = null
  }

  if (!IconComponent) return null

  return (
    <View
      style={{
        width: scale(1.2),
        height: scale(1.2),
        borderRadius: scale(1.2) / 2,
        overflow: 'hidden',
        backgroundColor: iconBackgroundColor,
        justifyContent: 'center',
      }}
    >
      <IconComponent {...iconProps} />
    </View>
  )
}
export default ActivityIcon
