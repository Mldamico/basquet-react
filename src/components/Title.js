import React from 'react';
import styled from 'styled-components';

const TitleStyles = styled.div`
  h1 {
    background-color: var(--red);
    transform: rotate(8deg);
    text-align: center;
    color: #fff;
    max-width: 30%;
    margin: 5rem auto;
  }
`;

export const Title = ({ children }) => {
  return (
    <TitleStyles>
      <h1>{children}</h1>
    </TitleStyles>
  );
};
