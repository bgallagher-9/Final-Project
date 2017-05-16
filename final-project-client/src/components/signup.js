import React, { Component } from 'react';

class SignUp extends Component {
  render() {
    return(
      <div>
        <div className="input-container">
          <input type=text className="userName"></input>
          <input type=password className="password"></input>
        </div>
      </div>

    );
  }
}

modules.exports = SignUp;
