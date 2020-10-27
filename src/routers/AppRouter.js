import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';
import { EstadisticasScreen } from '../pages/BasquetBapp/EstadisticasScreen';
import { GestionJugadoresScreen } from '../pages/BasquetBapp/GestionJugadoresScreen';
import { HomeScreen } from '../pages/BasquetBapp/HomeScreen';
import { JugadaScreen } from '../pages/BasquetBapp/JugadaScreen';
import { JugadasScreen } from '../pages/BasquetBapp/JugadasScreen';
import { PizarraScreen } from '../pages/BasquetBapp/PizarraScreen';
import { TomarDatosScreen } from '../pages/BasquetBapp/TomarDatosScreen';
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
            path='/jugadas'
            exact
            component={JugadasScreen}
          />
          <PrivateRoute
            isAuthenticated={user}
            path='/jugadas/:id'
            exact
            component={JugadaScreen}
          />
          <PrivateRoute
            isAuthenticated={user}
            path='/pizarra'
            exact
            component={PizarraScreen}
          />
          <PrivateRoute
            isAuthenticated={user}
            path='/pizarra/edit/:id'
            exact
            component={PizarraScreen}
          />
          <PrivateRoute
            isAuthenticated={user}
            exact
            path='/gestionjugadores'
            component={GestionJugadoresScreen}
          />
          <PrivateRoute
            isAuthenticated={user}
            exact
            path='/tomardatos'
            component={TomarDatosScreen}
          />
          <PrivateRoute
            isAuthenticated={user}
            exact
            path='/estadisticas'
            component={EstadisticasScreen}
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
