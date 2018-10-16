// @flow

import { LOGIN_SUCCESS } from '../actions/auth';

import type { Action } from './types';

type State = {
  ghOauth: ?string,
};

export default function auth(state: State = { ghOauth: null }, action: Action): State {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, ghOauth: action.payload };

    default:
      return state;
  }
}
