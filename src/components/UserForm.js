import React, { Component } from 'react';
import userService from '../services/userService';

class UserForm extends Component {
  state = {
    user: undefined,
    loading: true
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
    const { user: newUser } = this.state;
    this.setState({ user: { ...newUser } }, console.log(this.state.user));
  };

  async componentDidMount() {
    const {
      user: { _id },
    } = this.props;
    try {
      const newUser = await userService.userGetDetail(_id);
      this.setState({ user: { ...newUser }, loading: false });
    } catch (error) {
      this.setState({ loading: false });
    }
  }

  render() {
    const { user } = this.state;
    return (
      <form onSubmit={this.handleFormSubmit}>
        <div>
          <label htmlFor="name">name</label>
          <input type="text" name="name" placeholder="your name" value={user.name} onChange={this.handleChange} />
        </div>

        <div>
          <label htmlFor="lastName">Last name</label>
          <input
            type="text"
            name="lastName"
            placeholder="your Last name"
            value={user.lastName}
            onChange={this.handleChange}
          />
        </div>

        <div>
          <label htmlFor="email">email</label>
          <input
            type="email"
            name="email"
            placeholder="your mail"
            required
            value={user.email}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <input type="submit" value="Update"></input>
        </div>
      </form>
    );
  }
}

export default UserForm;
