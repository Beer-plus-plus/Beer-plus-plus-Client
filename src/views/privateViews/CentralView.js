import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../../Context/AuthContext';
import './CentralView.css';

class Central extends Component {
  render() {
    return (
      <div>
        <div className="Left-up-menu">
          <Link to="/beers">
            <img src="beer.svg" alt="Beer menu" style={{ width: '50px' }}></img>
          </Link>
        </div>
        <div className="right-up-menu">
          <Link to="/user">
            <img src="user.svg" alt="User Profile" style={{ width: '50px' }}></img>
          </Link>
        </div>
        <div className="left-down-menu"></div>
        <div className="right-down-menu">
          <button onClick={this.props.handleLogout} style={{ border: 'none', background: 'transparent' }}>
            <img src="logout.svg" alt="Beer menu" style={{ width: '50px' }}></img>
          </button>
        </div>
      </div>
    );
  }
}

export default withAuth(Central);
