import {
  PLAY_ADD,
  PLAY_EDIT,
  PLAY_ERROR,
  PLAY_GET_ALL,
  PLAY_LOADING,
  PLAY_REMOVE,
  PLAY_WATCH,
} from '../../constants/playTypes';

export const playReducer = (
  state = { plays: [], loading: false, error: null },
  action
) => {
  switch (action.type) {
    case PLAY_GET_ALL:
      return { ...state, loading: false, plays: action.payload };
    case PLAY_ADD:
      return {};
    case PLAY_EDIT:
      return {};
    case PLAY_WATCH:
      return {};
    case PLAY_REMOVE:
      return {};
    case PLAY_LOADING:
      return { ...state, loading: true };
    case PLAY_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
