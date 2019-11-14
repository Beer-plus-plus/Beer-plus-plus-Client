import React from 'react';
import { withAuth } from '../Context/AuthContext';

const Logout = props => {
  props.handleLogout();
  return <> </>;
};

export default withAuth(Logout);
