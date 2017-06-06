import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import FavoritesList from './components/favorites.js';
import Movies from './components/mainsearch.js';
import SignUp from './components/signup.js';
import Login from './components/login.js';
import About from './components/about.js';
import TheApp from './components/theapp.js';
import NavBar from './components/navbar.js';
import Details from './components/details.js';
import NotFound from './components/notfound.js';
import { store } from './store/store.js';


// https://needanappname.herokuapp.com/

class Home extends Component {
  render() {
    return (
      <div  className="home">
        <div className="home-title">
          <h2>My Movie Search</h2>
          <h6>Let's do movies!</h6>
        </div>
      </div>
    )
  }
}

class Footer extends Component {
  render() {
    return(
      <footer>
        <div>My Movie Search App.  Created by Brian Gallagher.  Powered by The Movie Database.  <a href="https://www.themoviedb.org" target="_blank"><img src="./moviedb.png" alt="The MovieDB"/></a></div>
      </footer>
    )
  }
}

class UserDisplay extends Component {
  render() {
    return(
      <div className="userdisplay">
        <FavoritesList />
        <Movies />
      </div>
    )
  }
}

//Following the RR example here: https://reacttraining.com/react-router/web/example/auth-workflow
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    store.getState().auth.isLoggedOn ? (<Component {...props}/>
  ) : (
    <Redirect to={{
        pathname: '/',
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

  componentWillUnmount(){
    this.unsub()
  }

  render() {
    return(
      <Router>
        <div>
          <div className="backdrop">
            <div>
              <div className="tint">
                <NavBar {...this.state} />
              <Footer />
              </div>
            </div>
            <Switch>

              <Route path="/" exact component={Home} />
              <Route path="/signup" render={(props) => <SignUp {...this.state} history={props.history} />} />
              <Route path="/login" render={(props) => <Login {...this.state} history={props.history} />} />
              <Route path="/about" component={About} />
              <Route path="/theapp" component={TheApp} />
              <PrivateRoute path="/userdisplay"  component={UserDisplay}>
                <Route path="/*" component={NotFound} />
                </PrivateRoute>
              <PrivateRoute path="/details" component={Details}>
                <Route path="/*" component={NotFound}/>
                 </PrivateRoute>
              <Route path="/*/*" component={NotFound} />
            </Switch>
        </div>

        </div>
      </Router>
    );
  }
}

export default App;
