import React, { Component } from 'react';
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
            <h2>{beer.nameDisplay}</h2>
            <h2>{beer.style.description}</h2>
            <h2>{beer.style.name}</h2>
          </div>
        ) : (
          <div>
            <img src="loading2.gif" alt="beer loading"></img>
          </div>
        )}
      </div>
    );
  }
}

export default withAuth(BeerApiDetail);
