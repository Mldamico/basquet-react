import axios from 'axios';
import {
  GET_PLAYERS,
  PLAYERS_LOADING,
  PLAYERS_ERROR,
} from '../../constants/playersTypes';

export const getPlayers = () => async (dispatch) => {
  try {
    dispatch({ type: PLAYERS_LOADING });
    const { data } = await axios.get('http://localhost:9001/jugadoresAll');

    dispatch({ type: GET_PLAYERS, payload: data });
    console.log('entro aca');
    console.log(data);
  } catch (error) {
    dispatch({
      type: PLAYERS_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
