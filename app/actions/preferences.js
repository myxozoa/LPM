// @flow
export const SET_SECTION = 'SET_SECTION';

export function setSection(section: string) {
  return {
    type: SET_SECTION,
    payload: section
  };
}
