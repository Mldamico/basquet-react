import React from 'react';
import { Layout } from '../../components/Layout';
import styled from 'styled-components';
import { Title } from '../../components/Title';
import { Link } from 'react-router-dom';

const LoginStyles = styled.div`
  height: 100vh;
  background-image: url('/ball.webp');
  background-size: 25%;
  background-repeat: no-repeat;
  background-position: 50% 60%;
  position: relative;

  a {
    color: var(--red);
    text-decoration: none;
    font-size: 2.5rem;
  }

  p {
    padding-left: 1rem;
    display: inline-block;
    opacity: 0;
    transform: translateX(-50%);
    transition: all 0.5s ease-in;
  }

  .first,
  .second,
  .third,
  .fourth {
    &:hover {
      p {
        transform: translateX(0);
        opacity: 1;
      }
    }
  }

  i {
    font-size: 5rem;
  }

  .first {
    position: absolute;
    top: 32%;
    left: 63%;
  }
  .second {
    position: absolute;
    top: 46%;
    left: 68%;
  }

  .third {
    position: absolute;
    top: 59%;
    left: 68%;
  }

  .fourth {
    position: absolute;
    top: 71%;
    left: 63%;
  }
`;

export const HomeScreen = () => {
  return (
    <Layout>
      <LoginStyles>
        <Title size={7}>BASQUETBAPP</Title>
        <div className='first'>
          <Link to='/jugadas'>
            <i class='fas fa-chalkboard'></i>
            <p>Jugadas</p>
          </Link>
        </div>
        <div className='second'>
          <Link to='/estadisticas'>
            <i class='fas fa-chart-bar'></i>
            <p>Estadisticas</p>
          </Link>
        </div>
        <div className='third'>
          <Link to='/datos'>
            <i class='far fa-clipboard'></i>
            <p>Tomar Datos</p>
          </Link>
        </div>
        <div className='fourth'>
          <Link to='/gestionjugadores'>
            <i class='fas fa-people-arrows'></i>
            <p>Gestion Jugadores</p>
          </Link>
        </div>
      </LoginStyles>
    </Layout>
  );
};
