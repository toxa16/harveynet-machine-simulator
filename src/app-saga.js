import { call, put, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import ActionType from './action-type.enum';

const controlServerUrl = 'ws://localhost:5000'; // env

function controlServerChannel(machineId) {
  const url = `${controlServerUrl}/?machine=${machineId}`;
  const socket = new WebSocket(url);

  return eventChannel(emit => {
    function handleOpen() {
      console.log('websocket opened.')
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

export default function* appSaga() {
  while (true) {
    yield take(ActionType.CONNECT_REQUEST);
    yield put({ type: ActionType.CONNECT_SUCCESS });

    // connecting to control server (websocket)
    const machineId = 'machine0'; // HARDCODE
    const channel = yield call(controlServerChannel, machineId);

    yield take(ActionType.DISCONNECT_REQUEST);
    // disconnecting from control server
    channel.close();
    yield put({ type: ActionType.DISCONNECT_SUCCESS });
  }
}
