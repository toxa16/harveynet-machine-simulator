import { put, take } from 'redux-saga/effects';
import Pusher from 'pusher-js';

import ActionType from './action-type';


const appKey = process.env.REACT_APP_PUSHER_APP_KEY;
const cluster = process.env.REACT_APP_PUSHER_CLUSTER || 'eu';
const authEndpoint = process.env.REACT_APP_PUSHER_AUTH_ENDPOINT;


/**
 * Root saga.
 */
export default function* saga() {
  if (process.env.NODE_ENV === 'development') {
    Pusher.logToConsole = true;
  }
  while (true) {
    const connectAction = yield take(ActionType.CONNECT_REQUEST);
    const { machineId } = connectAction.payload;

    // init pusher
    const pusher = new Pusher(appKey, {
      cluster,
      authEndpoint,
      auth: {
        params: { machineId },
      },
    });
    const channelName = `presence-${machineId}`;
    
    pusher.subscribe(channelName);
    yield put({ type: ActionType.CONNECT_SUCCESS });

    yield take(ActionType.DISCONNECT_REQUEST);
    pusher.unsubscribe(channelName);
    yield put({ type: ActionType.DISCONNECT_SUCCESS });
  }
}