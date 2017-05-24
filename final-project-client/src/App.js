import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

//get scss going**********************
import './App.css';
import './scss/nav.css';
import './scss/footer.css';
import './scss/theater.css';
import './scss/favorites.css';
import './scss/main-search.css';
//************************************
import FavoritesList from './components/favorites.js';
import Theaters from './components/theaters.js';
import Movies from './components/mainsearch.js';
import SignUp from './components/signup.js';
import Login from './components/login.js';
import About from './components/about.js';
import Things from './components/things.js';
import NavBar from './components/navbar.js';
import { store } from './store/store.js';

const Home = () => (
  <div>
    <h2>Home</h2>
    <p>Let's do movies!</p>

  </div>
)

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
        <FavoritesList />
        <Movies />
        <Theaters />
      </div>
    )
  }
}

//Following the RR example here: https://reacttraining.com/react-router/web/example/auth-workflow
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    store.getState().auth.isLoggedOn ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

class App extends Component {

  constructor(){
      super();
      this.state = store.getState().auth;
    }

  componentDidMount() {
    store.subscribe(() => {
      this.setState(store.getState().auth);
    });
  }
  render() {
    // console.log(this.state);
    // console.log(PrivateRoute)
    return(
      <Router>
        <div>
          <div>
            <NavBar {...this.state} />
            <Footer />
          </div>
          <Route path="/" exact component={Home} />
          <Route path="/signup" render={(props) => <SignUp {...this.state} history={props.history} />} />
          <Route path="/login" render={(props) => <Login {...this.state} history={props.history} />} />
          <Route path="/about" component={About} />
          <Route path="/things" component={Things} />
          <PrivateRoute path="/userdisplay/" component={UserDisplay} />
        </div>
      </Router>
    );
  }
}

export default App;
