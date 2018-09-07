// @flow
import {
  ADD_STUDENT,
  SET_RATING,
  SET_NAME,
  SET_USERNAME
} from '../actions/students';
import type { Action } from './types';

export default function preferences(state = [], action: Action) {
  switch (action.type) {
    case ADD_STUDENT:
      return [...state, action.payload];
    case SET_RATING:
      return state.map(el => {
        if (el.id === action.payload.id) {
          const student = { ...el };

          if (student.rating === action.payload.rating) {
            student.rating = 0;
          } else {
            student.rating = action.payload.rating;
          }

          return student;
        }
        return el;
      });
    case SET_NAME:
      return state.map(el => {
        if (el.id === action.payload.id) {
          return { ...el, name: action.payload.name };
        }
        return el;
      });
    case SET_USERNAME:
      return state.map(el => {
        if (el.id === action.payload.id) {
          return { ...el, username: action.payload.username };
        }
        return el;
      });
    default:
      return state;
  }
}
