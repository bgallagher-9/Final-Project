import React, {Component} from 'react';
import {store, actions} from './../store/store.js';
import $ from 'jquery';
import {Link, withRouter} from 'react-router-dom';

const apiKey = '873eb20764b577e3b6adfa6f878f3379';
const deetsURL1 = `https://api.themoviedb.org/3/`
const deetsURL2 = `?api_key=${apiKey}&language=en-US`;
const imageURL = `https://image.tmdb.org/t/p/w500`;

class Details extends Component {

  constructor() {
    super();
    this.state = store.getState().details;
    // console.log(this.state.details);
    this.deetsAjaxCall()
  }

  componentDidMount() {
    console.log('1. mounting1', this.state);
    this.unsub = store.subscribe(() => {
      this.setState(store.getState().details);
      console.log('2. mounting2', this.state);
    })
    // , this.deetsAjaxCall());
    console.log('3. mounting3', this.state);
  }

  componentWillUnmount() {
    this.unsub()
    store.dispatch(Object.assign({}, actions.DEETS_RESET));
  }

  deetsAjaxCall() {
    console.log('4. calling1 state', this.state)
    const currentState = store.getState().details;
    const url = `${deetsURL1}${currentState.details.typeMedia}/${currentState.details.idMedia}${deetsURL2}`;
    console.log('url', url);
    $.ajax({url: url})
    .done((data) => {
      console.log('5. calling2 data', data);
      // console.log('done state', this.state)
      store.dispatch(Object.assign({}, actions.GET_DETAILS, {
        results: data,
        typeMedia: this.state.details.typeMedia
        // }, console.log(data)
      }))
    } )
  }
  render() {
    console.log('rendering state1', this.state)
    // let url = 'no-image.png';
    // if (this.state.details.artMedia !== 'no-image.png') {
    //   url = `${imageURL}/${this.state.details.artMedia}`}
    let moreDetails;
    //
    // if (this.state.typeMedia !== 'person') {
    //   moreDetails = this.state.results.map((x) => {
    //     return <li className="searchLis" key={x.idMedia}>
    //       <div className="favoritesItem" onClick={(evt) => this.addToFavorites(x, evt)}></div>
    //       <img src={url} alt={x.nameMedia}/>
    //       <p>Name:
    //         <Link to="/details/" onClick={() => this.onToDetails(x)}>{x.nameMedia}</Link>
    //       </p>
    //       <p>Overview: {x.overview}</p>
    //       <p>Date: {x.dateMedia}</p>
    //     </li>
    //   })
    // }
    // else {
    //   moreDetails = this.state.results.map((x) => {
    //     return <li className="searchLis" key={x.idMedia}>
    //       <div className="favoritesItem" onClick={(evt) => this.addToFavorites(x, evt)}></div>
    //       <img src={url} alt={x.nameMedia}/>
    //       <p>Name:
    //         <Link to="/details/" onClick={() => this.onToDetails(x)}>{x.nameMedia}</Link>
    //       </p>
    //     </li>
    //   })
    // }
    return (
      <div>
        {moreDetails}
      </div>
    )
  }
}
export default withRouter(Details);
