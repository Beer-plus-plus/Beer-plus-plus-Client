import React from 'react';
import PropTypes from 'prop-types';
import { withAuth } from '../Context/AuthContext';

function Logout({ handleLogout }) {
  handleLogout();
  return <> </>;
}

Logout.propTypes = {
  handleLogout: PropTypes.function().isRequired,
};

export default withAuth(Logout);
