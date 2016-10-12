import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { combineReducers, applyMiddleware } from 'redux';
import persistState from 'redux-localstorage';

import App from './App';
import './index.css';
import { timer } from './timer/timer';
import { entries } from './entries/entries';

const rootReducer = combineReducers({
  timer,
  entries
});

const enhancer = compose(
  applyMiddleware(thunk),
  persistState(null, { key: 'trackr' })
);

const store = createStore(
  rootReducer,
  enhancer
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
