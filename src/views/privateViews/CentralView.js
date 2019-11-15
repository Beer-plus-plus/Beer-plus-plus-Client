import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../../Context/AuthContext';
import './CentralView.css';

class Central extends Component {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <div className="centralmenu">
        <div className="menu-circular">
          <div className="title-wrapper">
          <h1>Beer++</h1>
          </div>
          <div className="Left-up-menu">
            <Link to="/beers">
              <img src="/images/beer.svg" alt="Beer menu" style={{ width: '50px' }}></img>
            </Link>
          </div>
          <div className="right-up-menu">
            <Link to="/user">
              <img src="/images/user.svg" alt="User Profile" style={{ width: '50px' }}></img>
            </Link>
          </div>
          <div className="left-down-menu">
            <Link to="/user">
              <img src="/images/rice.svg" alt="User Profile" style={{ width: '50px' }}></img>
            </Link>
          </div>
          <div className="right-down-menu">
            <Link to="/logout">
              <img src="/images/logout.svg" alt="User Profile" style={{ width: '50px' }}></img>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth(Central);
