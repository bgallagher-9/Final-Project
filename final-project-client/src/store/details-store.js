import constants from './constants.js';

const deetsState = {
  results: {},
  typeMedia: '',
  details: {
    idMedia: '',
    typeMedia: ''
  },
}

const reducer = (state = deetsState, action) => {
  switch(action.type) {
    case constants.ON_TO_DETAILS:
      return Object.assign({}, state, { details: action.details });
    case constants.DEETS_RESET:
      return Object.assign({}, state, { details: {} });
    case constants.GET_DETAILS:
      return Object.assign({}, state, { results: action.results, typeMedia: action.typeMedia }, console.log('dets store state', state));
    default:
      return state;
  }
}

export default reducer;
