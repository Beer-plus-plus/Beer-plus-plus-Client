import React from 'react';
import './reset.css';
import './normalizer.css';
import './App.css';

import { BrowserRouter as Router } from 'react-router-dom';

import UserView from './views/privateViews/UserViews';
import Login from './views/auth/Login';
import Signup from './views/auth/Signup';
import { withAuth } from './Context/AuthContext';

import PrivateRoute from './components/PrivateRoute';
import AnonRoute from './components/AnonRoute';

const App = () => {
 
    return (
      <div className="container">
        <Router>
          {/* <AnonRoute exact path="/login" component={Login} /> */}
          <AnonRoute exact path="/" component={Login} />
          <AnonRoute exact path="/signup" component={Signup} />
          <PrivateRoute exact path="/user" component={UserView} />
        </Router>
      </div>
    );
  }


export default withAuth(App);
