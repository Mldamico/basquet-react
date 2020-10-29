import React from 'react';
import { override } from '../styles/PropagateLoaderOverride';
import { PropagateLoader } from 'react-spinners';
export const CenterLoading = ({ loading }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '70vh',
      }}
    >
      <PropagateLoader
        css={override}
        size={15}
        color={'#FF4949'}
        loading={loading}
      />
    </div>
  );
};
