import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PropagateLoader } from 'react-spinners';
import styled from 'styled-components';
import { Layout } from '../../components/Layout';
import { getPlays, removePlay } from '../../store/actions/playActions';
import { override } from '../../styles/PropagateLoaderOverride';
import { Link } from 'react-router-dom';
import { Search } from '../../components/Search';
import swal from 'sweetalert';
import { Message } from '../../components/Message';

const Button = styled.button`
  margin-bottom: 5rem;
  a {
    text-decoration: none;
  }
  &:hover {
    transform: scale(1.1);
  }
`;

const ButtonsStyles = styled.div`
  display: flex;
  flex-direction: column;

  button {
    margin: 0.5rem 0;
  }

  button:hover {
    transform: scale(1.1);
  }
`;

const JugadasStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  max-width: 70%;
  margin: 0 auto;
  gap: 10rem;

  h2 {
    background-color: var(--yellow);
    transition: all 0.2s ease-in-out;
    text-align: center;
    color: #fff;
    max-width: 60%;
    margin: 0 auto;

    &:hover {
      transform: rotate(8deg);
    }
  }

  a {
    text-decoration: none;
  }

  img {
    width: 300px;
    height: 300px;
  }
`;

export const JugadasScreen = ({ history }) => {
  const dispatch = useDispatch();
  const { error, loading, plays } = useSelector((state) => state.play);
  useEffect(() => {
    dispatch(getPlays());
  }, [dispatch]);

  const remove = (id) => {
    swal({
      title: 'Seguro que queres eliminar la jugada?',
      text: 'Una vez que hayas eliminado la jugada no podras verla nuevamente',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(removePlay(id));
        swal('Se elimino la jugada correctamente!', {
          icon: 'success',
        });
      } else {
        swal('No se elimino la jugada!');
      }
    });
  };
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
        <>
          <Search />
          <Button>
            <Link to={'/pizarra'}>Crear nueva Jugada</Link>
          </Button>
          {error && <Message>{error}</Message>}
          {plays.length === 0 && <h1>No se encontro ninguna jugada.</h1>}

          <JugadasStyles>
            {plays.map((play) => (
              <div key={play.id}>
                {!play.image ? (
                  <img
                    src={`assets/jugada2.jpeg`}
                    alt={play.nombreDeLaJugada}
                  />
                ) : (
                  <img src={play.image} alt={play.nombreDeLaJugada} />
                )}
                <Link to={`/jugadas/${play.id}`}>
                  <h2>{play.nombreDeLaJugada}</h2>
                </Link>
                <p>Asistente: {play.posicionAsistente}</p>
                <p>Tirador: {play.posicionTirador}</p>
                <p>Puntos: {play.valorDelPuntoPorDefecto}</p>
                <ButtonsStyles>
                  <button onClick={() => history.push(`/jugadas/${play.id}`)}>
                    Ver
                  </button>
                  <button
                    onClick={() => history.push(`/pizarra/edit/${play.id}`)}
                  >
                    Editar
                  </button>
                  <button onClick={() => remove(play.id)}>Eliminar</button>
                </ButtonsStyles>
              </div>
            ))}
          </JugadasStyles>
        </>
      )}
    </Layout>
  );
};
