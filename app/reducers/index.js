// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import preferences from './preferences';
import students from './students';
import github from './github';
import auth from './auth';
import api from './api';

const rootReducer = combineReducers({
  students,
  preferences,
  github,
  auth,
  api,
  router
});

export default rootReducer;
