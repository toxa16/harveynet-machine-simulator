import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './navbar/navbar';

function App() {
  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h1>App</h1>
      </div>
    </div>
  );
}

export default App;
