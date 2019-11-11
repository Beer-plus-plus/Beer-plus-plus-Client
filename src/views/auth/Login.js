import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
      <div className="login-container margin-login">
        <Logo />
        <form className="form-container" style={{ margin: 0 }}>
          <div className="user-container login-container">
            <img src="user.svg" alt="user" title="User Icon" style={{ width: '50px' }} />
            <input
              type="text"
              name="username"
              value={username}
              onChange={this.handleChange}
              placeholder="Your username "
            />
          </div>
          <div className="user-container">
            <img src="lock.svg" alt="password" title="password Icon" style={{ width: '50px' }} />
            <input type="password" name="password" value={password} onChange={this.handleChange} placeholder="****" />
          </div>
          <div className="button-login-singup">
            <input
              type="image"
              value="submit"
              src="login.svg"
              alt="submit Button"
              title="User Login"
              style={{ width: '50px' }}
              onClick={this.handleFormSubmit}
            />
          </div>
        </form>
        <div className="change-login-signup">
          <span>
            If you don't have an account yet,
            <Link className="womargin" to={'/signup'}>
              Signup
            </Link>
          </span>
        </div>
      </div>
    );
  }
}

export default withAuth(Login);
