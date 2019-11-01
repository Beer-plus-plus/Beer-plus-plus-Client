import React, { Component } from 'react';
import { withAuth } from '../../Context/AuthContext';
import './UserViews.css';
import UserForm from '../../components/UserForm';
import UserPass from '../../components/UserPass';

class UserView extends Component {
 
  render() {
    const { user } = this.props;
    return (
      <div className="container-userview">
        <h1>USER PROFILE</h1>
        <p>Username: {user.username}</p>

        <UserForm user={user} />
        <button>Add profile image</button>
        <UserPass user={user} />

        <button>Preferred Sites</button>
        <button>Preferred Beers</button>
        <button onClick={this.props.handleLogout}>logout</button>
      </div>
    );
  }
}

export default withAuth(UserView);
