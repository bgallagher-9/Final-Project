import React, {Component} from 'react';
import $ from 'jquery';
import {store, actions} from './../store/store.js';

class Login extends Component {

  handleUNChange(evt) {
    store.dispatch(Object.assign({}, actions.LOGIN_CHANGE_UN, {value: evt.target.value}));
  }

  handlePWChange(evt) {
    store.dispatch(Object.assign({}, actions.LOGIN_CHANGE_PW, {value: evt.target.value}));
  }

  handleSignUpClick() {
    $.ajax({
      url: '/api/login',
      method: 'POST',
      data: {
        username: this.props.unValue,
        password: this.props.pwValue
      }
    }).done((data) => {
      store.dispatch(Object.assign({}, actions.LOGIN_SUCCESS));
      this.props.history.push('/userdisplay');
    }).fail((xhr, error, responseText) => {
      store.dispatch(Object.assign({}, actions.LOGIN_FAIL, {message: xhr.responseText}));
    });
  }

  render() {
    let message;
    if (this.props.loginFailMessage !== '') {
      message = <div className="loginFailMessage">{this.props.loginFailMessage}
      </div>
    } else if (this.props.loginSuccessMessage !== '') {
      message = <div className="loginSuccessMessage">{this.props.loginSuccessMessage}
      </div>
    }
    return (
      <div className="login">
          <div className="card card-block input-container">
            <h1>Login to unleash the power!</h1>
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
                 <button type="button" className="btn btn-elegant" onClick={() => this.handleSignUpClick()}>Login</button>
             {message}
           </div>
      </div>
    );
  }
}
export default Login;
