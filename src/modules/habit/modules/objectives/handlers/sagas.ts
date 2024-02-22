import { call, put, select, takeEvery } from 'redux-saga/effects';
import { navigation } from 'src/constants';
import { handleObjectiveApi, ObjectiveProps, ErrorCurrentProps } from './api';
import { habitObjectiveActions } from './redux';

interface ObjectiveCreateProps {
  type: string;
  payload: ObjectiveProps;
}

function* userObjectiveCreateSaga({ payload }: ObjectiveCreateProps) {
  const token = yield select(state => state.auth.token);
  try {
    const data = yield call(handleObjectiveApi(token).create, payload);
    // yield put(habitObjectiveActions.objectiveCreateSuccess());
    // yield put(habitObjectiveActions.loadObjectives([data]));
    // console.log(data);
    // TODO: what do it with this information?
    // {"success": {"created_at": "2022-07-05 11:45:55", "deadline": "2022-09-30", "description": "Es una", "evaluators": [[Object]], "friday": false, "hour": "08:00", "id": 8, "monday": false, "name": "Hola", "saturday": false, "sunday": false, "thursday": false, "trigger": "Rate es in Galileo", "tuesday": true, "user_id": 67, "wednesday": true}}
    navigation.navigate('HomeHabit');
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
    yield put(habitObjectiveActions.getObjectivesSuccess());
    yield put(habitObjectiveActions.objectiveSet({  objectives: data }));
  } catch (error) {
    console.log({ error });
    yield put(habitObjectiveActions.getObjectivesSuccess());
  }
}

export function* habitObjectiveSagas() {
  yield takeEvery(habitObjectiveActions.objectiveCreate.type, userObjectiveCreateSaga);
  yield takeEvery(habitObjectiveActions.getObjectives.type, userObjectiveGetSaga);
}
