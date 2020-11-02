import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Layout } from '../../components/Layout';

export const TomarDatosScreen = ({ history }) => {
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (user && user.tipo !== 'asistente') {
      history.push('/');
    } else {
    }
  }, []);
  return <Layout showGoBack></Layout>;
};
