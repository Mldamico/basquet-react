import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import RecordRTC from 'recordrtc';
import { Pizarra } from '../../components/Pizarra';
import { storage } from '../../firebase/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { PizarraScreenStyles, FormStyle } from '../../styles/PizarraStyles';

import { fileUpload } from '../../helpers/fileUpload';
import {
  createPlay,
  editPlay,
  getPlayById,
} from '../../store/actions/playActions';
import * as Yup from 'yup';
import { useFormik } from 'formik';
export const PizarraScreen = ({ match, history }) => {
  const playId = match.params.id;
  const { play } = useSelector((state) => state.play);
  const dispatch = useDispatch();
  const [stream, setStream] = useState();
  const [record, setRecord] = useState();
  const [didStartRecording, setDidStartRecording] = useState(false);

  const [urlJugada, setUrlJugada] = useState(
    playId ? play.urlDeLaJugadaGuardada : ''
  );

  const formik = useFormik({
    initialValues: {
      nombre: '',
      puntos: 0,
      jugadorAsistente: '',
      jugadorTirador: '',
      urlFoto: '',
    },
    validationSchema: Yup.object({
      nombre: Yup.string()
        .min(3, 'Tiene que tener al menos 3 caracteres')
        .required('Es obligatorio'),
      puntos: Yup.number().required('Es obligatorio'),
      jugadorAsistente: Yup.string().required('Es obligatorio'),
      jugadorTirador: Yup.string().required('Es obligatorio'),
      urlFoto: Yup.string(),
    }),
    onSubmit: async (values) => {
      console.log(values);
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
              nombreJugada: values.nombre,
              tirador: values.jugadorTirador,
              asistente: values.jugadorAsistente,
              valor: values.puntos,
              urlJugada: urlJugada,
              urlFoto: values.urlFoto,
            },
            playId
          )
        );
      } else {
        dispatch(
          createPlay({
            nombreJugada: values.nombre,
            tirador: values.jugadorTirador,
            asistente: values.jugadorAsistente,
            valor: values.puntos,
            urlJugada,
            urlFoto: values.urlFoto,
          })
        );
      }
      Swal.close();
      console.log(values);
    },
  });
  const {
    nombreDeLaJugada,
    valorDelPuntoPorDefecto,
    posicionAsistente,
    posicionTirador,
    urlFoto,
  } = play;

  useEffect(() => {
    if (playId) {
      dispatch(getPlayById(playId));
      formik.setFieldValue('nombre', nombreDeLaJugada);
      formik.setFieldValue('puntos', valorDelPuntoPorDefecto);
      formik.setFieldValue('jugadorAsistente', posicionAsistente);
      formik.setFieldValue('jugadorTirador', posicionTirador);
      formik.setFieldValue('urlFoto', urlFoto);
    }
  }, [
    dispatch,
    playId,
    nombreDeLaJugada,
    valorDelPuntoPorDefecto,
    posicionAsistente,
    posicionTirador,
    urlFoto,
  ]);

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

  const handlePictureUpload = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      Swal.fire({
        title: 'Uploading',
        text: 'Please wait...',
        allowOutsideClick: false,
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });
      const file_url = await fileUpload(file);
      console.log(file_url);

      formik.setFieldValue('urlFoto', file_url);

      Swal.close();
    }
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

        <FormStyle onSubmit={formik.handleSubmit}>
          <fieldset>
            <legend>Jugada</legend>
            <h3>Nombre de la jugada</h3>
            <div>
              <input
                id='nombre'
                type='text'
                name='nombre'
                value={formik.values.nombre}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
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
                value={Number(2)}
                onChange={formik.handleChange}
                checked={formik.values.puntos === 2}
              />
              <label htmlFor='triple'>Triple</label>
              <input
                id='triple'
                type='radio'
                name='puntos'
                value={Number(3)}
                onChange={formik.handleChange}
                checked={formik.values.puntos === 3}
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
                onChange={formik.handleChange}
                checked={formik.values.jugadorTirador === 'BA'}
              ></input>
              <label htmlFor='escolta_tirador'>E</label>
              <input
                id='escolta_tirador'
                type='radio'
                name='jugadorTirador'
                value='E'
                onChange={formik.handleChange}
                checked={formik.values.jugadorTirador === 'ES'}
              ></input>
              <label htmlFor='alero_tirador'>AL</label>
              <input
                id='alero_tirador'
                type='radio'
                name='jugadorTirador'
                value='AL'
                onChange={formik.handleChange}
                checked={formik.values.jugadorTirador === 'AL'}
              ></input>
              <label htmlFor='pivot_tirador'>P</label>
              <input
                id='pivot_tirador'
                type='radio'
                name='jugadorTirador'
                value='P'
                onChange={formik.handleChange}
                checked={formik.values.jugadorTirador === 'P'}
              ></input>
              <label htmlFor='alaPivot_tirador'>AP</label>
              <input
                id='alaPivot_tirador'
                type='radio'
                name='jugadorTirador'
                value='AP'
                onChange={formik.handleChange}
                checked={formik.values.jugadorTirador === 'AP'}
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
                onChange={formik.handleChange}
                checked={formik.values.jugadorAsistente === 'BA'}
              ></input>
              <label htmlFor='escolta'>E</label>
              <input
                id='escolta'
                type='radio'
                name='jugadorAsistente'
                value='E'
                onChange={formik.handleChange}
                checked={formik.values.jugadorAsistente === 'ES'}
              ></input>
              <label htmlFor='alero'>AL</label>
              <input
                id='alero'
                type='radio'
                name='jugadorAsistente'
                value='AL'
                onChange={formik.handleChange}
                checked={formik.values.jugadorAsistente === 'AL'}
              ></input>
              <label htmlFor='pivot'>P</label>
              <input
                id='pivot'
                type='radio'
                name='jugadorAsistente'
                value='P'
                onChange={formik.handleChange}
                checked={formik.values.jugadorAsistente === 'P'}
              ></input>
              <label htmlFor='alaPivot'>AP</label>
              <input
                id='alaPivot'
                type='radio'
                name='jugadorAsistente'
                value='AP'
                onChange={formik.handleChange}
                checked={formik.values.jugadorAsistente === 'AP'}
              ></input>
            </div>
            <div>
              <input
                id='fileSelector'
                type='file'
                name='urlFoto'
                style={{ display: 'none' }}
                value={formik.fileUrl}
                onChange={handlePictureUpload}
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
