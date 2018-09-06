/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes.json';
import App from './containers/App';
// import HomePage from './containers/HomePage';
import Content from './components/Content';
import Sidebar from './components/Sidebar';
import Preferences from './components/Preferences';
import Titlebar from './components/Titlebar';

export default () => (
  <App>
    <Titlebar />
    <Sidebar />
    <Switch>
      <Route path={routes.PREFERENCES} component={Preferences} />
      <Route path={routes.HOME} component={Content} />
    </Switch>
  </App>
);
