import {
  PLAY_ADD,
  PLAY_ERROR,
  PLAY_GET_ALL,
  PLAY_LOADING,
  PLAY_GET_BY_ID,
  PLAY_EDIT,
  PLAY_REMOVE,
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

export const getPlayById = (id) => async (dispatch) => {
  try {
    dispatch({ type: PLAY_LOADING });
    const { data } = await axios.get(`http://localhost:9001/jugada/${id}`);

    dispatch({ type: PLAY_GET_BY_ID, payload: data });
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

export const createPlay = (play) => async (dispatch) => {
  try {
    dispatch({ type: PLAY_LOADING });
    const { data } = await axios.post(
      'http://localhost:9001/crearJugada',
      play
    );

    dispatch({ type: PLAY_ADD, payload: data });
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

export const searchPlays = (nombreJugada) => async (dispatch) => {
  try {
    dispatch({ type: PLAY_LOADING });
    const { data } = await axios.post('http://localhost:9001/search', {
      nombreJugada,
    });

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

export const editPlay = (play, id) => async (dispatch) => {
  try {
    dispatch({ type: PLAY_LOADING });
    const { data } = await axios.put(
      `http://localhost:9001/editarJugada/${id}`,
      play
    );

    dispatch({ type: PLAY_EDIT, payload: data });
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

export const removePlay = (id) => async (dispatch) => {
  try {
    dispatch({ type: PLAY_LOADING });
    const { data } = await axios.put(
      `http://localhost:9001/eliminarJugada/${id}`,
      {}
    );

    dispatch({ type: PLAY_REMOVE, payload: data });
    dispatch(getPlays());
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
