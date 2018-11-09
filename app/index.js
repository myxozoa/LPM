import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { init } from '@sentry/electron';

import Root from './containers/Root';
import { configureStore, history } from './store/configureStore';
import './app.global.css';
import './variables.global.css';

init({ dsn: 'https://9f48b79523c948e3ab1fc7ea31abb3a8@sentry.io/1319532' });

const store = configureStore();

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NextRoot = require('./containers/Root'); // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
