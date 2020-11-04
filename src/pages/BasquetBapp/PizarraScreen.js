import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import RecordRTC from 'recordrtc';
import { Pizarra } from '../../components/Pizarra';
import { storage } from '../../firebase/firebase';
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { PizarraScreenStyles, FormStyle } from '../../styles/PizarraStyles';
import {
  createPlay,
  editPlay,
  getPlayById,
} from '../../store/actions/playActions';

export const PizarraScreen = ({ match, history }) => {
  const playId = match.params.id;
  const { play } = useSelector((state) => state.play);
  const dispatch = useDispatch();
  const [stream, setStream] = useState();
  const [record, setRecord] = useState();
  const [didStartRecording, setDidStartRecording] = useState(false);
  const [values, handleInputChange] = useForm({
    nombre: playId ? play.nombreDeLaJugada : '',
    puntos: playId ? play.valorDelPuntoPorDefecto : 0,
    jugadorAsistente: playId ? play.posicionAsistente : '',
    jugadorTirador: playId ? play.posicionTirador : '',
    urlFoto: playId ? play.urlFoto : '',
  });
  const [urlJugada, setUrlJugada] = useState(
    playId ? play.urlDeLaJugadaGuardada : ''
  );

  const { nombre, puntos, jugadorAsistente, jugadorTirador, urlFoto } = values;

  useEffect(() => {
    if (playId) {
      dispatch(getPlayById(playId));
    }
  }, [dispatch, playId]);

  const guardar = async () => {
    const upload = await storage.ref(urlJugada).put(record.blob);
    console.log(upload);
  };

  function startRecording() {
    setUrlJugada(`videoList/video-${Date.now()}`);
    window.scroll(0, 100);
    setDidStartRecording(true);
    let mediaConstraints = {
      video: true,
    };
    navigator.mediaDevices
      // @ts-ignore
      .getDisplayMedia(mediaConstraints)
      .then(successCallback.bind(this), errorCallback.bind(this));
  }
  function errorCallback() {}
  var recording;
  function successCallback(stream1) {
    var options = {
      mimeType: 'video/mp4',
      audioBitsPerSecond: 128000,
      videoBitsPerSecond: 128000,
      bitsPerSecond: 128000,
      minWidth: 1280,
      minHeight: 720,
      maxWidth: 1920,
      maxHeight: 1080,
    };
    setStream(stream1);

    recording = RecordRTC(stream1, options);

    recording.startRecording();
    setRecord(recording);
    console.log(recording);
  }
  function stopRecording() {
    setDidStartRecording(false);
    console.log(record);
    record.stopRecording((param) => {
      console.log(record.getBlob());
    });
    // record.stopRecording((param) => console.log(param));
    // console.log(record);
    stream.getAudioTracks().forEach((track) => track.stop());
    stream.getVideoTracks().forEach((track) => track.stop());
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Guardando Video',
      text: 'Espere...',
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });
    if (record) {
      await guardar();
    }
    if (playId) {
      dispatch(
        editPlay(
          {
            nombreJugada: nombre,
            tirador: jugadorTirador,
            asistente: jugadorAsistente,
            valor: puntos,
            urlJugada,
            urlFoto,
          },
          playId
        )
      );
    } else {
      dispatch(
        createPlay({
          nombreJugada: nombre,
          tirador: jugadorTirador,
          asistente: jugadorAsistente,
          valor: puntos,
          urlJugada,
          urlFoto,
        })
      );
    }
    Swal.close();
    console.log(values);
  };

  const handlePictureClick = (e) => {
    e.preventDefault();
    document.querySelector('#fileSelector').click();
  };

  return (
    <>
      <Pizarra
        stopRecording={stopRecording}
        startRecording={startRecording}
        didStartRecording={didStartRecording}
      />
      <PizarraScreenStyles>
        {didStartRecording ? (
          <button onClick={stopRecording}>Detener Grabacion</button>
        ) : (
          <button onClick={startRecording}>Empezar Grabacion</button>
        )}

        <FormStyle onSubmit={handleSubmit}>
          <fieldset>
            <legend>Jugada</legend>
            <h3>Nombre de la jugada</h3>
            <div>
              <input
                id='nombre'
                type='text'
                name='nombre'
                value={nombre}
                onChange={handleInputChange}
                checked
              />
            </div>
            <h3>Puntos</h3>
            <div>
              <label htmlFor='doble'>Doble</label>
              <input
                id='doble'
                type='radio'
                name='puntos'
                value={2}
                onChange={handleInputChange}
                checked={puntos === '2'}
              />
              <label htmlFor='triple'>Triple</label>
              <input
                id='triple'
                type='radio'
                name='puntos'
                value={3}
                onChange={handleInputChange}
                checked={puntos === '3'}
              ></input>
            </div>
            <h3>Jugador Tirador</h3>
            <div>
              <label htmlFor='Base_tirador'>B</label>
              <input
                id='Base_tirador'
                type='radio'
                name='jugadorTirador'
                value='B'
                onChange={handleInputChange}
                checked={jugadorTirador === 'B'}
              ></input>
              <label htmlFor='escolta_tirador'>E</label>
              <input
                id='escolta_tirador'
                type='radio'
                name='jugadorTirador'
                value='E'
                onChange={handleInputChange}
                checked={jugadorTirador === 'E'}
              ></input>
              <label htmlFor='alero_tirador'>AL</label>
              <input
                id='alero_tirador'
                type='radio'
                name='jugadorTirador'
                value='AL'
                onChange={handleInputChange}
                checked={jugadorTirador === 'AL'}
              ></input>
              <label htmlFor='pivot_tirador'>P</label>
              <input
                id='pivot_tirador'
                type='radio'
                name='jugadorTirador'
                value='P'
                onChange={handleInputChange}
                checked={jugadorTirador === 'P'}
              ></input>
              <label htmlFor='alaPivot_tirador'>AP</label>
              <input
                id='alaPivot_tirador'
                type='radio'
                name='jugadorTirador'
                value='AP'
                onChange={handleInputChange}
                checked={jugadorTirador === 'AP'}
              ></input>
            </div>
            <h3>Jugador Asistente</h3>
            <div>
              <label htmlFor='base'>B</label>
              <input
                id='base'
                type='radio'
                name='jugadorAsistente'
                value='B'
                onChange={handleInputChange}
                checked={jugadorAsistente === 'B'}
              ></input>
              <label htmlFor='escolta'>E</label>
              <input
                id='escolta'
                type='radio'
                name='jugadorAsistente'
                value='E'
                onChange={handleInputChange}
                checked={jugadorAsistente === 'E'}
              ></input>
              <label htmlFor='alero'>AL</label>
              <input
                id='alero'
                type='radio'
                name='jugadorAsistente'
                value='AL'
                onChange={handleInputChange}
                checked={jugadorAsistente === 'AL'}
              ></input>
              <label htmlFor='pivot'>P</label>
              <input
                id='pivot'
                type='radio'
                name='jugadorAsistente'
                value='P'
                onChange={handleInputChange}
                checked={jugadorAsistente === 'P'}
              ></input>
              <label htmlFor='alaPivot'>AP</label>
              <input
                id='alaPivot'
                type='radio'
                name='jugadorAsistente'
                value='AP'
                onChange={handleInputChange}
                checked={jugadorAsistente === 'AP'}
              ></input>
            </div>
            <div>
              <input
                id='fileSelector'
                type='file'
                name='urlFoto'
                style={{ display: 'none' }}
                onChange={handleInputChange}
              />

              <button style={{ width: '100%' }} onClick={handlePictureClick}>
                Subir Imagen
              </button>
            </div>
            <button type='submit'>
              {playId ? 'Editar Jugada' : 'Agregar jugada'}
            </button>
          </fieldset>
        </FormStyle>
        <button onClick={() => history.push('/jugadas')}>Volver</button>
      </PizarraScreenStyles>
    </>
  );
};
