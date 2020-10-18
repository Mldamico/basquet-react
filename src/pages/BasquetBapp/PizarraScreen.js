import React from 'react';
import { Layout } from '../../components/Layout';
import styled from 'styled-components';
import RecordRTC from 'recordrtc';
import Draggable from 'react-draggable';
const PizarraStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

const jugadores = [
  { id: 1, posicion: 'Base', numero: 1, left: 10, top: 10 },
  { id: 2, posicion: 'Alero', numero: 2, left: 110, top: 10 },
  { id: 3, posicion: 'Escolta', numero: 3, left: 210, top: 10 },
  { id: 4, posicion: 'Ala Pivot', numero: 4, left: 310, top: 10 },
  { id: 5, posicion: 'Pivot', numero: 5, left: 410, top: 10 },
];
export const PizarraScreen = () => {
  return (
    <Layout>
      <PizarraStyled>
        <div
          style={{
            backgroundImage: url(`cancha.png`),
            width: 1200,
            height: 1000,
            position: 'relative',
          }}
        ></div>
        {jugadores.map((jugador) => (
          <Draggable
            key={jugador.id}
            defaultPosition={{ x: jugador.left, y: jugador.top }}
            onDrag={handleEvent}
            onStop={handleStop}
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
              }}
            >
              {jugador.posicion}
            </div>
          </Draggable>
        ))}
        <Draggable defaultPosition={{ x: 10, y: 110 }}>
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
            }}
          >
            Pelota
          </div>
        </Draggable>
      </PizarraStyled>
    </Layout>
  );
};
