import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout } from '../../components/Layout';
import { getPlayById } from '../../store/actions/playActions';
import styled from 'styled-components';

import { storage } from '../../firebase/firebase';

const JugadaStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const AbbreviationToWord = {
  B: 'Base',
  E: 'Escolta',
  AL: 'Alero',
  P: 'Pivot',
  AP: 'Ala-Pivot',
};

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
          <h1>{play.nombreDeLaJugada}</h1>
          {/* <Player playsInline src={showVideo}>
            <ControlBar>
              <ReplayControl seconds={10} order={1.1} />
              <ForwardControl seconds={30} order={1.2} />
              <CurrentTimeDisplay order={4.1} />
              <TimeDivider order={4.2} />
              <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} order={7.1} />
              <VolumeMenuButton disabled />
            </ControlBar>
          </Player> */}
          <JugadaStyles>
            <div>
              <h2>Posicion Asistente</h2>
              {AbbreviationToWord[play.posicionAsistente]}
              <h2>Posicion Tirador</h2>
              {AbbreviationToWord[play.posicionTirador]}
            </div>

            <div>
              <video width='600' height='450' controls>
                <source src={showVideo} type='video/mp4' />
                Your browser does not support the video tag.
              </video>
            </div>
          </JugadaStyles>
        </>
      )}
    </Layout>
  );
};
