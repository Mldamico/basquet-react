import { LOGIN, LOGOUT, REGISTER } from '../../constants/authTypes';

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN:
      return { usuario: action.payload, isLogged: true };
    case LOGOUT:
      return { usuario: {}, isLogged: false };
    case REGISTER:
      return {};
    default:
      return state;
  }
};
