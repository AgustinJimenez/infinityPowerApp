import React from 'react'
import { StyleSheet } from 'react-native'
import { Toast } from 'native-base'
import { Text, ActivityIndicator } from 'react-native'
import Dialog, { DialogContent, DialogFooter, DialogButton, DialogTitle } from 'react-native-popup-dialog'
import request from '../../helpers/request'
import { NavigationContext } from 'react-navigation'
import capitalizeWords from '../../helpers/capitalizeWords'
import { useDispatch, useSelector } from 'react-redux'
import { updateInviteCodesSagaAction } from '../../sagas/actions'
import { datasetSelector } from '../../redux/selectors'
import { scale } from '../../helpers/styles'
import { useTranslation } from 'react-i18next'

const styles = StyleSheet.create({
  invitation_message: {
    flexWrap: 'wrap',
    fontSize: scale(0.45),
  },
  contentContainer: {
    color: 'black',
    backgroundColor: 'white',
    minHeight: 150,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  dialogTitle: {
    backgroundColor: 'white',
    color: 'black',
    justifyContent: 'center',
  },
  dialogTitleText: {
    color: 'black',
    fontSize: scale(0.5),
    fontWeight: 'bold',
  },
  dialogFooter: {
    backgroundColor: 'white',
  },
  dialogFooterText: {
    color: 'black',
  },
  dialogFooterButton: {
    backgroundColor: 'white',
  },
  dialogFooterButtonText: {
    color: 'black',
  },
})

const InviteCodeDialog = ({}) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigation = React.useContext(NavigationContext)
  const [inviteCode, setInviteCode] = React.useState(navigation.state.params?.code || null)
  const objective_invitation_code_dialog_is_loading = useSelector(state => datasetSelector(state, 'objective_invitation_code_dialog_is_loading'))
  const currentInviteCode = useSelector(state => datasetSelector(state, 'invite_codes', { type: 'collection' }))
    .where('code', inviteCode)
    .first()
  const inviteCodeUser = useSelector(state => datasetSelector(state, 'users', { id: currentInviteCode?.['muser_id'] }))
  const inviteCodeObjective = useSelector(state => datasetSelector(state, 'objectives', { id: currentInviteCode?.['objective_id'] }))
  const [showInviteCodeDialog, setShowInviteCodeDialog] = React.useState(!!inviteCodeUser && !!inviteCodeObjective && !!currentInviteCode)

  //console.log('InviteCodeDialog ===> ', { nav: navigation.state.params, currentInviteCode, oid: currentInviteCode?.['objective_id'], inviteCodeObjective })

  React.useEffect(() => {
    if (!!navigation.state.params?.code) dispatch(updateInviteCodesSagaAction({ invite_codes: [inviteCode] }))
  }, [inviteCode])

  const useInviteCode = React.useCallback(async () => {
    let { data, error, message } = await request({
      url: 'actions/use_invite_code',
      method: 'POST',
      data: {
        code: inviteCode,
      },
    })
    setShowInviteCodeDialog(false)
    if (!error && data.evaluator) {
      Toast.show({
        text: capitalizeWords(t('objective_added_for_evaluation')),
        duration: 4000,
        type: 'success',
      })
      navigation.navigate('FriendsHabits')
    } else {
      if (message === 'you_are_already_a_evaluator') message = capitalizeWords(t(message), { firstOnly: true, excludeWordWithLength: 1 })
      else message = capitalizeWords(t('no_data'))
      Toast.show({
        text: message,
        duration: 4000,
        type: 'warning',
      })
    }

    navigation.setParams({})
  }, [inviteCode])

  const cancelInvitation = React.useCallback(() => {
    navigation.setParams({})
    setShowInviteCodeDialog(false)
  }, [])

  React.useEffect(() => {
    return () => {
      navigation.setParams({})
    }
  }, [])

  return (
    <Dialog
      width={0.8}
      visible={showInviteCodeDialog}
      onTouchOutside={cancelInvitation}
      dialogTitle={
        <DialogTitle title={capitalizeWords(t('invitation'))} hasTitleBar={false} style={styles.dialogTitle} textStyle={styles.dialogTitleText} align='left' />
      }
      footer={
        <DialogFooter>
          <DialogButton text={capitalizeWords(t('reject'))} style={styles.dialogFooter} textStyle={styles.dialogFooterText} onPress={cancelInvitation} />

          <DialogButton
            disabled={objective_invitation_code_dialog_is_loading && showInviteCodeDialog}
            text={capitalizeWords(t('accept'))}
            style={styles.dialogFooterButton}
            textStyle={styles.dialogFooterButtonText}
            onPress={useInviteCode}
          />
        </DialogFooter>
      }
    >
      <DialogContent style={styles.contentContainer}>
        <Text style={styles.invitation_message}>
          {!!objective_invitation_code_dialog_is_loading ? (
            <ActivityIndicator animating={true} size='large' />
          ) : (
            `${inviteCodeUser?.name} ${t('has_invited_you_to_evaluate_the_objective')} ${inviteCodeObjective?.objective}`
          )}
        </Text>
      </DialogContent>
    </Dialog>
  )
}
export default InviteCodeDialog
