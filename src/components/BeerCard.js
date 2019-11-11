import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Allbeers extends Component {
  state = {
    beers: [],
  };

  render() {
    const { aBeer } = this.props;
    return (
      <div className="beer-card">
        <Link to={`/beers/api/${aBeer.id}`}>
          <h1>{aBeer.name}</h1>
          {aBeer.abv ? <h2>{`${aBeer.abv}º`}</h2> : <> </>}
          {aBeer.labels ? (
            <img src={aBeer.labels.icon} alt={aBeer.nameDisplay} />
          ) : (
            <img src="na.svg" alt={aBeer.nameDisplay} style={{ width: '64px' }} />
          )}
        </Link>
      </div>
    );
  }
}
