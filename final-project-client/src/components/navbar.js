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
    // console.log(this);
    let loggedOn;
    if (this.props.isLoggedOn) {
      loggedOn =
        <div className="collapse navbar-collapse justify-content-end" id="naving" >
          <ul className="navbar-nav float-right">
            <li className="welcome nav-item nav-link">Welcome,   {this.props.welcomeName}</li>
            <Link className="nav-link" to="/about"><li className="nav-item">About</li></Link>
            <Link className="nav-link" to="/theapp"><li className="nav-item">The App</li></Link>
            <Link className="nav-link" to="/userdisplay">Search</Link>
            <li className="nav-link logout" onClick={() => this.handleLogout()}>Logout</li>
          </ul>
        </div>
    }
    else {
      loggedOn =
        <div className="collapse navbar-collapse justify-content-end" id="naving" >
          <ul className="navbar-nav float-right">
            <Link className="nav-link" to="/about"><li className="nav-item">About</li></Link>
            <Link className="nav-link" to="/theapp"><li className="nav-item">The App</li></Link>
            <Link className="nav-link" to="/login"><li className="nav-item">Login</li></Link>
            <Link className="nav-link" to="/signup"><li className="nav-item">Signup</li></Link>
          </ul>
        </div>
    }
    return(
      <header>
          <nav className="navbar navbar-dark mdb-color darken-4 navbar-toggleable-sm">
            <Link className="navbar-brand" to="/">Home</Link>
              <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#naving" aria-controls="naving" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              {loggedOn}
          </nav>
      </header>


    )
  }
}

export default withRouter(NavBar);
