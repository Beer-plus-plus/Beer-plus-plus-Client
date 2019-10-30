import React, { Component } from 'react';
import { withAuth } from '../../Context/AuthContext';
import './UserViews.css';

class UserView extends Component {
 
  state={
    oldPass: this.props.user.password,
    newPass: '',
    confirmPass:'',
  }
  
  render() {
    const { user } = this.props;
    const {oldPass, newPass, confirmPass} = this.state;
  return (
    <div className="container-uservier">
      <h1>USER PROFILE</h1>
      <p>UserView user: {user.username}</p>
      <form>
        <div>
          <label htmlFor="username">User</label>
          <input type="text" name="username" required value={user.username} onChange={this.handleChange} />
        </div>
        <div>
          <label htmlFor="name">name</label>
          <input type="text" name="name" required value={user.name} onChange={this.handleChange} />
        </div>
        <div>
          <label htmlFor="lastname">Last name</label>
          <input type="text" name="lastname" required value={user.lastname} onChange={this.handleChange} />
        </div>
        <div>
          <label htmlFor="email">email</label>
          <input type="text" name="email" required value={user.email} onChange={this.handleChange} />
        </div>
        <div>
          <input type="submit" value="Update value"></input>
        </div>
      </form>

      <button>Add profile image</button>

      <form>
      <div>
          <label htmlFor="oldPass">Password</label>
          <input type="password" name="oldPass" required value={oldPass} onChange={this.handleChange} />
        </div>
        <div>
        <label htmlFor="newPass">New password</label>
          <input type="password" name="newPass" required value={newPass} onChange={this.handleChange} />
        </div>
        <div>
        <label htmlFor="confirmPass"></label>
          <input type="password" name="confirmPass" required value={confirmPass} onChange={this.handleChange} />
        </div>
        <input type="submit" value="Change password"></input>
      </form>
      <button>Preferred Sites</button>
      <button>Preferred Beers</button>
      
    </div>
  );
}
};

export default withAuth(UserView);
