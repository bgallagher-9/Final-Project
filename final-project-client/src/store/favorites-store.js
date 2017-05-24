import constants from './constants.js';

const favState = {
  favorites: [],

}

const reducer = (state = favState, action) => {
  switch(action.type) {
    case constants.GET_FAVORITES:
      return Object.assign({}, state, { favorites: action.favorites });
    default:
      return state;
  }
}

export default reducer;
