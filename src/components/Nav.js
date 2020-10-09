import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavStyles = styled.nav`
  background-color: var(--red);
  display: flex;
  align-items: center;

  h1 {
    margin-left: 2rem;
    color: var(--white);
  }

  ul {
    margin-left: auto;
    list-style: none;
  }

  a {
    text-decoration: none;
    color: var(--white);
    padding: 1rem;
  }
`;

export const Nav = () => {
  return (
    <NavStyles>
      <div>
        <h1>BasquetBapp</h1>
      </div>
      <ul>
        <li>
          <Link to='/'>Home</Link>
          <Link to='/pizarra'>Pizarra</Link>
          <Link to='/estadisticas'>Estadisticas</Link>
          <Link to='/datos'>Tomar datos</Link>
          <Link to='/gestion'>Gestion jugadores</Link>
        </li>
      </ul>
    </NavStyles>
  );
};
