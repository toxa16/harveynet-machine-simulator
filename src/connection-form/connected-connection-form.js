import { connect } from 'react-redux';

import ConnectionForm from './connection-form';
import ActionType from '../action-type.enum';

function mapStateToProps(state) {
  return {
    isConnected: state.isConnected,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onConnect: () => dispatch({ type: ActionType.CONNECT_REQUEST }),
    onDisconnect: () => dispatch({ type: ActionType.DISCONNECT }),
  };
}

const ConnectedConnectionForm = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConnectionForm);

export default ConnectedConnectionForm;
