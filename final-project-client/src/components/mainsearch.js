import React, { Component } from 'react';
import $ from 'jquery';
import { store, actions } from './../store/store.js';
import Query from './../components/query.js';
import { Link, withRouter } from 'react-router-dom';


const apiKey = '873eb20764b577e3b6adfa6f878f3379';
const baseURL = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=en-US&query=`;
const imageURL = `https://image.tmdb.org/t/p/w500`;

class MainSearch extends Component {

  constructor(){
    super();
    this.state = store.getState();
  }

  componentDidMount() {
    this.unsub = store.subscribe(() => {
      this.setState(store.getState());
    });
  }

  componentWillUnmount() {
    this.unsub();
  }

  handleQuery(input) {
    store.dispatch(Object.assign({}, actions.QUERY_HANDLE));
     this.makeAjaxCall();
  };

  makeAjaxCall() {
    const currentState = store.getState().main
    $.ajax({
      url: `${baseURL}/${currentState.queryInput}/&page=${currentState.pageNumber}&include_adult=false`
    })
    .done((data) => {
      let fixedData = data.results.map((x) => {
        if (x.media_type === 'movie') {
          if (x.poster_path === null) {
            return {
              idMedia: x.id,
              nameMedia: x.title,
              overview: x.overview,
              artMedia: 'no-image.png',
              dateMedia: x.release_date,
              typeMedia: x.media_type
            }
          }
          else {
            return {
              idMedia: x.id,
              nameMedia: x.title,
              overview: x.overview,
              artMedia: x.poster_path,
              dateMedia: x.release_date,
              typeMedia: x.media_type
            }
          }
        }
        else if (x.media_type === 'tv') {
          if (x.poster_path === null) {
            return {
              idMedia: x.id,
              nameMedia: x.name,
              overview: x.overview,
              artMedia: 'no-image.png',
              dateMedia: x.first_air_date,
              typeMedia: x.media_type
            }
          }
          else {
            return {
              idMedia: x.id,
              nameMedia: x.name,
              overview: x.overview,
              artMedia: x.poster_path,
              dateMedia: x.first_air_date,
              typeMedia: x.media_type
            }
          }
        }
        else if (x.media_type === 'person') {
          if (x.profile_path === null) {
            return {
              idMedia: x.id,
              nameMedia: x.name,
              artMedia: 'no-image.png',
              typeMedia: x.media_type
            }
          }
          else {
            return {
              idMedia: x.id,
              nameMedia: x.name,
              artMedia: x.profile_path,
              typeMedia: x.media_type
            }
          }
        }
      else {
        return null;
      }
      })
      store.dispatch(Object.assign({}, actions.GET_DATA, {
        results: fixedData,
      }))
    });
  }


  handlePrevClick() {
    store.dispatch(Object.assign({}, actions.DECREMENT_PAGE));
    this.makeAjaxCall();
    window.scrollTo(0, 0);
  }

  handleNextClick() {
    store.dispatch(Object.assign({}, actions.INCREMENT_PAGE));
    this.makeAjaxCall();
    window.scrollTo(0, 0);
  }

  addToFavorites(x, evt) {
    $.ajax({
      url: '/api/favorite',
      method: 'POST',
      data: {
        nameMedia: x.nameMedia,
        idMedia: x.idMedia,
        artMedia: x.artMedia,
        typeMedia: x.typeMedia
      }
    })
    .done((data) => {
      store.dispatch(Object.assign({}, actions.ADD_TO_FAVORITES, { favorites: data }))
    });
  }

  removeFavorite(x, evt) {
    $.ajax({
      url: `/api/favorites/${x._id}`,
      method: 'DELETE'
    })
    .done(() => {
      store.dispatch(Object.assign({}, actions.DELETE_FAVORITES, { favorites: x }));
    })
  };

  onToDetails(data) {
    store.dispatch(Object.assign({}, actions.ON_TO_DETAILS, { details: data }));
    window.scrollTo(0, 0)
  }

  render() {
    let main = this.state.main;
    let fava = this.state.favorites;
    let searchResults;
    let buttons;
    if (main.results.length === 0) {
      searchResults = <p className="zero-search">My search is ready.</p>
    }
    else {
      const resultsSearch = main.results.map((x) => {
      let url = '/no-image.png'
      if (x.artMedia !== 'no-image.png') {
        url = `${imageURL}/${x.artMedia}`
      }
      const favInDeets = fava.favorites.find(fav => fav.idMedia === x.idMedia);
      const favToggle = favInDeets ? <span className="is-favorite" onClick={(evt) => this.removeFavorite(favInDeets, evt)}></span> : <div className="favoritesItem" onClick={(evt) => this.addToFavorites(x, evt)}></div>
      if (x.typeMedia === 'person') {
        return <div className="card card-block searchLis"  key={x.idMedia}>
                <div className="">
                  <li className="searchLis">
                  {favToggle}
                  <img className="main-img" src={url} alt={x.nameMedia} />
                  <p>Name: <Link to="/details/" onClick={() => this.onToDetails(x)}>{x.nameMedia}</Link></p>
                  </li>
                </div>
              </div>
      }
      else {
        return <div className="card card-block searchLis" key={x.idMedia}>
                <div className="">
                <li className="searchLis" >
                  {favToggle}
                  <img className="main-img" src={url} alt={x.nameMedia} />
                  <p>Name: <Link to="/details/" onClick={() => this.onToDetails(x)}>{x.nameMedia}</Link></p>
                  <p>Overview: {x.overview}</p>
                  <p>Date: {x.dateMedia}</p>
                </li>
                </div>
              </div>
      }
    })

    if (main.pageNumber === 1 && main.results.length === 20) {
      buttons = <div className="page-button">
      <button type="button" className="btn btn-elegant" onClick={() => this.handleNextClick()}>Next</button>
      </div>
    }
    else if (main.pageNumber > 1 && main.results.length === 20) {
      buttons =
      <div className="page-button">
        <button type="button" className="btn btn-elegant" onClick={() => this.handlePrevClick()}>Previous</button>
        <button type="button" className="btn btn-elegant" onClick={() => this.handleNextClick()}>Next</button>
      </div>
    }
    else if (main.pageNumber > 1 && main.results.length < 20) {
      buttons = <div className="page-button">
      <button type="button" className="btn btn-elegant" onClick={() => this.handlePrevClick()}>Previous</button>
      </div>
    }

    searchResults = <ol className="searchOL">
        {resultsSearch}
      </ol>
  };
    return(
      <div className="main-container">
        <div className="input-box">
          <Query
            results={main.results}
            querySubmit={(input) => this.handleQuery(input)}
            query={main.query}
             />
        </div>
        <div className="main-search-container">
          <div className="main-results">
            {searchResults}
          </div>
        </div>
        {buttons}
      </div>
    )
  }
}

export default withRouter(MainSearch);
