// Essentials
import React from 'react';
import { Button } from 'react-bootstrap';

// Assets
import { MdArrowUpward, MdArrowDownward } from 'react-icons/md';

const SortByButton = ({
  sortBy, setSortBy
}) => {

  return (
    <>
      <Button className='fogi' variant='primary' onClick={() => setSortBy(sortBy === 'desc' ? 'asc' : 'desc')}>
        {sortBy === 'desc' ? <MdArrowDownward className='mb-1' /> : <MdArrowUpward className='mb-1' />}
      </Button>
    </>
  );
};

export default SortByButton;
