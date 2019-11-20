import React from 'react';

export default function ConnectionForm({ isConnected }) {
  function handleSubmit(e) {
    e.preventDefault();
    const machineId = e.target.machine_id.value;
    console.log({ machineId });
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
          <input name="machine_id" className="form-control" required />
        </div>

        <div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isConnected}
          >
            Connect
          </button>
          <button
            type="button"
            className="btn btn-danger ml-3"
            disabled={!isConnected}
          >
            Disconnect
          </button>
        </div>
      </form>

      <div className="mt-4">
        <span>Status:</span>
        {' '}
        { renderStatus() }
      </div>
    </div>
  );
}
