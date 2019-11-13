import React, { Component } from 'react';
import './beersView.css';
import beersService from '../../services/beersService';
import BeerCard from '../../components/BeerCard';
import { withAuth } from '../../Context/AuthContext';
import Navbar from '../../components/Navbar';

class BeersView extends Component {
  state = {
    beersNow: [],
    index: 1,
    loading: true,
    maxPage: 0,
    minPage: 1,
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
    let newIndex = this.state.index - 1;
    if (newIndex < this.state.minPage) {
      newIndex = this.state.maxPage;
    }
    this.setState({ loading: true, index: newIndex });
    beersService
      .getAllBeers(newIndex)
      .then(({ beers }) => {
        this.setState({ beersNow: [...beers], loading: false });
      })
      .catch(error => {
        console.log(error);
      });
  };

  upPage = async () => {
    let newIndex = this.state.index + 1;
    if (newIndex > this.state.maxPage) {
      newIndex = this.state.minPage;
    }
    this.setState({ loading: true, index: newIndex });
    beersService
      .getAllBeers(newIndex)
      .then(({ beers }) => {
        this.setState({ beersNow: [...beers], loading: false });
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount = () => {
    this.setState({ loading: true });
    const newIndex = this.state.index;
    beersService
      .getAllBeers(newIndex)
      .then(({ beers, numberOfPages }) => {
        
        this.setState({ beersNow: [...beers], loading: false, maxPage: numberOfPages });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { beersNow, loading } = this.state;

    return (
      <div className="container-beersView">
        <h1 className="titled">Beerpedia</h1>
        <button className="buttonPage left" onClick={this.downPage}>
          <img src="/images/left-arrow.svg" alt="arrow left sign" style={{ width: '35px' }}></img>
        </button>
        <button className="buttonPage right" onClick={this.upPage}>
          {' '}
          <img src="/images/arrow-pointing-to-right.svg" alt="arrow right sign"style={{ width: '35px' }}></img>
        </button>
        {!loading ? (
          <div>
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

export default withAuth(BeersView);
