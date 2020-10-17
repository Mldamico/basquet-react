import React from 'react';
import styles from 'styled-components';

const MessageStyles = styled.div``;

export const Message = ({ children, type }) => {
  return <MessageStyles>{children}</MessageStyles>;
};
