import React from 'react';
import {render} from 'react-dom';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import Display from './Display';
import {displayReducer} from './Display/controller';

const store = createStore(
  combineReducers({display: displayReducer})
);

render(
  <Provider store={store}>
    <Display />
  </Provider>,
  document.getElementById('app')
);
