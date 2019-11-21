import { call, fork, put, take } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';

import ActionType from './action-type.enum';

const controlServerUrl = 'ws://localhost:5000'; // env

/**
 * Control Server WebSocket channel.
 * @param {*} socket 
 */
function controlServerChannel(socket) {
  return eventChannel(emit => {
    function handleOpen() {
      const action = { type: ActionType.CONNECT_SUCCESS };
      emit(action);
    }
    function handleError(e) {
      console.error('Error occurred.');
      console.error(e);
    }
    function handleMessage(e) {
      const action = JSON.parse(e.data);
      emit(action);
    }
    function handleClose() {
      const action = { type: ActionType.DISCONNECT_SUCCESS };
      emit(action);
      emit(END);
    }

    socket.addEventListener('open', handleOpen);
    socket.addEventListener('error', handleError);
    socket.addEventListener('message', handleMessage);
    socket.addEventListener('close', handleClose);

    return () => {
      socket.removeEventListener('open', handleOpen);
      socket.removeEventListener('error', handleError);
      socket.removeEventListener('message', handleMessage);
      socket.removeEventListener('close', handleClose);
    };
  });
}

/**
 * WebSocket channel event listener.
 * @param {*} channel 
 */
function* handleChannelEmitter(channel) {
  while (true) {
    const action  = yield take(channel);
    yield put(action);
  }
}

/**
 * App saga.
 */
export default function* appSaga() {
  while (true) {
    // listening for connect request
    const connectAction = yield take(ActionType.CONNECT_REQUEST);

    // connecting to control server (websocket)
    const { machineId } = connectAction.payload;
    const url = `${controlServerUrl}/?machine=${machineId}`;
    const socket = new WebSocket(url);
    const channel = yield call(controlServerChannel, socket);

    // in parallel listening for websocket events (and reacting on them)
    // this task will become inactive on END channel signal
    yield fork(handleChannelEmitter, channel);

    // listening for disconnect request
    yield take(ActionType.DISCONNECT_REQUEST);
    // disconnecting from control server
    socket.close();
  }
}
