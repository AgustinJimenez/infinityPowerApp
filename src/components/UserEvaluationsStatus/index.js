import React from 'react'
import { View, Text } from 'react-native'
import { Icon } from 'native-base'
import UserAvatar from '../UserAvatar'
import styles from './styles'
import capitalizeWords from '../../helpers/capitalizeWords'
import { useTranslation } from 'react-i18next'
import moment from 'moment'

const UserEvaluationsStatus = ({
  user_id,
  evaluations_count,
  evaluations_not_achieved_count,
  not_achieved_percentage,
  evaluations_achieved_count,
  achieved_percentage,
  evaluations_not_done_count,
  not_done_percentage,
  evaluator,
}) => {
  const { t } = useTranslation()
  /* 
  console.log('UserEvaluationsStatus ===> ', {
    user_id,
    evaluations_count,
    evaluations_not_achieved_count,
    not_achieved_percentage,
    evaluations_achieved_count,
    achieved_percentage,
    evaluations_not_done_count,
    not_done_percentage,
  }) */

  return (
    <View style={styles.container}>
      <UserAvatar user_id={user_id} /* active={!evaluator['stopped_at']} */ />
      <View style={styles.evaluationsStatusCountsContainer}>
        {(() => {
          /* 
          if (!!evaluator['stopped_at']) {
            let stopped_at = moment(evaluator['stopped_at'])
            let message = ''

            if (evaluator['show_progress'] && evaluator['can_evaluate'])
              message = t('stopped_evaluating_and_follow_the_objective_at') + ` ${stopped_at.format('DD/MM')}`
            else if (!evaluator['show_progress']) message = t('stopped_evaluating_the_objective_at') + ` ${stopped_at.format('DD/MM')}`

            return <Text style={styles.stoppedAtTxt}>{capitalizeWords(message, { firstOnly: true })}</Text>
          } */

          return (
            <>
              {!!evaluations_not_achieved_count && (
                <View style={[styles.evaluationsCountsContainer, { flex: not_achieved_percentage }]}>
                  <Text style={styles.countText}>{`${evaluations_not_achieved_count}/${evaluations_count}`}</Text>
                  <View style={[styles.statusContainer, styles.redBg]}>
                    <Icon type='Entypo' name='circle-with-cross' style={[styles.icon, styles.whiteColor]} />
                  </View>
                </View>
              )}
              {!!evaluations_not_done_count && (
                <View style={[styles.evaluationsCountsContainer, { flex: not_done_percentage }]}>
                  <Text style={styles.countText}>{`${evaluations_not_done_count}/${evaluations_count}`}</Text>
                  <View style={[styles.statusContainer, styles.redBg]}>
                    <Icon type='FontAwesome' name='question-circle' style={[styles.icon, styles.whiteColor, styles.redBg, { alignSelf: 'center' }]} />
                  </View>
                </View>
              )}
              {!!evaluations_achieved_count && (
                <View style={[styles.evaluationsCountsContainer, { flex: achieved_percentage }]}>
                  <Text style={styles.countText}>{`${evaluations_achieved_count}/${evaluations_count}`}</Text>
                  <View style={[styles.statusContainer, styles.greenBg]}>
                    <Icon type='FontAwesome' name='check-circle' style={[styles.icon, styles.whiteColor, { alignSelf: 'flex-end' }]} />
                  </View>
                </View>
              )}
            </>
          )
        })()}
      </View>
    </View>
  )
}

export default UserEvaluationsStatus
