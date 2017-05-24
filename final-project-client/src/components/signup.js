import React, { Component } from 'react';
import $ from 'jquery';
// import './sign-up.css';
import { store, actions } from './../store/store.js';

class SignUp extends Component {

  handleUNChange(evt) {
    store.dispatch( Object.assign({}, actions.SIGNUP_CHANGE_UN, { value: evt.target.value }));
  }

  handlePWChange(evt) {
    store.dispatch(Object.assign({}, actions.SIGNUP_CHANGE_PW, { value: evt.target.value }));
  }

  handleSignUpClick() {
    $.ajax({
      url: '/api/signup',
      method: 'POST',
      data: {
        username: this.props.unValue,
        password: this.props.pwValue
      }
    })
    .done((data) => {
      store.dispatch(Object.assign({}, actions.SIGNUP_SUCCESS));
      setTimeout(() => {this.props.history.push('/') }, 2500);

    })
    .fail((xhr, error, responseText) => {
      store.dispatch(Object.assign({}, actions.SIGNUP_FAIL, { message: xhr.responseText }));
    });
  }

  render() {
    let message;
    if (this.props.signUpfailMessage !== '') {
          message = <div className="signUpFailMessage">{this.props.signUpfailMessage}
                    </div>
        }
        else if (this.props.signUpSuccessMessage !== '') {
          message = <div className="signUpSuccessMessage">{this.props.signUpSuccessMessage}
                  </div>
        }
    return (
      <div>
        <h1>Signup and join the greatness!</h1>
        <div className="input-container">
          <input type='text'
                 className="userName"
                 onChange={(evt) => this.handleUNChange(evt)}
                 value={this.props.unValue}
                 ></input>
          <input type='password'
                 className="password"
                 onChange={(evt) => this.handlePWChange(evt)}
                 value={this.props.pwValue}
                 ></input>
               <button
                 onClick={() => this.handleSignUpClick()}>
               Sign Up
              </button>
             {message}
        </div>
      </div>
    );
  }
}

module.exports = SignUp;
