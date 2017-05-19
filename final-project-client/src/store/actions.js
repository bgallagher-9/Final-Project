import constants from './constants.js';

const GET_DATA = { type: constants.GET_DATA };
// const RETURN_CLEAR = { type: constants.RETURN_CLEAR };
const INPUT_CHANGE = { type: constants.INPUT_CHANGE };
const DECREMENT_PAGE = { type: constants.DECREMENT_PAGE };
const INCREMENT_PAGE = { type: constants.INCREMENT_PAGE };
const GET_AUTH_UN = { type: constants.GET_AUTH_UN };
const GET_AUTH_PW = { type: constants.GET_AUTH_PW };
const RETURN_CLEAR_UN = { type: constants.RETURN_CLEAR_UN };
const INPUT_CHANGE_UN = { type: constants.INPUT_CHANGE_UN };
const RETURN_CLEAR_PW = { type: constants.RETURN_CLEAR_PW };
const INPUT_CHANGE_PW = { type: constants.INPUT_CHANGE_PW };
// const SUCCESS_LOGIN = { type: constants.SUCCESS_LOGIN };
// const FAIL_LOGIN = { type: constants.FAIL_LOGIN };

const actions = {
  GET_AUTH_UN: GET_AUTH_UN,
  GET_AUTH_PW: GET_AUTH_PW,
  RETURN_CLEAR_UN: RETURN_CLEAR_UN,
  RETURN_CLEAR_PW: RETURN_CLEAR_PW,
  INPUT_CHANGE_UN: INPUT_CHANGE_UN,
  INPUT_CHANGE_PW: INPUT_CHANGE_PW,
  GET_DATA: GET_DATA,
  INPUT_CHANGE: INPUT_CHANGE,
  INCREMENT_PAGE: INCREMENT_PAGE,
  DECREMENT_PAGE: DECREMENT_PAGE
}

module.exports = actions;
