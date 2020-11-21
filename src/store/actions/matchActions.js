import {
  MATCH_END,
  MATCH_ERROR,
  MATCH_LOADING,
  MATCH_REGISTER_PLAY,
  MATCH_START,
} from '../../constants/matchTypes';
import axios from 'axios';
export const startMatch = (rival, fecha, jugadoresCitados) => async (
  dispatch
) => {
  try {
    dispatch({ type: MATCH_LOADING });
    const { data } = await axios.post('http://localhost:9001/partido', {
      rival,
      fecha,
      jugadoresCitados,
    });

    dispatch({ type: MATCH_START, payload: data });
    console.log(data);
  } catch (error) {
    dispatch({
      type: MATCH_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const endMatch = (id, tanteadorEquipo, tanteadorRival) => async (
  dispatch
) => {
  try {
    dispatch({ type: MATCH_LOADING });
    await axios.put(`http://localhost:9001/registrarFinal/${id}`, {
      tanteadorEquipo,
      tanteadorRival,
    });

    dispatch({ type: MATCH_END });
  } catch (error) {
    dispatch({
      type: MATCH_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const registerPlay = (play) => async (dispatch) => {
  try {
    dispatch({ type: MATCH_LOADING });
    await axios.post(`http://localhost:9001/registrarJugada`, play);

    dispatch({ type: MATCH_REGISTER_PLAY });
  } catch (error) {
    dispatch({
      type: MATCH_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
