import ActionType from './action-type.enum';

const initialState = {
  isConnected: false,
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case ActionType.CONNECT: {
      return Object.assign({}, state, {
        isConnected: true,
      });
    }
    default: return state;
  }
}
