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

export const register = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: AUTH_LOADING });
      const { data } = await axios.post('http://localhost:9001/signup', {
        usuario: data.username,
        password: data.password,
        nombre: data.nombre,
        apellido: data.apellido,
        dorsal: data.dorsal,
        dni: data.dni,
        fechaNacimiento: data.fechaNacimiento,
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
