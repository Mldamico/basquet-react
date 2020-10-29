import {
  AUTH_ERROR,
  AUTH_LOADING,
  LOGIN,
  LOGOUT,
  REGISTER,
} from '../../constants/authTypes';

export const authReducer = (
  state = { user: null, loading: false, error: null },
  action
) => {
  switch (action.type) {
    case AUTH_LOADING:
      return {
        ...state,
        loading: true,
      };
    case LOGIN:
      return { loading: false, user: action.payload };
    case LOGOUT:
      return { loading: false, user: null };
    case REGISTER:
      return { loading: false, user: action.payload };
    case AUTH_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
