import { LOGIN, LOGOUT, REGISTER } from '../../constants/authTypes';

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN:
      return { usuario: action.payload };
    case LOGOUT:
      return {};
    case REGISTER:
      return {};
    default:
      return state;
  }
};
