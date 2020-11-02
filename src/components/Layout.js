import React from 'react';
import { Nav } from './Nav';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { logout } from '../store/actions/authActions';

const LayoutStyles = styled.div`
  /* width: 1600px; */
  max-height: 100px;
  /* height: 100vh; */
  text-align: center;
  margin: 0 auto;

  .logout-button {
    position: fixed;
    top: 2rem;
    right: 2rem;
    background-color: var(--red);
    color: #fff;
    padding: 0.5rem;
    font-weight: bold;
    font-size: 1.6rem;
  }
`;
export const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <>
      {/* <Nav /> */}
      <LayoutStyles>
        <button className='logout-button' onClick={logoutHandler}>
          LOGOUT
        </button>
        {children}
      </LayoutStyles>
    </>
  );
};
