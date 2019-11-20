import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './navbar/navbar';
import ConnectionForm from './connection-form/connection-form';

function App() {
  return (
    <div>
      <Navbar />

      <section className="container mt-5">
        <div className="row mt-5">
          <div className="col-12 col-md-8 col-lg-6">
            <ConnectionForm />
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
