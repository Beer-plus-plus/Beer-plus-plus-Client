import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './beersView.css';
import beersService from '../../services/beersService';
import BeerCard from '../../components/BeerCard';

import { withAuth } from '../../Context/AuthContext';
import Navbar from '../../components/Navbar';

class BeersDB extends Component {
  state = {
    beersNow: [],
    index: 1,
    loading: true,
    maxPage: 0,
    minPage: 1,
  };

  componentDidMount() {
    this.setState({ loading: true });
    const moreBeers = beersService
      .beerListDB()
      .then( beers  => {
        return beers;
        
        this.setState({ loading: false });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { beersNow, loading } = this.state;

    return (
      <div className="container-beersView">
        {/* {!loading ? (
          <div>
            <div className="titled-newbeer-wrapper">
              <h1 className="titled">Beerpedia</h1>
              <div className="newbeer-wrapper">
                <Link to="/beer/new">
                  <img src="/images/beer+.svg" alt="to add a beer" style={{ width: '50px' }}></img>
                </Link>
              </div>
            </div>
            <button className="buttonPage left" onClick={this.downPage}>
              <img src="/images/left-arrow.svg" alt="arrow left sign" style={{ width: '35px' }}></img>
            </button>
            <button className="buttonPage right" onClick={this.upPage}>
              <img src="/images/arrow-pointing-to-right.svg" alt="arrow right sign" style={{ width: '35px' }} />
            </button>
            <div>
              <label htmlFor="textFilter">Search...</label>
              <input type="text" name="textFilter" placeholder="Search your beer..." onChange={this.handleChange} />
            </div>
            <div>
              {beersNow.map((aBeer, index) => {
                return (
                  <div key={`${aBeer.id}-${index}`}>
                    <BeerCard aBeer={aBeer} index={this.state.index} />
                  </div>
                );
              })}
            </div>
            <Navbar />
          </div>
        ) : (
          <div>
            <img src="/images/loading2.gif" alt="beer loading" style={{ width: '100%', paddingBottom:'100px'}}></img>
          </div>
        )} */}
      </div>
    );
  }
}

export default withAuth(BeersDB);
