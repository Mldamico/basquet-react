import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable';
import Cancha from '../assets/cancha.png';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
const PizarraStyled = styled.div`
  display: flex;
  justify-content: center;
`;

const jugadores = [
  { id: 1, posicion: 'B', numero: 1, left: -460, top: 10 },
  { id: 2, posicion: 'AL', numero: 2, left: -390, top: 10 },
  { id: 3, posicion: 'E', numero: 3, left: -320, top: 10 },
  { id: 4, posicion: 'AP', numero: 4, left: -250, top: 10 },
  { id: 5, posicion: 'P', numero: 5, left: -180, top: 10 },
];
export const Pizarra = ({
  stopRecording,
  startRecording,
  didStartRecording,
}) => {
  let history = useHistory();
  const { user } = useSelector((state) => state.auth);
  const [deltaPosition, setDeltaPosition] = useState({ x: 0, y: 0 });
  const handleEvent = (e, data) => {
    const { x, y } = deltaPosition;
    setDeltaPosition({ x: x + data.deltaX, y: y + data.deltaY });
    console.log(x, y);
    if (x > 430 && x < 505 && y > -65 && y < 16) {
      console.log('Punto');
      if (didStartRecording) {
        stopRecording();
      }
    }
  };

  useEffect(() => {
    // if (user && user !== 'entrenador') {
    //   history.push('/');
    // }
  }, [user]);

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
          backgroundImage: `url(${Cancha})`,
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
              width: '6rem',
              height: '6rem',
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
            width: '6rem',
            height: '6rem',
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
