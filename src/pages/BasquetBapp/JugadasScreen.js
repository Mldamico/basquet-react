import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PropagateLoader } from 'react-spinners';
import styled from 'styled-components';
import { Layout } from '../../components/Layout';
import { getPlays } from '../../store/actions/playActions';
import { override } from '../../styles/PropagateLoaderOverride';
import { Link } from 'react-router-dom';

const JugadasStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  max-width: 70%;
  margin: 0 auto;
  gap: 10rem;

  h2 {
    background-color: var(--yellow);
    transform: rotate(8deg) translateY(-3rem);
    text-align: center;
    color: #fff;
    max-width: 60%;
    margin: 0 auto;
  }

  img {
    width: 300px;
    height: 300px;
  }
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
              {!play.image ? (
                <img src={`assets/jugada2.jpeg`} alt={play.nombreDeLaJugada} />
              ) : (
                <img src={play.image} alt={play.nombreDeLaJugada} />
              )}
              <Link to={`/jugadas/${play.id}`}>
                <h2>{play.nombreDeLaJugada}</h2>
              </Link>
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
