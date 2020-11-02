import React from 'react';
import { Layout } from '../../components/Layout';
import { Title } from '../../components/Title';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { CenterLoading } from '../../components/CenterLoading';
import Unknown from '../../assets/unknown.jpg';
import Ball from '../../assets/ball.webp';
import { logout } from '../../store/actions/authActions';
import { HomeStyles } from '../../styles/HomeStyles';
export const HomeScreen = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <Layout>
      {loading ? (
        <CenterLoading />
      ) : (
        <HomeStyles>
          <button className='logout-button' onClick={logoutHandler}>
            LOGOUT
          </button>
          <Title size={7}>BASQUETBAPP</Title>
          <div className='user-data'>
            <div>
              <img
                src={user.urlFoto ? user.urlFoto : Unknown}
                alt={user.nombre}
              />
            </div>
            <h4>{user.usuario}</h4>
            <p>{user.tipo}</p>
          </div>
          <div className='centered'>
            <img src={Ball} />
          </div>
          <div className='first'>
            <Link to='/jugadas'>
              <i className='fas fa-chalkboard'></i>
              <p>Jugadas</p>
            </Link>
          </div>
          <div className='second'>
            <Link to='/estadisticas'>
              <i className='fas fa-chart-bar'></i>
              <p>Estadisticas</p>
            </Link>
          </div>
          <div className='third'>
            <Link to='/tomardatos'>
              <i className='far fa-clipboard'></i>
              <p>Tomar Datos</p>
            </Link>
          </div>
          <div className='fourth'>
            <Link to='/gestionjugadores'>
              <i className='fas fa-people-arrows'></i>
              <p>Gestion Jugadores</p>
            </Link>
          </div>
        </HomeStyles>
      )}
    </Layout>
  );
};
