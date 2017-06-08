import React, { Component } from 'react';
import $ from 'jquery';
import { store, actions } from './../store/store.js';
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
      $.ajax({
        url: '/api/favorites'
      })
      .done((data) => {
        store.dispatch(Object.assign({}, actions.GET_FAVORITES, { favorites: data }));
      });
  }

  componentWillUnmount(){
    this.unsub();
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
    store.dispatch(Object.assign({}, actions.ON_TO_DETAILS, { details: data }))
  }

  render() {
    let faveList;
    if (this.state.favorites.length === 0) {
      faveList = <p>You don't have any favorites yet.</p>
    }
    else {
      const faves = this.state.favorites.map((x, i) => {
        let url = '/no-image.png';
        if (x.artMedia !== 'no-image.png') {
          url = `${imageURL}/${x.artMedia}`
          }
        return <div className="card card-block favLis" key={x.idMedia + i}>
                  <li >
                    <img src={url} alt={x.nameMedia} />
                    <p><Link to="/details" onClick={() => this.onToDetails(x)}>{x.nameMedia}</Link></p>
                    <div className="remove"  onClick={(evt) => this.removeFavorite(x, evt)}>remove</div>
                  </li>
              </div>
      });
      faveList = <ol>
        {faves}
      </ol>
    }
    return (
      <div>
        <h1 className="fav-title">Favorites List</h1>
        <div className="favorites-container">
          <div className="favorites-results-container">
            {faveList}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(FavoritesList);
