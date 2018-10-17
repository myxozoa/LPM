// @flow

import { ThunkAction, Dispatch } from '../reducers/types';
import prefs from '../constants/defaults.json';

import { getProfilePic } from './api';

const url = require('url');

const { remote } = require('electron');

export const LOGGING_IN = 'LOGGING_IN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export function login(): ThunkAction {
  return (dispatch: Dispatch) => {
    dispatch({ type: LOGGING_IN });

    let authWindow = new remote.BrowserWindow({
      parent: remote.getCurrentWindow(),
      modal: true,
      useContentSize: true,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true
      }
    });

    authWindow.on('closed', () => {
      authWindow = null;
    });

    authWindow.loadURL(prefs.login);

    const callback = (oldURL: string, newURL: string): void => {
      const parsed = url.parse(newURL, true);
      const { query } = parsed;

      if (query) {
        if (query.error) {
          console.error(query.error);
        }

        if (parsed.host === 'localhost') {
          fetchResources();
          dispatch({ type: LOGIN_SUCCESS, payload: query.access_token });
          if (authWindow) authWindow.close();
          else console.error('window closed before action completed');
        }
      } else {
        console.error('there was no query for login');
      }
    };

    authWindow.webContents.on(
      'did-get-redirect-request',
      (event: SyntheticEvent<>, oldURL: string, newURL: string): void => {
        callback(oldURL, newURL);
      }
    );
  };
}

export function fetchResources(): ThunkAction {
  return (dispatch: Dispatch) => {
    dispatch(getProfilePic());
  };
}
