import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './navbar/navbar';

function App() {
  return (
    <div>
      <Navbar />

      <section className="container mt-5">
        <div className="row mt-5">
          <div className="col-12 col-md-8 col-lg-6">
            <form action="/">
              <div className="form-group">
                <label>Machine ID:</label>
                <input name="machine_id" className="form-control" />
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
        </div>
      </section>
    </div>
  );
}

export default App;
