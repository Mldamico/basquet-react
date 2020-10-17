import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';
import { HomeScreen } from '../pages/BasquetBapp/HomeScreen';
import { AuthRouter } from './AuthRouter';
import { PrivateRoute } from './PrivateRouter';
import { PublicRoute } from './PublicRouter';

export const AppRouter = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute
            isAuthenticated={user}
            path='/auth'
            component={AuthRouter}
          />

          <PrivateRoute
            isAuthenticated={user}
            exact
            path='/'
            component={HomeScreen}
          />

          <Redirect to='/auth/login' />
        </Switch>
      </div>
    </Router>
  );
};
