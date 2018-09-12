// @flow

import prefs from '../constants/defaults.json';

import { getProfilePic } from './api';

const url = require('url');

const { remote } = require('electron');

export const LOGGING_IN = 'LOGGING_IN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export function login() {
  return dispatch => {
    dispatch({ type: LOGGING_IN });

    let authWindow = new remote.BrowserWindow({
      parent: remote.getCurrentWindow(),
      modal: true,
      nodeIntegration: false,
      contextIsolation: true,
      useContentSize: true
    });

    authWindow.on('closed', () => {
      authWindow = null;
    });

    authWindow.loadURL(prefs.login);

    const callback = (oldURL, newURL) => {
      const parsed = url.parse(newURL, true);
      const { query } = parsed;
      console.log(parsed);
      if (query.error) {
        console.error(query.error);
      }

      if (parsed.host === 'localhost') {
        fetchResources();
        dispatch({ type: LOGIN_SUCCESS, payload: query.access_token });
        authWindow.close();
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

export function fetchResources() {
  return dispatch => {
    dispatch(getProfilePic());
  };
}
