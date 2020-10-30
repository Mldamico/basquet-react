import React from 'react';
import { Layout } from '../../components/Layout';
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/actions/authActions';
import { Link } from 'react-router-dom';
import { PropagateLoader } from 'react-spinners';
import { LoginStyles } from '../../styles/LoginStyles';
import { Message } from '../../components/Message';
import { override } from '../../styles/PropagateLoaderOverride';
import { Title } from '../../components/Title';

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [values, handleInputChange] = useForm({
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
      {loading ? (
        <PropagateLoader
          css={override}
          size={15}
          color={'#FF4949'}
          loading={loading}
        />
      ) : (
        <LoginStyles>
          <div className='heading'>
            <Title size={5}>BASQUETBAPP</Title>

            <ul>
              <li>Pizarra Electronica</li>
              <li>Estadisticas</li>
              <li>Toma De Datos En Tiempo Real</li>
              <li>Gestion De Jugadores</li>
            </ul>

            <h2>La APP de tu equipo</h2>
          </div>

          <form onSubmit={submitForm}>
            <fieldset>
              <legend>Iniciar Sesion</legend>
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
                <button className='btn' type='submit'>
                  Login
                </button>
              </div>
              <p>
                <span style={{ marginRight: '.5rem' }}>
                  Necesita crear una cuenta?
                </span>
                <Link to='/auth/register'>Registrarse</Link>
              </p>
              {error && <Message BackgroundColor='#d9534f'>{error}</Message>}
            </fieldset>
          </form>
        </LoginStyles>
      )}
    </Layout>
  );
};
