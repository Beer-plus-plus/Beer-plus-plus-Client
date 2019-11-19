import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Navbar from './Navbar';
import './BeerCreate.css';
import beerService from '../services/beersService';
import { withAuth } from '../Context/AuthContext';

class BeerCreate extends Component {
  state = {
    beer: {
      nameDisplay: '',
      description: '',
      style: '',
      ingredients: '',
      labels: { medium: '/images/na.svg' },
      abv: 0,
      ibu: 0,
      origin: '',
      brand: '',
      productionyear: 1980,
      servingtemperature: 0,
    },
    loading: undefined,
    redirectToBeers: false,
  };

  handleChange = e => {
    const { beer } = this.state;

    console.log(e.target.name);
    console.log(e.target.value);
    this.setState({ beer: { ...beer, [e.target.name]: e.target.value } });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const { beer } = this.state;
    const {
      beer: { style },
    } = this.state;
    let newBeer = beer;
    newBeer.style = { name: style };
    beerService.addNewBeer(this.props.user._id, newBeer, this.state.beer.ingredients);
    this.setState({ redirectToBeers: true });
  };

  render() {
    const { beer, redirectToBeers } = this.state;
    return (
      <div>
        {redirectToBeers && <Redirect to={{ pathname: '/beers' }} />}
        <h1 style={{ padding: '100px 0 0 0' }}>New Beer</h1>
        <Navbar />
        <form className="form-user-container" onSubmit={this.handleFormSubmit}>
          <div className="input-container marginseparation ">
            <label htmlFor="namedisplay">Name</label>
            <input
              type="text"
              name="nameDisplay"
              value={beer.nameDisplay}
              placeholder="Estrella Damm"
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="input-container marginseparation">
            <label htmlFor="description">Description</label>
            <input
              className="verticalpadding"
              name="description"
              type="textarea"
              placeholder="Best beer ofthe world"
              required
              onChange={this.handleChange}
              value={beer.description}
            />
          </div>
          <div className="input-container marginseparation">
            <label htmlFor="style">Beer Style</label>
            <input type="text" name="style" value={beer.style} placeholder="barley" onChange={this.handleChange} />
          </div>
          <div className="input-container marginseparation">
            <label htmlFor="ingredients">ingredients</label>
            <input
              type="text"
              name="ingredients"
              value={beer.ingredients}
              placeholder="barley"
              onChange={this.handleChange}
            />
          </div>
          <div className="input-container marginseparation">
            <label htmlFor="abv">ABV</label>
            <input type="number" name="abv" value={beer.abv} required placeholder="5.6" onChange={this.handleChange} />
          </div>

          <div className="input-container marginseparation">
            <label htmlFor="ibu">I.B.U</label>
            <input type="number" name="ibu" value={beer.ibu} placeholder="3" onChange={this.handleChange} />
          </div>
          <div className="input-container marginseparation">
            <label htmlFor="origin">Origin</label>
            <input type="text" value={beer.origin} name="origin" placeholder="Spain" onChange={this.handleChange} />
          </div>
          <div className="input-container marginseparation">
            <label htmlFor="brand">Brand</label>
            <input
              type="text"
              name="brand"
              value={beer.brand}
              placeholder="DAMM"
              required
              onChange={this.handleChange}
            />
          </div>
          <div className="input-container marginseparation">
            <label htmlFor="productionyear">Production year</label>
            <input
              type="number"
              name="productionyear"
              value={beer.productionyear}
              placeholder="1896"
              onChange={this.handleChange}
            />
          </div>
          <div className="input-container marginseparation">
            <label htmlFor="servingtemperature">Serving Temperature(C)</label>
            <input
              type="number"
              name="servingtemperature"
              value={beer.servingtemperature}
              placeholder="3"
              onChange={this.handleChange}
            />
          </div>
          <div className="input-container beersubmit">
            <input type="submit" value="Create Beer" />
          </div>
        </form>
      </div>
    );
  }
}

export default withAuth(BeerCreate);
