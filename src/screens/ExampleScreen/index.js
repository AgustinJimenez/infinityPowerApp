import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import HomeBase from '../../components/HomeBase'
//import { useTranslation } from 'react-i18next'
//import { useNavigation } from '@react-navigation/native'

const styles = StyleSheet.create({
  container: {},
})

const ExampleScreen = ({}) => {
  //const { t } = useTranslation()
  //const navigation = useNavigation()
  return (
    <HomeBase style={styles.container} hasBackButton showActionButton={false}>
      <Text>{/* t('example_screen') */}</Text>
    </HomeBase>
  )
}

export default ExampleScreen
