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
    case constants.DELETE_FAVORITES:
          const copyFaves = state.favorites.slice();
          const index = copyFaves.indexOf(action.favorites);
          copyFaves.splice(index, 1);
      return Object.assign({}, state, { favorites: copyFaves });
    default:
      return state;
  }
}

export default reducer;

// doRemove(index) {
//     let copy = this.state.value.slice();
//     copy.splice(index, 1);
//     this.setState({
//       value: copy
//     });
//   }
// case actions.REMOVE_BOOK:
//       const booksCopy = state.books.slice();
//       const index = booksCopy.indexOf(action.book);
//       booksCopy.splice(index, 1);
//       return Object.assign({}, state, { books: booksCopy });
