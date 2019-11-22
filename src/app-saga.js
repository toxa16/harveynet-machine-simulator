import { call, cancel, fork, put, take } from 'redux-saga/effects';
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
      const message = e.data;
      console.log(message);
      //const action = JSON.parse(e.data);
      //emit(action);
    }
    function handleClose() {
      console.log('websocket closed')
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

function* handleDisconnectRequest(socket) {
  // listening for disconnect request
  yield take(ActionType.DISCONNECT_REQUEST);
  // disconnecting from control server
  socket.close();
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
    const url = `${controlServerUrl}/?machine_id=${machineId}`;
    const socket = new WebSocket(url);
    const channel = yield call(controlServerChannel, socket);

    // in parallel listening for websocket events (and reacting on them)
    // this task will become inactive on END channel signal
    const handleChannelTask = yield fork(handleChannelEmitter, channel);

    // in parallel listening for disconnect request
    const disconnectRequestTask = yield fork(handleDisconnectRequest, socket);

    // listening for disconnect success
    yield take(ActionType.DISCONNECT_SUCCESS);
    // canceling the websocket event handling channel task
    yield cancel(handleChannelTask);
    // canceling the disconnect request listening task
    yield cancel(disconnectRequestTask);
  }
}
