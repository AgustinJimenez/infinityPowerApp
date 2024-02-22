import React from 'react'
import { View, ActivityIndicator } from 'react-native'

export default ({ isLoading = false }) => <View style={{ height: 20 }}>{isLoading && <ActivityIndicator style={{}} />}</View>
