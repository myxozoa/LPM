// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import preferences from './preferences';
import students from './students';
import github from './github';

const rootReducer = combineReducers({
  students,
  preferences,
  github,
  router
});

export default rootReducer;
