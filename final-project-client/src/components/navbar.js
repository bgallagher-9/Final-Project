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
      <div className="collapse navbar-collapse navbar-right" id="naving">
        <div className="name">
          Welcome back, {this.props.welcomeName}
        </div>
          <ul className="nav navbar-nav navbar-right">
            <Link className="nav-link" to="/about"><li className="nav-item">about</li></Link>
            <Link className="nav-link" to="/things"><li className="nav-item">things</li></Link>
            <Link className="nav-link" to="/userdisplay">SEARCH</Link>
            <li className="nav-item" onClick={() => this.handleLogout()}>Logout</li>
          </ul>
      </div>

    }
    else {
      loggedOn =
        <div className="collapse navbar-collapse navbar-right" id="naving">
          <ul className="nav navbar-nav navbar-right">
            <Link className="nav-link" to="/about"><li className="nav-item">about</li></Link>
            <Link className="nav-link" to="/things"><li className="nav-item">things</li></Link>
            <Link className="nav-link" to="/login"><li className="nav-item active">Login</li></Link>
            <Link className="nav-link" to="/signup"><li className="nav-item">Signup</li></Link>
          </ul>
        </div>
    }
    return(
    <div>
      <header>
          <nav className="navbar navbar-inverse navbar-toggleable-xs elegant-color bg-inverse">
            <div className="container-fluid">
              <div className="navbar-header">
                <button className="navbar-toggle collapsed" type="button" data-toggle="collapse" data-target="#naving" aria-expanded="false" >
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
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
