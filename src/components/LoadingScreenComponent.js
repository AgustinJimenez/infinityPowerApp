import React from 'react'
import { Container } from 'native-base'
import { globalStyles } from '../helpers/styles'

export default () => <Container style={[{ flex: 1, alignItems: 'center', justifyContent: 'center' }, globalStyles.primaryBg]} />
