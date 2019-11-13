import React, { Component } from 'react';
import beerService from '../services/beersService';
import Navbar from './Navbar';
import './BeerApiDetail.css';

class BeerApiDetail extends Component {
  state = {
    beer: {},
    loading: true,
    ingredients: {},
  };

  handleOnClick = async () => {
    console.log('entro Aqui');
  };

  componentDidMount = async () => {
    this.setState({ loading: true });
    const { id } = this.props.match.params;
    try {
      const data = await beerService.getBeerDetail(id);
      const { data: beer } = data;
      console.log('beer info', beer);
      this.setState({ beer: { ...beer } }, () => {
        this.setState({ loading: false });
      });
      const dataIngredients = await beerService.gerBeerDetailIngredients(id);
      this.setState({ ingredients: dataIngredients }, () => {
        this.setState({ loading: false });
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { beer, loading, ingredients } = this.state;
    return (
      <div>
        {!loading ? (
          <div className="beerdetail-container">
            {/* <h1>Beer Detail</h1> */}
            <h1>{beer.nameDisplay}</h1>
            <div></div>
            <p>Description: {beer.style.description}</p>
            <div></div>
            <p title="Alcohol by volume">ABV: {`${beer.abv}%`}</p>
            <p title="International Bitterness Units ">IBU: {`${beer.ibu}`}</p>
            <p>Beer style: {beer.style.name}</p>
            <div>
              ingredients:{' '}
              {ingredients.length>0 ? ingredients.map((ingredient, index) => {
                return (
                <span key={`ingredient-${index}`}>{`${ingredient.name}`}
                , {' '} 
                </span>
                )
              }): <></>}
            </div>
            <div></div>
            <button onClick={this.handleOnClick}>Add to preferred</button>
            <button>Stop being preferred</button>
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

export default BeerApiDetail;
