import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import FavoritesList from './components/favorites.js';
import Movies from './components/mainsearch.js';
import SignUp from './components/signup.js';
import Login from './components/login.js';
import About from './components/about.js';
import Things from './components/things.js';
import NavBar from './components/navbar.js';
import Details from './components/details.js';
import NotFound from './components/notfound.js';
import { store } from './store/store.js';


// https://needanappname.herokuapp.com/

class Home extends Component {
  render() {
    return (
      <div id="video-carousel-example" className="carousel carousel-fade" data-ride="carousel">
        <ol>
            <li data-target="#video-carousel-example" data-slide-to="0" className="active"></li>
            <li data-target="#video-carousel-example" data-slide-to="1"></li>
            <li data-target="#video-carousel-example" data-slide-to="2"></li>
        </ol>
        <div className="carousel-inner" role="listbox">
          <div className="carousel-item active">
              <video className="video-fluid" autoPlay loop>
                  <source src="/open-movie.mp4" type="video/mp4" />
              </video>
          </div>
          <div className="carousel-item">
              <video className="video-fluid" autoPlay loop>
                  <source src="/Popcorn.mp4" type="video/mp4" />
              </video>
          </div>
          <div className="carousel-item">
              <video className="video-fluid" autoPlay loop>
                  <source src="/home-tv.mp4" type="video/mp4" />
              </video>
          </div>
        </div>
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
    store.getState().auth.isLoggedOn ? (
      <Component {...props}/>
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
              <Route path="/things" component={Things} />

              <PrivateRoute path="/userdisplay"  component={UserDisplay} />
              <PrivateRoute path="/details" component={Details} />
            </Switch>
        </div>

        </div>
      </Router>
    );
  }
}

export default App;
