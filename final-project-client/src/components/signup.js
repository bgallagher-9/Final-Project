import React, { Component } from 'react';

class SignUp extends Component {
  render() {
    return(
      <div>
        <h1>Signup and join the greatness!</h1>
        <div className="input-container">
          <input type='text' className="userName"></input>
          <input type='password' className="password"></input>
        </div>
      </div>

    );
  }
}

module.exports = SignUp;
