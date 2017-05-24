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
        console.log('data from faves.done', data)
      });
    }
  }

  componentWillUnmount(){
    this.unsub()
  }

  render() {
    console.log(this.state);
    const faves = this.state.favorites.map((x, i) => {
      return <li key={x.idMedia + i} >
        {x.nameMedia}
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


// render() {
//     console.log(this.state)
//     const recipesSaved = this.state.recipeSaves.map((recipe, i) => {
//       return <li key={recipe.name + i} >
//         {recipe.name}<br/>
//       {recipe.url}
//       </li>
//     });
//
//     return (
//       <div>
//         {recipesSaved}
//       </div>
//     );
//   }


export default FavoritesList;
