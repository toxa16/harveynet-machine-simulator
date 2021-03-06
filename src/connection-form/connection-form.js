import React from 'react';

export default function ConnectionForm({
  isConnected, onConnect, onDisconnect,
}) {
  function handleSubmit(e) {
    e.preventDefault();
    const machineId = e.target.machine_id.value;
    onConnect(machineId);
  }

  function renderStatus() {
    if (isConnected) {
      return <b className="text-success">Connected</b>;
    } else {
      return <b className="text-dark">Disconnected</b>;
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} data-cy="connection-form">
        <div className="form-group">
          <label>Machine ID:</label>
          <input
            name="machine_id"
            className="form-control"
            disabled={isConnected}
            required
          />
        </div>

        <div>
          <button
            type="submit"
            data-cy="connect-button"
            className="btn btn-primary"
            disabled={isConnected}
          >
            Connect
          </button>

          <button
            type="button"
            data-cy="disconnect-button"
            className="btn btn-danger ml-3"
            disabled={!isConnected}
            onClick={ e => onDisconnect() }
          >
            Disconnect
          </button>
        </div>
      </form>

      <div className="mt-4" data-cy="connection-status">
        <span>Status:</span>
        {' '}
        { renderStatus() }
      </div>

      <div className="text-secondary mt-5">
        <p>
          This is the Machine Simulator <b>connection panel</b>.
        </p>
        <p>
          Use it to simulate machine connecting/disconnecting to the Control Server.
        </p>
      </div>
    </div>
  );
}
