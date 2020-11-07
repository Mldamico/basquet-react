import {
  MATCH_ERROR,
  MATCH_LOADING,
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
