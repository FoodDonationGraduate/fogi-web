// Essentials
import * as React from 'react';
import { Button } from 'react-bootstrap';

// Style imports
import './Pagination.css';

// Assets
import { MdArrowLeft, MdArrowRight } from 'react-icons/md';

// Utility
import { useResizer } from 'utils/helpers/Resizer.jsx';

const UtilityPill = ({
  idx,
  activeIdx,
  pageCount,
  onChangePage,
  pillSize=null
}) => {

  let size = useResizer();
  
  // -1: [...]; -2: [<]; -3: [>]
  const handleOnClick = () => {
    if (idx === -2 && activeIdx > 0) onChangePage(activeIdx - 1);
    else if (idx === -3 && activeIdx < pageCount - 1) onChangePage(activeIdx + 1);
  }

  const isSmall = (pillSize === 'sm' || size < 1);
  const style = `fogi pagination-pill${isSmall ? '-sm' : ''}`;
  
  return (
    <>
      <Button
        className={`d-flex justify-content-center align-items-center ${style}`}
        variant={(idx !== -1 ? 'primary' : 'outline-secondary')}
        onClick={handleOnClick}
        key={idx}
      >
        {idx === -1 ?
          '...'
          :
          <>
            {idx === -2 ? <MdArrowLeft size={!isSmall ? 28 : 16} /> : <MdArrowRight size={!isSmall ? 28 : 16} />}
          </>
        }
      </Button>
    </>
  );
};

export default UtilityPill;