import React, { useState } from 'react';
import { Layout } from '../../components/Layout';
import styled from 'styled-components';
import RecordRTC from 'recordrtc';
import { Pizarra } from '../../components/Pizarra';
import { storage } from '../../firebase/firebase';
export const PizarraScreen = () => {
  const [stream, setStream] = useState();
  const [record, setRecord] = useState();

  const guardar = async () => {
    const upload = await storage
      .ref(`videoList/probando-${new Date()}`)
      .put(record.blob);
    console.log(upload);
  };

  function startRecording() {
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
    };
    setStream(stream1);

    recording = RecordRTC(stream1, options);

    recording.startRecording();
    setRecord(recording);
    console.log(recording);

    // video.src = window.URL.createObjectURL(stream);
  }
  function stopRecording() {
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
      <Pizarra />
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
      <button onClick={() => guardar()}>Guardar</button>
    </Layout>
  );
};
