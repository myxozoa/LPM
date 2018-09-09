// @flow
import type { Student } from '../reducers/types';

export const ADD_STUDENT = 'ADD_STUDENT';
export const SET_RATING = 'SET_RATING';
export const SET_NAME = 'SET_NAME';
export const SET_USERNAME = 'SET_USERNAME';
export const REMOVE_STUDENT = 'REMOVE_STUDENT';

export function addStudent(student: Student) {
  return {
    type: ADD_STUDENT,
    payload: student
  };
}

export function removeStudent(id: string) {
  return {
    type: REMOVE_STUDENT,
    payload: id
  };
}

export function setRating(id: string, rating: number) {
  return {
    type: SET_RATING,
    payload: { id, rating }
  };
}

export function setName(id: string, name: string) {
  return {
    type: SET_NAME,
    payload: { id, name }
  };
}

export function setUsername(id: string, username: string) {
  return {
    type: SET_USERNAME,
    payload: { id, username }
  };
}
