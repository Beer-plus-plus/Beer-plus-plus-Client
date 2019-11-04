import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../../Context/AuthContext';

class Central extends Component {
  render() {
    return (
      <div>
        <Link to="/beers">
          <img src="beer.svg" alt="Beer menu" style={{ width: '50px' }}></img>
        </Link>
        <Link to="/user">
          <img src="user.svg" alt="User Profile" style={{ width: '50px' }}></img>
        </Link>
        <button onClick={this.props.handleLogout} style={{ border: 'none', background:'transparent'}}>
          <img src="logout.svg" alt="Beer menu" style={{ width: '50px' }}></img>
        </button>
      </div>
    );
  }
}

export default withAuth(Central);
