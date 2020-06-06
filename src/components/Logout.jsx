import React from 'react';
import { withAuth } from '../Context/AuthContext';

const Logout = ({ handleLogout }) => {
  handleLogout();
  return <> </>;
};

export default withAuth(Logout);
