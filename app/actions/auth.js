// @flow
import prefs from '../constants/defaults.json';

const url = require('url');

const { remote } = require('electron');

export const LOGGING_IN = 'LOGGING_IN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export function login() {
  return dispatch => {
    dispatch({ type: LOGGING_IN });

    let authWindow = new remote.BrowserWindow({
      width: 500,
      height: 600,
      parent: remote.getCurrentWindow(),
      modal: true,
      nodeIntegration: false,
      contextIsolation: true
    });

    authWindow.on('closed', () => {
      authWindow = null;
    });

    authWindow.loadURL(prefs.login);

    const callback = (oldURL, newURL) => {
      const parsed = url.parse(newURL, true);
      const { query } = parsed;
      if (query.error) {
        console.error(query.error);
      } else if (parsed.pathname === '/callback') {
        dispatch({ type: LOGIN_SUCCESS, payload: query.access_token });
      }
    };

    authWindow.webContents.on(
      'did-get-redirect-request',
      (event, oldURL, newURL) => {
        callback(oldURL, newURL);
      }
    );
  };
}
