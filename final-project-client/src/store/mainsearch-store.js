import constants from './constants.js';


const initialState = {
  results: [],
  queryInput: '',
  pageNumber: 1,
  query: ''
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case constants.GET_DATA:
      return Object.assign({}, state, { results: action.results });
    case constants.RETURN_CLEAR:
      return Object.assign({}, state, { queryInput: '' });
    case constants.INPUT_CHANGE:
      return Object.assign({}, state, { queryInput: action.value }, console.log('hello'));
    case constants.INCREMENT_PAGE:
      return Object.assign({}, state, { pageNumber: state.pageNumber + 1 }, console.log('pnu', state.pageNumber) );
    case constants.DECREMENT_PAGE:
      return Object.assign({}, state, { pageNumber: state.pageNumber - 1 }, console.log('pnd', state.pageNumber));
    default:
      return state;
  }
}

module.exports = reducer;
