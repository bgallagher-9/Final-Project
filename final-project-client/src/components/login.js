import React, { Component } from 'react';
import $ from 'jquery';
import { store, actions } from './../store/store.js';

class Login extends Component {

  // constructor(){
  //     super();
  //     this.state = store.getState().auth;
  //   }
  //
  // componentDidMount() {
  //   this.unsub = store.subscribe(() => {
  //     this.setState(store.getState().auth);
  //   });
  // }
  //
  // componentWillUnmount() {
  //   this.unsub();
  // }

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
        username: this.props.unValue,
        password: this.props.pwValue
      }
    })

    .done((data) => {
      store.dispatch(Object.assign({}, actions.LOGIN_SUCCESS));
      // setTimeout(() => {this.props.history.push('/') }, 2500);
      this.props.history.push('/');
    })
    .fail((xhr, error, responseText) => {
      console.log(xhr);
      store.dispatch(Object.assign({}, actions.LOGIN_FAIL, { message: xhr.responseText }));
    });
  }


  render() {
    // console.log(this.props)
    let message;
    if (this.props.loginFailMessage !== '') {
          message = <div className="loginFailMessage">{this.props.loginFailMessage}
                    </div>
        }
        else if (this.props.loginSuccessMessage !== '') {
          message = <div className="loginSuccessMessage">{this.props.loginSuccessMessage}
                  </div>
        }
    return (
      <div>
        <h1>Login to unleash the power!</h1>
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
               Login
              </button>
             {message}
        </div>
      </div>

    );
  }
}

// module.exports = Login;
export default Login;
