import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../Context/AuthContext';
import '../views/privateViews/UserViews.css';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="footer-menu">
        <div>
          <Link to="/beers" style={{ display: 'inline-block' }}>
            <img src="beer.svg" alt="Beer menu" style={{ width: '50px' }}></img>
          </Link>
        </div>
        <div>
          <button onClick={this.props.handleLogout} style={{ background: 'transparent', border: 'none' }}>
            <img src="logout.svg" alt="Beer menu" style={{ width: '50px', background: 'transparent' }}></img>
          </button>
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

export default withAuth(Navbar);
