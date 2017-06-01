import React, { Component } from 'react';
import { store, actions } from './../store/store.js';



class Query extends Component {

  handleQuery(evt) {
    if (evt.keyCode === 13) {
      this.props.querySubmit(evt.target.value);
      evt.target.value = ''
    }
  }

  handleChange(evt) {
    store.dispatch(Object.assign({}, actions.INPUT_CHANGE, { value: evt.target.value }));
  }

  render() {
    return(
      <div>
        <input
          placeholder="What would you like to search for today?" onKeyUp={(evt) => {this.handleQuery(evt)}}
          onChange={(evt) => {this.handleChange(evt)}}
          value={this.props.queryInput}
          />
      </div>
    );
  }
}

module.exports = Query;
