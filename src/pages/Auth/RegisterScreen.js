import React from 'react';
import { Layout } from '../../components/Layout';
import { useForm } from '../../hooks/useForm';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { login } from '../../store/actions/authActions';
import { Link } from 'react-router-dom';
const RegisterStyles = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  fieldset {
    display: flex;
    padding-right: 2.5rem;
    flex-direction: column;
    width: 45rem;

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

export const RegisterScreen = () => {
  const dispatch = useDispatch();
  const [values, handleInputChange] = useForm({
    username: '',
    password: '',
    confirmPassword: '',
    dorsal: 0,
    nombre: '',
    apellido: '',
    dni: 0,
    fechaNacimiento: '',
  });
  const submitForm = (e) => {
    e.preventDefault();
    console.log(values);
    dispatch(login(values));
  };

  const {
    username,
    password,
    confirmPassword,
    dorsal,
    nombre,
    apellido,
    dni,
    fechaNacimiento,
  } = values;
  return (
    <Layout>
      <RegisterStyles onSubmit={submitForm}>
        <fieldset>
          <legend>Registrarse</legend>
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
          <label htmlFor='confirmPassword'>Confirm Password</label>
          <input
            type='password'
            name='confirmPassword'
            id='confirmPassword'
            value={confirmPassword}
            onChange={handleInputChange}
          />
          <label htmlFor='nombre'>Nombre</label>
          <input
            type='text'
            name='nombre'
            id='nombre'
            value={nombre}
            onChange={handleInputChange}
          />
          <label htmlFor='nombre'>Apellido</label>
          <input
            type='text'
            name='apellido'
            id='apellido'
            value={apellido}
            onChange={handleInputChange}
          />
          <label htmlFor='dorsal'>Dorsal</label>
          <input
            type='number'
            name='dorsal'
            id='dorsal'
            value={dorsal}
            onChange={handleInputChange}
          />
          <label htmlFor='dni'>DNI</label>
          <input
            type='number'
            name='dni'
            id='dni'
            value={dni}
            onChange={handleInputChange}
          />
          <label htmlFor='fechaNacimiento'>Fecha de nacimiento</label>
          <input
            type='date'
            name='fechaNacimiento'
            id='fechaNacimiento'
            value={fechaNacimiento}
            onChange={handleInputChange}
          />
          <div className='buttonContainer'>
            <button className='btn' type='submit'>
              Registrarse
            </button>
          </div>
          Ya tiene una cuenta? <Link to='/auth/login'>Iniciar sesion</Link>
        </fieldset>
      </RegisterStyles>
    </Layout>
  );
};
