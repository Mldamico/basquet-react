import React from 'react';
import { Layout } from '../../components/Layout';
import { useForm } from '../../hooks/useForm';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { login } from '../../store/actions/authActions';

const LoginStyles = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
  fieldset {
    display: flex;
    padding-right: 2.5rem;
    flex-direction: column;
    width: 40rem;

    input {
      width: 100%;
      border-radius: 5px;
      margin: 0.5rem 0;
      padding: 0.5rem 0.5rem 1rem;
      border: 0.5px solid var(--black);
    }
  }

  .buttonContainer {
    padding: 1rem;
    display: flex;
    justify-content: flex-end;

    button {
      margin: 1rem;
    }
  }
`;

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const [values, handleInputChange, reset] = useForm({
    username: '',
    password: '',
  });
  const submitForm = (e) => {
    e.preventDefault();
    console.log(values);
    dispatch(login(values));
  };

  const { username, password } = values;
  return (
    <Layout>
      <LoginStyles onSubmit={submitForm}>
        <fieldset>
          <legend>Login</legend>
          <label htmlFor='username'>Usuario</label>
          <input
            type='text'
            name='username'
            id='username'
            value={username}
            onChange={handleInputChange}
          />
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            id='password'
            value={password}
            onChange={handleInputChange}
          />
          <div className='buttonContainer'>
            <button className='btn' onClick={reset}>
              Reset
            </button>
            <button className='btn' type='submit'>
              Login
            </button>
          </div>
        </fieldset>
      </LoginStyles>
    </Layout>
  );
};
