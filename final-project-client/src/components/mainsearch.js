import React, { Component } from 'react';
import './../scss/main-search.css';
import $ from 'jquery';
import { store, actions } from './../store/store.js';
import Query from './../components/query.js';
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
  }

  handleQuery(input) {
    store.dispatch(Object.assign({}, actions.QUERY_HANDLE));
     this.makeAjaxCall();
  };

  makeAjaxCall() {
    // console.log('pg#', this.state.pageNumber)
    var currentState = store.getState().main
    $.ajax({
      url: `${baseURL}/${currentState.queryInput}/&page=${currentState.pageNumber}&include_adult=false`
    })
    .done((data) => {
      let fixedData = data.results.map((x) => {
        if (x.media_type === 'movie') {
          if (x.poster_path === null) {
            return {
              id: x.id,
              name: x.title,
              overview: x.overview,
              art: 'no-image.png',
              date: x.release_date,
            }
          }
          else {
            return {
              id: x.id,
              name: x.title,
              overview: x.overview,
              art: x.poster_path,
              date: x.release_date,
            }
          }
        }
        else if (x.media_type === 'tv') {
          if (x.poster_path === null) {
            return {
              id: x.id,
              name: x.name,
              overview: x.overview,
              art: 'no-image.png',
              date: x.first_air_date
            }
          }
          else {
            return {
              id: x.id,
              name: x.name,
              overview: x.overview,
              art: x.poster_path,
              date: x.first_air_date
            }
          }
        }
        else if (x.media_type === 'person') {
          if (x.profile_path === null) {
            return {
              id: x.id,
              name: x.name,
              art: 'no-image.png',
              media_type: x.media_type
            }
          }
          else {
            return {
              id: x.id,
              name: x.name,
              art: x.profile_path,
              media_type: x.media_type
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
        }));
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

  addToFavorites(x, evt){
    console.log(x.name, 'added to favorites')
    $.ajax({
      url: '/api/favorite',
      method: 'POST',
      data: {
        name: x.name,
        id: x.id,
        art: x.art
      }
    })
    .done((data) => {
      console.log('data from add to faves ajax1', data)
      store.dispatch(Object.assign({}, actions.ADD_TO_FAVORITES, { favorites: data }))
      console.log('data from add to faves ajax2', data)
    });
  }

  render() {
    let searchResults = this.state.results.map((x) => {
      let url = 'no-image.png'
      if (x.art !== 'no-image.png') {
        url = `${imageURL}/${x.art}`
      }
      if (x.media_type === 'person') {
        return <li
                className="searchLis"
                key={x.id}>
                <div className="favoritesItem"
                  onClick={(evt) => this.addToFavorites(x, evt)}></div>
                <img src={url} alt={x.name} />
                <p>Name: {x.name}</p>
              </li>
      }
      else {
        return <li
                className="searchLis"
                key={x.id}>
                <div className="favoritesItem"
                  onClick={(evt) => this.addToFavorites(x, evt)}></div>
                <img src={url} alt={x.name} />
                <p>Name: {x.name}</p>
                <p>Overview: {x.overview}</p>
                <p>Date: {x.date}</p>

              </li>
      }
    });
    return(
        <div className="main-search-container">
          <div className="input-box">
            <Query
              results={this.state.results}
              querySubmit={(input) => this.handleQuery(input)}
              query={this.state.query}
               />
          </div>
          <ol className="searchOL">
            {searchResults}
          </ol>
          <div className="button-container">
            <div className="page-button prev-button"
                 onClick={() => this.handlePrevClick()}
                 >previous</div>
            <div className="page-button next-button"
                 onClick={() => this.handleNextClick()}
                 >next</div>
          </div>

        </div>
    )
  }
}

module.exports = MainSearch;





// <Pagination className="users-pagination pull-right" bsSize="medium"
//   hideDisabled
//   activePage={this.state.activePage}
//   itemsCountPerPage={this.state.itemsCountPerPage}
//   totalItemsCount={this.state.totalItemsCount}
//   onChange={this.handlePageChange}
//   />
