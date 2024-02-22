import React from 'react'
import { ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native'
import { globalStyles, scale } from '../../helpers/styles'
import * as Animatable from 'react-native-animatable'

const styles = StyleSheet.create({
  scroll: { height: '100%' },
  item: {
    ...globalStyles.darkTransparentBox,
    /*
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.5,
        shadowRadius: 1, 
        */
  },
})

const ListItem = ({ item, renderItem, itemContainerStyle, key }) => {
  const ref = React.useRef(null)
  const fadeOut = index => ref?.current?.fadeOutRight(800)
  const fadeIn = index => ref?.current?.fadeInLeft(800)

  React.useEffect(() => {
    fadeIn()
    return () => fadeOut()
  }, [])

  return (
    <Animatable.View
      ref={ref}
      style={[styles.item, itemContainerStyle, !!item['border_color'] ? { borderColor: item['border_color'], borderWidth: scale(0.06) } : {}]}
    >
      <TouchableOpacity onPress={() => item.onPressCard(item)} disabled={!item.onPressCard}>
        {renderItem(item, key)}
      </TouchableOpacity>
    </Animatable.View>
  )
}

const ListItemsBox = ({ items = [], renderItem = () => {}, containerStyle = {}, itemContainerStyle = {}, useScroll = true, border_color }) => {
  let ContainerComponent = null

  if (useScroll) ContainerComponent = ScrollView
  else ContainerComponent = View

  return (
    <ContainerComponent style={[useScroll ? styles.scroll : {}, containerStyle]}>
      {React.Children.toArray(items.map((item, key) => <ListItem {...{ item, renderItem, itemContainerStyle, key }} />))}
    </ContainerComponent>
  )
}

export default ListItemsBox
