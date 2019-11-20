import { take } from 'redux-saga/effects';
import ActionType from './action-type.enum';

export default function* appSaga() {
  while (true) {
    yield take(ActionType.CONNECT_REQUEST);
    console.log('connect request')
  }
}
