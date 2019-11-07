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
      const beer = await beerService.getBeerDetail(id);
      this.setState({ beer: [...beer], loading: false });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    // const { beerApi } = this.props;
    const {beer, loading}= this.state;
    // const { id } = this.props.match.params;
    // const beer = beerApi.indexOf((aBeer)=>{return aBeer.id  === id});
    return (
      <div>
        {!loading ? (
          <div>
            <h1>{beer.nameDisplay}</h1>
            <h1>Beer Detail</h1>
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
