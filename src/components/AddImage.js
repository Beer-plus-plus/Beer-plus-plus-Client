import React, { Component } from 'react';
import userService from '../services/userService';
import { withAuth } from '../Context/AuthContext';

class AddImage extends Component {
  state = {
    imageUrl: this.props.user.img.imageUrl,
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleFileChange = e => {
    e.preventDefault();
    this.setState({ imageUrl: e.target.files[0] });
  };

  handleSubmitFileUpload = e => {
    e.preventDefault();
    const uploadData = new FormData();
    uploadData.append('imageUrl', this.state.imageUrl);
    userService
      .handleUpload(this.props.user._id, uploadData)
      .then(response => {
        this.setState({ imageUrl: response.secure_url });
        this.props.user.img.imageUrl = this.state.imageUrl;
      })

      .catch(err => {});
  };

  render() {
    const { user } = this.props;
    const { imageUrl } = this.state;
     return (
      <div>
        <h2>Image Profile</h2>
        <img src={this.props.user.img.imageUrl} alt="User image" style={{ width: '50px' }}></img>
        <form onSubmit={this.handleSubmitFileUpload} encType="multipart/form-data">
          <label>Name</label>
          <input type="text" name="name" value={this.state.name} onChange={e => this.handleChange(e)} />
          <input type="file" onChange={this.handleFileChange}></input>
          <button type="submit">Save Image</button>
        </form>
      </div>
    );
  }
}

export default withAuth(AddImage);
