import React, { Component, createContext, useState, useEffect } from 'react';
import propTypes from 'prop-types';

import authService from '../services/authService';

const AuthContext = createContext();

const { Provider } = AuthContext;

const AuthConsumer = AuthContext.Consumer;

export const withAuth = Comp =>
  class WithAuth extends Component {
    render() {
      return (
        <AuthConsumer>
          {({ isLoading, isLoggedin, user, beersApi, handleLogin, handleLogout, handleSignup }) => (
            <Comp
              {...this.props}
              isLoading={isLoading}
              isLoggedin={isLoggedin}
              user={user}
              beersApi={beersApi}
              handleLogin={handleLogin}
              handleLogout={handleLogout}
              handleSignup={handleSignup}
            />
          )}
        </AuthConsumer>
      );
    }
  };

export default AuthProvider = ({ children }) => {
  state = {
    isLoggedin: false,
    user: undefined,
    isLoading: true,
  };

  const [isLoggein, setIsLoggein] = useState(false);
  const [user, setUser] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    authService
      .me()
      .then(user => {
        setIsLoggein(true);
        setUser({ ...user });
        setIsLoading(false);

        console.log('me', user);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  // componentDidMount() {
  //   authService
  //     .me()
  //     .then(user => {
  //       this.setState({
  //         isLoggedin: true,
  //         user,
  //         isLoading: false,
  //       });
  //       console.log('me', user);
  //     })
  //     .catch(() => {
  //       this.setState({
  //         isLoading: false,
  //       });
  //     });
  // }

  const handleLogin = user => {
    authService
      .login(user)
      .then(loggedUser => {
        this.setState({
          isLoggedin: true,
          user: loggedUser,
          isLoading: false,
        });
      })
      .catch(() => {
        this.setState({
          isLoading: false,
        });
      });
  };

  const handleSignup = user => {
    authService
      .signup(user)
      .then(loggedUser => {
        this.setState({
          isLoggedin: true,
          user: loggedUser,
          isLoading: false,
        });
      })
      .catch(() => {
        this.setState({
          isLoading: false,
        });
      });
  };

  const handleLogout = () => {
    this.setState({
      isLoading: true,
    });
    authService
      .logout()
      .then(() => {
        this.setState({
          isLoggedin: false,
          user: undefined,
          isLoading: false,
        });
      })
      .catch(() => {
        this.setState({
          isLoading: false,
          isLoggedin: false,
          user: undefined,
        });
      });
  };

  // render() {
  // const { isLoading, isLoggedin, user } = this.state;

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <Provider
      value={{
        isLoading,
        isLoggedin,
        user,
        handleLogin,
        handleLogout,
        handleSignup,
      }}
    >
      {children}
    </Provider>
  );
  // }
};

AuthContext.propTypes = {
  children: propTypes.element.isRequired,
};
