// Essentials
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

// Style imports
import './Pagination.css';

const UtilityPill = ({
  idx,
  activeIdx,
  pageCount,
  onChangePage
}) => {
  // -1: [...]; -2: [<]; -3: [>]
  const [label, setLabel] = useState('...');
  const handleOnClick = () => {
    if (idx === -2 && activeIdx > 0) onChangePage(activeIdx - 1);
    else if (idx === -3 && activeIdx < pageCount - 1) onChangePage(activeIdx + 1); 
  };

  useEffect(() => {
    switch (idx) {
      case -2: setLabel('<'); break;
      case -3: setLabel('>'); break;
      default: setLabel('...');
    }
  }, []);

  return (
    <>
      <Button
        className='fogi pagination-pill'
        variant={(idx !== -1 ? 'primary' : 'outline-secondary')}
        onClick={handleOnClick}
      >
        {label}
      </Button>
    </>
  );
};

export default UtilityPill;