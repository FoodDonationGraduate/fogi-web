// Essentials
import * as React from 'react';
import { useEffect } from 'react';
import { Button } from 'react-bootstrap';

// Style imports
import './Pagination.css';

const Pill = ({
  idx,
  isActive,
  onChangePage
}) => {
  const handleOnClick = () => {
    onChangePage(idx);
  };

  return (
    <>
      <Button
        className='fogi pagination-pill'
        variant={(isActive ? 'primary' : 'outline-secondary')}
        onClick={() => { if (idx !== -1) onChangePage(idx); }}
      >
        {idx === - 1 ? '...' : idx + 1}
      </Button>
    </>
  );
};

export default Pill;