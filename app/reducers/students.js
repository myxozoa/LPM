// @flow

import {
  ADD_STUDENT,
  REMOVE_STUDENT,
  SET_RATING,
  SET_NAME,
  SET_USERNAME
} from '../actions/students';
import { INITIAL_LOAD, SAVE } from '../actions/misc';

import { store } from './types';
import type { Action, Student } from './types';

type State = Array<Student>;

export default function preferences(state: State = [], action: Action): State {
  switch (action.type) {
    case ADD_STUDENT:
      return [...state, action.payload];

    case SET_RATING:
      return state.map(student => {
        if (student.id === action.payload.id) {
          const temp = { ...student };

          if (temp.rating === action.payload.rating) {
            temp.rating = 0;
          } else {
            temp.rating = action.payload.rating;
          }

          return temp;
        }
        return student;
      });

    case SET_NAME:
      return state.map(student => {
        if (student.id === action.payload.id) {
          return { ...student, name: action.payload.name.trim() };
        }
        return student;
      });

    case SET_USERNAME:
      return state.map(student => {
        if (student.id === action.payload.id) {
          return { ...student, username: action.payload.username.trim() };
        }
        return student;
      });

    case REMOVE_STUDENT:
      return state.filter(student => student.id !== action.payload);

    case SAVE:
      store.set('students', state);
      return [...state];

    case INITIAL_LOAD:
      return store.get('students') || [];

    default:
      return state;
  }
}
