import React, {Component} from 'react';
import {store, actions} from './../store/store.js';
import $ from 'jquery';
import { Link, withRouter } from 'react-router-dom';
import numeral from 'numeral';
// const numeral = require('numeral');

const apiKey = '873eb20764b577e3b6adfa6f878f3379';
const deetsURL1 = `https://api.themoviedb.org/3/`
const deetsURL2 = `?api_key=${apiKey}&language=en-US`;
const imageURL = `https://image.tmdb.org/t/p/w500`;

class Details extends Component {

  constructor() {
    super();
    this.state = store.getState().details;
    this.deetsAjaxCall();
  }

  deetsAjaxCall() {
    const currentState = store.getState().details;
    const url = `${deetsURL1}${currentState.details.typeMedia}/${currentState.details.idMedia}${deetsURL2}`;
    $.ajax({url: url})
    .done((data) => {
      store.dispatch(Object.assign({}, actions.GET_DETAILS, { results: data }))
    })
  }

  componentDidMount() {
    this.unsub = store.subscribe(() => {
      this.setState(store.getState().details);
    })
  }

  componentWillUnmount() {
    this.unsub()
  }

  addToFavorites(evt) {
    $.ajax({
      url: '/api/favorite',
      method: 'POST',
      data: {
        nameMedia: this.state.details.nameMedia,
        idMedia: this.state.details.idMedia,
        artMedia: this.state.details.artMedia,
        typeMedia: this.state.details.typeMedia
      }
    })
    .done((data) => {
      store.dispatch(Object.assign({}, actions.ADD_TO_FAVORITES, { favorites: data }))
    });
  }

  render() {
    console.log('rendering state1', this.state)
    let url = '/no-image.png';
    if (this.state.details.artMedia !== 'no-image.png') {
      url = `${imageURL}/${this.state.details.artMedia}`}
    let results = this.state.results;
    let url2;
    if (this.state.results.backdrop_path === null) {
      url2 = '/spotlights.png'}
    else {url2 = `${imageURL}${results.backdrop_path}`}

    let breakdown;
    let styling = {
      width: "100vw",
      height: "100vh",
      backgroundImage: `url(${url2})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      overflow: 'hidden',
      repeat: 'noRepeat',
    }
    if (this.state.details.typeMedia === 'person') {
      breakdown =
      <div className="card card-block detail-card">
          <div className="details-window">
            <div className="favoritesItemDetails"
              onClick={(evt) => this.addToFavorites(evt)}></div>
              <img className="poster-image" src={url} alt={results.title} />
              <p>Name: {results.name}</p>
              <p>Birthday: {results.birthday}</p>
              <p>Died: {results.deathday}</p>
              <p>Bio: {results.biography}</p>
              <p>Birth Place: {results.place_of_birth}</p>
          </div>
      </div>
    }
    else if (this.state.details.typeMedia === 'movie') {
      breakdown =
      <div style={ styling }>
        <div className="card card-block detail-card">
          <div className="details-window">
            <div className="favoritesItemDetails"
              onClick={(evt) => this.addToFavorites(evt)}></div>
            <img className="poster-image" src={url} alt={results.title} style={{opacity: '1'}}/>
            <p>Title: {results.title}</p>
            <p>Runtime: {results.runtime} minutes.</p>
            <p>Overview: {results.overview}</p>
            <p>Budget: {numeral(this.state.results.budget).format('$0,0.00')}</p>
            <p>Revenue: {numeral(this.state.results.revenue).format('$0,0.00')}</p>
            <p>Date: {results.release_date}</p>
          </div>
        </div>
      </div>
    }
    else {
      breakdown =
      <div style={ styling }>
        <div className="card card-block detail-card">
          <div className="details-window" >
            <div className="favoritesItemDetails"
              onClick={(evt) => this.addToFavorites(evt)}></div>
            <img className="poster-image"src={url} alt={results.title}/>
            <p>Title: {results.name}</p>
            <p>Overview: {results.overview}</p>
            <p>First Air Date: {results.first_air_date}</p>
            <p>Last Air Date: {results.last_air_date}</p>
            <p>Total Episodes: {results.number_of_episodes}</p>
            <p>Total Seasons: {results.number_of_seasons}</p>
          </div>
        </div>
      </div>
    }


    return (
      <div className="details">
          <Link to="/userdisplay/">Return to results</Link>
          {breakdown}
      </div>
    )
  }
}
export default withRouter(Details);