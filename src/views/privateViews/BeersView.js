import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class BeersView extends Component {
  render() {
    return (
      <div>
        <h1>Beers</h1>
        <div>
          <label htmlFor="textFilter">Search</label>
          <input type="text" onChange={this.handleChange} />
        </div>
        <div>
          <Link to="/user">
            <img src="user.svg" alt="User menu profile" style={{ width: '50px' }}></img>
          </Link>
        </div>
      </div>
    );
  }
}

export default BeersView;
