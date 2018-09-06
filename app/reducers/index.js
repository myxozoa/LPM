// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import preferences from './preferences';

const rootReducer = combineReducers({
  preferences,
  router
});

export default rootReducer;
