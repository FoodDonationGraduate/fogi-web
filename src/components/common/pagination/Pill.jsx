// Essentials
import React from 'react';
import { Button } from 'react-bootstrap';

// Style imports
import './Pagination.css';

// Utility
import { useResizer } from 'utils/helpers/Resizer.jsx';

const Pill = ({
  idx,
  isActive,
  onChangePage
}) => {
  const handleOnClick = (idx) => {
    onChangePage(idx);
  };

  let size = useResizer();
  
  return (
    <>
      <Button
        className={size < 1 ? 'fogi pagination-pill-sm' : 'fogi pagination-pill'}
        variant={(isActive ? 'primary' : 'outline-secondary')}
        onClick={() => { if (idx !== -1) handleOnClick(idx); }}
        key={idx}
      >
        {idx === - 1 ? '...' : idx + 1}
      </Button>
    </>
  );
};

export default Pill;