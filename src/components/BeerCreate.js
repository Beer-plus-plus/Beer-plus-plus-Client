import React, { Component } from 'react';
import Navbar from './Navbar';
import './BeerCreate.css';

class BeerCreate extends Component {
  state = {
    beer: {},
    loading: undefined,
  };

  handleChange = e => {
    const { beer } = this.state;
    this.setState({ beer: { ...beer, [e.target.name]: e.target.value } });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Sending...')
  };

  render() {
    return (
      <div>
        <h1 style={{ padding: '100px 0 0 0' }}>New Beer</h1>
        <Navbar />
        <form className="form-user-container" onSubmit={this.handleFormSubmit}>
          <div className="input-container marginseparation ">
            <label htmlFor="namedisplay">Name</label>
            <input type="text" placeholder="Beer name" required />
          </div>

          <div className="input-container marginseparation">
            <label htmlFor="description">Description</label>
            <input className="verticalpadding" type="textarea" required />
          </div>

          <div className="input-container marginseparation">
            <label htmlFor="beerstyle">Beer style</label>
            <input type="text" />
          </div>

          <div className="input-container marginseparation">
            <label htmlFor="ingredients">ingredients</label>
            <input type="text" />
          </div>

          <div className="input-container marginseparation">
            <label htmlFor="abv" required>
              ABV
            </label>
            <input type="number" />
          </div>

          <div className="input-container marginseparation">
            <label htmlFor="ibu">I.B.U</label>
            <input type="number" />
          </div>

          <div className="input-container marginseparation">
            <label htmlFor="origin">Origin</label>
            <input type="text" />
          </div>

          <div className="input-container marginseparation">
            <label htmlFor="image">ABV</label>
            <input type="text" />
          </div>

          <div className="input-container marginseparation">
            <label htmlFor="brand">Brand</label>
            <input type="text" />
          </div>

          <div className="input-container marginseparation">
            <label htmlFor="bproductionyear">Production year</label>
            <input type="number" />
          </div>

          <div className="input-container marginseparation">
            <label htmlFor="servingtemperature">Serving Temperature(C)</label>
            <input type="number" />
          </div>
          <div className="input-container beersubmit">
            <input type="submit" value="Create Beer" />
          </div>
        </form>
      </div>
    );
  }
}

export default BeerCreate;
