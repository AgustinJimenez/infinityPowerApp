import React from 'react'
import { Text } from 'react-native'
import styles from './styles'

const FieldLabel = ({ type, text, style = {}, value, focusOn }) => {
  let defaultStyle = []
  if (type === 'evaluators') defaultStyle = [styles.inputLabel, styles.colorWhite]
  else if (type === 'day' || type === 'evaluators') {
    defaultStyle = [styles.inputLabelOut, styles.colorWhite]
  } else if (!!value && !focusOn) defaultStyle = [styles.inputLabel, styles.colorWhite]
  else defaultStyle = [styles.inputLabel]

  return <Text style={[...defaultStyle, style]}>{text}</Text>
}

export default FieldLabel
