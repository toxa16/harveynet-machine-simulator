import { connect } from 'react-redux';

import ConnectionForm from './connection-form';

function mapStateToProps(state) {
  return {
    isConnected: state.isConnected,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

const ConnectedConnectionForm = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConnectionForm);

export default ConnectedConnectionForm;
