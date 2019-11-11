import React, { Component } from 'react';
import userService from '../services/userService';
import { withAuth } from '../Context/AuthContext';

class AddImage extends Component {
  state = {
    imageUrl: 'user.svg',
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleFileChange = e => {
    e.preventDefault();
    console.log(e.target.files[0]);
    // this.setState({ imageUrl: e.target.files[0] });
  };

  handleSubmitFileUpload = e => {
    e.preventDefault();
    const uploadData = new FormData();
    uploadData.append('imageUrl', this.state.imageUrl);
    userService
      .handleUpload(this.props.user._id, uploadData)
      .then(response => {
        console.log(response);
        this.setState({ imageUrl: response.secure_url });
        this.props.user.img.imageUrl = this.state.imageUrl;
      })

      .catch(err => {});
  };

  render() {
    // const { user } = this.props;
    const { imageUrl } = this.state;
    return (
      <div>
        <img src={imageUrl} alt="User profile" style={{ margin: '5px', width: '50px' }}></img>
        <form onSubmit={this.handleSubmitFileUpload} encType="multipart/form-data">
          <div className="input-container"></div>
          <input type="file" onChange={this.handleFileChange}></input>
          <button type="submit">Save Image</button>
        </form>
      </div>
    );
  }
}

export default withAuth(AddImage);
