import axios from 'axios';
import {
  AUTH_ERROR,
  AUTH_LOADING,
  LOGIN,
  REGISTER,
} from '../../constants/authTypes';

export const login = (user) => {
  return async (dispatch) => {
    try {
      dispatch({ type: AUTH_LOADING });
      const { data } = await axios.post('http://localhost:9001/login', {
        usuario: user.username,
        password: user.password,
      });

      dispatch({ type: LOGIN, payload: data });
      localStorage.setItem('user', JSON.stringify(data));
    } catch (error) {
      console.log(error);
      dispatch({
        type: AUTH_ERROR,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const register = (user) => {
  return async (dispatch) => {
    try {
      dispatch({ type: AUTH_LOADING });
      const { data } = await axios.post('http://localhost:9001/signup', {
        usuario: user.username,
        password: user.password,
        nombre: user.nombre,
        apellido: user.apellido,
        dorsal: user.dorsal,
        dni: user.dni,
        fechaNacimiento: user.fechaNacimiento,
      });

      dispatch({ type: REGISTER, payload: data });
      localStorage.setItem('user', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: AUTH_ERROR,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};
