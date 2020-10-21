import React, { useState } from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable';
const PizarraStyled = styled.div`
  display: flex;
  justify-content: center;
`;

const jugadores = [
  { id: 1, posicion: 'Base', numero: 1, left: -460, top: 10 },
  { id: 2, posicion: 'Alero', numero: 2, left: -390, top: 10 },
  { id: 3, posicion: 'Escolta', numero: 3, left: -330, top: 10 },
  { id: 4, posicion: 'Ala Pivot', numero: 4, left: -270, top: 10 },
  { id: 5, posicion: 'Pivot', numero: 5, left: -210, top: 10 },
];
export const Pizarra = ({
  stopRecording,
  startRecording,
  didStartRecording,
}) => {
  const [deltaPosition, setDeltaPosition] = useState({ x: 0, y: 0 });
  const handleEvent = (e, data) => {
    const { x, y } = deltaPosition;
    setDeltaPosition({ x: x + data.deltaX, y: y + data.deltaY });
    console.log(x, y);
    if (x > 120 && x < 200 && y > 20 && y < 110) {
      console.log('Punto');
      stopRecording();
    }
  };

  const handleStart = () => {
    if (!didStartRecording) {
      startRecording();
    }
  };

  const handleStop = () => {
    console.log('se Paro');
  };
  return (
    <PizarraStyled>
      <div
        style={{
          backgroundImage: `url('cancha.png')`,
          width: 1200,
          height: 1000,
          position: 'relative',
        }}
      ></div>
      {jugadores.map((jugador) => (
        <Draggable
          key={jugador.id}
          defaultPosition={{ x: jugador.left, y: jugador.top }}
          onStop={handleStop}
          onStart={handleStart}
        >
          <div
            style={{
              width: '5rem',
              height: '5rem',
              backgroundColor: '#fff',
              position: 'absolute',
              borderRadius: '50%',
              content: '1',
              lineHeight: '5rem',
              textAlign: 'center',
              cursor: 'pointer',
            }}
          >
            {jugador.posicion}
          </div>
        </Draggable>
      ))}
      <Draggable
        key={'pelota'}
        defaultPosition={{ x: -460, y: 110 }}
        onDrag={handleEvent}
      >
        <div
          style={{
            width: '5rem',
            height: '5rem',
            backgroundColor: 'var(--yellow)',
            position: 'absolute',
            borderRadius: '50%',
            content: '1',
            lineHeight: '5rem',
            textAlign: 'center',
          }}
        >
          Pelota
        </div>
      </Draggable>
    </PizarraStyled>
  );
};
