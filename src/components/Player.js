import React from 'react';
import styled from 'styled-components';
import Unknown from '../assets/unknown.jpg';
import { useSelector, useDispatch } from 'react-redux';
import {
  ActivatePlayerOnTeam,
  removePlayerFromTeam,
} from '../store/actions/playersActions';
const PlayerStyles = styled.div`
  img {
    width: 300px;
  }
`;

export const Player = ({ player }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const deactivatePlayer = (id) => {
    dispatch(removePlayerFromTeam(id, user.id));
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
