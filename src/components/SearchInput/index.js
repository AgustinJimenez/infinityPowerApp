import React from 'react'
import { View, Image, TextInput, ActivityIndicator } from 'react-native'
import { globalStyles } from '../../helpers/styles'
import SearchIconImage from '../../img/icon_search.png'
import * as fn from 'helpers/scripts'

const SearchInput = ({ onChangeText = () => {}, value = '', isLoading = false }) => {
  return (
    <>
      <View style={globalStyles.searchContainer}>
        <Image
          source={SearchIconImage}
          style={{
            width: 20,
            height: 20,
            marginRight: 10,
            marginTop: 0,
          }}
        />
        <TextInput
          returnKeyType='done'
          style={{ flex: 1, padding: 3, color: 'white', fontSize: 18 }}
          placeholder={global?.language?.label_search}
          placeholderTextColor='white'
          onChangeText={onChangeText}
          value={value}
          clearButtonMode='while-editing'
        />
        <View style={{ marginHorizontal: 10 }}>{isLoading && <ActivityIndicator />}</View>
      </View>
    </>
  )
}

export default SearchInput
