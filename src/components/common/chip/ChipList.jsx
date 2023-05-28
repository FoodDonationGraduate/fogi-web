// Essentials
import React, { useState } from 'react';
import { Stack } from 'react-bootstrap';

// Components
import Chip from './Chip';

const ChipList = ({
  activeStatusIdx,
  setActiveStatusIdx,
  statusList,
  getStatusLabel,
  styleList
}) => {
  return (
    <>
      <Stack direction='horizontal' gap={2}>
        {statusList.length > 0 && statusList.map((status, idx) => (
          <Chip
            key={idx}
            status={status}
            statusIdx={idx}
            statusList={statusList}
            isActive={idx === activeStatusIdx}
            setActiveStatusIdx={setActiveStatusIdx}
            getStatusLabel={getStatusLabel}
            styleList={styleList}
            style={styleList[idx]}
          />
        ))}
      </Stack>
    </>
  );
};

export default ChipList;