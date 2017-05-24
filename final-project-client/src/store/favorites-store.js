import constants from './constants.js';

const favState = {
  favorites: [],

}

const reducer = (state = favState, action) => {
  switch(action.type) {
    case constants.GET_FAVORITES:
      return Object.assign({}, state, { favorites: action.favorites });
    case constants.LOGOUT:
      return Object.assign({}, state, { favorites : []})
    default:
      return state;
  }
}

export default reducer;

// case actions.SAVE_NEW_BOOK:
//       const books = state.books.slice();
//       books.push(action.book);
//       return Object.assign({}, state, {
//         books: books,
//         addBookTitle: '',
//         addBookAuthor: '',
//         addBookPubYear: '',
//         addBookDescription: ''
//       });
