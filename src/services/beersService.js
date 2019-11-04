import axios from "axios";

class BeerService {

    constructor() {
        this.beers = axios.create({
          baseURL: "https://sandbox-api.brewerydb.com/v2"
        });
      }

     async getAllBeers () {
         try{
           console.log('hey hey hey',process.env.SANDBOX_KEY_BREWERYDB)
         const beers = await this.beers.get(`/beers/?key=be998c37c86c17cd77e50c102808d6f0`);
         console.log('esto es lo que hay aqui', beers);
         return beers;}
         catch(error){
           console.log(error);
         }
     }

}

const beerService = new BeerService();

export default beerService;