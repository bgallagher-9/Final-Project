import React, { Component } from 'react';
import $ from 'jquery';
import { store, actions } from './../store/store.js';
import './../index.css';

class SignUp extends Component {

  handleUNChange(evt) {
    store.dispatch(Object.assign({}, actions.SIGNUP_CHANGE_UN, {value: evt.target.value}));
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
      // this.props.history.push('/');
      this.props.history.push('/userdisplay');
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
      <div className="signup">
        <div >

        <div className="input-container card card-block">
          <h1 >Signup and join the greatness!</h1>
          <input type='text'
                 className="form-control"
                 id="form2"
                 onChange={(evt) => this.handleUNChange(evt)}
                 value={this.props.unValue}
                 placeholder="Username"
                 ></input>
          <input type='password'
                 className="password form-control"
                 id="form2"
                 onChange={(evt) => this.handlePWChange(evt)}
                 value={this.props.pwValue}
                 placeholder="Password"
                 ></input>
               <button type="button" className="btn btn-elegant" onClick={() => this.handleSignUpClick()}>Sign Up</button>
             {message}
        </div>
        </div>
      </div>
    );
  }
}

module.exports = SignUp;
