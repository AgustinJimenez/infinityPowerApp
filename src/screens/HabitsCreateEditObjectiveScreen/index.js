import React from 'react'
import { Text } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import HomeBase from '../../components/HomeBase'
import moment from 'moment'
import capitalizeWords from '../../helpers/capitalizeWords'
import { useDispatch, useSelector } from 'react-redux'
import { datasetSelector } from '../../redux/selectors'
import { allDays } from '../../components/DayPicker2'
import request from '../../helpers/request'
import { NavigationActions, StackActions } from 'react-navigation'
import { Toast } from 'native-base'
import { NavigationContext } from 'react-navigation'
import { updateHabitsHomeDataSagaAction } from '../../sagas/actions'
import sleep from '../../helpers/sleep'
import styles from './styles'
import Field from './Field'
import ReadyLabel from './ReadyLabel'
import TrashButton from './TrashButton'
import { setDatasetToReducer } from '../../redux/actions'

const TopRightButton = ({ isEdit, cansSubmitForm, saveOrUpdateObjective, wasEdited }) => {
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(setDatasetToReducer(false, 'create_edit_objective_is_loading'))
  }, [])

  //console.log('TopRightButton ===> ', { isEdit, wasEdited })
  if (!!isEdit && !wasEdited) return <TrashButton />

  if (!!cansSubmitForm) return <ReadyLabel onPress={saveOrUpdateObjective} />

  return null
}

const reminderTimeDefaultTimeMoment = moment().set({ hour: 8, minutes: 0 })

