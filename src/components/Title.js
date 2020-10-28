import React from 'react';
import styled from 'styled-components';

const TitleStyles = styled.div`
  h1 {
    background-color: var(--red);
    transform: rotate(8deg);
    text-align: center;
    color: #fff;
    display: inline-block;
    margin: 8rem auto;
    padding: 0 5rem;
  }
`;

export const Title = ({ children }) => {
  return (
    <TitleStyles>
      <h1>{children}</h1>
    </TitleStyles>
  );
};
