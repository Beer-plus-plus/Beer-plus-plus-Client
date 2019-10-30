import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../../Context/AuthContext';
import './Signup.css';
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
      <div className="container-signup">
        <Logo />
        <form onSubmit={this.handleFormSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input type="text" name="username" required value={username} onChange={this.handleChange} />
          </div>
          <div>
            <label htmlFor="email">email</label>
            <input type="email" name="email" required value={email} onChange={this.handleChange} />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" required value={password} onChange={this.handleChange} />
          </div>
          <div>
            <input type="submit" value="Signup" />
          </div>
        </form>

        <p>
          Already have account?
          <Link to={'/'}>Login</Link>
        </p>
      </div>
    );
  }
}

export default withAuth(Signup);
