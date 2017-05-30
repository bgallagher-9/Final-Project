import React, {Component} from 'react';
import $ from 'jquery';
import {store, actions} from './../store/store.js';
// import bootstrap from 'bootstrap';
// require('bootstrap');

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
      // setTimeout(() => {this.props.history.push('/') }, 2500);
      this.props.history.push('/');
    }).fail((xhr, error, responseText) => {
      // console.log(xhr);
      store.dispatch(Object.assign({}, actions.LOGIN_FAIL, {message: xhr.responseText}));
    });
  }

  render() {
    // console.log(this.props)
    let message;
    if (this.props.loginFailMessage !== '') {
      message = <div className="loginFailMessage">{this.props.loginFailMessage}
      </div>
    } else if (this.props.loginSuccessMessage !== '') {
      message = <div className="loginSuccessMessage">{this.props.loginSuccessMessage}
      </div>
    }
    return (
      <div>
        <h1>Login to unleash the power!</h1>
        <div className="input-container">
          <input
            type='text'
            className="userName"
            onChange={(evt) => this.handleUNChange(evt)}
            value={this.props.unValue}
             ></input>
          <input
            type='password'
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

            ); } }
module.exports = Login; export default Login;




      // <div className="container">
      //   <h2>Modal Login Example</h2>
      //   <button type="button" className="btn btn-default btn-lg" id="myBtn">Login</button>
      //   <div className="modal fade" id="myModal" role="dialog">
      //     <div className="modal-dialog">
      //
      //       <div className="modal-content">
      //         <div className="modal-header" style={{padding:'35px 50px'}}>
      //           <button type="button" className="close" data-dismiss="modal">&times;</button>
      //           <h4>
      //             <span className="glyphicon glyphicon-lock"></span>
      //             Login</h4>
      //         </div>
      //         <div className="modal-body" style={{padding:'40px 50px'}}>
      //           <form role="form">
      //             <div className="form-group">
      //               <label for="usrname">
      //                 <span className="glyphicon glyphicon-user"></span>
      //                 Username</label>
      //               <input
      //                 type="text"
      //                 className="form-control"
      //                 id="usrname"
      //                 placeholder="Enter Username"
      //                 onChange={(evt) => this.handleUNChange(evt)}
      //                 value={this.props.unValue}
      //                 ></input></div>
      //               <div className="form-group">
      //                 <label for="psw">
      //                   <span className="glyphicon glyphicon-eye-open"></span>
      //                   Password</label>
      //                 <input
      //                   type="text"
      //                   className="form-control"
      //                   id="psw"
      //                   placeholder="Enter password"
      //                   onChange={(evt) => this.handlePWChange(evt)}
      //                   value={this.props.pwValue}
      //                   ></input>
      //                 </div>
      //                   <button
      //                     type="submit"
      //                     className="btn btn-success btn-block"
      //                     onClick={() => this.handleSignUpClick()}
      //                     >
      //                     <span className="glyphicon glyphicon-off"></span>
      //                     Login
      //                   </button>
      //                 </form>
      //               </div>
      //               <div className="modal-footer">
      //                 <button
      //                   type="submit"
      //                   className="btn btn-danger btn-default pull-left"
      //                   data-dismiss="modal">
      //                   <span className="glyphicon glyphicon-remove"></span>
      //                   Cancel
      //                 </button>
      //                 <p>Not a member?
      //                   <a href="#">Sign Up</a>
      //                 </p>
      //                 <p>Forgot
      //                   <a href="#">Password?</a>
      //                 </p>
      //               </div>
      //             </div>
      //
      //           </div>
      //         </div>
      //       </div>
