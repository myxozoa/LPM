// @flow

import {
  SET_SECTION,
  SET_REPO,
  SET_WORKING_DIRECTORY,
  SET_ALWAYS_ON_TOP
} from '../actions/preferences';
import { preferences as defaultPrefs } from '../constants/defaults.json';

import type { Action } from './types';

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

const prefs = {
  ...defaultPrefs,
  workingDirectory: localPath
}; // setting default workingDirectory to path in documents

export default function preferences(state = prefs, action: Action) {
  switch (action.type) {
    case SET_SECTION:
      return { ...state, section: action.payload };

    case SET_REPO:
      return { ...state, repo: action.payload.replace(/\/$/, '') };

    case SET_WORKING_DIRECTORY:
      return { ...state, workingDirectory: action.payload };

    case SET_ALWAYS_ON_TOP:
      remote.getCurrentWindow().setAlwaysOnTop(action.payload);
      return { ...state, alwaysOnTop: action.payload };

    default:
      return state;
  }
}
