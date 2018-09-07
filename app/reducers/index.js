// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import preferences from './preferences';
import students from './students';

const rootReducer = combineReducers({
  students,
  preferences,
  router
});

export default rootReducer;
