import React, { Component } from 'react';
import beerService from '../services/beersService';
import userService from '../services/userService';
import Navbar from './Navbar';
import './BeerApiDetail.css';
import { withAuth } from '../Context/AuthContext';

class BeerApiDetail extends Component {
  state = {
    beer: {},
    loading: false,
    ingredients: '',
    userId: this.props.user._id.toString(),
    lock: undefined,
  };

  // handleClickPageBack = () => {
  //   this.props.history.goBack();
  // };

  handleStopPreferred = async () => {
    this.setState({ loading: true });
    await userService.stopTobePreferred(this.props.user._id, this.state.beer.idbplusplus);
    this.setState({ loading: false, lock: false });
  };

  handleOnClick = async () => {
    await this.setState({ loading: true }, console.log('%c%s', 'color: #733d00', ' entro aqui'));
    const { beer, ingredients } = this.state;
    let newBeer = { ...beer };
    let newIngredients = ingredients;
    if (!newBeer.description) {
      newBeer.description = 'Description, not available.';
    }
    console.log('the new beer ', newBeer);
   if (!newBeer.hasOwnProperty('style')) {
      console.log('entro aqui')
      newBeer = { style: {} };
      newBeer.style = { name: 'Style, not available.' };
    }
    if (!ingredients) {
      newIngredients = 'No ingredients added.';
    }
    console.log(newIngredients);
    if (!newBeer.abv) {
      newBeer.abv = -1;
    }
    if (!newBeer.ibu) {
      newBeer.ibu = -1;
    }
    if (!newBeer.origin) {
      newBeer.origin = 'Origin, not available.';
    }
    if (!newBeer.labels) {
      newBeer.labels = { medium: '/images/na.svg' };
    }
    if (!newBeer.brand) {
      newBeer.brand = 'Brand, not available.';
    }
    if (!newBeer.productionYear) {
      newBeer.productionYear = -1;
    }
    if (!newBeer.id) {
      newBeer.id = 'none';
    }
    try {
      this.setState({ beer: { ...newBeer }, ingredients: newIngredients });
      console.log('the new beer ', newBeer);
      const info = await beerService.addNewBeer(this.props.user._id, newBeer, newIngredients);
      console.log('newIngredients ', newIngredients);
      const { data: idBeer } = info;
      console.log('aqui ando');
      await userService.tobePreferred(this.props.user._id, idBeer);
      this.setState({ loading: false, lock: true }, console.log('%c%s', 'color: #733d00', ' salgo de aqui'));
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
      this.setState({ beer: { ...beer } });
      const dataIngredients = await beerService.getBeerDetailIngredients(id);
      this.setState({ ingredients: dataIngredients }, () => {
        this.setState({ loading: false });
      });
      if (this.state.beer.state) {
        if (this.state.beer.state === 'lock') {
          this.setState({ lock: true });
        } else {
          this.setState({ lock: false });
        }
      } else {
        this.setState({ lock: false });
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { beer, loading, ingredients, lock } = this.state;

    return (
      <div>
        {!loading && (
          <div className="beerdetail-container">
            {/* <button onClick={this.handleClickPageBack}>
              <img
                src="/images/two-left-arrows.svg"
                alt="back to beer list"
                style={{ width: '50px', marginTop: '100px' }}
              ></img>
            </button> */}
            <h1>{beer.nameDisplay}</h1>
            {beer.labels && <img src={beer.labels.medium} alt="logo" style={{ width: '200px' }}></img>}
            {!beer.labels && <img src={'/images/na.svg'} alt="logo" style={{ width: '200px' }}></img>}
            <div></div>
            {beer.style && <p>{beer.style.name}</p>}
            {beer.brand && <p>{beer.style.brand}</p>}
            {beer.productionYear > 0 && <p>{beer.productionYear}</p>}
            {beer.servingTemperature && <p>{beer.servingTemperature}º</p>}
            <div></div>
            <div></div>
            {beer.abv > 0 && <p title="Alcohol by volume">ABV: {`${beer.abv}%`}</p>}
            {beer.ibu > -1 && <p title="International Bitterness Units ">IBU: {`${beer.ibu}`}</p>}
            {beer.style && <p>Beer style: {beer.style.name}</p>}
            <div>
              {ingredients.length > 0 && (
                <div>
                  <p>ingredients: </p>
                  {ingredients}

                  <div className="ingredients-pic">
                    <img src="/images/lupulo.jpg" alt="hop plant" style={{ width: '100px' }}></img>
                    <img src="/images/cevada.jpg" alt="barley plant" style={{ width: '100px' }}></img>
                  </div>
                </div>
              )}

              {beer.origin && <p>{`${beer.origin} cal`}</p>}
            </div>
            <div></div>
            {!lock && <button onClick={this.handleOnClick}>Add to preferred</button>}
            {lock && <button onClick={this.handleStopPreferred}>Stop being preferred</button>}
            <Navbar />
          </div>
        )}
        {loading && (
          <div>
            <img src="/images/loading2.gif" alt="beer loading" style={{ width: '100%' }}></img>
          </div>
        )}
       
      </div>
    );
  }
}

export default withAuth(BeerApiDetail);
