import React, { Component } from 'react';

class Login extends Component {
  render() {
    return(
      <div>
        <h1>Welcome Back, please login.</h1>
        <div className="input-container">
          <input type="text" className="userName"></input>
          <input type="password" className="password"></input>
        </div>
      </div>

    );
  }
}

module.exports = Login;
