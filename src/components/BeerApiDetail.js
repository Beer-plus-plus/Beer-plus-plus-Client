import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
    try {
      await beerService.addNewBeer(this.state);
    } catch (error) {
      console.error(error);
    }
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
      console.log('los ingredientes son ', this.state.ingredients);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { beer, loading, ingredients } = this.state;
     const { _id } = this.props.user;
     console.log(_id)
    return (
      <div>
        {!loading ? (
          <div className="beerdetail-container">
            <Link to={`/beers/${this.props.match.params.page}`}>
              <img
                src="/images/two-left-arrows.svg"
                alt="back to beer list"
                style={{ width: '50px', marginTop: '100px' }}
              ></img>
            </Link>
            <h1>{beer.nameDisplay}</h1>
            {beer.labels && <img src={beer.labels.medium} alt="logo"></img>}
            <div></div>
            {beer.style && <p>{beer.style.description}</p>}
            {beer.brand && <p>{beer.style.brand}</p>}
            {beer.productionYear && <p>{beer.productionYear}</p>}
            {beer.servingTemperature && <p>{beer.servingTemperature}º</p>}
            <div></div>
            <div></div>
            {beer.abv && <p title="Alcohol by volume">ABV: {`${beer.abv}%`}</p>}
            {beer.ibu && <p title="International Bitterness Units ">IBU: {`${beer.ibu}`}</p>}
            {beer.style && <p>Beer style: {beer.style.name}</p>}
            <div>
              {ingredients.length > 0 && (
                <div>
                  <p>ingredients: </p>
                  {ingredients.map((ingredient, index) => {
                    return <span key={`ingredient-${index}`}>{`${ingredient.name}`}, </span>;
                  })}
                  <div className="ingredients-pic">
                    <img src="/images/lupulo.jpg" alt="hop plant" style={{ width: '100px' }}></img>
                    <img src="/images/cevada.jpg" alt="barley plant" style={{ width: '100px' }}></img>
                  </div>
                </div>
              )}

              {beer.origin && <p>Origin: {`${beer.origin} cal`}</p>}
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
