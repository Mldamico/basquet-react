import React from 'react';
import { Layout } from '../../components/Layout';
import styled from 'styled-components';
import { Title } from '../../components/Title';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { CenterLoading } from '../../components/CenterLoading';
import Unknown from '../../assets/unknown.jpg';
import Ball from '../../assets/ball.webp';
import { logout } from '../../store/actions/authActions';
const HomeStyles = styled.div`
  height: 100vh;
  /* background-image: url('/ball.webp');
  background-size: 25%;
  background-repeat: no-repeat;
  background-position: 50% 60%; */
  position: relative;

  .centered {
    position: fixed;
    top: 55%;
    left: 50%;
    /* bring your own prefixes */
    transform: translate(-50%, -50%);

    img {
      transition: 1s all ease-in-out;
      width: 50%;
    }

    img:hover {
      transform: rotate(360deg);
    }
  }
  .user-data {
    position: absolute;
    background-color: var(--red);
    top: 30%;
    left: 5%;
    width: 25%;
    border-radius: 10px;
    border: 1px solid #fff;
    img {
      width: 80%;
      margin-top: 2rem;
    }
    h4,
    p {
      color: #fff;
    }
  }

  a {
    color: var(--red);
    text-decoration: none;
    font-size: 2.5rem;
  }

  .first p,
  .second p,
  .third p,
  .fourth p {
    padding-left: 1rem;
    color: #fff;
    display: inline-block;
    opacity: 0;
    animation-name: out;
    animation-duration: 1s;
  }

  .first,
  .second,
  .third,
  .fourth {
    &:hover {
      p {
        animation-name: in;
        animation-duration: 1s;
      }
    }
  }

  @keyframes in {
    0% {
      opacity: 0;
      transform: translateY(-100%);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes out {
    0% {
      transform: translateY(0);
      opacity: 1;
    }
    100% {
      transform: translateY(100%);
      opacity: 0;
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
  .logout-button {
    position: absolute;
    top: 2rem;
    right: 2rem;
    background-color: var(--red);
    color: #fff;
    padding: 0.5rem;
    font-weight: bold;
    font-size: 1.6rem;
  }
`;

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
