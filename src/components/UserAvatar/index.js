import React from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import { useSelector } from 'react-redux'
import { scale } from '../../helpers/styles'
import { datasetSelector } from '../../redux/selectors'

const styles = StyleSheet.create({
  container: {
    width: scale(1.2),
    height: scale(1.2),
    borderRadius: scale(1.2) / 2,
    marginRight: scale(0.2),
    marginTop: scale(0.3),
    elevation: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  avatarImage: {
    width: scale(1.2),
    height: scale(1.2),
    borderRadius: scale(1.2) / 2,
  },
  nameInitials: {
    position: 'absolute',
    width: '100%',
    color: 'rgba(255,255,255,1)',
    fontSize: scale(0.7),
    alignSelf: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    top: scale(0.15),
    //backgroundColor: 'blue',
  },
})

const UserAvatar = ({ user_id = null, containerStyle = {}, active = true }) => {
  const user = useSelector(state => datasetSelector(state, 'users', { id: user_id }))
  const nameInitials = user?.name
    .split(' ')
    .map(wordName => wordName.charAt(0))
    .join('')
    .toUpperCase()
  /* 
  console.log('UserAvatar ===> ', {
    user,
    nameInitials,
  })
 */
  return (
    <View style={[styles.container, containerStyle]}>
      {!user?.image && <Text style={styles.nameInitials}>{nameInitials}</Text>}
      {!!user?.image && (
        <Image
          source={{ uri: user?.image || '' }}
          resizeMode='contain'
          style={[styles.avatarImage, { opacity: active ? 1 : 0.4, backgroundColor: active ? 'rgba(120, 120, 120, 1)' : null }]}
        />
      )}
    </View>
  )
}

export default UserAvatar
