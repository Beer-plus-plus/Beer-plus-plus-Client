import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './beersView.css';
import beersService from '../../services/beersService';
import BeerCard from '../../components/BeerCard';

import { withAuth } from '../../Context/AuthContext';
import Navbar from '../../components/Navbar';

class BeersView extends Component {
  state = {
    beersNow: [],
    index: 1,
    loading: true,
    maxPage: 0,
    minPage: 1,
  };

  gotoPage = async page => {
    beersService
      .getAllBeers(page, this.props.user)
      .then(({ beers, numberOfPages }) => {
        this.setState({ beersNow: [...beers], loading: false, maxPage: numberOfPages });
      })
      .catch(error => {
        console.log(error);
      });
  };

  downPage = async () => {
    let newIndex = this.state.index - 1;
    if (newIndex < this.state.minPage) {
      newIndex = this.state.maxPage;
    }
    this.setState({ loading: true, index: newIndex });
    this.gotoPage(newIndex);
  };

  upPage = async () => {
    let newIndex = this.state.index + 1;
    if (newIndex > this.state.maxPage) {
      newIndex = this.state.minPage;
    }
    this.setState({ loading: true, index: newIndex });
    this.gotoPage(newIndex);
  };

  componentDidMount() {
    this.setState({ loading: true });
    const newIndex = this.state.index;
    this.gotoPage(newIndex);
  }

  render() {
    const { beersNow, loading } = this.state;

    return (
      <div className="container-beersView">
        {!loading ? (
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
            <img src="/images/loading2.gif" alt="beer loading" style={{ width: '100%' }}></img>
          </div>
        )}
      </div>
    );
  }
}

export default withAuth(BeersView);
