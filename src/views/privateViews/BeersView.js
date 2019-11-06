import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './beersView.css';
import beersService from '../../services/beersService';
import BeerCard from '../../components/BeerCard';
import { withAuth } from '../../Context/AuthContext';

class BeersView extends Component {
  state = {
    beersNow: [],
    index: 1,
    loading: true,
    maxPage: 0,
  };

  // handleChange = e => {
  //   e.preventDefault();
  //   //   let beers = [...this.props.beersApi];
  //   //  const { name, value } = e.target;
  //   //   const { beersNow } = this.state;
  //   //   if (value !== "") {
  //   //     beers = beersNow.filter(aBeer => {
  //   //       return aBeer.nameDisplay.toLowerCase().indexOf(value.toLowerCase()) !== -1;
  //   //     });
  //   //   }
  //   //     this.setState({ [name]: value, showFood: [...beers] });
  // };

  downPage = () => {

    if (!this.state.loading){
    const { index } = this.state;
    this.setState({ loading: true, index: index - 1 });
    beersService
      .getAllBeers(this.state.index)
      .then((beers, numberOfPages) => {
        this.setState({ beersNow: [...beers], loading: false, maxPage: numberOfPages });
      })
      .catch(error => {
        console.log(error);
      });
    }
  };

  upPage = () => {
    const { index } = this.state;
    this.setState({ loading: true, index: index + 1 });
    beersService
      .getAllBeers(this.state.index)
      .then((beers, numberOfPages) => {
        this.setState({ beersNow: [...beers], loading: false, maxPage: numberOfPages });
      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: false });
      });
    }
 

  componentDidMount = async ()  => {
        this.setState({ loading: true });
    console.log (this.state.loading);
    try {
      const data= await beersService.getAllBeers(1);
      const { beers, numberOfPages} = data;
      console.log(data)
      this.setState({ beersNow: [...beers], loading: false, maxPage: numberOfPages });
      console.log (this.state.loading);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { beersNow, loading } = this.state;

    return (
      <div className="container-beersView">
        <h1>Beerpedia</h1>
        
        {!loading ? 
          <div>
            <button onClick={this.downPage}> Page before</button>
            <button onClick={this.upPage}>Next Page</button>
            <div>
              <label htmlFor="textFilter">Search...</label>
              <input type="text" name="textFilter" placeholder="Search your beer..." onChange={this.handleChange} />
            </div>
            <div>
              {beersNow.map((aBeer, index) => {
                return (
                  <div key={`${aBeer.id}-${index}`}>
                    <BeerCard aBeer={aBeer} />
                  </div>
                );
              })}
            </div>
          </div>
         : 
          <div>
            <img src="loading2.gif" alt="beer loading"></img>
          </div>
      }

        <div>
          <Link to="/user">
            <img src="user.svg" alt="User menu profile" style={{ width: '50px' }}></img>
          </Link>

          <button onClick={this.props.handleLogout} style={{ border: 'none', background: 'transparent' }}>
            <img src="logout.svg" alt="Beer menu" style={{ width: '50px' }}></img>
          </button>

        </div>

      </div> )
  }
}

export default withAuth(BeersView);
