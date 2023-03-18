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
  const handleOnClick = (idx) => {
    onChangePage(idx);
  };

  return (
    <>
      <Button
        className='fogi pagination-pill'
        variant={(isActive ? 'primary' : 'outline-secondary')}
        onClick={() => { if (idx !== -1) handleOnClick(idx); }}
      >
        {idx === - 1 ? '...' : idx + 1}
      </Button>
    </>
  );
};

export default Pill;