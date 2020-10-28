import React from 'react';
import styled from 'styled-components';
import Unknown from '../assets/unknown.jpg';
const PlayerStyles = styled.div`
  img {
    width: 300px;
  }
`;

export const Player = ({ player }) => {
  return (
    <PlayerStyles>
      <div>
        <img src={player.urlFoto ? player.urlFoto : Unknown} />
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
          <button>Desactivar Jugador</button>
        ) : (
          <button>Activar Jugador</button>
        )}
      </div>
    </PlayerStyles>
  );
};
