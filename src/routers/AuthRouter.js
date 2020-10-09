import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { LoginScreen } from '../pages/Auth/LoginScreen';
import { RegisterScreen } from '../pages/Auth/RegisterScreen';

export const AuthRouter = () => {
  return (
    <div className='auth__main'>
      <div className='auth__box-container'>
        <Switch>
          <Route exact path='/auth/login'>
            <LoginScreen />
          </Route>

          <Route exact path='/auth/register'>
            <RegisterScreen />
          </Route>
          <Redirect to='/auth/login' />
        </Switch>
      </div>
    </div>
  );
};
