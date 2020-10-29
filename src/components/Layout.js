import React from 'react';
import { Nav } from './Nav';
import styled from 'styled-components';

const LayoutStyles = styled.div`
  /* width: 1600px; */
  max-height: 100px;
  /* height: 100vh; */
  text-align: center;
  margin: 0 auto;
`;
export const Layout = ({ children }) => {
  return (
    <>
      {/* <Nav /> */}
      <LayoutStyles>{children}</LayoutStyles>
    </>
  );
};
