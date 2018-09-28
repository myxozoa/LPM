// @flow
import React, { Component } from 'react';
import electron from 'electron';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { persistStore } from 'redux-persist';

import type { Store } from '../reducers/types';
import Routes from '../Routes';

import { PersistGate } from 'redux-persist/integration/react';

type Props = {
  store: Store,
  history: {}
};

export default class Root extends Component<Props> {
  componentWillMount() {
    const { history } = this.props;
    electron.ipcRenderer.on('transitionTo', (event, route) => {
      history.push(route);
    });
  }

  render() {
    const { store, history } = this.props;
    const persistor = persistStore(store);
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ConnectedRouter history={history}>
            <Routes />
          </ConnectedRouter>
        </PersistGate>
      </Provider>
    );
  }
}
