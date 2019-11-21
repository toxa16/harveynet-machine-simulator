import { put, take } from 'redux-saga/effects';
import ActionType from './action-type.enum';

export default function* appSaga() {
  while (true) {
    yield take(ActionType.CONNECT_REQUEST);
    yield put({ type: ActionType.CONNECT_SUCCESS });
    yield take(ActionType.DISCONNECT_REQUEST);
    yield put({ type: ActionType.DISCONNECT_SUCCESS });
  }
}
