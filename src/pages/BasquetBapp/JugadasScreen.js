import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout } from '../../components/Layout';
import { getPlays } from '../../store/actions/playActions';

export const JugadasScreen = () => {
  const dispatch = useDispatch();
  const { error, loading, plays } = useSelector((state) => state.play);
  useEffect(() => {
    dispatch(getPlays());
  }, []);
  return <Layout></Layout>;
};
