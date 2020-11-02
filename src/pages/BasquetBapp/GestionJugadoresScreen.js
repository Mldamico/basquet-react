import React, { useEffect } from 'react';
import { Layout } from '../../components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { getPlayers } from '../../store/actions/playersActions';
import styled from 'styled-components';
import { Player } from '../../components/Player';
import { Message } from '../../components/Message';
import { CenterLoading } from '../../components/CenterLoading';

const GestionStyles = styled.div`
  margin: 6rem auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  max-width: 1600px;
  gap: 5rem;
  color: #fff;
`;

export const GestionJugadoresScreen = () => {
  const dispatch = useDispatch();
  const { players, loading, error, success } = useSelector(
    (state) => state.players
  );

  useEffect(() => {
    dispatch(getPlayers());
  }, [dispatch, success]);

  return (
    <Layout showGoBack>
      {loading ? (
        <CenterLoading loading={loading} />
      ) : (
        <>
          {error && <Message>{error}</Message>}
          <GestionStyles>
            {players.map((player) => (
              <Player player={player} key={player.id} />
            ))}
          </GestionStyles>
        </>
      )}
    </Layout>
  );
};
