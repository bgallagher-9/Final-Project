import React, {Component} from 'react';
import {store, actions} from './../store/store.js';
import $ from 'jquery';
import { Link, withRouter } from 'react-router-dom';
import numeral from 'numeral';



const apiKey = '873eb20764b577e3b6adfa6f878f3379';
const deetsURL1 = `https://api.themoviedb.org/3/`
const deetsURL2 = `?api_key=${apiKey}&language=en-US`;
const imageURL = `https://image.tmdb.org/t/p/w500`;

class Details extends Component {

  constructor() {
    super();
    this.state = store.getState();

    this.deetsAjaxCall();
  }

  deetsAjaxCall() {
    const currentState = store.getState().details.details;
    const url = `${deetsURL1}${currentState.typeMedia}/${currentState.idMedia}${deetsURL2}`;
    $.ajax({url: url})
    .done((data) => {
      store.dispatch(Object.assign({}, actions.GET_DETAILS, { results: data }))
    })
  }

  componentDidMount() {
    this.unsub = store.subscribe(() => {
      this.setState(store.getState());
      console.log('deets mount favs', store.getState().favorites.favorites)
    })
  }

  componentWillUnmount() {
    this.unsub()
    console.log('unmounting');
  }

  addToFavorites(evt) {
    let d = this.state.details.details;
    $.ajax({
      url: '/api/favorite',
      method: 'POST',
      data: {
        nameMedia: d.nameMedia,
        idMedia: d.idMedia,
        artMedia: d.artMedia,
        typeMedia: d.typeMedia
      }
    })
    .done((data) => {
      store.dispatch(Object.assign({}, actions.ADD_TO_FAVORITES, { favorites: data }))
    });
  }

  removeFavorite(d, evt) {
    console.trace();
    console.log('d', d._id, d);
    $.ajax({
      url: `/api/favorites/${d._id}`,
      method: 'DELETE'
    })
    .done(() => {
      store.dispatch(Object.assign({}, actions.DELETE_FAVORITES, { favorites: d }));
    })
  };

  render() {
    console.log('deets favs render', this.state.favorites.favorites.length);
    let d = this.state.details.details
    // let main = this.state.main;
    let fava = this.state.favorites;
    let results = this.state.details.results;
    let url = '/no-image.png';
    if (d.artMedia !== 'no-image.png') {
      url = `${imageURL}/${d.artMedia}`}
    let url2;
    if (results.backdrop_path !== null && d.typeMedia !== 'person') {
      url2 = `${imageURL}${results.backdrop_path}`}
    else {url2 = '/spotlights.png'}
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
    const favInDeets = fava.favorites.find(fav => fav.idMedia === d.idMedia)
    const favToggle = favInDeets ? <span className="is-favorite" onClick={(evt) => this.removeFavorite(favInDeets, evt)}></span> : <div className="favoritesItem" onClick={(evt) => this.addToFavorites(d, evt)}></div>
    if (d.typeMedia === 'person') {
      return breakdown =
        <div style={ styling }>
          <div className="card card-block detail-card">
            <div className="details-window">
              {favToggle}
                <img className="poster-image" src={url} alt={results.title} />
                <p>Name: {results.name}</p>
                <p>Birthday: {results.birthday}</p>
                <p>Died: {results.deathday}</p>
                <p>Bio: {results.biography}</p>
                <p>Birth Place: {results.place_of_birth}</p>
            </div>
          </div>
        </div>
      }
      else if (d.typeMedia === 'movie') {
        breakdown =
        <div style={ styling }>
          <div className="card card-block detail-card">
            <div className="details-window">
              {favToggle}
              <img className="poster-image" src={url} alt={results.title} style={{opacity: '1'}}/>
              <p>Title: {results.title}</p>
              <p>Runtime: {results.runtime} minutes.</p>
              <p>Overview: {results.overview}</p>
              <p>Budget: {numeral(results.budget).format('$0,0.00')}</p>
              <p>Revenue: {numeral(results.revenue).format('$0,0.00')}</p>
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
              {favToggle}
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
