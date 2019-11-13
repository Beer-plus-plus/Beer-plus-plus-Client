import React, { Component } from 'react';
import userService from '../services/userService';

class UserForm extends Component {
  state = {
    user: {},
    loading: false,
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
    this.setState({loading:true})
     this.setState({ user: this.props.user}, ()=>{this.setState({loading:false})});
  }

  render() {
    const { user, loading } = this.state;
    return (<div>
      {!loading ? (
      <form className="form-user-container" onSubmit={this.handleFormSubmit}>
        <div className="input-container">
          <label htmlFor="name">name</label>
          <input type="text" name="name" placeholder="your name" value={(user.name === null) ?  "" : user.name} onChange={this.handleChange} />
        </div>

        <div className="input-container">
          <label htmlFor="lastName">Last name</label>
          <input
            type="text"
            name="lastName"
            placeholder="your Last name"
            value={(user.lastName === null) ?  "" : user.lastName}
            onChange={this.handleChange}
          />
        </div>

        <div className="input-container">
          <label htmlFor="email">email</label>
          <input
            type="email"
            name="email"
            placeholder="your mail"
            required
            value={user.email}
            onChange={this.handleChange}
          />
        </div >
        <div  className="update">
          <input className="button" type="submit" value="Update"></input>
        </div>
      </form>) : (
          <div>
            <img src="/images/loading2.gif" alt="beer loading"></img>
          </div>
        )}

   </div> );
  }
}

export default UserForm;
