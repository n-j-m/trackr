import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { combineReducers, applyMiddleware } from 'redux';
import App from './App';
import './index.css';
import { timer } from './timer/timer';
import { entries } from './entries/entries';

const rootReducer = combineReducers({
  timer,
  entries
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
