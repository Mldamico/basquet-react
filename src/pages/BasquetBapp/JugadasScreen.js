import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PropagateLoader } from 'react-spinners';
import styled from 'styled-components';
import { Layout } from '../../components/Layout';
import { getPlays } from '../../store/actions/playActions';
import { override } from '../../styles/PropagateLoaderOverride';

const JugadasStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;

export const JugadasScreen = () => {
  const dispatch = useDispatch();
  const { error, loading, plays } = useSelector((state) => state.play);
  useEffect(() => {
    dispatch(getPlays());
  }, []);
  return (
    <Layout>
      {loading ? (
        <PropagateLoader
          css={override}
          size={15}
          color={'#FF4949'}
          loading={loading}
        />
      ) : (
        <JugadasStyles>
          {plays.map((play) => (
            <div key={play.id}>
              <h2>{play.nombreDeLaJugada}</h2>
              <p>Asistente: {play.posicionAsistente}</p>
              <p>Tirador: {play.posicionTirador}</p>
              <p>Puntos: {play.valorDelPuntoPorDefecto}</p>
            </div>
          ))}
        </JugadasStyles>
      )}
    </Layout>
  );
};
