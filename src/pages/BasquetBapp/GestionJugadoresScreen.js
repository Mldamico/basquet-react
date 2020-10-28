import React, { useEffect } from 'react';
import { Layout } from '../../components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { getPlayers } from '../../store/actions/playerActions';
import { override } from '../../styles/PropagateLoaderOverride';
import { PropagateLoader } from 'react-spinners';
import styled from 'styled-components';
import { Player } from '../../components/Player';

const GestionStyles = styled.div`
  margin: 5rem auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 5rem;
`;

export const GestionJugadoresScreen = () => {
  const dispatch = useDispatch();
  const { players, loading, error } = useSelector((state) => state.players);
  useEffect(() => {
    dispatch(getPlayers());
    console.log(players);
  }, [dispatch]);
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
        <GestionStyles>
          {players.map((player) => (
            <Player player={player} id={player.id} />
          ))}
        </GestionStyles>
      )}
    </Layout>
  );
};
