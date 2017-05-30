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
          <ul className="">
            <Link className="" to="/about"><li className="">about</li></Link>
            <Link className="" to="/things"><li className="">things</li></Link>
            <Link className="" to="/userdisplay">SEARCH</Link>
            <li className="" onClick={() => this.handleLogout()}>Logout</li>
          </ul>
      </div>

    }
    else {
      loggedOn =
        <div className="" >
          <ul className="">
            <Link className="" to="/about"><li className="">about</li></Link>
            <Link className="" to="/things"><li className="">things</li></Link>
            <Link className="" to="/login"><li className="">Login</li></Link>
            <Link className="" to="/signup"><li className="">Signup</li></Link>
          </ul>
        </div>
    }
    return(
    <div>
      <header>
          <nav className="">
            <div className="">
              <div className="">
                <button className="" type="button" >

                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>

                  <Link className="" to="/">Home (logo)</Link>
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
