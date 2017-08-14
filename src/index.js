import React from 'react';
import {render} from 'react-dom';
import {createStore, combineReducers} from 'redux';
import {devToolsEnhancer} from 'redux-devtools-extension/logOnlyInProduction';
import {Provider} from 'react-redux';
import Display from './Display';
import {displayReducer} from './Display/controller';

const store = createStore(
  combineReducers({display: displayReducer}),
  devToolsEnhancer()
);

render(
  <Provider store={store}>
    <Display />
  </Provider>,
  document.getElementById('app')
);
