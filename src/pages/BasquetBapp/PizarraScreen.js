import React, { useState } from 'react';
import { Layout } from '../../components/Layout';
import styled from 'styled-components';
import RecordRTC from 'recordrtc';
import { Pizarra } from '../../components/Pizarra';
import { storage } from '../../firebase/firebase';
import { useForm } from '../../hooks/useForm';
const PizarraScreenStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
`;

export const PizarraScreen = () => {
  const [stream, setStream] = useState();
  const [record, setRecord] = useState();
  const [didStartRecording, setDidStartRecording] = useState(false);
  const [values, handleInputChange] = useForm({
    puntos: 0,
    jugadorAsistente: '',
    jugadorTirador: '',
  });

  const { puntos, jugadorAsistente, jugadorTirador } = values;
  const guardar = async () => {
    const upload = await storage
      .ref(`videoList/probando-${new Date()}`)
      .put(record.blob);
    console.log(upload);
  };

  function startRecording() {
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

        {record && !didStartRecording && (
          <button onClick={() => guardar()}>Guardar</button>
        )}

        <FormStyle onSubmit={handleSubmit}>
          <legend>Jugada</legend>
          <h3>Puntos</h3>
          <div>
            <label htmlFor='doble'>Doble</label>
            <input
              id='doble'
              type='radio'
              name='puntos'
              value={2}
              onChange={handleSubmit}
              checked
            ></input>
            <label htmlFor='triple'>Triple</label>
            <input
              id='triple'
              type='radio'
              name='puntos'
              value={3}
              onChange={handleSubmit}
            ></input>
          </div>
          <h3>Jugador Tirador</h3>
          <div>
            <label htmlFor='Base_tirador'>B</label>
            <input
              id='Base_tirador'
              type='radio'
              name='tirador'
              value='B'
              onChange={handleSubmit}
            ></input>
            <label htmlFor='escolta_tirador'>E</label>
            <input
              id='escolta_tirador'
              type='radio'
              name='tirador'
              value='E'
              onChange={handleSubmit}
            ></input>
            <label htmlFor='alero_tirador'>A</label>
            <input
              id='alero_tirador'
              type='radio'
              name='tirador'
              value='A'
              onChange={handleSubmit}
            ></input>
            <label htmlFor='pivot_tirador'>P</label>
            <input
              id='pivot_tirador'
              type='radio'
              name='tirador'
              value='P'
              onChange={handleSubmit}
            ></input>
            <label htmlFor='alaPivot_tirador'>AP</label>
            <input
              id='alaPivot_tirador'
              type='radio'
              name='tirador'
              value='AP'
              onChange={handleSubmit}
            ></input>
          </div>
          <h3>Jugador Asistente</h3>
          <div>
            <label htmlFor='base'>B</label>
            <input
              id='base'
              type='radio'
              name='asistente'
              value='B'
              onChange={handleSubmit}
            ></input>
            <label htmlFor='escolta'>E</label>
            <input
              id='escolta'
              type='radio'
              name='asistente'
              value='E'
              onChange={handleSubmit}
            ></input>
            <label htmlFor='alero'>A</label>
            <input
              id='alero'
              type='radio'
              name='asistente'
              value='A'
              onChange={handleSubmit}
            ></input>
            <label htmlFor='pivot'>P</label>
            <input
              id='pivot'
              type='radio'
              name='asistente'
              value='P'
              onChange={handleSubmit}
            ></input>
            <label htmlFor='alaPivot'>AP</label>
            <input
              id='alaPivot'
              type='radio'
              name='asistente'
              value='AP'
              onChange={handleSubmit}
            ></input>
          </div>
          <button type='submit'>Agregar jugada</button>
        </FormStyle>
      </PizarraScreenStyles>
    </Layout>
  );
};
