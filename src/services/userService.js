import axios from 'axios';

class UserService {
    constructor (){
        this.userConnect= axios.create({baseURL: process.env.REACT_APP_BACKEND_BASE_URL, withCredentials: true});
    }

   userGetDetails(){
    return this.userConnect.get('/api/user/')
   }
}



export default userService;