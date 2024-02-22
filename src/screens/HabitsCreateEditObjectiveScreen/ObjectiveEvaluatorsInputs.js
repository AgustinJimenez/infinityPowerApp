import React from 'react'
import { Platform, View, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { scale } from '../../helpers/styles'
import { useSelector } from 'react-redux'
import { datasetSelector } from '../../redux/selectors'
import { Icon, Switch } from 'native-base'
import UserAvatar from '../../components/UserAvatar'
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view'
import Share from 'react-native-share'
import styles from './styles'
import moment from 'moment-timezone'
import { useTranslation } from 'react-i18next'
import capitalizeWords from '../../helpers/capitalizeWords'

const ObjectiveEvaluatorsInputs = ({
  evaluators = [],
  label,
  onFocus = () => {},
  objective_id,
  type,
  inviteCode = '',
  onDeleteEvaluator = () => {},
  onUpdateEvaluators = () => {},
  isEdit = false,
  cansSubmitForm = false,
  saveOrUpdateObjective = opts => {},
}) => {
  const { t } = useTranslation()
  //let users = useSelector(state => datasetSelector(state, 'users', { ids: evaluators.map(e => e.muser_id) }))'
  const [isOpeningModal, setIsOpeningModal] = React.useState(false)
  let user = useSelector(state => datasetSelector(state, 'user'))
  const openInvitationModal = React.useCallback(async () => {
    setIsOpeningModal(true)
    let response = false
    if (!inviteCode) return
    if (!objective_id) {
      response = await saveOrUpdateObjective({ goToHabitsHome: false, showToast: false })
      if (response['error']) {
        setIsOpeningModal(false)
        return
      }
    }

    const title = t('action_share_title')
    const content = `${t('action_share_message')}/${inviteCode}`
    const url = `infinitepower://code/${inviteCode}`
    const options = Platform.select({
      ios: {
        activityItemSources: [
          {
            placeholderItem: { type: 'text', content },
            item: {
              default: { type: 'text', content },
            },
            linkMetadata: {
              // For showing app icon on share preview.
              title,
            },
          },
        ],
      },
      default: {
        title: t('action_share_title'),
        message: `${t('action_share_message')}/${inviteCode}`,
        url,
      },
    })
    setIsOpeningModal(false)
    await Share.open({ ...options, failOnCancel: false })
  }, [inviteCode, objective_id, saveOrUpdateObjective])

  const switchPressed = React.useCallback(
    ({ user_id = null, field_name = '', new_value = false } = {}) => {
      let new_evaluators = [...evaluators]
      let tryingToUncheckTheLastUserThatCanEvaluate =
        field_name === 'can_evaluate' && new_value === false && new_evaluators.filter(e => !!e['can_evaluate']).length === 1
      if (tryingToUncheckTheLastUserThatCanEvaluate)
        return Alert.alert(capitalizeWords(t('notice')), t('at_least_one_user_have_to_be_an_active_evaluator'), [{ text: 'OK' }])

      new_evaluators.map(eva => {
        if (eva['muser_id'] === user_id) eva[field_name] = new_value
        return eva
      })
      onUpdateEvaluators(new_evaluators)
    },
    [evaluators],
  )

  const deleteEvaluator = React.useCallback(
    async ({ user_id = null } = {}) => {
      let new_evaluators = [...evaluators]
      new_evaluators = new_evaluators.filter(eva => eva['muser_id'] !== user_id)
      onDeleteEvaluator(new_evaluators)
      //console.log('deleteEvaluator ===> ', { user_id, evaluators, new_evaluators })
      /* 
        //console.log('deleteEvaluator ===> ', { user_id, objective_id })
        let { error } = await request({
          url: 'mobile/users/delete_evaluator',
          method: 'POST',
          data: {
            user_id,
            objective_id,
          },
        })
        if (!error) {
          let new_evaluators = [...evaluators]
          new_evaluators = new_evaluators.filter(eva => eva['muser_id'] !== user_id)
          onDeleteEvaluator(new_evaluators)
        } else
          Toast.show({
            text: t('unexpected_error'),
            type: 'danger',
            duration: 4000,
          })
           */
    },
    [evaluators],
  )
  /* 
  if (!focusOn)
    return (
      <>
        <FieldLabel text={label} value={true} focusOn={focusOn} type={type} />
        <TouchableOpacity disabled={!cansSubmitForm} style={styles.evaluatorsContainer} onPress={() => onFocus(false)}>
          {React.Children.toArray(evaluators.map(evaluator => <UserAvatar user_id={evaluator['muser_id']} containerStyle={styles.avatarRow} />))}

          {!isEdit && !evaluators?.length && <UserAvatar user_id={user['id']} containerStyle={styles.avatarRow} />}

          <TouchableOpacity disabled={!cansSubmitForm} style={styles.addEvaluatorIconContainer} onPress={openInvitationModal}>
            <Icon name='plus' type='AntDesign' style={cansSubmitForm ? styles.addEvaluatorIcon : styles.addEvaluatorIconDisabled} />
          </TouchableOpacity>
        </TouchableOpacity>
      </>
    )
 */
  return (
    <>
      <KeyboardAwareScrollView horizontal bounces={false} showsHorizontalScrollIndicator={false}>
        <View style={styles.evaluatorsInputContainer}>
          <View style={styles.evaluatorsInputsTitleContainer}>
            <Text style={styles.titleColumnEvaluators}>{capitalizeWords(t('contact'))}</Text>
            <Text style={styles.titleColumnEvaluators}>{capitalizeWords(t('is_evaluator'), { firstOnly: true, excludeWordWithLength: 1 })}</Text>
            <Text style={styles.titleColumnEvaluators}>{capitalizeWords(t('see_my_progress'), { firstOnly: true, excludeWordWithLength: 1 })}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.evaluatorsGroup}>
            <SwipeListView
              data={evaluators}
              renderItem={(item, rowMap) => {
                let evaluator = item.item

                return (
                  <SwipeRow
                    disableLeftSwipe={user['id'] === evaluator['muser_id'] || !!evaluator['stopped_at']}
                    disableRightSwipe
                    rightOpenValue={-scale(3.6)}
                    style={styles.overflowHidden}
                    swipeRowStyle={styles.overflowHidden}
                    contentContainerStyle={styles.overflowHidden}
                  >
                    <TouchableOpacity
                      style={styles.deleteEvaluatorContainer}
                      onPress={() => {
                        let evaluator = data['item']
                        deleteEvaluator({ user_id: evaluator['muser_id'] })
                      }}
                    >
                      <Text style={styles.deleteEvaluatorText}>{capitalizeWords(t('delete_evaluator'))}</Text>
                    </TouchableOpacity>
                    <View>
                      <View style={styles.evaluatorContainer}>
                        <TouchableOpacity style={[styles.removeEvaluatorContainer, !evaluator['stopped_at'] ? { width: '25%' } : {}]}>
                          {/* <Image source={ImageCross} style={styles.removeEvaluatorImage} /> */}
                          <UserAvatar user_id={evaluator['muser_id']} containerStyle={styles.avatarContact} active={!evaluator['stopped_at']} />
                        </TouchableOpacity>
                        {(() => {
                          if (!!evaluator['stopped_at']) {
                            let stopped_at = moment(evaluator['stopped_at']).tz(user['timezone'])
                            console.log({ TZ: user['timezone'], stoped_at: evaluator['stopped_at'], stopped_at })
                            let message = ''

                            if (evaluator['show_progress'] && evaluator['can_evaluate'])
                              message = t('stopped_evaluating_and_follow_the_objective_at') + ` ${stopped_at.format('DD/MM')}`
                            else if (!evaluator['show_progress']) message = t('stopped_evaluating_the_objective_at') + ` ${stopped_at.format(' DD/MM')}`

                            return <Text style={styles.stoppedAtTxt}>{capitalizeWords(message, { firstOnly: true })}</Text>
                          }

                          return (
                            <>
                              <View style={styles.switchContainer}>
                                <Switch
                                  value={evaluator['can_evaluate']}
                                  onValueChange={is_checked =>
                                    switchPressed({ user_id: evaluator['muser_id'], field_name: 'can_evaluate', new_value: is_checked })
                                  }
                                />
                              </View>
                              <View style={styles.switchContainer}>
                                {evaluator['muser_id'] !== user['id'] && (
                                  <Switch
                                    value={evaluator['show_progress']}
                                    onValueChange={is_checked =>
                                      switchPressed({ user_id: evaluator['muser_id'], field_name: 'show_progress', new_value: is_checked })
                                    }
                                  />
                                )}
                              </View>
                            </>
                          )
                        })()}
                      </View>

                      <>{evaluators?.length - 1 !== item.index && <View style={styles.divider} />}</>
                    </View>
                  </SwipeRow>
                )
              }}
            />
            <View style={styles.divider} />
            {!!cansSubmitForm && (
              <View style={styles.evaluatorContainer}>
                {!!isOpeningModal ? (
                  <ActivityIndicator size='large' style={styles.addEvaluatorIconContainer} />
                ) : (
                  <TouchableOpacity disabled={!cansSubmitForm} style={styles.addEvaluatorIconContainer} onPress={openInvitationModal}>
                    <Icon name='plus' type='AntDesign' style={styles.addEvaluatorIconDisabled} />
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>
        </View>
      </KeyboardAwareScrollView>
    </>
  )
}

export default ObjectiveEvaluatorsInputs
