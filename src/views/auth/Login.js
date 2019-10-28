import React, { Component } from 'react';
import './Login.css';
import { withAuth } from '../../Context/AuthContext';
import Logo from '../../components/Logo';

class Login extends Component {
  state = {
    username: '',
    password: '',
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const { username, password } = this.state;
    this.props.handleLogin({
      username,
      password,
    });
  };

  render() {
    const { username, password } = this.state;
    return (
      <div className="login-container">
        <Logo />
        <form className="form-container" onSubmit={this.handleFormSubmit}>
          <div>
            <label>Username:</label>
            <input type="text" name="username" value={username} onChange={this.handleChange} />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" name="password" value={password} onChange={this.handleChange} />
          </div>
          <div>
            <input type="submit" value="Login" />
          </div>
        </form>
      </div>
    );
  }
}

export default withAuth(Login);
