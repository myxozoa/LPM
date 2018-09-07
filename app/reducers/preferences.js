// @flow
import {
  SET_SECTION,
  SET_REPO,
  SET_WORKING_DIRECTORY
} from '../actions/preferences';
import { preferences as defaultPrefs } from '../constants/defaults.json';
import type { Action } from './types';

export default function preferences(state = defaultPrefs, action: Action) {
  switch (action.type) {
    case SET_SECTION:
      return { ...state, section: action.payload };
    case SET_REPO:
      return { ...state, repo: action.payload.replace(/\/$/, '') };
    case SET_WORKING_DIRECTORY:
      return { ...state, workingDirectory: action.payload };
    default:
      return state;
  }
}
