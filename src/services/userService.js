import axios from 'axios';

class UserService {
  constructor() {
    this.userConnect = axios.create({ baseURL: process.env.REACT_APP_BACKEND_BASE_URL, withCredentials: true });
  }

  // userGetDetail(user) {
  //     console.log(user);
  //   //   return this.userconnet.get(`/api/user/${user._id}`);
  // }

  userUpdate(id,username, name, lastname, email){
    console.log(id);
   return this.userConnect.put(`/api/user/${id}`,{username, name, lastname, email})
   .then(({data:user})=> user)
  }
  
}



const userService = new UserService();
export default userService;
