import React, { useRef } from 'react';
import { Layout } from '../../components/Layout';
import styled from 'styled-components';
import Countdown, { zeroPad } from 'react-countdown';
const PartidoStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const renderer = ({ hours, minutes, seconds, completed }) => {
  return (
    <span>
      {zeroPad(minutes, 2)}:{zeroPad(seconds, 2)}
    </span>
  );
};

export const PartidoScreen = () => {
  const buttonEl = useRef(null);
  const startHandler = () => {
    console.log(buttonEl.current);
    buttonEl.current.start();
  };
  const stopHandler = () => {
    buttonEl.current.pause();
  };
  return (
    <Layout showGoBack>
      <PartidoStyled>
        <Countdown
          ref={buttonEl}
          date={Date.now() + 600000}
          autoStart={false}
          renderer={renderer}
        />
        <button onClick={startHandler}>Iniciar</button>
        <button onClick={stopHandler}>Detener</button>
      </PartidoStyled>
    </Layout>
  );
};
