// @flow
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';

import rootReducer from '../reducers';
import defaults from '../constants/defaults.json';

const history = createHashHistory();
const router = routerMiddleware(history);
const enhancer = applyMiddleware(thunk, router);

function configureStore() {
  return createStore(rootReducer, defaults, enhancer);
}

export default { configureStore, history };
