/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';

import routes from './constants/routes.json';
import App from './containers/App';
// import HomePage from './containers/HomePage';
import Home from './components/Home/Home';
import Sidebar from './components/Sidebar/Sidebar';
import Preferences from './components/Preferences/Preferences';
import Titlebar from './components/Titlebar';

export default () => (
  <App>
    <Titlebar mac={process.platform === 'darwin'} />
    <Sidebar />
    <Switch>
      <Route path={routes.PREFERENCES} component={Preferences} />
      <Route path={routes.HOME} component={Home} />
    </Switch>
  </App>
);
