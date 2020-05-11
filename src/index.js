import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import './index.css';
import App from './app';
import app from './redux/reducer';
import saga from './redux/saga';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  app,
  applyMiddleware(sagaMiddleware),
);
sagaMiddleware.run(saga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
