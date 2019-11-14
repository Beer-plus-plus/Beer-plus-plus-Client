import React from 'react';
import './reset.css';
import './normalizer.css';
import './App.css';

import { BrowserRouter as Router } from 'react-router-dom';

import UserView from './views/privateViews/UserViews';
import BeersView from './views/privateViews/BeersView';
import CentralView from './views/privateViews/CentralView';
import Login from './views/auth/Login';
import Signup from './views/auth/Signup';
import BeerApiDetail from './components/BeerApiDetail';
import Logout from './components/Logout';
import { withAuth } from './Context/AuthContext';

import PrivateRoute from './components/PrivateRoute';
import AnonRoute from './components/AnonRoute';

const App = () => {
  return (
    <div className="container">
      <Router>
        <AnonRoute exact path="/" component={Login} />
        <AnonRoute exact path="/login" component={Login} />
        <AnonRoute exact path="/signup" component={Signup} />
        <PrivateRoute exact path="/user" component={UserView} />
        <PrivateRoute exact path="/beers/:page" component={BeersView} />
        <PrivateRoute exact path="/central" component={CentralView} />
        <PrivateRoute exact path="/beers/api/:id/:page" component={BeerApiDetail}/>
        <PrivateRoute exact path="/logout" component={Logout}/>
      </Router>
    </div>
  );
};

export default withAuth(App);
