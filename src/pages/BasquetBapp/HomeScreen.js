import React from 'react';
import { Layout } from '../../components/Layout';
import { Title } from '../../components/Title';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CenterLoading } from '../../components/CenterLoading';
import Unknown from '../../assets/unknown.jpg';
import Ball from '../../assets/ball.webp';
import { HomeStyles } from '../../styles/HomeStyles';

export const HomeScreen = () => {
  const { user, loading } = useSelector((state) => state.auth);

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
            <p>
              {user.tipo} {user.tipo === 'Entrenador' && `- ${user.matricula}`}
            </p>
          </div>
          <div className='centered'>
            <img src={Ball} alt='Ball' />
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
