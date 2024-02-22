import {
  CLEAR_REDUCER_SAGA,
  UPDATE_DEVICE_IMEI_SAGA,
  FETCH_FOCUSING_MEDIUMS_SAGA,
  FETCH_USER_PENDING_QUESTIONS_SAGA,
  CALLBACK_VOID_SAGA,
  FETCH_MENTAL_FOCUS_PERCENTAGE_SAGA,
  NOTIFICATION_OPENED_SAGA,
  FETCH_OBJECTIVES_SAGA,
  FETCH_ROUTINES_SAGA,
  FETCH_NOTIFICATIONS_COUNT_SAGA,
  FETCH_TODAY_ACTIVITIES_DATAS,
  FETCH_ROUTINES_CONFIGURATIONS,
  FETCH_NOTES_SAGA,
  UPDATE_HOME_DATAS_SAGA,
  UPDATE_FRIENDS_OBJECTIVES_SAGA,
  UPDATE_HABITS_HOME_DATAS_SAGA,
  UPDATE_INVITE_CODES_SAGA,
  REMOVE_ACTIVITY_FROM_STORE_BY_ID_SAGA,
  UPDATE_BELT_INFO_SCREEN_DATAS_SAGA,
} from './constants.json'

export const updateDeviceImeiSagaAction = () => ({
  type: UPDATE_DEVICE_IMEI_SAGA,
})

export const fetchFocusingMediumsSagaAction = () => ({
  type: FETCH_FOCUSING_MEDIUMS_SAGA,
})

export const fetchUsersPendingQuestionsSagaAction = () => ({
  type: FETCH_USER_PENDING_QUESTIONS_SAGA,
})

export const fetchMentalFocusPercentageSagaAction = () => ({
  type: FETCH_MENTAL_FOCUS_PERCENTAGE_SAGA,
})

export const clearDatasetsSagaAction = () => ({
  type: CLEAR_REDUCER_SAGA,
})

export const callbackVoidSagaAction = (actions = [], callback = () => {}) => ({
  type: CALLBACK_VOID_SAGA,
  actions,
  callback,
})

export const notificationOpenedSagaAction = (notification = {}) => ({
  type: NOTIFICATION_OPENED_SAGA,
  notification,
})

export const fetchObjectivesSagaAction = (objectives_ids = []) => ({
  type: FETCH_OBJECTIVES_SAGA,
  data: { objectives_ids },
})

export const fetchRoutinesSagaAction = (routines_ids = []) => ({
  type: FETCH_ROUTINES_SAGA,
  data: { routines_ids },
})

export const fetchNotificationsCountSagaAction = () => ({
  type: FETCH_NOTIFICATIONS_COUNT_SAGA,
})

export const fetchTodayActivitiesDatasSagaAction = () => ({
  type: FETCH_TODAY_ACTIVITIES_DATAS,
})
export const fetchRoutinesConfigurationsSagaAction = (routines_configurations_ids = []) => ({
  type: FETCH_ROUTINES_CONFIGURATIONS,
  data: { routines_configurations_ids },
})

export const fetchNotesSagaAction = (notes_ids = []) => ({
  type: FETCH_NOTES_SAGA,
  data: { notes_ids },
})

export const updateHomeDataSagaAction = () => ({
  type: UPDATE_HOME_DATAS_SAGA,
})

export const updateHabitsHomeDataSagaAction = ({ objectives_ids = [], replace_habits_home_datas = true } = {}) => ({
  type: UPDATE_HABITS_HOME_DATAS_SAGA,
  objectives_ids,
  replace_habits_home_datas,
})

export const updateUpdateFriendsObjectivesDataSagaAction = () => ({
  type: UPDATE_FRIENDS_OBJECTIVES_SAGA,
})

export const updateInviteCodesSagaAction = ({ invite_codes = [] }) => ({
  type: UPDATE_INVITE_CODES_SAGA,
  invite_codes,
})

export const removeActivityFromStoreByIdSagaAction = ({ ids = [], callback }) => ({
  type: REMOVE_ACTIVITY_FROM_STORE_BY_ID_SAGA,
  ids,
  callback,
})

export const updateBeltInfoScreenDatasSagaAction = () => ({
  type: UPDATE_BELT_INFO_SCREEN_DATAS_SAGA,
})
