import {
  PLAY_ADD,
  PLAY_EDIT,
  PLAY_ERROR,
  PLAY_GET_ALL,
  PLAY_GET_BY_ID,
  PLAY_LOADING,
  PLAY_REMOVE,
} from '../../constants/playTypes';

export const playReducer = (
  state = { plays: [], play: {}, loading: false, success: null, error: null },
  action
) => {
  switch (action.type) {
    case PLAY_GET_ALL:
      return { ...state, loading: false, plays: action.payload, success: true };
    case PLAY_GET_BY_ID:
      return { ...state, loading: false, play: action.payload, success: true };

    case PLAY_ADD:
      return { ...state, success: true };
    case PLAY_EDIT:
      return { ...state, success: true };
    case PLAY_REMOVE:
      return { ...state, loading: false, success: true };
    case PLAY_LOADING:
      return { ...state, loading: true };
    case PLAY_ERROR:
      return { ...state, loading: false, error: action.payload, sucess: false };
    default:
      return state;
  }
};
