import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './beersView.css';

import { withAuth } from '../../Context/AuthContext';
import Navbar from '../../components/Navbar';

class beersApiDb extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="beersDB">
          <Link to="/beers">
            <img src="/images/beerapi.svg" alt="beer api Link"></img>
            <h3>Beer Api</h3>
          </Link>
          <Link>
            <img src="/images/beerdb.svg" alt="beer db Link" ></img>
            <h3>Beer DB</h3>
          </Link>
        </div>
      </div>
    );
  }
}

export default withAuth(beersApiDb);
