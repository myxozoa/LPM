// @flow

import { PROFILE_PIC_SUCCESS } from '../actions/api';

import type { Action } from './types';

export default function api(state = {}, action: Action) {
  switch (action.type) {
    case PROFILE_PIC_SUCCESS:
      return { ...state, profilePic: action.payload };

    default:
      return state;
  }
}
