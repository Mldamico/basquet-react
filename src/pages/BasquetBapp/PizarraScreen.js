import React, { useState } from 'react';
import { Layout } from '../../components/Layout';
import styled from 'styled-components';
import RecordRTC from 'recordrtc';
import { Pizarra } from '../../components/Pizarra';
import { storage } from '../../firebase/firebase';
import { useForm } from '../../hooks/useForm';
import { useDispatch } from 'react-redux';
import { createPlay } from '../../store/actions/playActions';
const PizarraScreenStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  button {
    margin: 2rem;
  }
`;

const FormStyle = styled.form`
  button {
    margin-top: 2rem;
  }
  display: flex;
  flex-direction: column;
  fieldset {
    display: flex;
    padding-right: 2.5rem;
    flex-direction: column;
    width: 40rem;

    input {
      width: 100%;
      border-radius: 5px;
      margin: 0.5rem 0;
      padding: 0.5rem 0.5rem 1rem;
      border: 0.5px solid var(--black);
    }
    div {
      display: flex;
    }
    div:first-child {
      flex-direction: column;
    }
  }
`;

export const PizarraScreen = () => {
  const dispatch = useDispatch();
  const [stream, setStream] = useState();
  const [record, setRecord] = useState();
  const [didStartRecording, setDidStartRecording] = useState(false);
  const [values, handleInputChange] = useForm({
    nombre: '',
    puntos: 0,
    jugadorAsistente: '',
    jugadorTirador: '',
  });
  const [urlJugada, setUrlJugada] = useState('');

  const { nombre, puntos, jugadorAsistente, jugadorTirador } = values;
  const guardar = async () => {
    setUrlJugada(`videoList/probando-${Date.now()}`);
    const upload = await storage.ref(urlJugada).put(record.blob);
    console.log(upload);
  };

  function startRecording() {
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

    // video.src = window.URL.createObjectURL(stream);
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
  function processVideo() {
    var recordedBlob = RecordRTC.getBlob();
    console.log(recordedBlob);
    RecordRTC.getDataURL(function (dataURL) {});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    guardar();
    dispatch(
      createPlay({
        nombreJugada: nombre,
        tirador: jugadorTirador,
        asistente: jugadorAsistente,
        valor: puntos,
        urlJugada,
      })
    );
    console.log(values);
  };

  return (
    <Layout>
      <Pizarra
        stopRecording={stopRecording}
        startRecording={startRecording}
        didStartRecording={didStartRecording}
      />
      <PizarraScreenStyles>
        {didStartRecording ? (
          <button onClick={stopRecording}>Stop Recording</button>
        ) : (
          <button onClick={startRecording}>Start Recording</button>
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
              />
              <label htmlFor='triple'>Triple</label>
              <input
                id='triple'
                type='radio'
                name='puntos'
                value={3}
                onChange={handleInputChange}
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
              ></input>
              <label htmlFor='escolta_tirador'>E</label>
              <input
                id='escolta_tirador'
                type='radio'
                name='jugadorTirador'
                value='E'
                onChange={handleInputChange}
              ></input>
              <label htmlFor='alero_tirador'>A</label>
              <input
                id='alero_tirador'
                type='radio'
                name='jugadorTirador'
                value='AL'
                onChange={handleInputChange}
              ></input>
              <label htmlFor='pivot_tirador'>P</label>
              <input
                id='pivot_tirador'
                type='radio'
                name='jugadorTirador'
                value='P'
                onChange={handleInputChange}
              ></input>
              <label htmlFor='alaPivot_tirador'>AP</label>
              <input
                id='alaPivot_tirador'
                type='radio'
                name='jugadorTirador'
                value='AP'
                onChange={handleInputChange}
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
              ></input>
              <label htmlFor='escolta'>E</label>
              <input
                id='escolta'
                type='radio'
                name='jugadorAsistente'
                value='E'
                onChange={handleInputChange}
              ></input>
              <label htmlFor='alero'>A</label>
              <input
                id='alero'
                type='radio'
                name='jugadorAsistente'
                value='AL'
                onChange={handleInputChange}
              ></input>
              <label htmlFor='pivot'>P</label>
              <input
                id='pivot'
                type='radio'
                name='jugadorAsistente'
                value='P'
                onChange={handleInputChange}
              ></input>
              <label htmlFor='alaPivot'>AP</label>
              <input
                id='alaPivot'
                type='radio'
                name='jugadorAsistente'
                value='AP'
                onChange={handleInputChange}
              ></input>
            </div>
            <button type='submit'>Agregar jugada</button>
          </fieldset>
        </FormStyle>
      </PizarraScreenStyles>
    </Layout>
  );
};
