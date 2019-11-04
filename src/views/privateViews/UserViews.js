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
        <h1>USER PROFILE</h1>
        <p>Username: {user.username}</p>
        <UserForm user={user} />
        <AddImage user={user} />
        <UserPass user={user} />
        <button>Preferred Sites</button>
        <button>Preferred Beers</button>
        <button onClick={this.props.handleLogout}>logout</button>
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
