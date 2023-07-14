// Essentials
import React from 'react';
import { Button } from 'react-bootstrap';

// Assets
import { MdArrowUpward, MdArrowDownward } from 'react-icons/md';

const SortByButton = ({
  isAsc, setIsAsc
}) => {

  return (
    <>
      <Button variant='outline-secondary' onClick={() => setIsAsc(!isAsc)}>
        {isAsc ? <MdArrowUpward className='mb-1' /> : <MdArrowDownward className='mb-1' />}
      </Button>
    </>
  );
};

export default SortByButton;
