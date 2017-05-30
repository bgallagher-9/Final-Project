import React, { Component } from 'react';
import './../scss/main-search.css';
import $ from 'jquery';
import { store, actions } from './../store/store.js';
import Query from './../components/query.js';
import { Link, withRouter } from 'react-router-dom';
// import Pagination from "react-js-pagination";
// require("bootstrap/less/bootstrap.less");

const apiKey = '873eb20764b577e3b6adfa6f878f3379';

const baseURL = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=en-US&query=`;

const imageURL = `https://image.tmdb.org/t/p/w500`;
// var totalResults;
// let url;
// var pageCount;

class MainSearch extends Component {

  constructor(){
    super();
    this.state = store.getState().main;
  }

  componentDidMount() {
    this.unsub = store.subscribe(() => {
      this.setState(store.getState().main);
    });
  }

  componentWillUnmount() {
    this.unsub();
    console.log('unmounting?');
  }

  handleQuery(input) {
    store.dispatch(Object.assign({}, actions.QUERY_HANDLE));
     this.makeAjaxCall();
  };

  makeAjaxCall() {
    // console.log('pg#', this.state.pageNumber)
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
        totalItemsCount: data.total_results
      }, console.log(fixedData)));
      // totalResults = data.total_results;
      // pageCount = Math.ceil(totalResults / 20);
      // // console.log(pageCount)
    });
  }

//   render() {
//   return (
//     <Pagination
//       hideDisabled
//       activePage={this.state.activePage}
//       itemsCountPerPage={PER_PAGE}
//       totalItemsCount={TOTAL_COUNT}
//       onChange={this.handlePageChange}
//       />
//      );
//     }

  handlePrevClick() {
    store.dispatch(Object.assign({}, actions.DECREMENT_PAGE));
    this.makeAjaxCall();
    window.scrollTo(0, 0);
      // console.log('pnd', this.state.pageNumber)
  }

  handleNextClick() {
      store.dispatch(Object.assign({}, actions.INCREMENT_PAGE));
      this.makeAjaxCall();
      window.scrollTo(0, 0);
  }

  addToFavorites(x, evt) {
    console.log(x, 'x')

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

  onToDetails(data) {
    store.dispatch(Object.assign({}, actions.ON_TO_DETAILS, { details: data }));
    window.scrollTo(0, 0)
  }

  render() {
    // console.log(this.state.main)
    let searchResults;
    if (this.state.results.length === 0) {
      searchResults = <p className="zero-search">My search is ready.</p>
    }
    else {
      const resultsSearch = this.state.results.map((x) => {
      let url = 'no-image.png'
      if (x.artMedia !== 'no-image.png') {
        url = `${imageURL}/${x.artMedia}`
      }
      if (x.typeMedia === 'person') {
        return <div className="card"  key={x.idMedia}>
                <div className="card-block">
                  <li className="searchLis">
                  <div className="favoritesItem" onClick={(evt) => this.addToFavorites(x, evt)}></div>
                  <img src={url} alt={x.nameMedia} />
                  <p>Name: <Link to="/details/" onClick={() => this.onToDetails(x)}>{x.nameMedia}</Link></p>
                  </li>
                </div>
              </div>
      }
      else {
        return <div className="card" key={x.idMedia}>
                <div className="card-block">
                <li className="searchLis" >
                  <div className="favoritesItem" onClick={(evt) => this.addToFavorites(x, evt)}></div>
                  <img src={url} alt={x.nameMedia} />
                  <p>Name: <Link to="/details/" onClick={() => this.onToDetails(x)}>{x.nameMedia}</Link></p>
                  <p>Overview: {x.overview}</p>
                  <p>Date: {x.dateMedia}</p>
                </li>
                </div>
              </div>
      }
    })
    searchResults = <ol className="searchOL">
        {resultsSearch}
      </ol>
  };
    return(
        <div className="main-search-container">
          <div className="input-box">
            <Query
              results={this.state.results}
              querySubmit={(input) => this.handleQuery(input)}
              query={this.state.query}
               />
          </div>
            {searchResults}
          <div className="button-container">
            <button type="button" className="btn btn-elegant" onClick={() => this.handlePrevClick()}>Previous</button>
            <button type="button" className="btn btn-elegant" onClick={() => this.handleNextClick()}>Next</button>
          </div>
        </div>
    )
  }
}

export default withRouter(MainSearch);




// <Pagination className="users-pagination pull-right" bsSize="medium"
//   hideDisabled
//   activePage={this.state.activePage}
//   itemsCountPerPage={this.state.itemsCountPerPage}
//   totalItemsCount={this.state.totalItemsCount}
//   onChange={this.handlePageChange}
//   />
