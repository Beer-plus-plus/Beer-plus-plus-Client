import axios from 'axios';

class UserService {
  constructor() {
    this.userConnect = axios.create({ baseURL: process.env.REACT_APP_BACKEND_BASE_URL, withCredentials: true });
  }

  userGetDetail(id) {
    return this.userConnect.get(`/api/user/${id}`).then(({ data: user }) => user);
  }

  async userUpdate(id, name, lastName, email) {
            const { data: user } = await this.userConnect.put(`/api/user/${id}`, { name, lastName, email });
            console.log(user);
    return user;
  }
}

const userService = new UserService();
export default userService;
