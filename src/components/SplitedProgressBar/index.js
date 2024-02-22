import React from 'react'
import { View, Text, StyleSheet, StyleProp } from 'react-native'
import { scale } from '../../helpers/styles'
import PropTypes from 'prop-types'
import moment from 'moment'
import capitalizeWords from '../../helpers/capitalizeWords'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  slot: {
    flexWrap: 'wrap',
    marginTop: scale(0.1),
    borderRadius: 8,
    elevation: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
})

const SplitedProgressBar = ({
  containerStyle = StyleProp,
  totalSlots: totalSlotsCount = 5,
  completedSlots: completedSlotsCount = 2,
  colorActiveSlots = 'rgba(115,221,98,1)',
  colorInactiveSlots = 'rgba(88,89,91,1)',
  slotWidth = scale(1.4),
  width = scale(8),
  height = scale(0.4),
}) => {
  const slots = Array.from({ length: totalSlotsCount })

  if (!slots?.length) return null

  return (
    <View style={[styles.container, containerStyle, { width }]}>
      {React.Children.toArray(
        slots.map((_, key) => (
          <View style={[styles.slot, { backgroundColor: key < completedSlotsCount ? colorActiveSlots : colorInactiveSlots, height, width: slotWidth }]} />
        )),
      )}
    </View>
  )
}
export default SplitedProgressBar
