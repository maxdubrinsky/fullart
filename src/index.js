import React from 'react';
import {render} from 'react-dom';

import {MuiThemeProvider} from 'material-ui/styles';
import createMuiTheme from 'material-ui/styles/theme';

import {createStore, combineReducers} from 'redux';
import {devToolsEnhancer} from 'redux-devtools-extension/logOnlyInProduction';
import {Provider} from 'react-redux';

import injectTapEventPlugin from 'react-tap-event-plugin';

import Display from './Display';
import {displayReducer} from './Display/controller';

const theme = createMuiTheme();

const store = createStore(
  combineReducers({display: displayReducer}),
  devToolsEnhancer()
);

injectTapEventPlugin();

render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <Display />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('app')
);
