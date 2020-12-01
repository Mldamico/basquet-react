import React, { useEffect, useRef, useState } from 'react';
import { Layout } from '../../components/Layout';
import {
  ChangesStyles,
  ChronoStyles,
  ChronometterStyles,
  PlayStyles,
} from '../../styles/PartidoStyles';
import Countdown, { zeroPad } from 'react-countdown';
import { useDispatch, useSelector } from 'react-redux';
import Unknown from '../../assets/unknown.jpg';
import { getPlays } from '../../store/actions/playActions';
import { registerPlay } from '../../store/actions/matchActions';

const renderer = ({ minutes, seconds, completed }) => {
  return (
    <ChronometterStyles>
      {zeroPad(minutes, 2)}:{zeroPad(seconds, 2)}
    </ChronometterStyles>
  );
};

const positions = {
  0: 'BA',
  1: 'AL',
  2: 'ES',
  3: 'AP',
  4: 'P',
};

export const PartidoScreen = () => {
  const buttonEl = useRef(null);
  const [quarter, setQuarter] = useState(1);
  const [extraTime, setExtraTime] = useState(0);
  const [titulares, setTitulares] = useState([]);
  const [suplentes, setSuplentes] = useState([]);
  const [jugadorEntrante, setJugadorEntrante] = useState(undefined);
  const [jugadorSaliente, setJugadorSaliente] = useState(undefined);
  const [alternativa, setAlternativa] = useState(false);
  const [valorAlternativa, setValorAlternativa] = useState(2);
  const [tiradorAlternativa, setTiradorAlternativa] = useState(undefined);
  const [asistenteAlternativa, setAsistenteAlternativa] = useState(undefined);
  const [jugadaSeleccionada, setJugadaSeleccionada] = useState(undefined);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const { match } = useSelector((state) => state.match);
  const { plays, loading, success } = useSelector((state) => state.play);
  const dispatch = useDispatch();

  const jugadoresCitados = match.jugadoresCitados;
  useEffect(() => {
    setTitulares(jugadoresCitados.slice(0, 5));
    setSuplentes(jugadoresCitados.slice(5));
    dispatch(getPlays());
    console.log(match);
  }, [jugadoresCitados, dispatch]);

  useEffect(() => {
    if (alternativa) {
      if (
        asistenteAlternativa !== undefined &&
        tiradorAlternativa !== undefined &&
        jugadaSeleccionada
      ) {
        setButtonDisabled(false);
      }
      if (tiradorAlternativa === asistenteAlternativa) {
        setButtonDisabled(true);
      }
    } else {
      if (jugadaSeleccionada) {
        setButtonDisabled(false);
      }
    }
  }, [
    jugadaSeleccionada,
    alternativa,
    asistenteAlternativa,
    tiradorAlternativa,
  ]);
  const startHandler = () => {
    buttonEl.current.start();
  };
  const stopHandler = () => {
    buttonEl.current.pause();
  };

  const increaseQuarter = () => {
    setQuarter((q) => q + 1);
  };

  const cambio = () => {
    console.log(jugadorEntrante);
    const jugadorIndex = titulares.findIndex(
      (titular) => titular.id === jugadorSaliente.id
    );
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
    setJugadorEntrante(undefined);
    setJugadorSaliente(undefined);
  };

  const scoreHandler = () => {
    const jugadaActual = plays.find(
      (jugada) => jugada.id === Number(jugadaSeleccionada)
    );
    const tiempo = `${buttonEl.current.state.timeDelta.minutes}:${buttonEl.current.state.timeDelta.seconds}`;
    if (!alternativa) {
      const positionTirador = Object.keys(positions).find((key) => {
        return positions[key] === jugadaActual.posicionTirador;
      });
      const positionAsistente = Object.keys(positions).find((key) => {
        return positions[key] === jugadaActual.posicionAsistente;
      });

      const play = {
        valorPunto: jugadaActual.valorDelPuntoPorDefecto,
        idJugadorAsistente: titulares[positionAsistente],
        idJugadorAnotador: titulares[positionTirador],
        idBase: titulares[0],
        idEscolta: titulares[2],
        idAlero: titulares[1],
        idPivot: titulares[4],
        idAlaPivot: titulares[3],
        idPartido: match.id,
        cuarto: quarter,
        idJugada: jugadaSeleccionada,
        tiempo,
      };
      dispatch(registerPlay(play));
    } else {
      const asistente = titulares.find(
        (titular) => titular.id === Number(asistenteAlternativa)
      );
      const tirador = titulares.find(
        (titular) => titular.id === Number(tiradorAlternativa)
      );
      const play = {
        valorPunto: valorAlternativa,
        idJugadorAsistente: asistente,
        idJugadorAnotador: tirador,
        idBase: titulares[0],
        idEscolta: titulares[2],
        idAlero: titulares[1],
        idPivot: titulares[4],
        idAlaPivot: titulares[3],
        idPartido: match.id,
        cuarto: quarter,
        idJugada: jugadaSeleccionada,
        tiempo,
      };
      dispatch(registerPlay(play));
    }
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
            <button
              disabled={quarter < 4}
              onClick={() => setExtraTime((e) => e + 1)}
            >
              +
            </button>
          </div>
        </div>
      </ChronoStyles>
      <div
        style={{
          display: 'flex',
          gap: '15rem',
          width: '90%',
          margin: '0 auto',
        }}
      >
        <ChangesStyles>
          <div>
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
                  <div>
                    <p>{positions[index]}</p>
                    <p>{titular.nombre}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={cambio}
            style={{ marginTop: '2rem' }}
            disabled={!jugadorEntrante || !jugadorSaliente}
          >
            <i className='fas fa-sync' style={{ fontSize: '5rem' }}></i>
          </button>
          <div>
            <h2>Suplentes</h2>
            <div className='players_list'>
              {suplentes.map((suplente) => (
                <div
                  key={suplente.id}
                  className={
                    jugadorEntrante === suplente ? 'player selected' : 'player'
                  }
                  onClick={() => setJugadorEntrante(suplente)}
                >
                  <img
                    src={suplente.urlFoto ? suplente.urlFoto : Unknown}
                    alt={suplente.nombre}
                    style={{ width: 50 }}
                  />
                  <p>{suplente.nombre}</p>
                </div>
              ))}
            </div>
          </div>
        </ChangesStyles>
        {loading ? (
          <p>Cargando</p>
        ) : (
          <PlayStyles>
            <h2>Jugadas</h2>
            <select onChange={(e) => setJugadaSeleccionada(e.target.value)}>
              <option selected disabled>
                Seleccione una jugada
              </option>
              {plays.map((play) => (
                <option value={play.id} key={play.id}>
                  {play.nombreDeLaJugada}
                </option>
              ))}
            </select>
            <h2>Alternativa</h2>
            <label className='switch'>
              <input
                type='checkbox'
                name='alternativa'
                checked={alternativa}
                onChange={() => setAlternativa((e) => !e)}
              />
              <span className='slider round'></span>
            </label>
            <h2>Tirador</h2>
            <select
              disabled={!alternativa}
              onChange={(e) => setTiradorAlternativa(e.target.value)}
            >
              <option selected disabled>
                Seleccione un tirador
              </option>
              {titulares.map((titular, index) => (
                <option value={titular.id} key={titular.id}>
                  {positions[index]}: {titular.nombre} {titular.apellido}
                </option>
              ))}
            </select>
            <h2>Asistente</h2>
            <select
              disabled={!alternativa}
              onChange={(e) => setAsistenteAlternativa(e.target.value)}
            >
              <option selected disabled>
                Seleccione un asistente
              </option>
              {titulares.map((titular, index) => (
                <option value={titular.id} key={titular.id}>
                  {positions[index]}: {titular.nombre} {titular.apellido}
                </option>
              ))}
            </select>
            <h2>Valor tanto</h2>
            <input
              disabled={!alternativa}
              type='number'
              value={valorAlternativa}
              onChange={(e) => setValorAlternativa(e.target.value)}
              max='3'
              min='0'
            />
            <div>
              <button onClick={scoreHandler} disabled={buttonDisabled}>
                Convirtio
              </button>
              <button>Erro</button>
              <button>Limpiar</button>
            </div>
          </PlayStyles>
        )}
      </div>
    </Layout>
  );
};
