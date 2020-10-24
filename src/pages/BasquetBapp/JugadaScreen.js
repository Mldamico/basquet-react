import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout } from '../../components/Layout';
import { getPlayById } from '../../store/actions/playActions';
import { Player } from 'video-react';

import { storage } from '../../firebase/firebase';
export const JugadaScreen = ({ match }) => {
  const dispatch = useDispatch();
  const { play, loading, error } = useSelector((state) => state.play);
  const [showVideo, setShowVideo] = useState('');
  useEffect(() => {
    dispatch(getPlayById(match.params.id));
    const getUrl = async () => {
      console.log(play.urlDeLaJugadaGuardada);
      const downloadUrl = await storage
        .ref(play.urlDeLaJugadaGuardada)
        .getDownloadURL();
      setShowVideo(downloadUrl);
    };
    getUrl();
  }, [dispatch]);
  return (
    <Layout>
      {loading ? (
        <p>Cargando</p>
      ) : (
        <>
          <p>{play.nombreDeLaJugada}</p>
          <Player playsInline src={showVideo} />
        </>
      )}
    </Layout>
  );
};
