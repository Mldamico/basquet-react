import React from 'react';
import { Nav } from './Nav';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/actions/authActions';
import { useHistory } from 'react-router-dom';

const LayoutStyles = styled.div`
  max-height: 100px;
  text-align: center;
  margin: 0 auto;

  .back-button,
  .logout-button {
    position: fixed;
    background-color: var(--red);
    color: #fff;
    padding: 0.5rem;
    font-weight: bold;
    font-size: 1.6rem;
  }

  .back-button {
    top: 2rem;
    left: 2rem;
    i {
      margin-right: 1rem;
    }
  }
  .logout-button {
    top: 2rem;
    right: 2rem;
    i {
      margin-left: 1rem;
    }
  }
`;
export const Layout = ({ children, showGoBack }) => {
  let history = useHistory();
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);
  const logoutHandler = () => {
    console.log('ckick');
    dispatch(logout());
  };
  return (
    <>
      <LayoutStyles>
        {showGoBack && (
          <button className='back-button' onClick={() => history.goBack()}>
            <i className='fas fa-arrow-left'></i>Volver
          </button>
        )}
        {user && (
          <button className='logout-button' onClick={logoutHandler}>
            LOGOUT <i className='fas fa-door-open'></i>
          </button>
        )}
        {children}
      </LayoutStyles>
    </>
  );
};
