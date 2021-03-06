import ActionType from './action-type';

const initialState = {
  isConnected: false,
};

export default function app(state = initialState, action) {
  switch (action.type) {
    case ActionType.CONNECT_SUCCESS: {
      return Object.assign({}, state, {
        isConnected: true,
      });
    }
  case ActionType.DISCONNECT_SUCCESS: {
      return Object.assign({}, state, {
        isConnected: false,
      });
    }
    default: return state;
  }
}
