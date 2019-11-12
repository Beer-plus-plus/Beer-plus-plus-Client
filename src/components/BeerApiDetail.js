import React, { Component } from 'react';
import beerService from '../services/beersService';
import Navbar from './Navbar';

class BeerApiDetail extends Component {
  state = {
    beer: {},
    loading: true,
  };

  handleOnClick= async () => {
    console.log('entro Aqui');
  }

  componentDidMount = async () => {
    this.setState({ loading: true });
    const { id } = this.props.match.params;
    try {
      const data = await beerService.getBeerDetail(id);
      const { data: beer } = data;
      this.setState({ beer: { ...beer } }, () => {
        this.setState({loading: false});
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
            <button onclick={this.handleOnClick}>Add to preferred</button>
            <button>Stop being preferred</button>
            <Navbar/>
          </div>
        ) : (
          <div>
            <img src="loading2.gif" alt="beer loading" style={{ width: '100%' }}></img>
          </div>
        )}
       
      </div>
    );
  }
}

export default BeerApiDetail;
