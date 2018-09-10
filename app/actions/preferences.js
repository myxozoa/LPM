// @flow
export const SET_SECTION = 'SET_SECTION';
export const SET_REPO = 'SET_REPO';
export const SET_WORKING_DIRECTORY = 'SET_WORKING_DIRECTORY';
export const SET_ALWAYS_ON_TOP = 'SET_ALWAYS_ON_TOP';

export function setSection(section: string) {
  return {
    type: SET_SECTION,
    payload: section
  };
}

export function setRepo(repo: string) {
  return {
    type: SET_REPO,
    payload: repo
  };
}

export function setWorkingDirectory(path: string) {
  return {
    type: SET_WORKING_DIRECTORY,
    payload: path
  };
}

export function setAlwaysOnTop(on: boolean) {
  return {
    type: SET_ALWAYS_ON_TOP,
    payload: on
  };
}
