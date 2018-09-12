// @flow

import axios from 'axios';

export const FETCHING_PROFILE_PIC = 'FETCHING_PROFILE_PIC';
export const PROFILE_PIC_SUCCESS = 'PROFILE_PIC_SUCCESS';
export const PROFILE_PIC_ERROR = 'PROFILE_PIC_ERROR';

export function getProfilePic() {
  return (dispatch, getState) => {
    dispatch({ type: FETCHING_PROFILE_PIC });

    const { ghOauth } = getState().auth;

    axios
      .get('https://api.github.com/user', {
        headers: { Authorization: `token ${ghOauth}` }
      })
      .then(data =>
        dispatch({ type: PROFILE_PIC_SUCCESS, payload: data.data.avatar_url })
      )
      .catch(() => {
        dispatch({ type: PROFILE_PIC_ERROR });
      });
  };
}
