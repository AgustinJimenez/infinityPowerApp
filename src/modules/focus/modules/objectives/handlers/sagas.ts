import { call, put, select, takeEvery } from 'redux-saga/effects';
import { navigation } from 'src/constants';
import { handleObjectiveApi, ObjectiveProps, ErrorCurrentProps } from './api';
import { focusObjectiveActions } from './redux';

interface ObjectiveCreateProps {
  type: string;
  payload: ObjectiveProps;
}

function* userObjectiveCreateSaga({ payload }: ObjectiveCreateProps) {
  const token = yield select(state => state.auth.token);
  try {
    const data = yield call(handleObjectiveApi(token).create, payload);
    // yield put(focusObjectiveActions.objectiveCreateSuccess());
    // yield put(focusObjectiveActions.loadObjectives([data]));
    // console.log(data);
    // TODO: what do it with this information?
    // {"success": {"created_at": "2022-07-05 11:45:55", "deadline": "2022-09-30", "description": "Es una", "evaluators": [[Object]], "friday": false, "hour": "08:00", "id": 8, "monday": false, "name": "Hola", "saturday": false, "sunday": false, "thursday": false, "trigger": "Rate es in Galileo", "tuesday": true, "user_id": 67, "wednesday": true}}
    navigation.navigate('HomeFocus');
  } catch (error) {
    const typedError = error as ErrorCurrentProps;

    console.log({ error: typedError.data });
  }
}

interface ObjectiveGetProps {
  type: string;
}

function* userObjectiveGetSaga(props: ObjectiveGetProps) {
  const token = yield select(state => state.auth.token);
  try {
    const data = yield call(handleObjectiveApi(token).get);
    yield put(focusObjectiveActions.getObjectivesSuccess());
    yield put(focusObjectiveActions.objectiveSet({  objectives: data }));
  } catch (error) {
    console.log({ error });
    yield put(focusObjectiveActions.getObjectivesSuccess());
  }
}

export function* focusObjectiveSagas() {
  yield takeEvery(focusObjectiveActions.objectiveCreate.type, userObjectiveCreateSaga);
  yield takeEvery(focusObjectiveActions.getObjectives.type, userObjectiveGetSaga);
}
