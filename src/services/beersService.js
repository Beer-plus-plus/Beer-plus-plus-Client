import axios from "axios";

class BeerService {

    constructor() {
        this.beers = axios.create({
          baseURL: "https://sandbox-api.brewerydb.com/v2"
        });
      }

     async getAllBeers () {
         try{
         const beers = await this.beers.get(`/beers/?key=${process.env.SANDBOX_KEY_BREWERYDB}`);
         console.log(beers);
         return beers;}
         catch(error){
           console.log(error);
         }
     }

}

const beerService = new BeerService();

export default beerService;