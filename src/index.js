import React from 'react';
import {render} from 'react-dom';
import {createStore, combineReducers} from 'redux';
import {devToolsEnhancer} from 'redux-devtools-extension/logOnlyInProduction';
import {Provider} from 'react-redux';
import Display from './Display';
import {displayReducer} from './Display/controller';

import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';

const store = createStore(
  combineReducers({display: displayReducer}),
  devToolsEnhancer()
);

const theme = createMuiTheme({
  palette: {
    type: 'dark'
  },
  overrides: {
    MuiListItem: {
      dense: {
        height: '20px',
        padding: '0'
      }
    },
    MuiList: {
      root: {
        backgroundColor: 'inherit'
      }
    }
  }
});

render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <Display />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('app')
);
