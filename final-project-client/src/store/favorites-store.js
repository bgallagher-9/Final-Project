import constants from './constants.js';

const favState = {
  favorites: [],
}

const reducer = (state = favState, action) => {
  switch(action.type) {
    case constants.GET_FAVORITES:
      return Object.assign({}, state, { favorites: action.favorites });
    case constants.LOGOUT:
      return Object.assign({}, state, { favorites : []});
    case constants.ADD_TO_FAVORITES:
      const favorites = state.favorites.slice();
      favorites.push(action.favorites);
      return Object.assign({}, state, { favorites: favorites }, console.log('favorites from store', favorites));
    default:
      return state;
  }
}

export default reducer;
