const GET_DATA = { type: 'GET_DATA' };
const RETURN_CLEAR = { type: 'RETURN_CLEAR' };
const INPUT_CHANGE = { type: 'INPUT_CHANGE' };


const initialState = {
  results: [],
  queryInput: '',
  pageNumber: 1
}

const mainReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'GET_DATA':
      return Object.assign({}, state, { results: action.results, pageNumber: state.pageNumber +1 });
    case 'RETURN_CLEAR':
      return Object.assign({}, state, { queryInput: '' });
    case 'INPUT_CHANGE':
      return Object.assign({}, state, { queryInput: action.value });
    default:
      return state;
  }
}

module.exports = {
  mainReducer: mainReducer,
  actions: {
    GET_DATA: GET_DATA,
    RETURN_CLEAR: RETURN_CLEAR,
    INPUT_CHANGE: INPUT_CHANGE
  }
};
