import {
  PLAY_ERROR,
  PLAY_GET_ALL,
  PLAY_LOADING,
} from '../../constants/playTypes';
import axios from 'axios';
export const getPlays = () => async (dispatch) => {
  try {
    dispatch({ type: PLAY_LOADING });
    const { data } = await axios.get('http://localhost:9001/jugadas');

    dispatch({ type: PLAY_GET_ALL, payload: data });
    console.log(data);
  } catch (error) {
    dispatch({
      type: PLAY_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
