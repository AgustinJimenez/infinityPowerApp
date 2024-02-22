import { call, put, all, takeEvery, actionChannel, putResolve } from 'redux-saga/effects'
import { CALLBACK_VOID_SAGA } from './constants.json'

function* voidFunction({ actions = [], callback = () => {} }) {
  if (!Array.isArray(actions)) actions = [actions]
  
  for(let action of actions)
    yield putResolve(action)


  if(typeof callback === 'function')
  yield call(callback)
}

export default function* callbackVoidSaga() {
  yield takeEvery(CALLBACK_VOID_SAGA, voidFunction)
}
