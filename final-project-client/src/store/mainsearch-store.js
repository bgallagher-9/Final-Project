const GET_DATA = { type: 'GET_DATA' };
const RETURN_CLEAR = { type: 'RETURN_CLEAR' };
const INPUT_CHANGE = { type: 'INPUT_CHANGE' };
const DECREMENT_PAGE = { type: 'DECREMENT_PAGE' };
const INCREMENT_PAGE = { type: 'INCREMENT_PAGE' };


const initialState = {
  results: [],
  queryInput: '',
  pageNumber: 1,
  query: ''
}

const mainReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'GET_DATA':
      return Object.assign({}, state, { results: action.results });
    case 'RETURN_CLEAR':
      return Object.assign({}, state, { queryInput: '' });
    case 'INPUT_CHANGE':
      return Object.assign({}, state, { queryInput: action.value });
    case 'INCREMENT_PAGE':
      return Object.assign({}, state, { pageNumber: state.pageNumber + 1 }, console.log('pnu', state.pageNumber) );
    case 'DECREMENT_PAGE':
      return Object.assign({}, state, { pageNumber: state.pageNumber - 1 }, console.log('pnd', state.pageNumber));
    default:
      return state;
  }
}

module.exports = {
  mainReducer: mainReducer,
  actions: {
    GET_DATA: GET_DATA,
    RETURN_CLEAR: RETURN_CLEAR,
    INPUT_CHANGE: INPUT_CHANGE,
    DECREMENT_PAGE: DECREMENT_PAGE,
    INCREMENT_PAGE: INCREMENT_PAGE
  }
};
