import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout } from '../../components/Layout';
import { getPlayById } from '../../store/actions/playActions';
import { Player } from 'video-react';
export const JugadaScreen = ({ match }) => {
  const dispatch = useDispatch();
  const { play, loading, error } = useSelector((state) => state.play);
  useEffect(() => {
    dispatch(getPlayById(match.params.id));
  }, []);
  return (
    <Layout>
      {loading ? (
        <p>Cargando</p>
      ) : (
        <>
          <p>{play.nombreDeLaJugada}</p>
          <Player playsInline src={play.urlDeLaJugadaGuardada} />
        </>
      )}
    </Layout>
  );
};
