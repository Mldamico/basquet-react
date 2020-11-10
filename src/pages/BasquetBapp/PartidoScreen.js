import React, { useRef, useState } from 'react';
import { Layout } from '../../components/Layout';
import styled from 'styled-components';
import Countdown, { zeroPad } from 'react-countdown';
const PartidoStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: var(--red);
  margin: 10rem auto;
  width: 80%;
  border-radius: 10px;
  border: 1px solid #fff;
  color: #fff;
  position: relative;
  .button_container {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }

  button {
    outline: none;
    height: 5rem;
    width: 5rem;
    border-radius: 100%;
    background-color: var(--yellow);
    padding: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #fff;
  }

  button:active {
    background-color: var(--red);
  }
  button:disabled {
    background-color: var(--black);
  }
`;

const ChronometterStyles = styled.div`
  display: flex;
  margin-top: 2rem;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  width: 20rem;
  height: 20rem;
  border-radius: 50%;
  background-color: var(--yellow);
  border: 1px solid #fff;
`;

const renderer = ({ minutes, seconds, completed }) => {
  return (
    <ChronometterStyles>
      {zeroPad(minutes, 2)}:{zeroPad(seconds, 2)}
    </ChronometterStyles>
  );
};

export const PartidoScreen = () => {
  const buttonEl = useRef(null);
  const [quarter, setQuarter] = useState(4);
  const [extraTime, setExtraTime] = useState(0);
  const startHandler = () => {
    // console.log(buttonEl.current);

    buttonEl.current.start();
    // setStartedTimer(true);
  };
  const stopHandler = () => {
    buttonEl.current.pause();
    // setStartedTimer(false);
  };

  const increaseQuarter = () => {
    setQuarter((q) => q + 1);
  };

  return (
    <Layout showGoBack>
      <PartidoStyled>
        <div>
          <Countdown
            ref={buttonEl}
            date={Date.now() + 10000}
            autoStart={false}
            quarter={quarter}
            renderer={renderer}
            onComplete={increaseQuarter}
          />

          <div className='button_container'>
            <button onClick={startHandler} disabled={quarter > 3 + extraTime}>
              <i className='fas fa-play'></i>
            </button>
            <button onClick={stopHandler} disabled={quarter > 3 + extraTime}>
              <i className='fas fa-pause'></i>
            </button>
            <button onClick={() => setExtraTime((e) => e + 1)}>+</button>
          </div>
          {quarter}
        </div>
      </PartidoStyled>
    </Layout>
  );
};
