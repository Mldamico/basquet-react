import {
  GET_PLAYERS,
  PLAYERS_LOADING,
  PLAYERS_ERROR,
} from '../../constants/playersTypes';

export const playersReducer = (
  state = { players: [], loading: false, error: null },
  action
) => {
  switch (action.type) {
    case PLAYERS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_PLAYERS:
      return { ...state, players: action.payload, loading: false, error: null };
    case PLAYERS_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
