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
  }
  @keyframes spin-right {
    100% {
      -webkit-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  .co {
    position: absolute;
    top: 50%;
    left: 50%;
    height: 200px;
    width: 200px;
    margin-top: -115px;
    margin-left: -100px;
    border-color: black;
    border-width: 1px;
    border-style: solid;
    border-radius: 50%;
    border-bottom: none;
    border-left: none;
    border-right: none;
    -webkit-animation: spin-right 1s linear infinite;
    -moz-animation: spin-right 1s linear infinite;
    -ms-animation: spin-right 1s linear infinite;
    -o-animation: spin-right 1s linear infinite;
    animation: spin-right 1s linear infinite;
  }
  .cb {
    position: absolute;
    top: 50%;
    left: 50%;
    height: 200px;
    width: 200px;
    margin-top: -115px;
    margin-left: -100px;
    border-color: black;
    border-width: 1px;
    border-style: solid;
    border-radius: 50%;
    border-bottom: none;
    border-left: none;
    border-right: none;
    -webkit-animation: spin-right 60s linear infinite;
    -moz-animation: spin-right 60s linear infinite;
    -ms-animation: spin-right 60s linear infinite;
    -o-animation: spin-right 60s linear infinite;
    animation: spin-right 60s linear infinite;
  }
  .cob {
    position: absolute;
    top: 50%;
    left: 50%;
    height: 200px;
    width: 200px;
    margin-top: -115px;
    margin-left: -100px;
    border-color: black;
    border-width: 3px;
    border-style: solid;
    border-radius: 50%;
    border-bottom: none;
    border-left: none;
    border-right: none;
    -webkit-animation: spin-right 1s linear infinite;
    -moz-animation: spin-right 1s linear infinite;
    -ms-animation: spin-right 1s linear infinite;
    -o-animation: spin-right 1s linear infinite;
    animation: spin-right 1s linear infinite;
    -webkit-filter: blur(5px);
    -moz-filter: blur(5px);
    -o-filter: blur(5px);
    -ms-filter: blur(5px);
    filter: blur(5px);
  }
  .cbb {
    position: absolute;
    top: 50%;
    left: 50%;
    height: 200px;
    width: 200px;
    margin-top: -115px;
    margin-left: -100px;
    border-color: #fff;
    border-width: 3px;
    border-style: solid;
    border-radius: 50%;
    border-bottom: none;
    border-left: none;
    border-right: none;
    -webkit-animation: spin-right 60s linear infinite;
    -moz-animation: spin-right 60s linear infinite;
    -ms-animation: spin-right 60s linear infinite;
    -o-animation: spin-right 60s linear infinite;
    animation: spin-right 60s linear infinite;
    -webkit-filter: blur(5px);
    -moz-filter: blur(5px);
    -o-filter: blur(5px);
    -ms-filter: blur(5px);
    filter: blur(5px);
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
  const [startedTimer, setStartedTimer] = useState(false);

  const startHandler = () => {
    // console.log(buttonEl.current);

    buttonEl.current.start();
    // setStartedTimer(true);
  };
  const stopHandler = () => {
    buttonEl.current.pause();
    // setStartedTimer(false);
  };

  return (
    <Layout showGoBack>
      <PartidoStyled>
        <div>
          <Countdown
            ref={buttonEl}
            date={Date.now() + 600000}
            autoStart={false}
            renderer={renderer}
          />

          <div className='button_container'>
            <button onClick={startHandler}>
              <i className='fas fa-play'></i>
            </button>
            <button onClick={stopHandler}>
              <i className='fas fa-pause'></i>
            </button>
          </div>
        </div>
      </PartidoStyled>
    </Layout>
  );
};
