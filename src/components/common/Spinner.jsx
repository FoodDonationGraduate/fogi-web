// Essentials
import React from 'react';
import { Spinner as ReactSpinner } from 'react-bootstrap';

const Spinner = () => {

  return (<>
    <div className='spinner-container'>
      <ReactSpinner animation='border' variant='light' />
    </div>
  </>)
};

export default Spinner;