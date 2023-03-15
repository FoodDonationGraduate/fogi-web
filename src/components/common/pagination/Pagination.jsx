// Essentials
import * as React from 'react';
import { Stack } from 'react-bootstrap';

// Components
import Pill from './Pill';

// Style imports
import './Pagination.css';

const Pagination = ({
  pageCount,
  activeIdx,
  onChangePage
}) => {

  return (
    <>
      <Stack direction='horizontal' gap={2}>
        {Array.from({ length: pageCount }).map((_, idx) => (
          <Pill
            key={idx}
            idx={idx}
            isActive={idx === activeIdx}
            onChangePage={onChangePage}
          />
        ))}
      </Stack>
    </>
  );
};

export default Pagination;