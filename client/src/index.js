import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import thunk from 'redux-thunk';

import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import combineReducers from './reducers/combineReducers';
import 'font-awesome/css/font-awesome.min.css';

//use compose to combine multiple enhancers to the redux store!

const store = createStore(
  combineReducers,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
