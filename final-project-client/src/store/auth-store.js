import constants from './constants.js';

const authState = {
  unValue: '',
  pwValue: '',
  signUpSuccessMessage: '',
  signUpfailMessage: '',
  loginSuccessMessage: '',
  loginFailMessage: '',
  isLoggedOn: false,
  welcomeName: ''
}

const reducer = (state = authState, action) => {
  switch(action.type) {
    case constants.SIGNUP_CHANGE_UN:
      return Object.assign({}, state, { unValue: action.value });
    case constants.SIGNUP_CHANGE_PW:
      return Object.assign({}, state, { pwValue: action.value });
    case constants.SIGNUP_SUCCESS:
      return Object.assign({}, state, {
        unValue: '',
        pwValue: '',
      signUpSuccessMessage: 'Thank you for signing up! Greatness awaits you!',
        signUpfailMessage: '',
        isLoggedOn: true,
        welcomeName: state.unValue
      })
    case constants.SIGNUP_FAIL:
      return Object.assign({}, state, { signUpfailMessage: action.message });
    case constants.LOGIN_CHANGE_UN:
      return Object.assign({}, state, { unValue: action.value });
    case constants.LOGIN_CHANGE_PW:
      return Object.assign({}, state, { pwValue: action.value });
    case constants.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        welcomeName: state.unValue,
        unValue: '',
        pwValue: '',
      loginSuccessMessage: 'Thank you for logging in! Your cranial power has just levelled up!',
        loginFailMessage: '',
        isLoggedOn: true,

      });
    case constants.LOGIN_FAIL:
      return Object.assign({}, state, { loginFailMessage: action.message });
    case constants.LOGOUT:
      return Object.assign({} ,state, {
        unValue: '',
        pwValue: '',
        signUpSuccessMessage: '',
        signUpfailMessage: '',
        loginSuccessMessage: '',
        loginFailMessage: '',
        isLoggedOn: false,
        welcomeName: ''
       })
      default:
        return state;
  }
}

module.exports = reducer;