const HabitsCreateEditObjectiveScreen = ({}) => {
  const navigation = React.useContext(NavigationContext)
  const dispatch = useDispatch()
  const [isEdit, setIsEdit] = React.useState(!!navigation?.state?.params?.id)
  const [objective_id, setObjectiveId] = React.useState(navigation?.state?.params?.id)
  const objective = useSelector(state => datasetSelector(state, 'objectives', { id: objective_id }))
  const setIsLoadingRightTop = React.useCallback(is_loading => dispatch(setDatasetToReducer(is_loading, 'create_edit_objective_is_loading')))
  const user = useSelector(state => datasetSelector(state, 'user'))
  const timezone = useSelector(state => datasetSelector(state, 'timezone'))
  const imei = useSelector(state => datasetSelector(state, 'imei'))
  const inputsRefs = [
    React.useRef(null),
    React.useRef(null),
    React.useRef(null),
    React.useRef(null),
    React.useRef(null),
    React.useRef(null),
    React.useRef(null),
    React.useRef(null),
  ]
  const [objectiveName, setObjectiveName] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [trigger, setTrigger] = React.useState('')
  const [deadline, setDeadLine] = React.useState(moment().add('day', 1))
  const [evaluationsDays, setEvaluationsDays] = React.useState([])
  const [reminder_time, setReminderTime] = React.useState(reminderTimeDefaultTimeMoment)
  const [habit_id, setHabitId] = React.useState(null)
  const [inviteCode, setInviteCode] = React.useState('')
  const [auto_evaluation, setAutoEvaluation] = React.useState(true)
  const [share_results, setShareResults] = React.useState(true)
  const [evaluators, setEvaluators] = React.useState([])

  React.useEffect(() => {
    if (!!objective_id && user != undefined)
    {
      dispatch(
        updateHabitsHomeDataSagaAction({
          objectives_ids: [objective_id],
          replace_habits_home_datas: false,
        }),
      )

    }

    let evaluators = [...(objective?.evaluators || [])]
    let sameUserIsEvaluator = false
    evaluators?.some?.(eva => {
      if (eva['muser_id'] === user['id']) {
        sameUserIsEvaluator = true
        return true
      }

      return false
    })
    if (!sameUserIsEvaluator && !isEdit) {
      evaluators.push({ muser_id: user['id'], objective_id, owner_id: user['id'], show_progress: true, share_pro: true, can_evaluate: true })
    }
    setEvaluators(evaluators)
    if (!objective_id || !objective) return

    setObjectiveName(objective.objective)
    setDescription(objective.description)
    setTrigger(objective.trigger)
    setDeadLine(moment(objective.deadline.substring(0, 10)))
    setEvaluationsDays(
      allDays.filter(day => !!objective?.[`evaluation_${day}`]),
      //evaluation_monday|evaluation_tuesday|evaluation_wednesday|evaluation_thursday|evaluation_friday|evaluation_saturday|evaluation_sunday
    )
    setReminderTime(moment().set({ hours: objective.reminder_time.substring(0, 2), minutes: objective.reminder_time.substring(3, 5) }))
    setHabitId(navigation?.state?.params?.habit?.habitId)
    setInviteCode(objective?.invite_code?.code)
    setAutoEvaluation(objective.auto_evaluation)
    setShareResults(objective.share_results)
    //console.log('OBJECTIVE EDIT ===> ', { objective, evaluators })
  }, [])

  const wasEdited =
    objectiveName != objective?.objective ||
    description != objective.description ||
    trigger != objective.trigger ||
    deadline.format('YYYY-MM-DD') != objective.deadline.substring(0, 10) ||
    reminder_time.format('HH:mm') != objective.reminder_time.substring(0, 5) ||
    objective.evaluation_friday !== evaluationsDays.includes('friday') ||
    objective.evaluation_monday !== evaluationsDays.includes('monday') ||
    objective.evaluation_saturday !== evaluationsDays.includes('saturday') ||
    objective.evaluation_sunday !== evaluationsDays.includes('sunday') ||
    objective.evaluation_thursday !== evaluationsDays.includes('thursday') ||
    objective.evaluation_tuesday !== evaluationsDays.includes('tuesday') ||
    objective.evaluation_wednesday !== evaluationsDays.includes('wednesday') ||
    JSON.stringify(
      evaluators?.map?.(e => ({
        muser_id: e?.['muser_id'],
        share_progress: e?.['share_progress'],
        show_progress: e?.['show_progress'],
        can_evaluate: e?.['can_evaluate'],
      })),
    ) !=
      JSON.stringify(
        objective?.evaluators?.map?.(e => ({
          muser_id: e?.['muser_id'],
          share_progress: e?.['share_progress'],
          show_progress: e?.['show_progress'],
          can_evaluate: e?.['can_evaluate'],
        })),
      )

  const cansSubmitForm = !!objectiveName && !!deadline && !!evaluationsDays?.length && !!inviteCode

  const formFieldsDatas = {
    lang: user['default_language'],
    imei: user['imei'],
    timezone,
    objective: objectiveName,
    description,
    trigger,
    habit_id,
    reminder_time: reminder_time.format('HH:mm'),
    deadline: deadline.format('YYYY-MM-DD'),
    code: inviteCode,
    auto_evaluation,
    share_results,
    objective_id,
    weeks: evaluationsDays,
    evaluators,
  }

  const saveOrUpdateObjective = async ({ goToHabitsHome = true, showToast = true } = {}) => {
    setIsLoadingRightTop(true)
    var response = null
    if (!cansSubmitForm) {
      setIsLoadingRightTop(false)
      return
    }

    response = await request({
      url: `actions/${!!isEdit ? 'update_objective' : 'create_objective'}`,
      method: 'POST',
      data: formFieldsDatas,
      show_message: true,
      //debug: true,
    })
    if (!!response['data']['inserted_objective_id']) {
      setObjectiveId(response['data']['inserted_objective_id'])
      setIsEdit(true)
    }

    if (response['error']) {
      if (showToast)
        await Toast.show({
          text: global?.['language']?.['save_objective_error'],
          duration: 2000,
          type: 'danger',
        })
    } else {
      if (showToast)
        await Toast.show({
          text: global?.['language']?.['save_objective_success'],
          duration: 2000,
          type: 'success',
        })

      if (goToHabitsHome) {
        await sleep(1000)
        let resetAction = StackActions.reset({
          index: 1,
          actions: [NavigationActions.navigate({ routeName: 'Main' }), NavigationActions.navigate({ routeName: 'HabitsHome' })],
        })
        navigation.dispatch(resetAction)
      }
    }
    setIsLoadingRightTop(false)
    return { error: response['error'] }
  }

  React.useEffect(() => {
    ;(async () => {
      if (!!inviteCode) return

      let formdata = {
        lang: user.default_language,
        imei,
        timezone,
      }
      let { data, error } = await request({
        url: 'actions/get_invite_code',
        method: 'POST',
        data: formdata,
        show_message: true,
      })

      if (!error && !!data && !!data['code']) {
        setInviteCode(data['code'])
      }
      if (error) {
        await Toast.show({
          text: global?.['language']?.['unexpected_error'],
          duration: 2000,
          type: 'error',
        })
        navigation.goBack()
      }

      //this.setState({ loading: false, inviteCodeError: false, inviteCode: data['code'] })
    })()
  }, [])

  return (
    <HomeBase style={styles.container} hasBackButton showActionButton={false}>
      <KeyboardAwareScrollView contentContainerStyle={styles.scrollContainer}>
        {isEdit ? (
          <Text style={styles.objectiveNameOnEdit}>{objectiveName}</Text>
        ) : (
          <Field
            isTitle
            value={objectiveName}
            onChangeValue={value => setObjectiveName(value)}
            label={`*${capitalizeWords(global?.language?.objective_title)}`}
            containerStyle={{}}
            inputRef={inputsRefs[0]}
            nextRef={inputsRefs[1]}
          />
        )}
        <Field
          value={description}
          onChangeValue={value => setDescription(value)}
          label={`*${capitalizeWords(global?.language?.objective_description, { firstOnly: true })}`}
          placeholder={global?.language?.objective_description_placeholder}
          containerStyle={{}}
          inputRef={inputsRefs[1]}
          nextRef={inputsRefs[2]}
          hasError
        />
        <Field
          value={trigger}
          onChangeValue={value => setTrigger(value)}
          label={capitalizeWords(global?.language?.habit_trigger_to_replace, { firstOnly: true })}
          placeholder={global?.language?.trigger_placeholder}
          containerStyle={{}}
          inputRef={inputsRefs[2]}
          nextRef={inputsRefs[3]}
        />
        <Field
          value={deadline}
          onChangeValue={newDate => setDeadLine(moment(newDate))}
          label={capitalizeWords(global?.language?.limit_date)}
          //placeholder='5 de Noviembre de 2020'
          containerStyle={{}}
          inputRef={inputsRefs[3]}
          nextRef={inputsRefs[4]}
          type='date'
          showRemainingDays
        />
        <Field
          label={`*${capitalizeWords(global?.language?.evaluation_days)}`}
          //placeholder='5 de Noviembre de 2020'
          containerStyle={{}}
          inputRef={inputsRefs[4]}
          nextRef={inputsRefs[5]}
          type='day'
          value={evaluationsDays}
          onChangeValue={setEvaluationsDays}
          showRemainingDays
        />
        <Field
          value={reminder_time}
          onChangeValue={newDate => setReminderTime(moment(newDate))}
          label={capitalizeWords(global?.language?.evaluation_days_reminder)}
          //placeholder='5 de Noviembre de 2020'
          containerStyle={{}}
          inputRef={inputsRefs[5]}
          nextRef={inputsRefs[6]}
          type='time'
          showRemainingDays
        />
        <Field
          label={capitalizeWords(global?.language?.evaluators)}
          containerStyle={{}}
          type='evaluators'
          value={evaluators}
          objective_id={objective_id}
          inviteCode={inviteCode}
          onChangeValue={new_evaluators => setEvaluators(new_evaluators)}
          isEdit={isEdit}
          cansSubmitForm={cansSubmitForm}
          saveOrUpdateObjective={saveOrUpdateObjective}
          formFieldsDatas={formFieldsDatas}
        />
      </KeyboardAwareScrollView>
      <TopRightButton wasEdited={wasEdited} isEdit={isEdit} saveOrUpdateObjective={saveOrUpdateObjective} cansSubmitForm={cansSubmitForm} />
    </HomeBase>
  )
}

export default HabitsCreateEditObjectiveScreen
