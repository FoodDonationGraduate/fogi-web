// Essentials
import React, { useState } from 'react';
import { Stack } from 'react-bootstrap';

// Components
import Chip from './Chip';

const ChipList = ({
  activeStatusIdx,
  setActiveStatusIdx,
  statusList,
  getStatusLabel
}) => {

  // For statusList, the list must contain 4 elements according to 4 status colors:
  // ['info', 'warning', 'primary', 'success']

  return (
    <>
      <Stack direction='horizontal' gap={3}>
        {statusList.length > 0 && statusList.map((status, idx) => (
          <Chip
            key={idx}
            status={status}
            statusIdx={idx}
            statusList={statusList}
            isActive={idx === activeStatusIdx}
            setActiveStatusIdx={setActiveStatusIdx}
            getStatusLabel={getStatusLabel}
          />
        ))}
      </Stack>
    </>
  );
};

export default ChipList;