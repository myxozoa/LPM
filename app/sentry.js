const { init, configureScope } = require('@sentry/electron');
const electronStore = require('electron-store');


init({ dsn: 'https://9f48b79523c948e3ab1fc7ea31abb3a8@sentry.io/1319532' });

configureScope(scope => {
  scope.setTag('OS', process.platform);
  scope.setTag('ENV_TYPE', process.env.NODE_ENV);
  scope.setExtra('settings', electronStore.store);
});
