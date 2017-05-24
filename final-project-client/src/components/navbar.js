import React, { Component } from 'react';
import $ from 'jquery';
import { store, actions } from './../store/store.js';
import { Link, withRouter } from 'react-router-dom';

class NavBar extends Component {

  handleLogout() {
    $.ajax({
      url: '/api/logout',
      method: 'POST',
    })
    .done(() => {
      console.log(this.props);
      store.dispatch(Object.assign({}, actions.LOGOUT));
      this.props.history.push('/login');
    })
  }

  // handleLogout() {
  //   $.ajax({
  //     url: '/api/logout',
  //     method: 'POST'
  //   })
  //   .done(() => {
  //     store.dispatch({ type: actions.LOGOUT });
  //     this.props.history.push('/login');
  //   });
  //
  // }

  render() {
    // console.log(this.props);
    let loggedOn;
    if (this.props.isLoggedOn) {
      loggedOn =<div>
        <div className="name">
          Welcome back, {this.props.welcomeName}
        </div>
          <ul>
            <Link to="/about"><li>about</li></Link>
            <Link to="/things"><li>things</li></Link>
            <Link to="/userdisplay">SEARCH</Link>
            <button onClick={() => this.handleLogout()}>Logout</button>
          </ul>
      </div>

    }
    else {
      loggedOn =
      <ul>
        <Link to="/about"><li>about</li></Link>
        <Link to="/things"><li>things</li></Link>
        <Link to="/login"><li>Login</li></Link>
        <Link to="/signup"><li>Signup</li></Link>
      </ul>
    }
    return(
        <div>
          <nav>
            <Link className="home-link" to="/">Home (logo)</Link>
              {loggedOn}
          </nav>
        </div>
    )
  }
}

export default withRouter(NavBar);
