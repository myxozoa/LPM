// @flow

import { LOGIN_SUCCESS } from '../actions/auth';

import type { Action } from './types';

export default function auth(state = {}, action: Action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { gh_oauth: action.payload };

    default:
      return state;
  }
}
