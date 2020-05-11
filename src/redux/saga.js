import { call, cancel, delay, fork, put, take } from 'redux-saga/effects';

import ActionType from './action-type';


/**
 * Root saga.
 */
export default function* saga() {
  while (true) {
    const connectAction = yield take(ActionType.CONNECT_REQUEST);
    yield delay(500);
    yield put({ type: ActionType.CONNECT_SUCCESS });

    yield take(ActionType.DISCONNECT_REQUEST);
    yield delay(500);
    yield put({ type: ActionType.DISCONNECT_SUCCESS });
  }
}