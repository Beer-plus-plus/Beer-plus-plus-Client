import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Allbeers extends Component {
  state = {
    beers: []
  };

  render() {
    const { aBeer } = this.props;
    return (
      <div className="beer-card">
        <Link to={`/beers/${aBeer._id}`}>
        <h1>{aBeer.name}</h1>
        <img src={aBeer.image_url} alt={aBeer.name} style={{ width: "35px" }} />
        <div className="h3 title">
        <h3>{aBeer.tagline}</h3>
        </div>
        <p>{aBeer.contributed_by}</p>
        </Link>
      </div>
    );
  }
}