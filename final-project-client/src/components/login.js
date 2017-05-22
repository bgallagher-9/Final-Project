import React, { Component } from 'react';
import $ from 'jquery';
import { store, actions } from './../store/store.js';

class Login extends Component {

  constructor(){
      super();
      this.state = store.getState().auth;
    }

  componentDidMount() {
    this.unsub = store.subscribe(() => {
      this.setState(store.getState().auth);
    });
  }

  componentWillUnmount() {
    this.unsub();
  }

  handleUNChange(evt) {
    store.dispatch( Object.assign({}, actions.LOGIN_CHANGE_UN, { value: evt.target.value }));
  }

  handlePWChange(evt) {
    store.dispatch(Object.assign({}, actions.LOGIN_CHANGE_PW, { value: evt.target.value }));
  }

  handleSignUpClick() {
    $.ajax({
      url: '/api/login',
      method: 'POST',
      data: {
        username: this.state.unValue,
        password: this.state.pwValue
      }
    })

    .done((data) => {
      store.dispatch(Object.assign({}, actions.LOGIN_SUCCESS));
      render(<div className="loginSuccessMessage">{this.state.loginSuccessMessage} </div>)
      this.props.history.push('/');
    })
    .fail((xhr, error, responseText) => {
      store.dispatch(Object.assign({}, actions.LOGIN_FAIL, { message: xhr.responseText }));
    });
  }


  render() {
    let message;
    if (this.state.LoginFailMessage !== '') {
          message = <div className="loginFailMessage">{this.state.loginFailMessage}
                    </div>
        }
        else if (this.state.loginSuccessMessage !== '') {
          message = <div className="loginSuccessMessage">{this.state.loginSuccessMessage}
                  </div>
        }
    return (
      <div>
        <h1>Login to unleash the power!</h1>
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
               Login
              </button>
             {message}
        </div>
      </div>

    );
  }
}

module.exports = Login;
