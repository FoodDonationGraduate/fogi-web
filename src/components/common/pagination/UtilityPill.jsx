// Essentials
import * as React from 'react';
import { Button } from 'react-bootstrap';

// Style imports
import './Pagination.css';

// Utility
import { useResizer } from 'utils/helpers/Resizer.jsx';

const UtilityPill = ({
  idx,
  activeIdx,
  pageCount,
  onChangePage
}) => {

  let size = useResizer();
  
  // -1: [...]; -2: [<]; -3: [>]
  const handleOnClick = () => {
    if (idx === -2 && activeIdx > 0) onChangePage(activeIdx - 1);
    else if (idx === -3 && activeIdx < pageCount - 1) onChangePage(activeIdx + 1);
  }
  
  return (
    <>
      <Button
        className={size < 1 ? 'fogi pagination-pill-sm' : 'fogi pagination-pill'}
        variant={(idx !== -1 ? 'primary' : 'outline-secondary')}
        onClick={handleOnClick}
        key={idx}
      >
        {idx === -1 ? '...' : (idx === -2 ? '<' : '>' )}
      </Button>
    </>
  );
};

export default UtilityPill;