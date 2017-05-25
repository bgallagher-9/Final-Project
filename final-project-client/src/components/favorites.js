import React, { Component } from 'react';
import $ from 'jquery';
import { store, actions } from './../store/store.js';
import './../scss/favorites.css';

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

  render() {
    // console.log(this.state);
    const faves = this.state.favorites.map((x, i) => {
      return <li key={x.idMedia + i} >
        {x.nameMedia}
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

export default FavoritesList;
