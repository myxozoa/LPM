// @flow
import { SET_SECTION } from '../actions/preferences';
import { preferences as defaultPrefs } from '../constants/defaults.json';
import type { Action } from './types';

export default function preferences(state = defaultPrefs, action: Action) {
  switch (action.type) {
    case SET_SECTION:
      return { ...state, section: action.payload };
    default:
      return state;
  }
}
