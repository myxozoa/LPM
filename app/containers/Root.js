// @flow
import React, { Component } from 'react';
import electron from 'electron';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import type { History } from 'history';

import type { Store } from '../reducers/types';
import Routes from '../Routes';

type Props = {
  store: Store,
  history: History,
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
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Routes />
        </ConnectedRouter>
      </Provider>
    );
  }
}
