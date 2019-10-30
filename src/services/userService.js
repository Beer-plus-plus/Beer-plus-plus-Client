import axios from 'axios';

class UserService {
  constructor() {
    this.userConnect = axios.create({ baseURL: process.env.REACT_APP_BACKEND_BASE_URL, withCredentials: true });
  }

  // userGetDetail(user) {
  //     console.log(user);
  //   //   return this.userconnet.get(`/api/user/${user._id}`);
  // }

  async userUpdate(id, name, lastname, email) {
    const { data: user } = await this.userConnect.put(`/api/user/${id}`, { name, lastname, email });
    return user;
  }
}

const userService = new UserService();
export default userService;
