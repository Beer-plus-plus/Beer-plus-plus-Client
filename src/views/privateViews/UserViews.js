import React, { Component } from 'react';
import { withAuth } from '../../Context/AuthContext';
import './UserViews.css';
import userService from '../../services/userService';

class UserView extends Component {
  state = {
    oldPass: this.props.user.password,
    newPass: '',
    confirmPass: '',
    username: this.props.user.username,
    name: this.props.user.name,
    lastname: this.props.user.lastname,
    email: this.props.user.email,
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const { username, name, lastname, email } = this.state;
    userService.userUpdate(this.props.user._id, username, name, lastname, email);
  };

  render() {
    const { handleLogout, user } = this.props;
    const { oldPass, newPass, confirmPass, username, name, lastname, email } = this.state;
    return (
      <div className="container-uservier">
        <h1>{user.username}'s PROFILE</h1>
        <p>UserView user: {user.username}</p>
        <form onSubmit={this.handleFormSubmit}>
          <div>
            <label htmlFor="username">User</label>
            <input type="text" name="username" required value={username} onChange={this.handleChange} />
          </div>
          <div>
            <label htmlFor="name">name</label>
            <input type="text" name="name" required value={name} onChange={this.handleChange} />
          </div>
          <div>
            <label htmlFor="lastname">Last name</label>
            <input type="text" name="lastname" required value={lastname} onChange={this.handleChange} />
          </div>
          <div>
            <label htmlFor="email">email</label>
            <input type="text" name="email" required value={email} onChange={this.handleChange} />
          </div>
          <div>
            <input type="submit" value="Update"></input>
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
        <button onClick={handleLogout}>logout</button>
      </div>
    );
  }
}

export default withAuth(UserView);
