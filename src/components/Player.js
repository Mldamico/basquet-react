import React from 'react';
import styled from 'styled-components';
import Unknown from '../assets/unknown.jpg';
import { useSelector, useDispatch } from 'react-redux';
import {
  ActivatePlayerOnTeam,
  removePlayerFromTeam,
} from '../store/actions/playersActions';
import swal from 'sweetalert';
const PlayerStyles = styled.div`
  padding: 2rem 0;
  background-color: var(--red);
  border-radius: 10px;
  border: 1px solid var(--white);
  img {
    width: 300px;
  }

  button {
    background-color: var(--yellow);
    border: 1px solid var(--white);
  }
`;

export const Player = ({ player }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const deactivatePlayer = (id) => {
    swal({
      title: 'Seguro que queres dar de baja al jugador?',
      text: 'Luego podras activarlo nuevamente',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDeactivate) => {
      if (willDeactivate) {
        dispatch(removePlayerFromTeam(id, user.id));
        swal('Se dio de baja al jugador correctamente', {
          icon: 'success',
        });
      } else {
        swal('No se dio de baja.');
      }
    });
  };
  const activatePlayer = (id) => {
    dispatch(ActivatePlayerOnTeam(id, user.id));
  };
  return (
    <PlayerStyles>
      <div>
        <img
          src={player.urlFoto ? player.urlFoto : Unknown}
          alt={player.name}
        />
      </div>
      <div>
        <h3>
          {player.apellido} {player.nombre}
        </h3>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <span>Dorsal: {player.dorsal}</span>
          <span>Altura: {player.altura / 100}M</span>
        </div>
        <p>
          {player.activo ? 'Jugador Activo en el equipo' : 'Jugador No activo'}
        </p>
        {player.activo ? (
          <button onClick={() => deactivatePlayer(player.id)}>
            Desactivar Jugador
          </button>
        ) : (
          <button onClick={() => activatePlayer(player.id)}>
            Activar Jugador
          </button>
        )}
      </div>
    </PlayerStyles>
  );
};
