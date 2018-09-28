// @flow

export const SAVE = 'SAVE';
export const INITIAL_LOAD = 'INITIAL_LOAD';

export function saveToDB() {
  return {
    type: SAVE
  };
}

export function initialLoad() {
  return {
    type: INITIAL_LOAD
  };
}
