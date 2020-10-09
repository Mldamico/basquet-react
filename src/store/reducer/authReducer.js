import { LOGIN, LOGOUT, REGISTER } from '../../constants/authTypes';

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN:
      return {};
    case LOGOUT:
      return {};
    case REGISTER:
      return {};
    default:
      return state;
  }
};
