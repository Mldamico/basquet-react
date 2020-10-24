import React from 'react';
import { Nav } from './Nav';
import styled from 'styled-components';

const LayoutStyles = styled.div`
  max-width: 1600px;
  text-align: center;
`;
export const Layout = ({ children }) => {
  return (
    <>
      <Nav />
      <LayoutStyles>{children}</LayoutStyles>
    </>
  );
};
