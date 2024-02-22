import React from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'
import { Switch, Toast } from 'native-base'
import request from '../../helpers/request'
import sleep from '../../helpers/sleep'
import capitalizeWords from '../../helpers/capitalizeWords'

const styles = StyleSheet.create({
  friendObjectiveAchievementSwitch: {
    //backgroundColor: 'yellow',
    alignSelf: 'center',
    justifyContent: 'center',
  },
})

const FollowFriendSwitch = ({ objective_id, onUnfollow }) => {
  const [isLoading, setLoader] = React.useState(false)
  const [following, setFollowing] = React.useState(true)
  const [stopFollowingHappened, setStopFollowingEvent] = React.useState(false)
  const stopFollowingFriend = React.useCallback(async () => {
    setLoader(true)

    let { error } = await request({
      url: 'mobile/users/stop_following_friend_objective',
      method: 'POST',
      data: {
        objective_id,
      },
    })
    if (error)
      await Toast.show({
        text: capitalizeWords(global?.['language']?.['unexpected_error']),
        duration: 2000,
        type: 'danger',
      })
    else {
      await Toast.show({
        text: capitalizeWords(global?.['language']?.['unfollowed_correctly']),
        duration: 2000,
        type: 'success',
      })
      setFollowing(false)
      setStopFollowingEvent(true)
    }

    setLoader(false)
    sleep(1000)
    onUnfollow()
  })

  if (stopFollowingHappened) return null

  if (isLoading) return <ActivityIndicator size='large' />

  return (
    <Switch
      trackColor={{ false: 'rgba(120,120,120,1)', true: 'rgba(13,223,202,1)' }}
      value={following}
      style={styles.friendObjectiveAchievementSwitch}
      onValueChange={stopFollowingFriend}
    />
  )
}
export default FollowFriendSwitch
