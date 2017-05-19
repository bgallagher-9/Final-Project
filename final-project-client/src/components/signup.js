import React, { Component } from 'react';
import { store, actions } from './../store/store.js';
import $ from 'jquery';

class SignUp extends Component {

  constructor(){
    super();
    this.state = store.getState();
  }

  componentDidMount() {
    store.subscribe(() => {
      this.setState(store.getState());
    });
  }

  handleSignUp(evt) {
    if (evt.keyCode === 13) {
      store.dispatch(Object.assign({}, actions.GET_AUTH_UN, actions.GET_AUTH_PW));
      this.authAjaxCall()
    }
  }

  handleUNChange(evt) {
    store.dispatch(Object.assign({}, actions.INPUT_CHANGE_UN, { value: evt.target.value }));
  }

  handlePWChange(evt) {
    store.dispatch(Object.assign({}, actions.INPUT_CHANGE_PW, { value: evt.target.value }));
  }

  handleSignUpClick() {
    // var stateOfAuth = store.getState()
    $.ajax({
      url: '/api/signup',
      method: 'POST',
      data: {
        username: this.state.unValue,
        password: this.state.pwValue
      }
    })
    .done((data) => {
      store.dispatch(Object.assign({}, actions.SUCCESS_LOGIN));
    })
    .fail((xhr, error, resonseText) => {
      store.dispatch(Object.assign({}, actions.FAIL_LOGIN));
    })
  }

  render() {
    let message;
    if (this.state.failMessage !== '') {
      message = <div className="failmessage">{this.state.failMessage}</div>
    }
    else if (this.state.successMessage !== '') {
      message = <div className="successmessage">{this.state.successMessage}</div>
    }
    return(
      <div>
        <h1>Signup and join the greatness!</h1>
        <div className="input-container">
          <input type='text'
                 className="userName"
                 onChange={(evt) => this.handleUNChange(evt)}
                 value={this.state.unValue}
                 ></input>
          <input type='password'
                 className="password"
                 onChange={(evt) => this.handlePWChange(evt)}
                 value={this.state.pwValue}
                 ></input>
               <button
                 onClick={() => this.handleSignUpClick()}>
               Submit
              </button>

             {message}
        </div>
      </div>

    );
  }
}

module.exports = SignUp;
