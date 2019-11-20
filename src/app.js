import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './navbar/navbar';
import ConnectedConnectionForm from './connection-form/connected-connection-form';

function App() {
  return (
    <div>
      <Navbar />

      <section className="container mt-5">
        <div className="row mt-5">
          <div className="col-12 col-md-8 col-lg-6">
            <ConnectedConnectionForm />
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
