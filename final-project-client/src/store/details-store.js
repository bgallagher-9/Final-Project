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
    default:
      return state;
  }
}

export default reducer;
