import axios from 'axios';

class UserService {
  constructor() {
    this.userConnect = axios.create({ baseURL: process.env.REACT_APP_BACKEND_BASE_URL, withCredentials: true });
  }

  userGetDetail(id) {
    return this.userConnect.get(`/api/user/${id}`).then(({ data: user }) => user);
  }

  async userUpdate(id, name, lastName, email) {
    try {
      await this.userConnect.put(`/api/user/${id}`, { name, lastName, email });
        } catch (error) {}
  }
}

const userService = new UserService();
export default userService;
