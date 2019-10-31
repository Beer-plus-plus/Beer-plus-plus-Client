import React, { Component } from 'react';
import { withAuth } from '../../Context/AuthContext';
import './UserViews.css';
import userService from '../../services/userService';

class UserView extends Component {
  state = {
    user: {},
    newPass: '',
    confirmPass: '',
    loading: true,
  };

  handleChange = e => {
    const { user } = this.state;
    this.setState({ user: { ...user, [e.target.name]: e.target.value } });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const {
      user: { name, lastName, email },
    } = this.state;
    userService.userUpdate(this.props.user._id, name, lastName, email);
    const {user: newUser} = this.state;
    this.setState({ user: { ...newUser}});
  };

  handleFormSubmitpass = e => {};

  async componentDidMount() {
    const {
      user: { _id },
    } = this.props;
    try {
      const newUser = await userService.userGetDetail(_id);
      this.setState({ user: {...newUser}, loading: false });
    } catch (error) {
      this.setState({ loading: false });
    }
  }

  render() {
    const { handleLogout } = this.props;
    const { newPass, confirmPass, user, loading } = this.state;
    return (
      <div className="container-userview">
        <h1>USER PROFILE</h1>
        <p>Username: {user.username}</p>
        <form onSubmit={this.handleFormSubmit}>
          <div>
            <label htmlFor="name">name</label>
            <input type="text" name="name" value={user.name} onChange={this.handleChange} />
          </div>

          <div>
            <label htmlFor="lastName">Last name</label>
            <input type="text" name="lastName" value={user.lastName} onChange={this.handleChange} />
          </div>

          <div>
            <label htmlFor="email">email</label>
            <input type="text" name="email" required value={user.email} onChange={this.handleChange} />
          </div>
          <div>
            <input type="submit" value="Update"></input>
          </div>
        </form>

        <button>Add profile image</button>

       {/* <form onSubmit={this.handleFormSubmitpass}>
          <div>
            <label htmlFor="oldPass">Password</label>
            <input type="password" name="oldPass" required value={user.password} onChange={this.handleChange} />
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
        </form> */}
        <button>Preferred Sites</button>
        <button>Preferred Beers</button>
        <button onClick={handleLogout}>logout</button>
      </div>
    );
  }
}

export default withAuth(UserView);
