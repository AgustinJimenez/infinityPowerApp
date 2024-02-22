import React from 'react'
import { View, StyleSheet, Text, RefreshControl, Image } from 'react-native'
import HomeBase from '../../components/HomeBase'
import capitalizeWords from '../../helpers/capitalizeWords'
import { globalStyles, scale } from '../../helpers/styles'
import { NavigationEvents } from 'react-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ImageUser from '../../img/user.png'
import { Icon, Switch } from 'native-base'
import DaysInitialsLabel from '../../components/DaysInitialsLabel'
import { updateUpdateFriendsObjectivesDataSagaAction } from '../../sagas/actions'
import { useDispatch, useSelector } from 'react-redux'
import { datasetSelector } from '../../redux/selectors'
import { daysArray } from '../../constants'
import { TouchableOpacity } from 'react-native'
import { NavigationContext } from 'react-navigation'
import FollowFriendSwitch from './FollowFriendSwitch'

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: scale(),
    width: '100%',
  },
  title: {
    fontWeight: '700',
    fontSize: scale(0.6),
    color: 'rgba(255,255,255,1)',
    textAlign: 'center',
    width: '100%',
    top: scale(),
  },
  subtitle: {
    fontWeight: '400',
    fontSize: scale(0.45),
    color: 'rgba(255,255,255,1)',
    textAlign: 'center',
    width: '100%',
    top: scale(1.5),
  },
  scrollContainer: {
    paddingBottom: scale(8),
  },
  listItemContainer: {
    flexDirection: 'row',
  },
  listContainer: {
    top: scale(1.9),
  },
  imageAvatar: {
    width: scale(1.4),
    height: scale(1.4),
    borderRadius: scale(1.4) / 2,
    backgroundColor: 'rgba(120,120,120,1)',
    padding: scale(0.3),
  },
  listItemLeftContainer: {
    width: '20%',
    //backgroundColor: 'red',
  },
  listItemMidContainer: {
    width: '60%',
    //backgroundColor: 'blue',
  },
  listItemRightContainer: {
    width: '18%',
    //backgroundColor: 'green',
  },
  listItemContainerTitle: {
    fontWeight: '700',
    fontSize: scale(0.45),
    color: 'rgba(255,255,255,1)',
    //textAlign: 'center',
  },
  listItemUsername: {
    fontWeight: '400',
    fontSize: scale(0.4),
    color: 'rgba(255,255,255,1)',
    marginVertical: scale(0.2),
  },
  friendObjectiveAchievementPercentageContainer: {},
  friendObjectiveAchievementPercentageText: {
    borderWidth: scale(0.04),
    borderColor: 'rgba(255,255,255,1)',
    borderRadius: scale(0.3),
    paddingVertical: scale(0.1),
    textAlign: 'center',
    fontWeight: '700',
    fontSize: scale(0.45),
    color: 'rgba(255,255,255,1)',
  },
  friendObjectiveAchievementSwitchContainer: {
    paddingVertical: scale(0.4),
  },
  daysNamesText: {
    fontWeight: '300',
    fontSize: 16, //scale(0.45),
    color: 'rgba(255,255,255,1)',
  },
  no_data: {
    marginVertical: scale(),
  },
})

const ListRefreshControl = ({ isRefreshing = false, onRefresh }) => (
  <RefreshControl
    tintColor='white'
    refreshing={isRefreshing}
    //refreshing={this.props.is_refreshing_today_activity_list}
    progressViewOffset={0}
    onRefresh={onRefresh}
  />
)

const FriendObjectiveAchievementPercentage = ({ achievement_percentage = 0, share_results = true }) => {
  if (share_results) return <Text style={styles.friendObjectiveAchievementPercentageText}>{achievement_percentage}%</Text>
  else return <Icon type='SimpleLineIcons' name='lock' style={styles.friendObjectiveAchievementPercentageText} />
}

const FriendsHabitsScreens = ({}) => {
  const navigation = React.useContext(NavigationContext)
  const dispatch = useDispatch()

  const fetchDatas = React.useCallback(() => {
    dispatch(updateUpdateFriendsObjectivesDataSagaAction())
  }, [])
  const friends_objectives_datas_is_loading = useSelector(state => datasetSelector(state, 'friends_objectives_datas_is_loading'))
  let { objectives } = useSelector(state => datasetSelector(state, 'friends_objectives_datas', { default_value: [] }))

  const user = useSelector(state => datasetSelector(state, 'user'))

  const {
    friends_objectives = objectives
      ?.map?.(objective => {
        return {
          id: objective.id,
          title: objective['objective'],
          user_name: objective?.user?.name,
          evaluationsDays: daysArray.filter(dayName => objective[`evaluation_${dayName}`]),
          image: objective?.user?.image,
          achievement_percentage: objective?.achieved,
          share_results: objective?.share_results,
          evaluators: objective.evaluators,
        }
      })
      .sort?.((nextO, prevO) => prevO?.id - nextO?.id),
  } = {}

  return (
    <HomeBase style={styles.container} hasBackButton showActionButton={false}>
      <NavigationEvents onDidFocus={() => fetchDatas()} />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContainer}
        refreshControl={<RefreshControl refreshing={friends_objectives_datas_is_loading} onRefresh={fetchDatas} tintColor='white' />}
      >
        <Text style={styles.title}>{capitalizeWords(global?.language?.habits)}</Text>
        <Text style={styles.subtitle}>{capitalizeWords(global?.language?.friends_objectives)}</Text>
        {!friends_objectives?.length && <Text style={[styles.subtitle, styles.no_data]}>{capitalizeWords(global?.language?.no_data)}</Text>}
        <View style={styles.listContainer}>
          {React.Children.toArray(
            friends_objectives?.map?.(({ id, title, user_name, evaluationsDays, image, achievement_percentage, evaluators }) => {
              let canSeeProgress = false

              evaluators?.some?.(({ muser_id, show_progress }) => {
                if (muser_id === user['id'] && show_progress) {
                  canSeeProgress = true
                  return true
                }

                return false
              })

              return (
                <View style={[globalStyles.darkTransparentBox, styles.listItemContainer]}>
                  <TouchableOpacity
                    disabled={!canSeeProgress}
                    onPress={() => navigation.navigate('HabitsObjectiveDetails', { id, isFromFriendsObjectiveScreen: true })}
                    style={[styles.listItemLeftContainer]}
                  >
                    <Image source={!!image ? { uri: image } : ImageUser} resizeMode='contain' style={styles.imageAvatar} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    disabled={!canSeeProgress}
                    onPress={() => navigation.navigate('HabitsObjectiveDetails', { id, isFromFriendsObjectiveScreen: true })}
                    style={[styles.listItemMidContainer]}
                  >
                    <Text style={styles.listItemContainerTitle}>{title}</Text>
                    <Text style={styles.listItemUsername}>{user_name}</Text>
                    <DaysInitialsLabel daysNames={evaluationsDays} style={styles.daysNamesText} self={false} />
                  </TouchableOpacity>
                  <View style={[styles.listItemRightContainer]}>
                    <FriendObjectiveAchievementPercentage achievement_percentage={achievement_percentage} share_results={canSeeProgress} />
                    <View style={styles.friendObjectiveAchievementSwitchContainer}>
                      <FollowFriendSwitch objective_id={id} onUnfollow={fetchDatas} />
                    </View>
                  </View>
                </View>
              )
            }),
          )}
        </View>
      </KeyboardAwareScrollView>
    </HomeBase>
  )
}

export default FriendsHabitsScreens
