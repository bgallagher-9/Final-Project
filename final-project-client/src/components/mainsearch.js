import React, { Component } from 'react';
import './../scss/main-search.css';
import $ from 'jquery';
import { store, actions } from './../store/store.js';

const apiKey = '873eb20764b577e3b6adfa6f878f3379';

const baseURL = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=en-US&query=`;

const imageURL = `https://image.tmdb.org/t/p/w500`;

class MainSearch extends Component {

  constructor(){
    super();
    this.state = store.getState();
  }

  componentDidMount() {
    store.subscribe(() => {
      this.setState(store.getState());
    });
  }

  handleQuery(evt) {
    if (evt.keyCode === 13) {
      this.makeAjaxCall(this.state.queryInput);
      // console.log('HQ', this.state.queryInput)
      store.dispatch(Object.assign({}, actions.RETURN_CLEAR));
    };
  }

  handleChange(evt) {
    store.dispatch(Object.assign({}, actions.INPUT_CHANGE, { value: evt.target.value }));
    // console.log(evt.target.value);
  }

  makeAjaxCall() {
    $.ajax({
      url: `${baseURL}/${this.state.queryInput}/&page=${this.state.pageNumber}&include_adult=false`
    })
    .done((data) => {
      store.dispatch(Object.assign({}, actions.GET_DATA, {
        results: data.results }));
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
      })
      console.log(data)
      this.setState({
        results: fixedData
      });
      console.log(fixedData)
    });
  }

  // handlePrevClick(evt) {
  //   if (pageNumber <= 1) {
  //
  //   }
  // }
  //
  // handleNextClick(evt) {
  //
  // }

  // handleQuery(evt) {
  //   if (evt.keyCode === 13) {
  //     this.makeAjaxCall(this.state.queryInput);
  //     // console.log('HQ', this.state.queryInput)
  //     store.dispatch(Object.assign({}, actions.RETURN_CLEAR));
  //   };
  // }

  render() {


    let searchResults = this.state.results.map((x) => {
      // let url = `https://image.tmdb.org/t/p/w500/${x.art}`
      let url = `${imageURL}/${x.art}`
      // console.log('media type: ', x.media_type);
      if (x.media_type === 'person') {
        // console.log('not person');
        return <li
                className="searchLis"
                key={x.id}>
                <img src={url} alt={x.name} />
                <p>'Name: '{x.name}</p>
              </li>
      }
      else {
        console.log('not person');
        return <li
                className="searchLis"
                key={x.id}>
                <img src={url} alt={x.name} />
                <p>'Name: '{x.name}</p>
                <p>'Overview: '{x.overview}</p>
                <p>'Date: '{x.date}</p>
              </li>
      }
    });

    // console.log(searchResults);

    return(
        <div className="main-search-container">
          <div className="input-box">
            <input type="text"
                  placeholder="What would you like to search for?" onKeyUp={(evt) => this.handleQuery(evt)}
                  onChange={(evt) => this.handleChange(evt)}
                  value={this.state.queryInput}
            />
          </div>
          <ol className="searchOL">
            {searchResults}
          </ol>
          <div className="button-container">
            <div className="page-button prev-button"
                 onClick={(evt) => this.handlePrevClick(evt)}
                 >previous</div>
            <div className="page-button next-button"
                 onClick={(evt) => this.handleNextClick(evt)}
                 >next</div>
          </div>
        </div>

    )
  }
}



module.exports = MainSearch;
