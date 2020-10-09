import axios from 'axios';
export const login = (data) => {
  return async (dispatch) => {
    const resp = await axios.post('http://localhost:9001/login', {
      usuario: data.username,
      password: data.password,
    });
    console.log(resp);
  };
};
