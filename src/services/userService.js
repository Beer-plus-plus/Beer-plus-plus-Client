import axios from 'axios';

class UserService {
  constructor() {
    this.userConnect = axios.create({ baseURL: process.env.REACT_APP_BACKEND_BASE_URL, withCredentials: true });
  }

  async userGetDetail(id) {
    const { data: user } = await this.userConnect.get(`/api/user/${id}`);
    return user;
  }

  async userUpdate(id, name, lastName, email) {
    try {
      await this.userConnect.put(`/api/user/${id}`, { name, lastName, email });
    } catch (error) {
      console.log(error);
    }
  }

  async userUpdatePass(id, oldPass, newPass) {
    try {
      await this.userConnect.put(`/api/user/${id}/changePass`, { oldPass, newPass });
    } catch (error) {
      console.log(error);
    }
  }

  errorHandler = err => {
    // console.error(err);
    throw err;
  };
  /* , uploader.single('imageUrl') */

  handleUpload(id, theFile) {
    return this.userConnect
      .put(`/api/user/${id}/upload`, theFile)
      .then(res => res.data)
      .catch(this.errorHandler);
  }
}

const userService = new UserService();
export default userService;
