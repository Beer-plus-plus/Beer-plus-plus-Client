import axios from 'axios';

class BeerService {
  constructor() {
    this.beers = axios.create({ baseURL: process.env.REACT_APP_BACKEND_BASE_URL, withCredentials: true });
  }

  async getAllBeers(index) {
    if (index < 1) {
      index = 1;
    }
    try {
      const allBeers = await this.beers.get(`/api/beer/${index}`);
      const {
        data: { beers },
        numberOfPages,
      } = allBeers;
      return { beers, numberOfPages };
    } catch (error) {
      console.log(error);
    }
  }
}

const beerService = new BeerService();

export default beerService;
