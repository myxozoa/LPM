// @flow

import type { Action } from '../reducers/types';

export const SAVE = 'SAVE';
export const INITIAL_LOAD = 'INITIAL_LOAD';

export function saveToDB(): Action {
  return {
    type: SAVE
  };
}

export function initialLoad(): Action {
  return {
    type: INITIAL_LOAD
  };
}
