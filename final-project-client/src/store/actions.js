import constants from './constants.js';

const QUERY_HANDLE = { type: constants.QUERY_HANDLE }
const GET_DATA = { type: constants.GET_DATA };
const INPUT_CHANGE = { type: constants.INPUT_CHANGE };
const DECREMENT_PAGE = { type: constants.DECREMENT_PAGE };
const INCREMENT_PAGE = { type: constants.INCREMENT_PAGE };
const SIGNUP_CHANGE_UN = { type: constants.SIGNUP_CHANGE_UN };
const SIGNUP_CHANGE_PW = { type: constants.SIGNUP_CHANGE_PW };
const SIGNUP_SUCCESS = { type: constants.SIGNUP_SUCCESS };
const SIGNUP_FAIL = { type: constants.SIGNUP_FAIL };
const LOGIN_CHANGE_UN = { type: constants.LOGIN_CHANGE_UN };
const LOGIN_CHANGE_PW = { type: constants.LOGIN_CHANGE_PW };
const LOGIN_SUCCESS = { type: constants.LOGIN_SUCCESS };
const LOGIN_FAIL = { type: constants.LOGIN_FAIL };
const LOGOUT = { type: constants.LOGOUT };
const GET_FAVORITES = { type: constants.GET_FAVORITES};
const ADD_TO_FAVORITES = { type: constants.ADD_TO_FAVORITES };

const actions = {
  SIGNUP_CHANGE_UN: SIGNUP_CHANGE_UN,
  SIGNUP_CHANGE_PW: SIGNUP_CHANGE_PW,
  GET_DATA: GET_DATA,
  INPUT_CHANGE: INPUT_CHANGE,
  INCREMENT_PAGE: INCREMENT_PAGE,
  DECREMENT_PAGE: DECREMENT_PAGE,
  SIGNUP_SUCCESS: SIGNUP_SUCCESS,
  SIGNUP_FAIL: SIGNUP_FAIL,
  LOGIN_CHANGE_UN: LOGIN_CHANGE_UN,
  LOGIN_CHANGE_PW: LOGIN_CHANGE_PW,
  LOGIN_SUCCESS: LOGIN_SUCCESS,
  LOGIN_FAIL: LOGIN_FAIL,
  LOGOUT: LOGOUT,
  QUERY_HANDLE: QUERY_HANDLE,
  GET_FAVORITES: GET_FAVORITES,
  ADD_TO_FAVORITES: ADD_TO_FAVORITES,
}

export default actions;
