import React from 'react';
import { Layout } from '../../components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/actions/authActions';
import { Link } from 'react-router-dom';
import { PropagateLoader } from 'react-spinners';
import { LoginStyles } from '../../styles/LoginStyles';
import { Message } from '../../components/Message';
import { override } from '../../styles/PropagateLoaderOverride';
import { Title } from '../../components/Title';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, 'Tiene que tener al menos 3 caracteres')
        .required('Es obligatorio'),
      password: Yup.string()
        .min(4, 'Tiene que tener al menos 4 caracteres')
        .required('Es obligatorio'),
    }),
    onSubmit: (values) => {
      console.log(values);
      console.log(formik);
      dispatch(login(values));
    },
  });

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

          <form onSubmit={formik.handleSubmit}>
            <fieldset>
              <legend>Iniciar Sesion</legend>
              <label htmlFor='username'>Usuario</label>
              <input
                type='text'
                name='username'
                id='username'
                value={formik.values.username}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                className={formik.errors.username ? 'error' : ''}
              />
              <div style={{ position: 'relative' }}>
                {formik.touched.username && formik.errors.username ? (
                  <div className='error-message'>
                    <Message BackgroundColor='#d9534f'>
                      {formik.errors.username}
                    </Message>
                  </div>
                ) : null}
              </div>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                name='password'
                id='password'
                value={formik.values.password}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                className={formik.errors.password ? 'error' : ''}
              />
              <div style={{ position: 'relative' }}>
                {formik.touched.password && formik.errors.password ? (
                  <div className='error-message'>
                    <Message BackgroundColor='#d9534f'>
                      {formik.errors.password}
                    </Message>
                  </div>
                ) : null}
              </div>
              <div className='buttonContainer'>
                <button
                  className='btn'
                  type='submit'
                  disabled={!formik.isValid}
                >
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
