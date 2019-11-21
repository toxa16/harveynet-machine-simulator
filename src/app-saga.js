import { call, fork, put, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import ActionType from './action-type.enum';

const controlServerUrl = 'ws://localhost:5000'; // env

function controlServerChannel(machineId) {
  const url = `${controlServerUrl}/?machine=${machineId}`;
  const socket = new WebSocket(url);

  return eventChannel(emit => {
    function handleOpen() {
      console.log('websocket opened.')
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
      console.log('websocket closed.');
    }

    socket.addEventListener('open', handleOpen);
    socket.addEventListener('error', handleError);
    socket.addEventListener('message', handleMessage);
    socket.addEventListener('close', handleClose);

    return () => {
      socket.close();
    };
  });
}

function* handleChannelEmitter(channel) {
  while (true) {
    const action  = yield take(channel);
    yield put(action);
  }
}

export default function* appSaga() {
  while (true) {
    const connectAction = yield take(ActionType.CONNECT_REQUEST);
    //yield put({ type: ActionType.CONNECT_SUCCESS });  // DISORDERED

    // connecting to control server (websocket)
    const { machineId } = connectAction.payload;
    const channel = yield call(controlServerChannel, machineId);

    yield fork(handleChannelEmitter, channel);

    yield take(ActionType.DISCONNECT_REQUEST);
    // disconnecting from control server
    channel.close();
    yield put({ type: ActionType.DISCONNECT_SUCCESS }); // DISORDERED
  }
}
