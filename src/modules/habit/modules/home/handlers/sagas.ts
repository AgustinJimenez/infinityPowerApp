import { call, put, select, takeEvery } from 'redux-saga/effects';
import { handleObjectiveApi, ObjectiveProps } from './api';
import { habitHomeActions } from './redux';

interface ObjectiveCreateSuccessProps {
  type: string;
  payload: ObjectiveProps;
}

function* userObjectiveCreateSaga({ payload }: ObjectiveCreateSuccessProps) {
  const token = yield select(state => state.auth.token);
  try {
    const data = yield call(handleObjectiveApi(token).create, payload);
    yield put(habitHomeActions.objectiveCreateSuccess());
    yield put(habitHomeActions.loadObjectives([data]));
  } catch (error) {
    console.log({ error });
  }
}

export function* habitHomeSagas() {
  // yield takeEvery(habitHomeActions.objectiveCreate.type, userObjectiveCreateSaga);
}
