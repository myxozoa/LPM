// @flow

import {
  SET_SECTION,
  SET_REPO,
  SET_WORKING_DIRECTORY,
  SET_ALWAYS_ON_TOP
} from '../actions/preferences';
import { INITIAL_LOAD } from '../actions/misc';
import { preferences as defaultPrefs } from '../constants/defaults.json';

import { store } from './types';
import type { Action, repoType } from './types';

const path = require('path');
const fs = require('fs');

const { remote } = require('electron');

const { app } = remote;

// Initialize directory in user's documents to clone student repos to
const documents = app.getPath('documents');
const localPath = path.join(documents, 'LPM');
const repoPath = path.join(localPath, 'repos');

if (!fs.existsSync(localPath)) {
  fs.mkdirSync(localPath);
  fs.mkdirSync(repoPath);
}

type State = {
  section: string,
  repo: repoType,
  workingDirectory: string,
  login: string,
  alwaysOnTop: boolean,
}

const prefs = {
  ...defaultPrefs,
  workingDirectory: localPath
}; // setting default workingDirectory to path in documents

// store.set('prefs', prefs);

export default function preferences(state: State = prefs, action: Action): State {
  switch (action.type) {
    case SET_SECTION:
      store.set('prefs.section', action.payload);
      return { ...state, section: action.payload };

    case SET_REPO:
      store.set('prefs.repo', action.payload);
      return { ...state, repo: action.payload.replace(/\/$/, '') };

    case SET_WORKING_DIRECTORY:
      store.set('prefs.workingDirectory', action.payload);
      return { ...state, workingDirectory: action.payload };

    case SET_ALWAYS_ON_TOP:
      store.set('prefs.alwaysOnTop', action.payload);
      remote.getCurrentWindow().setAlwaysOnTop(action.payload);
      return { ...state, alwaysOnTop: action.payload };

    case INITIAL_LOAD:
      return store.get('prefs') || prefs;

    default:
      return state;
  }
}
