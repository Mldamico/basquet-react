import React from 'react';
import { Layout } from '../../components/Layout';
import styled from 'styled-components';

const PizarraStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

export const PizarraScreen = () => {
  return (
    <Layout>
      <PizarraStyled></PizarraStyled>
    </Layout>
  );
};
