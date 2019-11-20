import React from 'react';

export default function ConnectionForm({ isConnected }) {
  function handleSubmit(e) {
    e.preventDefault();
    const machineId = e.target.machine_id.value;
    console.log({ machineId });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Machine ID:</label>
          <input name="machine_id" className="form-control" required />
        </div>

        <div>
          <button type="submit" className="btn btn-primary">
            Connect
          </button>
          <button type="button" className="btn btn-danger ml-3" disabled>
            Disconnect
          </button>
        </div>
      </form>

      <div className="mt-4">
        <span>Status:</span>
        {' '}
        <b className="text-dark">Disconnected</b>
      </div>
    </div>
  );
}
