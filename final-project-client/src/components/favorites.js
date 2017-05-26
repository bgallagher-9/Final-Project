import React, { Component } from 'react';
import $ from 'jquery';
import { store, actions } from './../store/store.js';
import './../scss/favorites.css';
import { Link, withRouter } from 'react-router-dom';

const imageURL = `https://image.tmdb.org/t/p/w500`;

class FavoritesList extends Component {

  constructor() {
    super();
    this.state = store.getState().favorites;
  }

  componentDidMount() {
    this.unsub = store.subscribe(() => {
      this.setState(store.getState().favorites)
    });
    if (this.state.favorites.length === 0) {
      $.ajax({
        url: '/api/favorites'
      })
      .done((data) => {
        store.dispatch(Object.assign({}, actions.GET_FAVORITES, { favorites: data }));
        // console.log('data from faves.done', data)
      });
    }
  }

  componentWillUnmount(){
    this.unsub()
  }

  removeFavorite(x, evt) {
    evt.stopPropagation();
    console.log('x', x);
    $.ajax({
      url: `api/favorites/${x._id}`,
      method: 'DELETE'
    })
    .done(() => {
      // console.log(data)
      store.dispatch(Object.assign({}, actions.DELETE_FAVORITES, { favorites: x }));
    })
  };

  onToDetails(data) {
    store.dispatch(Object.assign({}, actions.ON_TO_DETAILS, { details: data }))
  }

  render() {
    console.log(this.state);
    const faves = this.state.favorites.map((x, i) => {
      let url = 'no-image.png';
      if (x.artMedia !== 'no-image.png') {
        url = `${imageURL}/${x.artMedia}`
        }
      return <li key={x.idMedia + i}>
              <img src={url} alt={x.nameMedia} />
              <p><Link to="/details/" onClick={() => this.onToDetails(x)}>{x.nameMedia}</Link></p>
              <button type="button" onClick={(evt) => this.removeFavorite(x, evt)}>remove</button>
            </li>
    })
    return(
        <div>
          Your Favorites!
          <div className="favorites-container">
            <ol>
              {faves}
            </ol>
          </div>
        </div>
    );
  }
}

export default withRouter(FavoritesList);
