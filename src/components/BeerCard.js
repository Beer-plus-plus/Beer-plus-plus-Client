import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Allbeers extends Component {
  state = {
    beers: [],
  };

  render() {
    const { aBeer } = this.props;
    let beerBackground = '';
    if (aBeer.labels) {
      beerBackground = `url('${aBeer.labels.medium}')`;
    } else {
      beerBackground = 'url ("/images/na.svg")';
    }
    return (
      <div className="beer-card" style={{ backgroundImage: beerBackground, backgroundPosition: 'center' }}>
        <Link to={`/beers/api/${aBeer.id}`}>
          <h1>{aBeer.name}</h1>
          {aBeer.abv ? <h2>{`${aBeer.abv}º`}</h2> : <> </>}

          <div>
            {aBeer.state === 'lock' && (
              <div>
                <span style={{ color: 'tomato', background: 'white' }}>Preferred beer</span>
              </div>
            )}
          </div>
        </Link>
      </div>
    );
  }
}
