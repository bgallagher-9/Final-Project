import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
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
import SignUp from './components/signup.js';
import Login from './components/login.js';
import About from './components/about.js';
import Things from './components/things.js'

const Home = () => (
  <div>
    <h2>Home</h2>
    <p>Let's do movies!</p>
  </div>
)

class NavBar extends Component {
  
  render() {
    return(
        <div>
          <nav>
            <Link className="home-link" to="/">Home (logo)</Link>
            <ul>
              <Link to="/about"><li>about</li></Link>
              <Link to="/things"><li>things</li></Link>
              <Link to="/login"><li>Login</li></Link>
              <Link to="/signup"><li>Signup</li></Link>
              <Link to="/userdisplay">Search</Link>
            </ul>
          </nav>
        </div>
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

class UserDisplay extends Component {
  render() {
    return(
      <div className="div-container">
        <Favorites />
        <Movies />
        <Theaters />
      </div>
    )
  }
}

class App extends Component {
  render() {
    return(
      <Router>
        <div>
          <div>
            <NavBar />
            <Footer />
          </div>
          <Route path="/" exact component={Home} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path="/about" component={About} />
          <Route path="/things" component={Things} />
          <Route path="/userdisplay" component={UserDisplay} />
        </div>
      </Router>
    );
  }
}

export default App;
