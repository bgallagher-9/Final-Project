import constants from './constants.js';

const authState = {
  unValue: '',
  pwValue: '',
  successMessage: '',
  failMessage: ''
}

const reducer = (state = authState, action) => {
  switch(action.type) {
    case constants.GET_AUTH_UN:
      return Object.assign({}, state, { data: action.data });
    case constants.RETURN_CLEAR_UN:
      return Object.assign({}, state, { unValue: '' });
    case constants.INPUT_CHANGE_UN:
      return Object.assign({}, state, { unValue: action.value });
    case constants.GET_AUTH_PW:
      return Object.assign({}, state, { data: action.data });
    case constants.RETURN_CLEAR_PW:
      return Object.assign({}, state, { pwValue: '' });
    case constants.INPUT_CHANGE_PW:
      return Object.assign({}, state, { pwValue: action.value });
    case constants.SUCCESS_LOGIN:
      return Object.assign({}, state, { unValue: '', pwValue: '', successMessage: 'Thank you for signing up', failMessage: '' })
    case constants.FAIL_LOGIN:
      return Object.assign({}, state, { unValue: '', pwValue: '', successMessage: '', failMessage: 'Something went wrong.  Please try again' })
      default:
        return state;
  }
}

module.exports = reducer;
