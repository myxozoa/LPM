// @flow

import { PROFILE_PIC_SUCCESS, REPO_LIST_SUCCESS } from '../actions/api';
import repoList from '../constants/repos.json';

import type { Action, repoListType } from './types';

type State = {
  repoList: repoListType,
  lastChanged: number,
}

const initialState = {
  repoList,
  lastChanged: 1536525743102
};

export default function api(state: State = initialState, action: Action): State {
  switch (action.type) {
    case PROFILE_PIC_SUCCESS:
      return { ...state, profilePic: action.payload };

    case REPO_LIST_SUCCESS:
      return { ...state, repoList: action.payload, lastChanged: Date.now() };

    default:
      return state;
  }
}
