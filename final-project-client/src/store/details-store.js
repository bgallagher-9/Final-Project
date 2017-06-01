import constants from './constants.js';

const deetsState = {
  results: [],
  favorites: [],
  details: {
    idMedia: '',
    typeMedia: ''
  },
}

const reducer = (state = deetsState, action) => {
  switch(action.type) {
    case constants.ON_TO_DETAILS:
      return Object.assign({}, state, { details: action.details });
    case constants.GET_DETAILS:
      return Object.assign({}, state, { results: action.results });
    // case constants.ADD_TO_FAVORITES:
    //   const favorites = state.favorites.slice();
    //   favorites.push(action.favorites);
    //   return Object.assign({}, state, { favorites: favorites }, console.log('add_to_favorites state', state, 'add fav', action.favorites));
    // case constants.DELETE_FAVORITES:
    //       const copyFaves = state.favorites.slice();
    //       const index = copyFaves.indexOf(action.favorites);
    //       copyFaves.splice(index, 1);
    //   return Object.assign({}, state, { favorites: copyFaves }, console.log('delete_favorites state', state, 'det fav', action.favorites));
    default:
      return state;
  }
}

export default reducer;
