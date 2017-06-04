import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NotFound extends Component {
  render() {
    return (
      <div className="not-found">
        <div>
          <h2>
            404
          </h2>
          <p>Path not defined.  Click <Link to="/">here</Link> to return to Home</p>
        </div>
      </div>
    )
  }
}

export default NotFound;
