import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store/actions/authActions';
const NavStyles = styled.nav`
  h1 {
    margin-left: 2rem;
    color: var(--white);
  }

  ul {
    /* margin-left: auto; */
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--red);
    margin: 0;
  }

  a {
    text-decoration: none;
    padding: 1rem;
    color: var(--white);
  }

  img {
    width: 100px;
  }
`;

export const Nav = () => {
  const dispatch = useDispatch();
  const logoutUser = () => {
    dispatch(logout());
  };
  return (
    <NavStyles>
      <ul>
        <li>
          <Link to='/jugadas'>Jugadas</Link>
        </li>
        <li>
          <Link to='/estadisticas'>Estadisticas</Link>
        </li>
        <li>
          <Link to='/home'>
            <img src='/pelota.png' alt='Pelota de basquet' />
          </Link>
        </li>
        <li>
          <Link to='/datos'>Datos</Link>
        </li>
        <li>
          <Link to='/gestionjugadores'>Gestion</Link>
        </li>
        <li>
          <button onClick={logoutUser}>Logout</button>
        </li>
      </ul>
    </NavStyles>
  );
};
