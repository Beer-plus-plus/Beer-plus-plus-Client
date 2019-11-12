import React, { Component } from 'react';
import userService from '../services/userService';
import { withAuth } from '../Context/AuthContext';

class AddImage extends Component {
  state = {
    imageUrl:'',
    loading:true,
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleFileChange = e => {
    e.preventDefault();

    this.setState({ imageUrl: e.target.files[0] });
  };

  previewImage = event => {
    const reader = new FileReader();
    reader.onload = () => {
      const output = document.getElementById('output_image');
      output.src = reader.result;
      console.log('entro aqui')
    };
    console.log(reader.readAsDataURL(event.target.files[0]));
    this.setState({ imageUrl: reader.readAsDataURL(event.target.files[0]) });
  };

  handleSubmitFileUpload = e => {
    e.preventDefault();
    const uploadData = new FormData();
    uploadData.append('imageUrl', this.state.imageUrl);
    userService
      .handleUpload(this.props.user._id, uploadData)
      .then(response => {
        console.log(response)
        this.setState({ imageUrl: response.secure_url });
        this.props.user.img.imageUrl = this.state.imageUrl;
           })

      .catch(err => {});
  };

componentDidMount = () => {
  this.setState({loading:true, imageUrl: this.props.user.img.imageUrl});
  this.setState({loading:false});
}

  render() {

    const {imageUrl, loading} = this.state;
    console.log(imageUrl)
    return (<div>
      {!loading && 
      <div style={{ marginTop: '50px' }}>
        <img src={imageUrl} alt="User profile" style={{ margin: '5px', width: '50px' }}></img>
        <form onSubmit={this.handleSubmitFileUpload} encType="multipart/form-data">
          <div className="input-container"></div>
          <input
            id="output_image"
            type="file"
            onLoad={this.previewImage}
            onChange={this.handleFileChange}
            accept="image/png, image/jpeg"
          ></input>
          <button type="submit">Save Image</button>
        </form>
      </div>}
      {loading && loading && <div>
            <img src="loading2.gif" alt="beer loading" style={{ width: '100%' }}></img>
          </div>}}
      </div>
    );
  }
}

export default withAuth(AddImage);
