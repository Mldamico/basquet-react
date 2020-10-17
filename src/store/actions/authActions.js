import axios from 'axios';
import { LOGIN, REGISTER } from '../../constants/authTypes';
export const login = (data) => {
  return async (dispatch) => {
    const resp = await axios.post('http://localhost:9001/login', {
      usuario: data.username,
      password: data.password,
    });

    dispatch({ type: LOGIN, payload: resp.data });
    localStorage.setItem('user', JSON.stringify(resp.data));
  };
};

export const register = (data) => {
  return async (dispatch) => {
    const resp = await axios.post('http://localhost:9001/signup', {
      usuario: data.username,
      password: data.password,
      nombre: data.nombre,
      apellido: data.apellido,
      dorsal: data.dorsal,
      dni: data.dni,
      fechaNacimiento: data.fechaNacimiento,
    });

    dispatch({ type: REGISTER, payload: resp.data });
    localStorage.setItem('user', JSON.stringify(resp.data));
  };
};
