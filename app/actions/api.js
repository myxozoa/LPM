// @flow

import axios from 'axios';
import isSameDay from 'date-fns/is_same_day';

import { ThunkAction, Dispatch, GetState } from '../reducers/types';

export const FETCHING_PROFILE_PIC = 'FETCHING_PROFILE_PIC';
export const PROFILE_PIC_SUCCESS = 'PROFILE_PIC_SUCCESS';
export const PROFILE_PIC_ERROR = 'PROFILE_PIC_ERROR';

export const FETCHING_REPO_LIST = 'FETCHING_REPO_LIST';
export const REPO_LIST_SUCCESS = 'REPO_LIST_SUCCESS';

export function getProfilePic(): ThunkAction {
  return (dispatch: Dispatch, getState: GetState) => {
    dispatch({ type: FETCHING_PROFILE_PIC });

    const { ghOauth } = getState().auth;

    axios
      .get('https://api.github.com/user', {
        headers: { Authorization: `token ${ghOauth}` }
      })
      .then(data => dispatch({
        type: PROFILE_PIC_SUCCESS,
        payload: data.data.avatar_url
      }))
      .catch(() => {
        dispatch({ type: PROFILE_PIC_ERROR });
      });
  };
}

export function getRepoList(override?: boolean): ThunkAction {
  return (dispatch: Dispatch, getState: GetState) => {
    // don't bother to do the calls if you've already updated today
    // and they haven't explicitly called
    if (isSameDay(getState().api.lastChanged, Date.now()) && !override) return;

    dispatch({ type: FETCHING_REPO_LIST });

    const promises = [];

    // remove this magic number
    for (let i = 1; i <= 3; i++) {
      promises.push(
        axios // grab 100 repos at a time because thats the limit
          .get(`https://api.github.com/users/LambdaSchool/repos?per_page=100&type=public&page=${i}`)
      );
    }

    const repos = [];

    Promise.all(promises)
      .then(data => {
        data.forEach(repoList => {
          repos.push(
            ...repoList.data.map(repo => ({
              label: repo.name,
              value: repo.html_url,
              id: repo.id
            }))
          );
        });
        dispatch({ type: REPO_LIST_SUCCESS, payload: repos });
        return false;
      })
      .catch(error => {
        console.error(error);
      });
  };
}
