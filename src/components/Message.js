import React from 'react';
import styled from 'styled-components';

const MessageStyles = styled.div`
  background-color: ${(props) => props.backgroundColor || 'tomato'};
  color: #fff;
  border-radius: 5px;
  text-align: center;
  padding: 0.5rem;
  margin: 1.5rem 0;
  font-size: 1.3rem;
`;

export const Message = ({ children, BackgroundColor }) => {
  return (
    <MessageStyles backgroundColor={BackgroundColor}>{children}</MessageStyles>
  );
};
