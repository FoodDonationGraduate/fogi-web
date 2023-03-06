// Essentials
import * as React from 'react';
import { Button } from 'react-bootstrap';

// Style imports
import './Pagination.css';

const Pill = ({
  idx,
  isActive,
  onChangePage
}) => {

  return (
    <>
      <Button
        className='fogi pagination-pill'
        variant={ isActive ? 'primary' : 'outline-secondary' }
        onClick={() => { onChangePage(idx); } }
      >
        {idx + 1}
      </Button>
    </>
  );
};

export default Pill;