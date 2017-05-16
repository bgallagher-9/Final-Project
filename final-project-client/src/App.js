import React, { Component } from 'react';
import { BrowserRouter as Router, /*Link, Route*/ } from 'react-router-dom';
//get scss going**********************
import './App.css';
import './scss/nav.css';
import './scss/footer.css';
import './scss/theater.css';
import './scss/favorites.css';
import './scss/main-search.css';
//************************************
import Favorites from './components/favorites.js';
import Theaters from './components/theaters.js';
import Movies from './components/mainsearch.js';


class App extends Component {
  render() {
    return(

      <Router>
        <div>
          <NavBar />
          <h1>Movie Search</h1>
          <div className="div-container">
            <Favorites />
            <Movies />
            <Theaters />
          </div>

          <Footer />
        </div>
      </Router>
    );
  }
}


class NavBar extends Component {
  render() {
    return(
      <nav>
        <div className="home-link">Home (logo)</div>
        <ul>
          <li>about</li>
          <li>things</li>
          <li>Login</li>
          <li>Signup</li>
        </ul>

      </nav>
    )
  }
}

class Footer extends Component {
  render() {
    return(
      <footer>
        <div>this is the footer.  put some stuff here.</div>
      </footer>
    )
  }
}

export default App;
