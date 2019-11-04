import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './beersView.css';
import beersService from '../../services/beersService';
import BeerCard from '../../components/BeerCard'
import { withAuth } from '../../Context/AuthContext';


class BeersView extends Component {
state = {
  beers : [],
}

async componentDidMount() {
  try {
    const beers = await beersService.getAllBeers();
    console.log('que hay aqui',beers);
    this.setState({ beers: [...beers] });
  } catch (error) {
    console.log(error);
  }
}

  render() {
    return (
      <div className="container-beersView">
        <h1>Beerpedia</h1>
        <div>
          <label htmlFor="textFilter">Search</label>
          <input type="text" onChange={this.handleChange} />
        </div>
        {this.state.beers.map((aBeer, index) => {
          return (
            <div key={`${aBeer._id}-${index}`}>
              <BeerCard aBeer={aBeer} />
            </div>
          );
        })}
        <div>
          <Link to="/user">
            <img src="user.svg" alt="User menu profile" style={{ width: '50px' }}></img>
          </Link>
          <button onClick={this.props.handleLogout} style={{ border: 'none', background:'transparent'}}>
          <img src="logout.svg" alt="Beer menu" style={{ width: '50px' }}></img>
         
        </button>
        </div>
      </div>
    );
  }
}

export default withAuth(BeersView);
