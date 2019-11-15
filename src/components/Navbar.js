import React from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../Context/AuthContext';
import '../views/privateViews/UserViews.css';

const Navbar = () => {
  return (
    <div className="footer-menu">
      <div>
        <Link to={'/beers'} style={{ display: 'inline-block' }}>
          <img src="/images/beer.svg" alt="Beer menu" style={{ width: '50px' }}></img>
        </Link>
      </div>
      <div>
        <Link to="/logout">
          <img src="/images/logout.svg" alt="User Profile" style={{ width: '50px' }}></img>
        </Link>
      </div>
      <div>
        <Link to="/user">
          <img src="/images/user.svg" alt="User menu profile" style={{ width: '50px' }}></img>
        </Link>
      </div>
    </div>
  );
};

export default withAuth(Navbar);
