import React, { Component } from 'react';


class TheApp extends Component {
  render() {
    return(
      <div className="theapp-bg">
        <h1>This is...My Movie Search App</h1>
        <div className="theapp-container card card-block">
          <p>
            This is My Movie Search app.  This app will allow you to search for movies, TV shows, and people.  The search results show an overview of each item and link to details.  You can also save items to a favorites list and revisit them when you are ready to catch up on a TV series or watch some classic movies.

            This was created with Create-React-App.  It uses Redux.JS to contain state.  Design elements are made up of Bootstrap v4 with Material Design for Bootstrap (MDB) and Sass.  The Back-End consists of Node.js,  Express.JS for handling routes, APIs, and user authentication, and sits on MongoDB.

            My Movie Search App is deployed on Heroku.  Themoviedb.org helps feed this app.
          </p>
        </div>
        <div className="logo card card-block">
          <div className="row row1">
            <img src="./reactjs2.png" alt="ReactJS"/>
            <img src="./redux.png" alt="ReduxJS"/>
            <img src="./js@2x.png" alt="JS"/>
            <img src="./sass.png" alt="Sass"/>
          </div>
        <hr></hr>
          <div className="row row2">
            <img src="./mongo.png" alt="MongoDB"/>
            <img src="./node.png" alt="Node.JS"/>
            <img src="./github.png" alt="GitHub"/>
            <img src="./bootstrap.jpeg" alt="Bootsrap"/>
          </div>
        </div>
      </div>

    );
  }
}


export default TheApp;
