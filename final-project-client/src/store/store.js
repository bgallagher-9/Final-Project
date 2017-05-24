import mainReducer from './mainsearch-store.js';
import authReducer from './auth-store.js';
import favReducer from './favorites-store.js';
import { createStore, combineReducers } from 'redux';
import actions from './../store/actions.js';

const reducer = combineReducers({
  main: mainReducer,
  auth: authReducer,
  favorites: favReducer
});

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

module.exports = {
  store: store,
  actions: actions
};
