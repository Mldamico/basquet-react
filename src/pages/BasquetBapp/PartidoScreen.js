import React, { useEffect, useRef, useState } from 'react';
import { Layout } from '../../components/Layout';
import styled from 'styled-components';
import Countdown, { zeroPad } from 'react-countdown';
import { useSelector } from 'react-redux';
import Unknown from '../../assets/unknown.jpg';
const ChronoStyles = styled.div`
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
    margin: 1rem;
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

const ChangesStyles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--red);
  margin: 10rem auto;
  width: 80%;
  border-radius: 10px;
  border: 1px solid #fff;
  color: #fff;

  .selected {
    background-color: var(--yellow);
  }

  .players_list {
    display: flex;
    flex-direction: row;
    border: 1px solid #fff;
    border-radius: 10px;
  }

  .player {
    display: flex;
    padding: 2rem;
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

const positions = {
  0: 'BA',
  1: 'ES',
  2: 'AL',
  3: 'P',
  4: 'AP',
};

export const PartidoScreen = () => {
  const buttonEl = useRef(null);
  const [quarter, setQuarter] = useState(1);
  const [extraTime, setExtraTime] = useState(0);
  const [titulares, setTitulares] = useState([]);
  const [suplentes, setSuplentes] = useState([]);
  const [jugadorEntrante, setJugadorEntrante] = useState(undefined);
  const [jugadorSaliente, setJugadorSaliente] = useState(undefined);
  const { match } = useSelector((state) => state.match);

  const jugadoresCitados = match.jugadoresCitados;
  useEffect(() => {
    setTitulares(jugadoresCitados.slice(0, 5));
    setSuplentes(jugadoresCitados.slice(5));
  }, [jugadoresCitados]);
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

  const cambio = () => {
    console.log(jugadorEntrante);
    const jugadorIndex = titulares.findIndex(
      (titular) => titular.id === jugadorSaliente.id
    );
    console.log(jugadorIndex);
    setTitulares((titulare) => {
      titulare.splice(jugadorIndex, 1, jugadorEntrante);
      console.log(titulare);
      return titulare;
    });
    setSuplentes((suplentes) => {
      return suplentes
        .filter((suplente) => suplente.id !== jugadorEntrante.id)
        .concat(jugadorSaliente);
    });
  };

  return (
    <Layout showGoBack>
      <ChronoStyles>
        <div>
          <p>Cuarto: {quarter}</p>
          <Countdown
            ref={buttonEl}
            date={Date.now() + 10000}
            autoStart={false}
            quarter={quarter}
            renderer={renderer}
            onComplete={increaseQuarter}
          />

          <div className='button_container'>
            <button onClick={startHandler} disabled={quarter > 4 + extraTime}>
              <i className='fas fa-play'></i>
            </button>
            <button onClick={stopHandler} disabled={quarter > 4 + extraTime}>
              <i className='fas fa-pause'></i>
            </button>
            <button onClick={() => setExtraTime((e) => e + 1)}>+</button>
          </div>
        </div>
      </ChronoStyles>
      <ChangesStyles>
        <h2>Titulares</h2>
        <div className='players_list'>
          {titulares.map((titular, index) => (
            <div
              key={titular.id}
              className={
                jugadorSaliente === titular ? 'player selected' : 'player'
              }
              onClick={() => setJugadorSaliente(titular)}
            >
              <img
                src={titular.urlFoto ? titular.urlFoto : Unknown}
                alt={titular.nombre}
                style={{ width: 50 }}
              />
              <p>{positions[index]}</p>
              <p>{titular.nombre}</p>
            </div>
          ))}
        </div>

        <h2>Suplentes</h2>
        <div className='players_list'>
          {suplentes.map((suplente) => (
            <p
              key={suplente.id}
              className={jugadorEntrante === suplente ? 'selected' : ''}
              onClick={() => setJugadorEntrante(suplente)}
            >
              {suplente.nombre}
            </p>
          ))}
        </div>

        <button onClick={cambio}>Change</button>
      </ChangesStyles>
    </Layout>
  );
};
