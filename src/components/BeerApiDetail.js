import React, { Component } from 'react';
import { withAuth } from '../Context/AuthContext';

 class BeerApiDetail extends Component {
    

  render() {

    const { beerApi } = this.props;
console.log(beerApi);
    // const { id } = this.props.match.params;
    // const beer = beerApi.indexOf((aBeer)=>{return aBeer.id  === id});
    return (<div>hello
        {/* <h1>{beer.nameDisplay}</h1>
         <h1>Beer Api Detail</h1> */}
          </div>);
  }
}


export default withAuth (BeerApiDetail);