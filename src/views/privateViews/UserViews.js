import React, { Component } from 'react';
import { withAuth } from '../../Context/AuthContext';
import './UserViews.css';
import UserForm from '../../components/UserForm';
import UserPass from '../../components/UserPass';
import AddImage from '../../components/AddImage';
import Navbar from '../../components/Navbar';

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
          <button className="button">Preferred Beers</button>
          <button className="button" onClick={this.props.handleLogout}>
            logout
          </button>
          <Navbar  user={this.props.user} />
        </div>
      </div>
    );
  }
}

export default withAuth(UserView);
