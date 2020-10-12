import axios from 'axios';
import { LOGIN } from '../../constants/authTypes';
export const login = (data) => {
  return async (dispatch) => {
    const resp = await axios.post('http://localhost:9001/login', {
      usuario: data.username,
      password: data.password,
    });
    localStorage.setItem('user', JSON.stringify(resp.data));
    dispatch({ type: LOGIN, payload: resp.data });
  };
};
