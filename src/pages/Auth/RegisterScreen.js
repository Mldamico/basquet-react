import React from 'react';
import { Layout } from '../../components/Layout';
import { useForm } from '../../hooks/useForm';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../store/actions/authActions';
import { Link } from 'react-router-dom';
import { PropagateLoader } from 'react-spinners';
import { Message } from '../../components/Message';
import { override } from '../../styles/PropagateLoaderOverride';
import { Title } from '../../components/Title';

const RegisterStyles = styled.form`
  h2 {
    color: #fff;
    margin-bottom: 3rem;
  }
  fieldset {
    color: #fff;
    border: 1px solid var(--black);
    border-radius: 10px;
    background-color: var(--red);
    width: 80%;
    margin: 0 auto;
    padding: 2rem;
    legend {
      text-align: left;
      font-weight: bold;
    }

    .register__container {
      display: flex;
      justify-content: space-around;
    }

    .register__col {
      display: flex;
      flex-direction: column;
      flex-grow: 2;
      margin: 0 5rem;
    }

    input {
      margin: 0.8rem;
    }

    button {
      background-color: var(--yellow);
      margin-top: 2rem;
      padding: 1rem 5rem;
      border: 1px solid var(--black);
    }
  }
`;

export const RegisterScreen = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [values, handleInputChange] = useForm({
    username: '',
    password: '',
    confirmPassword: '',
    dorsal: 0,
    altura: 0,
    nombre: '',
    apellido: '',
    dni: 0,
    fechaNacimiento: '',
    fileUrl: '',
  });
  const submitForm = (e) => {
    e.preventDefault();
    console.log(values);
    dispatch(register(values));
  };

  const {
    username,
    password,
    confirmPassword,
    dorsal,
    altura,
    nombre,
    apellido,
    dni,
    fechaNacimiento,
    fileUrl,
  } = values;

  const handlePictureClick = (e) => {
    e.preventDefault();
    document.querySelector('#fileSelector').click();
  };
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
        <RegisterStyles>
          <Title size={8}>BASQUETBAPP</Title>
          <h2>Formulario De Registro Nuevo Jugador</h2>

          <form onSubmit={submitForm}>
            <fieldset>
              <legend>Registrarse</legend>
              <div className='register__container'>
                <div className='register__col'>
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
                </div>
                <div className='register__col'>
                  <label htmlFor='dorsal'>Dorsal</label>
                  <input
                    type='number'
                    name='dorsal'
                    id='dorsal'
                    value={dorsal}
                    onChange={handleInputChange}
                  />
                  <label htmlFor='altura'>Altura (CM)</label>
                  <input
                    type='number'
                    name='altura'
                    id='altura'
                    value={altura}
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

                  <input
                    id='fileSelector'
                    type='file'
                    name='fileUrl'
                    style={{ display: 'none' }}
                    onChange={handleInputChange}
                  />
                  <button
                    className='btn'
                    onClick={handlePictureClick}
                    disabled={fileUrl}
                  >
                    SUBIR IMAGEN
                  </button>
                </div>
              </div>
              <div className='buttonContainer'>
                <button className='btn' type='submit'>
                  Registrarse
                </button>
              </div>
              <p>
                <span style={{ marginRight: '.5rem' }}>Ya tiene cuenta?</span>
                <Link to='/auth/login'>Inicia Sesion</Link>
              </p>
              {error && <Message BackgroundColor='#d9534f'>{error}</Message>}
            </fieldset>
          </form>
        </RegisterStyles>
      )}
    </Layout>
  );
};

{
  /* <RegisterStyles onSubmit={submitForm}>
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
</RegisterStyles> */
}
