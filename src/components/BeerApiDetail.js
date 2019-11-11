import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../Context/AuthContext';
import beerService from '../services/beersService';

class BeerApiDetail extends Component {
  state = {
    beer: {},
    loading: true,
  };

  componentDidMount = async () => {
    this.setState({ loading: true });
    const { id } = this.props.match.params;
    try {
      const data = await beerService.getBeerDetail(id);
      const { data: beer } = data;
      this.setState({ beer: { ...beer }, loading: false }, () => {
        console.log(this.state.beer);
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { beer, loading } = this.state;
    return (
      <div>
        {!loading ? (
          <div>
            <h1>Beer Detail</h1>
            <h2>Name:{beer.nameDisplay}</h2>
            <div></div>
            <h2>Description: {beer.style.description}</h2>
            <div></div>
            <h2>Beer style: {beer.style.name}</h2>
            <div></div>
            <button>Add to preferred</button>
            <button>Stop being preferred</button>
          </div>
        ) : (
          <div>
            <img src="loading.gif" alt="beer loading" style={{ width: '100%' }}></img>
          </div>
        )}
        <div className="footer-menu">
          <Link to="/user">
            <img src="user.svg" alt="User menu profile" style={{ width: '50px' }}></img>
          </Link>

          <button onClick={this.props.handleLogout} style={{ border: 'none', background: 'transparent' }}>
            <img src="logout.svg" alt="Beer menu" style={{ width: '50px' }}></img>
          </button>
        </div>
      </div>
    );
  }
}

export default withAuth(BeerApiDetail);
