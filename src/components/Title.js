import React from 'react';
import styled from 'styled-components';

const TitleStyles = styled.div`
  h1 {
    background-color: var(--red);
    text-align: center;
    color: #fff;
    display: inline-block;
    padding: 2rem 6rem;
    font-size: ${(props) => props.size + 'rem' || '1rem'};
    font-family: 'Henny Penny', cursive;
    border: 1px solid #fff;
  }
`;

export const Title = ({ children, size }) => {
  return (
    <TitleStyles size={size}>
      <h1>{children}</h1>
    </TitleStyles>
  );
};
