import React from 'react';
import { Layout } from '../../components/Layout';
import { Title } from '../../components/Title';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CenterLoading } from '../../components/CenterLoading';
import Unknown from '../../assets/unknown.jpg';
import Ball from '../../assets/ball.webp';
import { HomeStyles } from '../../styles/HomeStyles';
import { useEffect } from 'react';
import { getPlayers } from '../../store/actions/playersActions';

export const HomeScreen = () => {
  const { user, loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(getPlayers());
  }, [dispatch]);

  return (
    <Layout>
      {loading ? (
        <CenterLoading />
      ) : (
        <HomeStyles>
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
