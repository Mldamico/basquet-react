import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Layout } from '../../components/Layout';
import { getPlays } from '../../store/actions/playActions';
import { Link } from 'react-router-dom';
import { Search } from '../../components/Search';
import { Message } from '../../components/Message';
import { CenterLoading } from '../../components/CenterLoading';
import { Jugada } from '../../components/Jugada';

const Button = styled.button`
  margin-bottom: 5rem;
  a {
    text-decoration: none;
  }
  &:hover {
    transform: scale(1.1);
  }
`;

const JugadasStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  margin: 0 auto;
  gap: 10rem;
`;

export const JugadasScreen = () => {
  const dispatch = useDispatch();
  const { error, loading, plays } = useSelector((state) => state.play);
  useEffect(() => {
    dispatch(getPlays());
  }, [dispatch]);

  return (
    <Layout>
      {loading ? (
        <CenterLoading />
      ) : (
        <>
          <Search />
          <Button>
            <Link to={'/pizarra'}>Crear nueva Jugada</Link>
          </Button>
          {error && <Message>{error}</Message>}
          {plays.length === 0 && <h1>No se encontro ninguna jugada.</h1>}

          <JugadasStyles>
            {plays.map((play) => (
              <Jugada play={play} key={play.id} />
            ))}
          </JugadasStyles>
        </>
      )}
    </Layout>
  );
};
