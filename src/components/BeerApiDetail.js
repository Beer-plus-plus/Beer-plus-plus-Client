import React, { Component } from 'react';
import beerService from '../services/beersService';
import userService from '../services/userService';
import Navbar from './Navbar';
import './BeerApiDetail.css';
import { withAuth } from '../Context/AuthContext';

class BeerApiDetail extends Component {
  state = {
    beer: {},
    loading: true,
    ingredients: {},
    userId: this.props.user._id.toString(),
    lock: undefined,
  };

  handleClickPageBack = () => {
    this.props.history.goBack();
  };

  handleStopPreferred = async () => {
    this.setState({ loading: true });
    const message = await userService.stopTobePreferred(this.props.user._id, this.state.beer.idbplusplus);
    this.setState({ loading: false, lock: false });
  };

  handleOnClick = async () => {
    this.setState({ loading: true });
    const { beer, ingredients } = this.state;
    const newBeer = { ...beer };
    let newIngredients = [...ingredients];

    if (!beer.description) {
      newBeer.description = 'Description, not available.';
    }
    if (!beer.style.name) {
      newBeer.style.name = 'Style, not available.';
    }
    if (!ingredients) {
      newIngredients = [{ name: 'No ingredients added.' }];
    }
    if (!beer.abv) {
      newBeer.abv = -1;
    }
    if (!beer.ibu) {
      newBeer.ibu = -1;
    }
    if (!beer.origin) {
      newBeer.origin = 'Origin, not available.';
    }
    if (!beer.labels) {
      newBeer.labels = { medium: '/images/na.svg' };
    }
    if (!beer.brand) {
      newBeer.brand = 'Brand, not available.';
    }
    if (!beer.productionYear) {
      newBeer.productionYear = -1;
    }
    if (!beer.id) {
      newBeer.id = 'none';
    }
    try {
      this.setState({ loading: true });
      this.setState({ beer: { ...newBeer }, ingredients: [...ingredients] });
      const info = await beerService.addNewBeer(this.props.user._id, beer, ingredients);

      const { data: idBeer } = info;
      console.log('this is info ', idBeer);
      await userService.tobePreferred(this.props.user._id, idBeer);
      this.setState({ loading: false, lock: true });
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
      this.setState({ beer: { ...beer } }, () => {
        this.setState({ loading: false }, console.log('Estado de beer', this.state.beer));
      });
      if (this.state.beer.state === 'lock') {
        this.setState({ lock: true });
      } else {
        this.setState({ lock: false });
      }
      const dataIngredients = await beerService.gerBeerDetailIngredients(id);
      this.setState({ ingredients: dataIngredients }, () => {
        this.setState({ loading: false });
      });
      console.log(beer);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { beer, loading, ingredients, lock } = this.state;

    return (
      <div>
        {!loading ? (
          <div className="beerdetail-container">
            <button onClick={this.handleClickPageBack}>
              <img
                src="/images/two-left-arrows.svg"
                alt="back to beer list"
                style={{ width: '50px', marginTop: '100px' }}
              ></img>
            </button>
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
            {lock !== true && <button onClick={this.handleOnClick}>Add to preferred</button>}
            {lock === true && <button onClick={this.handleStopPreferred}>Stop being preferred</button>}
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

export default withAuth(BeerApiDetail);
