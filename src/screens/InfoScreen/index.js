import React from 'react'
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { Icon } from 'native-base'
import HomeBase from '../../components/HomeBase'
import ListItemsBox from '../../components/ListItemsBox'
import capitalizeWords from '../../helpers/capitalizeWords'
import { scale, globalStyles } from '../../helpers/styles'

const InfoScreen = ({}) => {
  const infos = [
    {
      title: 'Consejos',
      iconName: 'bulb',
      typeIcon: 'Ionicons',
    },
    {
      title: 'Informaciones',
      iconName: 'info',
      typeIcon: 'Entypo',
    },
    {
      title: 'Videos',
      iconName: 'play',
    },
    {
      title: 'Afirmaciones Cantadas',
      typeIcon: 'Foundation',
      iconName: 'music',
    },
  ]

  return (
    <HomeBase hasBackButton showActionButton={false}>
      <Text style={globalStyles.title}>{capitalizeWords(global?.language?.info)}</Text>
      <ListItemsBox
        itemContainerStyle={{
          paddingHorizontal: 0,
          marginVertical: scale(0.3),
        }}
        items={infos}
        renderItem={({ title, iconName, typeIcon }) => (
          <TouchableOpacity style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ width: '20%', alignItems: 'center' }}>
              <View
                style={{
                  width: scale(1),
                  height: scale(1),
                  borderRadius: scale(1) / 2,
                  backgroundColor: 'white',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon name={iconName} type={typeIcon} style={{ marginTop: scale(0.1) }} />
              </View>
            </View>
            <View style={{ width: '80%', justifyContent: 'center' }}>
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: scale(0.5) }}>{title}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </HomeBase>
  )
}

export default InfoScreen
