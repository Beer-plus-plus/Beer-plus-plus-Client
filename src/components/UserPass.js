import React, { Component } from 'react';
import userService from '../services/userService';

class UserPass extends Component {
  state = {
    oldPass: '',
    newPass: '',
    confirmPass: '',
    loading: true,
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleForm = e => {
    e.preventDefault();
    const { oldPass, newPass, confirmPass } = this.state;
    console.log(oldPass, newPass, confirmPass);
    if (newPass === confirmPass && newPass !== oldPass) {
      userService.userUpdatePass(this.props.user._id, oldPass, newPass);
      this.setState({ oldPass: '', newPass: '', confirmPass: '' });
    }
  };

  render() {
    const { newPass, confirmPass } = this.state;
    return (
      <form className="form-password-container" onSubmit={this.handleForm}>
        <div className="input-container">
          <label htmlFor="oldPass">Password</label>
          <input type="password" name="oldPass" placeholder="****" onChange={this.handleChange} />
        </div>
        <div className="input-container">
          <label htmlFor="newPass">New password</label>
          <input type="password" name="newPass" value={newPass} onChange={this.handleChange} />
        </div>
        <div className="input-container">
          <label htmlFor="confirmPass">Confirm password</label>
          <input type="password" name="confirmPass" value={confirmPass} onChange={this.handleChange} />
        </div>
        <div className="organize-password">
        <input className="button" type="submit" value="Change password" ></input>
     </div>
      </form>
    );
  }
}

export default UserPass;
