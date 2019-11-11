import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../../Context/AuthContext';
import './Login.css';
import Logo from '../../components/Logo';

class Signup extends Component {
  state = {
    username: '',
    password: '',
    email: '',
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const { username, password, email } = this.state;
    this.props.handleSignup({ username, password, email });
  };

  render() {
    const { username, password, email } = this.state;
    return (
      <div className="login-container">
        <Logo />
        <form className="form-container">
          <div className="user-container margin-signup">
            <img src="user.svg" alt="user" title="User Icon" style={{ width: '50px' }} />
            <input
              type="text"
              name="username"
              placeholder="Your username "
              required
              value={username}
              onChange={this.handleChange}
            />
          </div>
          <div className="user-container margin-signup">
            <img src="email.svg" alt="email" title="email Icon" style={{ width: '50px' }} />
            <input
              type="email"
              name="email"
              placeholder="example@example.com "
              required
              value={email}
              onChange={this.handleChange}
            />
          </div>
          <div className="user-container margin-signup">
            <img src="lock.svg" alt="password" title="password Icon" style={{ width: '50px' }} />
            <input
              type="password"
              name="password"
              placeholder="****"
              required
              value={password}
              onChange={this.handleChange}
            />
          </div>
          <div className="button-login-singup">
            <input
              type="image"
              value="submit"
              src="signup.svg"
              alt="submit Button"
              title="User Login"
              style={{ width: '50px' }}
              onClick={this.handleFormSubmit}
            />
          </div>
        </form>
        <div className="change-login-signup">
          Already have account?
          <Link to={'/'}>Login</Link>
        </div>
        <div className="space">

        </div>
      </div>
    );
  }
}

export default withAuth(Signup);
