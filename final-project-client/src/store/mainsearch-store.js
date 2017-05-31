import constants from './constants.js';

const initialState = {
  results: [],
  queryInput: '',
  pageNumber: 1,
  query: '',
  activePage: 1,
  totalItemsCount: 0,
  itemsCountPerPage: 0,
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case constants.QUERY_HANDLE:
      return Object.assign({}, state, { input: action.input, pageNumber: 1 })
    case constants.GET_DATA:
      return Object.assign({}, state, { results: action.results });
    case constants.RETURN_CLEAR:
      return Object.assign({}, state, { queryInput: '' });
    case constants.INPUT_CHANGE:
      return Object.assign({}, state, { queryInput: action.value });
    case constants.INCREMENT_PAGE:
      return Object.assign({}, state, { pageNumber: state.pageNumber + 1 });
    case constants.DECREMENT_PAGE:
      return Object.assign({}, state, { pageNumber: state.pageNumber - 1 });
    case constants.LOGOUT:
      return Object.assign({}, state, {
        results: [],
        queryInput: '',
        pageNumber: 1,
        query: '',
        activePage: 1,
        totalItemsCount: 0,
        itemsCountPerPage: 0,
      })
    default:
      return state;
  }
}

module.exports = reducer;
