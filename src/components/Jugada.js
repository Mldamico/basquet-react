import React from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';
import { removePlay } from '../store/actions/playActions';
import userEvent from '@testing-library/user-event';

const JugadaStyles = styled.div`
  background-color: var(--red);
  border-radius: 10px;
  padding: 3rem;
  color: #fff;
  h2 {
    background-color: var(--yellow);
    transition: all 0.2s ease-in-out;
    text-align: center;
    color: #fff;
    max-width: 60%;
    margin: 0 auto;
    margin-bottom: 2rem;

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

const ButtonsStyles = styled.div`
  display: flex;
  flex-direction: column;

  button {
    margin: 0.5rem 0;
    background-color: var(--yellow);
  }

  button:hover {
    transform: scale(1.1);
  }
`;

export const Jugada = ({ play }) => {
  let history = useHistory();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
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
    <JugadaStyles>
      <Link to={`/jugadas/${play.id}`}>
        <h2>{play.nombreDeLaJugada}</h2>
      </Link>
      {!play.image ? (
        <img src={`assets/jugada2.jpeg`} alt={play.nombreDeLaJugada} />
      ) : (
        <img src={play.image} alt={play.nombreDeLaJugada} />
      )}

      <p>Asistente: {play.posicionAsistente}</p>
      <p>Tirador: {play.posicionTirador}</p>
      <p>Puntos: {play.valorDelPuntoPorDefecto}</p>
      <ButtonsStyles>
        <button onClick={() => history.push(`/jugadas/${play.id}`)}>Ver</button>
        {user.tipo === 'entrenador' && (
          <>
            <button onClick={() => history.push(`/pizarra/edit/${play.id}`)}>
              Editar
            </button>
            <button onClick={() => remove(play.id)}>Eliminar</button>
          </>
        )}
      </ButtonsStyles>
    </JugadaStyles>
  );
};
