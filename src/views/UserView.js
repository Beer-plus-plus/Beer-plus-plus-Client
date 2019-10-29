import React from 'react';
import {withAuth} from '../Context/AuthContext';

const UserView = ({ user}) => {
  return (
    <div>
      UserView
      user: {user.username}
      
    </div>
  );
};

export default withAuth(UserView);