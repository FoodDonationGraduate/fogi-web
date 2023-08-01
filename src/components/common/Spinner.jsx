// Essentials
import React from 'react';
import { Spinner as ReactSpinner } from 'react-bootstrap';

const Spinner = () => {

  return (<>
    <div className='spinner-background'>
      <div className='spinner-container'>
        <ReactSpinner animation='border' variant='light' />
      </div>
    </div>
  </>)
};

export default Spinner;