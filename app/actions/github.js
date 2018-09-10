// @flow

import gitUtils from '../utils/gitUtils';

export const CLONE_SUCCESS = 'CLONE_SUCCESS';
export const CLONING = 'CLONING';
export const CLONE_ERROR = 'CLONE_ERROR';
export const PULL_SUCCESS = 'PULL_SUCCESS';
export const PULLING = 'PULLING';
export const PULL_ERROR = 'PULL_ERROR';

export function pull(name: string, username: string) {
  return (dispatch, getState) => {
    const { repo, workingDirectory } = getState().preferences;

    dispatch({ type: PULLING });

    gitUtils
      .pull(name, repo, username, workingDirectory)
      .then(() => dispatch({ type: PULL_SUCCESS, payload: username }))
      .catch(() => {
        dispatch({ type: PULL_ERROR, payload: username });
      });
  };
}

export function clone(name: string, username: string) {
  return (dispatch, getState) => {
    const { repo, workingDirectory } = getState().preferences;

    dispatch({ type: CLONING });

    gitUtils
      .clone(name, repo, username, workingDirectory)
      .then(() => dispatch({ type: CLONE_SUCCESS, payload: username }))
      .catch(error => {
        console.error('Clone Failed: ', name, error);
        console.log('Trying Pull...');
        dispatch(pull(name, username));
      });
  };
}

export function cloneAll() {
  return (dispatch, getState) => {
    const { students, preferences } = getState();
    const { repo, workingDirectory } = preferences;

    students.forEach(student => {
      gitUtils
        .clone(student.name, repo, student.username, workingDirectory)
        .then(() => dispatch({ type: CLONE_SUCCESS }))
        .catch(() => {
          console.error('Clone Failed: ', student.name, student.error);
          console.log('Trying Pull...');
          dispatch(pull(student.name, student.username));
        });
    });
  };
}
