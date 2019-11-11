import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { withAuth } from '../Context/AuthContext';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="footer-menu">
          <Link to="/beers">
            <img src="beer.svg" alt="Beer menu" style={{ width: '50px' }}></img>
          </Link>
        </div>
        <button onClick={this.props.handleLogout} style={{ border: 'none', background: 'transparent' }}>
          <img src={`${process.env.PUBLIC_URL}/logout.svg`} alt="Beer menu" style={{ width: '50px' }}></img>
        </button>
        <Link to="/user">
            <img src="user.svg" alt="User menu profile" style={{ width: '50px' }}></img>
          </Link>
      </div>
    );
  }
}

export default withAuth(Navbar);
