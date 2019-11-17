import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Allbeers extends Component {
  state = {
    beers: [],
  };

  render() {
    const { aBeer, index } = this.props;
    let beerBackground = '';
    if (aBeer.labels) {
      beerBackground = `url(\'${aBeer.labels.medium}\')`;
    } else {
      beerBackground = 'url ("/images/na.svg")';
    }
    return (
      <div className="beer-card" style={{ backgroundImage: beerBackground, backgroundPosition: 'center' }}>
        <Link to={`/beers/api/${aBeer.id}`}>
          <h1>{aBeer.name}</h1>
          {aBeer.abv ? <h2>{`${aBeer.abv}º`}</h2> : <> </>}
          {/* {aBeer.labels ? (
            <div className="brand">
              <img src={aBeer.labels.medium} alt={aBeer.nameDisplay} />
            </div>
          ) : (
            <div className="brand">
              <img src="/images/na.svg" alt={aBeer.nameDisplay} />
            </div>
            
          )} */}
          <div>
            {aBeer.state === 'lock' && (
              <div>
                <p style={{ color: 'tomato' }}>Preferred beer</p>
              </div>
            )}
          </div>
        </Link>
      </div>
    );
  }
}
