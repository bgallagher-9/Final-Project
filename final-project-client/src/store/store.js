import mainReducer from './mainsearch-store.js';
import authReducer from './auth-store.js';
import { createStore, combineReducers } from 'redux';
import actions from './../store/actions.js';


const reducer = combineReducers({
  main: mainReducer,
  auth: authReducer
});

const store = createStore(reducer);

module.exports = {
  store: store,
  actions: actions
};
