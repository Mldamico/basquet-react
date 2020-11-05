import React from 'react';
import { Layout } from '../../components/Layout';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../store/actions/authActions';
import { Link } from 'react-router-dom';
import { PropagateLoader } from 'react-spinners';
import { Message } from '../../components/Message';
import { override } from '../../styles/PropagateLoaderOverride';
import { Title } from '../../components/Title';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { fileUpload } from '../../helpers/fileUpload';
import Swal from 'sweetalert2';
const RegisterStyles = styled.div`
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
      border-radius: 5px;
      padding: 0.5rem 1rem;
      border: 0;
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

  const formik = useFormik({
    initialValues: {
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
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, 'Tiene que tener al menos 3 caracteres')
        .required('Es obligatorio'),
      password: Yup.string()
        .min(4, 'Tiene que tener al menos 4 caracteres')
        .required('Es obligatorio'),
      confirmPassword: Yup.string()
        .min(4, 'Tiene que tener al menos 4 caracteres')
        .required('Es obligatorio'),
      dorsal: Yup.number()
        .positive('No puede ser un valor negativo')
        .max(99, 'No puede ser mayor a 99')
        .required('Es obligatorio'),
      altura: Yup.number()
        .positive('No puede ser un valor negativo')
        .max(300, 'No puede ser mayor a 300')
        .required('Es obligatorio'),
      nombre: Yup.string()
        .min(3, 'Tiene que tener al menos 3 caracteres')
        .required('Es obligatorio'),
      apellido: Yup.string()
        .min(3, 'Tiene que tener al menos 3 caracteres')
        .required('Es obligatorio'),
      dni: Yup.number()
        .positive('No puede ser un valor negativo')
        .required('Es obligatorio'),
      fechaNacimiento: Yup.date(),
      fileUrl: Yup.string(),
    }),
    onSubmit: (values) => {
      dispatch(register(values));
    },
  });

  const handlePictureUpload = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      Swal.fire({
        title: 'Uploading',
        text: 'Please wait...',
        allowOutsideClick: false,
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });
      const file_url = await fileUpload(file);
      console.log(file_url);

      formik.setFieldValue('fileUrl', file_url);

      Swal.close();
    }
  };

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

          <form onSubmit={formik.handleSubmit}>
            <fieldset>
              <legend>Registrarse</legend>
              <div className='register__container'>
                <div className='register__col'>
                  <label htmlFor='username'>Usuario</label>
                  <input
                    type='text'
                    name='username'
                    id='username'
                    value={formik.values.username}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    className={
                      formik.errors.username && formik.touched.username
                        ? 'error'
                        : ''
                    }
                  />
                  {formik.errors.username && formik.touched.username ? (
                    <Message>{formik.errors.username}</Message>
                  ) : null}
                  <label htmlFor='password'>Password</label>
                  <input
                    type='password'
                    name='password'
                    id='password'
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    className={
                      formik.errors.password && formik.touched.password
                        ? 'error'
                        : ''
                    }
                  />
                  {formik.errors.password && formik.touched.password ? (
                    <Message>{formik.errors.password}</Message>
                  ) : null}
                  <label htmlFor='confirmPassword'>Confirm Password</label>
                  <input
                    type='password'
                    name='confirmPassword'
                    id='confirmPassword'
                    value={formik.values.confirmPassword}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    className={
                      formik.errors.confirmPassword &&
                      formik.touched.confirmPassword
                        ? 'error'
                        : ''
                    }
                  />
                  {formik.errors.confirmPassword &&
                  formik.touched.confirmPassword ? (
                    <Message>{formik.errors.confirmPassword}</Message>
                  ) : null}
                  <label htmlFor='nombre'>Nombre</label>
                  <input
                    type='text'
                    name='nombre'
                    id='nombre'
                    value={formik.values.nombre}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    className={
                      formik.errors.nombre && formik.touched.nombre
                        ? 'error'
                        : ''
                    }
                  />
                  {formik.errors.nombre && formik.touched.nombre ? (
                    <Message>{formik.errors.nombre}</Message>
                  ) : null}
                  <label htmlFor='apellido'>Apellido</label>
                  <input
                    type='text'
                    name='apellido'
                    id='apellido'
                    value={formik.values.apellido}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    className={
                      formik.errors.apellido && formik.touched.apellido
                        ? 'error'
                        : ''
                    }
                  />
                  {formik.errors.apellido && formik.touched.apellido ? (
                    <Message>{formik.errors.apellido}</Message>
                  ) : null}
                </div>
                <div className='register__col'>
                  <label htmlFor='dorsal'>Dorsal</label>
                  <input
                    type='number'
                    name='dorsal'
                    id='dorsal'
                    value={formik.values.dorsal}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    className={
                      formik.errors.dorsal && formik.touched.dorsal
                        ? 'error'
                        : ''
                    }
                  />
                  {formik.errors.dorsal && formik.touched.dorsal ? (
                    <Message>{formik.errors.dorsal}</Message>
                  ) : null}
                  <label htmlFor='altura'>Altura (CM)</label>
                  <input
                    type='number'
                    name='altura'
                    id='altura'
                    value={formik.values.altura}
                    onChange={formik.handleChange}
                    className={
                      formik.errors.altura && formik.touched.altura
                        ? 'error'
                        : ''
                    }
                  />
                  {formik.errors.altura && formik.touched.altura ? (
                    <div>{formik.errors.altura}</div>
                  ) : null}
                  <label htmlFor='dni'>DNI</label>
                  <input
                    type='number'
                    name='dni'
                    id='dni'
                    value={formik.values.dni}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    className={
                      formik.errors.dni && formik.touched.dni ? 'error' : ''
                    }
                  />
                  {formik.errors.dni && formik.touched.dni ? (
                    <Message>{formik.errors.dni}</Message>
                  ) : null}
                  <label htmlFor='fechaNacimiento'>Fecha de nacimiento</label>
                  <input
                    type='date'
                    name='fechaNacimiento'
                    id='fechaNacimiento'
                    value={formik.values.fechaNacimiento}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    className={
                      formik.errors.fechaNacimiento &&
                      formik.touched.fechaNacimiento
                        ? 'error'
                        : ''
                    }
                  />
                  {formik.errors.fechaNacimiento &&
                  formik.touched.fechaNacimiento ? (
                    <Message>{formik.errors.fechaNacimiento}</Message>
                  ) : null}
                  <input
                    id='fileSelector'
                    type='file'
                    name='fileUrl'
                    style={{ display: 'none' }}
                    value={formik.fileUrl}
                    onChange={handlePictureUpload}
                  />
                  <button
                    className='btn'
                    onClick={handlePictureClick}
                    disabled={formik.fileUrl}
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
