// import React, { Component } from 'react';
// import { store, actions } from './../store/store.js';
// import $ from 'jquery';
//
// class SignUp extends Component {
//
//   constructor(){
//     super();
//     this.state = store.getState().auth;
//   }
//
//   componentDidMount() {
//     store.subscribe(() => {
//       this.setState(store.getState().auth);
//     });
//   }
//
//   handleUNChange(evt) {
//     // console.log(evt.target.value)
//     store.dispatch(Object.assign({}, actions.INPUT_CHANGE_UN, { value: evt.target.value }));
//   }
//
//   handlePWChange(evt) {
//     store.dispatch(Object.assign({}, actions.INPUT_CHANGE_PW, { value: evt.target.value }));
//   }
//
//   handleSignUpClick() {
//     // console.log(this.props);
//
//     $.ajax({
//       url: '/api/signup',
//       method: 'POST',
//       data: {
//         username: this.props.unValue,
//         password: this.props.pwValue
//       },
//
//     })
//     // console.log(data)
//     .done((data) => {
//       store.dispatch(Object.assign({}, actions.SUCCESS_LOGIN));
//     //   this.state.history('/');
//
//     // .done((data) => {
//     //   // console.log(data);
//     //   store.dispatch({ type: actions.SUCCESS_LOGIN });
//     //   //Success! Move them to the book list.
//     //   this.props.history.push('/booklist');
//       })
//     .fail((xhr, error, responseText) => {
//       console.log(actions);
//       console.log('xhr', xhr, 'error', error, 'rt', responseText);
//       store.dispatch(Object.assign({}, actions.FAIL_LOGIN));
//     })
//
//   }
//
//   render() {
//     console.log(this.state);
//     let message;
//     if (this.state.failMessage !== '') {
//       message = <div className="failmessage">{this.state.failMessage}
//                 </div>
//     }
//     else if (this.state.successMessage !== '') {
//       message = <div className="successmessage">{this.state.successMessage}
//               </div>
//     }
//     return(
//       <div>
//         <h1>Signup and join the greatness!</h1>
//         <div className="input-container">
//           <input type='text'
//                  className="userName"
//                  onChange={(evt) => this.handleUNChange(evt)}
//                  value={this.state.unValue}
//                  ></input>
//           <input type='password'
//                  className="password"
//                  onChange={(evt) => this.handlePWChange(evt)}
//                  value={this.state.pwValue}
//                  ></input>
//                <button
//                  onClick={() => this.handleSignUpClick()}>
//                Submit
//               </button>
//              {message}
//         </div>
//       </div>
//
//     );
//   }
// }
//
// module.exports = SignUp;

import React, { Component } from 'react';
import $ from 'jquery';
// import './sign-up.css';
import { store, actions } from './../store/store.js';

class SignUp extends Component {

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

  // componentWillUnmount() {
  //   this.unsub();
  // }

  handleUNChange(evt) {
    console.log(evt.target.value);
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
    // .done((data) => {
    //   store.dispatch({ type: actions.SIGNUP_SUCCESS });
    //   this.props.history.push('/');
    // })
    .done((data) => {
      store.dispatch(Object.assign({}, actions.SIGNUP_SUCCESS));
      setTimeout(() => {this.props.history.push('/') }, 5000);

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
