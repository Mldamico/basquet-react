import {
  MATCH_END,
  MATCH_ERROR,
  MATCH_LOADING,
  MATCH_START,
} from '../../constants/matchTypes';

export const matchReducer = (
  state = {
    match: {},
    loading: false,
    error: null,
    success: null,
  },
  action
) => {
  switch (action.type) {
    case MATCH_LOADING:
      return {
        ...state,
        loading: true,
      };
    case MATCH_START:
      return {
        ...state,
        match: action.payload,
      };
    case MATCH_END:
      return {
        ...state,
        match: {},
      };
    case MATCH_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
