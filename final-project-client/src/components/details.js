import React, { Component } from 'react';
import { store, actions } from './../store/store.js';
import $ from 'jquery';

const apiKey = '873eb20764b577e3b6adfa6f878f3379';

// const baseURL = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=en-US&query=`;
const deetsURL1 = `https://api.themoviedb.org/3/`

// /
// ${currentState.person_id}
const deetsURL2 = `?api_key=${apiKey}&language=en-US`;
// https://api.themoviedb.org/3/movie/{movie_id}?api_key=873eb20764b577e3b6adfa6f878f3379&language=en-US

// https://api.themoviedb.org/3/tv/{tv_id}?api_key=873eb20764b577e3b6adfa6f878f3379&language=en-US

// https://api.themoviedb.org/3/person/{person_id}?api_key=873eb20764b577e3b6adfa6f878f3379&language=en-US

// https://api.themoviedb.org/3/{media_type}/{person_id}?api_key=873eb20764b577e3b6adfa6f878f3379&language=en-US

class Details extends Component {

  constructor() {
    super();
    this.state = store.getState().details
    // console.log('constructor', store.getState());
    // console.log(this.state);
  }

  componentDidMount() {
    // console.log(this.state);
    const currentState = store.getState().details;
    console.log(currentState.details)
    // console.log(currentState.details[0])
    // console.log('state', this.state);
      const url = `${deetsURL1}${currentState.details.typeMedia}/${currentState.details.idMedia}${deetsURL2}`;
      console.log(url);
    this.unsub = store.subscribe(() => {
      this.setState(store.getState().details);
      this.deetsAjaxCall();
      console.log(this.state);

    })
  }

  componentWillUnmount(){
    this.unsub()
    store.dispatch(Object.assign({}, actions.DEETS_RESET));
  }

  deetsAjaxCall() {
    const currentState = store.getState().details;
      const url = `${deetsURL1}/${currentState.typeMedia}/${currentState.media_type}/${currentState.idMedia}${deetsURL2}`;
      console.log('url', url);
    $.ajax({
      url: url
    })
    .done((data) => {
      console.log('data', data);
    })
  }

  render() {
    // console.log(this.state);
    return(
      <div>
      you made it!
      </div>
    );
  }
}

export default Details;
