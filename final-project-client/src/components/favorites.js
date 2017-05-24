import React, { Component } from 'react';
import $ from 'jquery';
import { store, actions } from './../store/store.js';
import './../scss/favorites.css';



class Favorites extends Component {

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
        store.dispatch(Object.assign({}, actions.GET_FAVORITES, { favorites: data }, console.log(data)));
      });
    }
  }

  componentWillUnmount(){
    this.unsub()
  }



  render() {
    console.log(this.state);
    // console.log(this.props);
    const faves = this.state.favorites.map((x, i) => {
      console.log('x', x)
      return <li key={x.id + i} >
        {x.nameMedia}
      </li>
    })
    return(
        <div>
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


module.exports = Favorites;
