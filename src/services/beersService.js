import axios from 'axios';

class BeerService {
  constructor() {
    this.beers = axios.create({ baseURL: process.env.REACT_APP_BACKEND_BASE_URL, withCredentials: true });
  }

  async getAllBeers(index, user) {
    try {
      const allBeers = await this.beers.get(`/api/beer/${index}/${user._id}`);
      const {
        data: { beers, numberOfPages },
      } = allBeers;
      return { beers, numberOfPages };
    } catch (error) {
      console.log(error);
    }
  }

  async getBeerDetail(id) {
    try {
      const aBeer = await this.beers.get(`/api/beer/beerdetail/${id}`);
      return aBeer;
    } catch (error) {
      console.log(error);
    }
  }

  async getBeerDetailIngredients(id) {
    try {
      const data = await this.beers.get(`/api/beer/beeringredients/${id}`);
      const { data: ingredients } = data;
      return ingredients;
    } catch (error) {
      console.log(error);
    }
  }

  async addNewBeer(userId, beer, ingredients) {
    console.log( 'los mios', ingredients);
    try {
       console.log('%c%s', 'color: #00e600', ingredients);
      const data = await this.beers.post('/api/beer/new', { userId, beer, ingredients });
      console.log('esto es data', data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}

const beerService = new BeerService();

export default beerService;
