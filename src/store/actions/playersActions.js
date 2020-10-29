import axios from 'axios';
import {
  GET_PLAYERS,
  PLAYERS_LOADING,
  PLAYERS_ERROR,
  PLAYERS_DEACTIVATE_PLAYER,
  PLAYERS_ACTIVATE_PLAYER,
} from '../../constants/playersTypes';

export const getPlayers = () => async (dispatch) => {
  try {
    dispatch({ type: PLAYERS_LOADING });
    const { data } = await axios.get('http://localhost:9001/jugadoresAll');

    dispatch({ type: GET_PLAYERS, payload: data });
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

export const removePlayerFromTeam = (playerId, idAsistente) => async (
  dispatch
) => {
  try {
    dispatch({ type: PLAYERS_LOADING });
    await axios.put(`http://localhost:9001/baja/${playerId}`, {
      usuario: idAsistente,
    });

    dispatch({ type: PLAYERS_DEACTIVATE_PLAYER });
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

export const ActivatePlayerOnTeam = (playerId, idAsistente) => async (
  dispatch
) => {
  try {
    dispatch({ type: PLAYERS_LOADING });
    await axios.put(`http://localhost:9001/alta/${playerId}`, {
      usuario: idAsistente,
    });

    dispatch({ type: PLAYERS_ACTIVATE_PLAYER });
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
