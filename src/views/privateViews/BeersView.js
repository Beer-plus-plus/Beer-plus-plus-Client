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
        <h1>Beerpedia</h1>

        {!loading ? (
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
            <Navbar />
          </div>
        ) : (
          <div>
            <img src="loading2.gif" alt="beer loading" style={{ width: '100%' }}></img>
          </div>
        )}

       
      </div>
    );
  }
}

export default withAuth(BeersView);
