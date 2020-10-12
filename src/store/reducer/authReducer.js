import { LOGIN, LOGOUT, REGISTER } from '../../constants/authTypes';

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN:
      return { user: action.payload, isLogged: true };
    case LOGOUT:
      return { user: {}, isLogged: false };
    case REGISTER:
      return {};
    default:
      return state;
  }
};
