import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Layout } from '../../components/Layout';
import { Title } from '../../components/Title';
import { storage } from '../../firebase/firebase';
import { getPlayById } from '../../store/actions/playActions';
import ReactPlayer from 'react-player';
import { Message } from '../../components/Message';

const JugadaStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  .play__description {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
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
  const { urlDeLaJugadaGuardada } = play;
  const playId = match.params.id;
  useEffect(() => {
    dispatch(getPlayById(playId));
    const getUrl = async () => {
      const downloadUrl = await storage
        .ref(urlDeLaJugadaGuardada)
        .getDownloadURL();
      setShowVideo(downloadUrl);
    };
    getUrl();
  }, [dispatch, urlDeLaJugadaGuardada, playId]);
  return (
    <Layout>
      {loading ? (
        <p>Cargando</p>
      ) : (
        <>
          {error && <Message>{error}</Message>}
          <Title>{play.nombreDeLaJugada}</Title>

          {play ? (
            <JugadaStyles>
              <div className='play__description'>
                <div>
                  <h2>Posicion Asistente</h2>
                  {AbbreviationToWord[play.posicionAsistente]}
                </div>
                <div>
                  <h2>Posicion Tirador</h2>
                  {AbbreviationToWord[play.posicionTirador]}
                </div>

                <div>
                  <h2>Puntos</h2>
                  {play.valorDelPuntoPorDefecto}
                </div>
                <div>
                  <h2>Jugada Utilizada</h2>
                  {play.jugadaUtilizada ? 'Si' : 'No'}
                </div>
              </div>

              <div>
                <ReactPlayer muted loop controls url={showVideo} />
              </div>
            </JugadaStyles>
          ) : (
            ''
          )}
        </>
      )}
    </Layout>
  );
};
