import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { withAuth } from '../../Context/AuthContext';
import './UserViews.css';
import UserForm from '../../components/UserForm';
import UserPass from '../../components/UserPass';
import AddImage from '../../components/AddImage';

class UserView extends Component {
  render() {
    const { user } = this.props;
    return (
      <div className="container-userview">
        <h1>{user.username}'PROFILE</h1>
        <AddImage user={user} />
        <UserForm user={user} />
        
        <UserPass user={user} />
        <div className="organize-button">
        <button className="button">Preferred Sites</button>
        <button className="button" >Preferred Beers</button>
        <button  className="button" onClick={this.props.handleLogout}>logout</button>
        </div>
        <div>
        <Link to="/beers"><img src="beer.svg" alt="Beer menu" style={{width: '50px'}}></img></Link>
        </div>
        <button onClick={this.props.handleLogout} style={{ border: 'none', background:'transparent'}}>
          <img src="logout.svg" alt="Beer menu" style={{ width: '50px' }}></img>
        </button>
     </div>
    );
  }
}

export default withAuth(UserView);
