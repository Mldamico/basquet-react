import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

export const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => {
  useEffect(() => {
    console.log(isAuthenticated);
  }, []);
  return (
    <Route
      {...rest}
      component={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to='/auth/login' />
        )
      }
    />
  );
};

PrivateRoute.prototypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
};
