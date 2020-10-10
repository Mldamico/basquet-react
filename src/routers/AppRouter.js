import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';
import { HomeScreen } from '../pages/BasquetBapp/HomeScreen';
import { autoLogin } from '../store/actions/authActions';
import { AuthRouter } from './AuthRouter';
import { PrivateRoute } from './PrivateRouter';
import { PublicRoute } from './PublicRouter';

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { isLogged } = useSelector((state) => state.authReducer);

  useEffect(() => {
    dispatch(autoLogin());
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute
            isAuthenticated={isLogged}
            path='/auth'
            component={AuthRouter}
          />

          <PrivateRoute
            isAuthenticated={isLogged}
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
