import { mainReducer, actions } from './mainsearch-store.js';
import { createStore } from 'redux';


const store = createStore(mainReducer);

module.exports = {
  store: store,
  actions: actions
};
