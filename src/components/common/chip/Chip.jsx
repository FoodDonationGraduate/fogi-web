// Essentials
import React from 'react';

const Chip = ({
  status,
  statusIdx,
  setActiveStatusIdx,
  isActive,
  getStatusLabel,
  style
}) => {

  return (
    <>
      <div
        className={`chip chip-${isActive ? style : 'inactive'}`}
        onClick={() => setActiveStatusIdx(statusIdx)}
      >
        {getStatusLabel(status)} {}
      </div>
    </>
  );
};

export default Chip;