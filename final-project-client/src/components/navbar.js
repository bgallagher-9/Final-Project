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
      store.dispatch(Object.assign({}, actions.LOGOUT));
      this.props.history.push('/login');
    })
  }

  render() {
    let loggedOn;
    if (this.props.isLoggedOn) {
      loggedOn =
      <div className="">
        <div className="name">
          Welcome back, {this.props.welcomeName}
        </div>
        <div className="collapse(hide) navbar-collapse justify-content-end" id="naving" >
          <ul className="navbar-nav float-right">
            <Link className="nav-link" to="/about"><li className="nav-item">About</li></Link>
            <Link className="nav-link" to="/things"><li className="nav-item">Things</li></Link>
            <Link className="nav-link" to="/userdisplay">Search</Link>
            <li className="nav-link" onClick={() => this.handleLogout()}>Logout</li>
          </ul>
        </div>
      </div>

    }
    else {
      loggedOn =
        <div className="collapse navbar-collapse justify-content-end" id="naving" >
          <ul className="navbar-nav float-right">
            <Link className="nav-link" to="/about"><li className="nav-item">About</li></Link>
            <Link className="nav-link" to="/things"><li className="nav-item">Things</li></Link>
            <Link className="nav-link" to="/login"><li className="nav-item">Login</li></Link>
            <Link className="nav-link" to="/signup"><li className="nav-item">Signup</li></Link>
          </ul>
        </div>
    }
    return(
    <div>
      <header>
          <nav className="navbar navbar-toggleable-sm navbar-dark bg-primary">
            <div className="container">
              <div className="">
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#naving" aria-controls="naving" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                  <Link className="navbar-brand" to="/">Home (logo)</Link>
                </div>
              {loggedOn}
            </div>
          </nav>
      </header>
    </div>


    )
  }
}

export default withRouter(NavBar);
