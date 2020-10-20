import React, { useState } from 'react';
import { Layout } from '../../components/Layout';
import styled from 'styled-components';
import RecordRTC from 'recordrtc';
import { Pizarra } from '../../components/Pizarra';
import { storage } from '../../firebase/firebase';

const PizarraScreenStyles = styled.div``;

export const PizarraScreen = () => {
  const [stream, setStream] = useState();
  const [record, setRecord] = useState();
  const [didStartRecording, setDidStartRecording] = useState(false);

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
  return (
    <Layout>
      <Pizarra stopRecording={stopRecording} startRecording={startRecording} />
      <PizarraScreenStyles>
        {didStartRecording ? (
          <button onClick={stopRecording}>Stop Recording</button>
        ) : (
          <button onClick={startRecording}>Start Recording</button>
        )}

        {record && !didStartRecording && (
          <button onClick={() => guardar()}>Guardar</button>
        )}
      </PizarraScreenStyles>
    </Layout>
  );
};
