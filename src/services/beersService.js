import axios from 'axios';

class BeerService {
  constructor() {
    this.beers = axios.create({ baseURL: process.env.REACT_APP_BACKEND_BASE_URL, withCredentials: true });
  }

  async getAllBeers(index) {
    try {
      const allBeers = await this.beers.get(`/api/beer/${index}`);
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
      console.log(aBeer);
      return aBeer;
    } catch (error) {
      console.log(error);
    }
  }

  async gerBeerDetailIngredients(id) {
    try {
      const data = await this.beers.get(`/api/beer/beeringredients/${id}`);
      const { data: ingredients } = data;
      return ingredients;
    } catch (error) {
      console.log(error);
    }
  }

  async addNewBeer(beer) {
    try {
      const data = await this.beers.post('/api/beer/new', beer);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}

const beerService = new BeerService();

export default beerService;
