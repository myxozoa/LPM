// @flow

import { LOGIN_SUCCESS } from '../actions/auth';

import type { Action } from './types';

export default function auth(state = {}, action: Action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, ghOauth: action.payload };

    default:
      return state;
  }
}
