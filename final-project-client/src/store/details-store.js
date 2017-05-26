import constants from './constants.js';

const deetsState = {
  details: {
    idMedia: '',
    typeMedia: ''
  },
}

const reducer = (state = deetsState, action) => {
  switch(action.type) {
    case constants.ON_TO_DETAILS:
    // const details = state.details.slice();
    // details.push(action.details);
      return Object.assign({}, state, { details: action.details });
    case constants.DEETS_RESET:
      return Object.assign({}, state, { details: {} })
    default:
      return state;
  }
}

export default reducer;
