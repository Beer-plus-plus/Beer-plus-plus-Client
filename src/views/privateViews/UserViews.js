import React, { Component } from 'react';
import { withAuth } from '../../Context/AuthContext';
import './UserViews.css';
import UserForm from '../../components/UserForm';
import UserPass from '../../components/UserPass';
import UserService from '../../services/userService';
import AddImage from '../../components/AddImage';
import Navbar from '../../components/Navbar';

class UserView extends Component {
  state = {
    user: {},
    loading: true,
  };

  componentDidMount = async () => {
    this.setState({ loading: true });
    console.log(this.props.user._id);
    const user = await UserService.userGetDetail(this.props.user._id);
    console.log('esto es user', user);
    this.setState({ user }, () => {
      this.setState({ loading: false });
    });
  };

  render() {
    const { user, loading } = this.state;
    return (
      <div className="container-userview">
        {!loading && (
          <div>
            <h1>{user.username}'PROFILE</h1>
            <AddImage user={user} />
            <UserForm user={user} />

            <UserPass user={user} />
            <div className="organize-button">
              <button className="button">Preferred Sites</button>
              <button className="button">Preferred Beers</button>
              <button className="button" onClick={this.props.handleLogout}>
                logout
              </button>
              <Navbar user={this.props.user} />
            </div>
          </div>
        )}
        {loading && (
          <div>
            <img src="/images/loading2.gif" alt="beer loading" style={{ width: '100%' }}></img>
          </div>
        )}
      </div>
    );
  }
}

export default withAuth(UserView);
