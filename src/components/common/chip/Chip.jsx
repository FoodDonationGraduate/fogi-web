// Essentials
import React from 'react';

const Chip = ({
  status,
  statusIdx,
  setActiveStatusIdx,
  isActive,
  getStatusLabel
}) => {

  const getStyle = () => {
    switch (statusIdx) {
      case 0:
        return 'neutral';
      case 1:
        return 'info';
      case 2:
        return 'warning';
      case 4:
        return 'danger';
      default:
        return 'success';
    };
  };

  return (
    <>
      <div
        className={`chip chip-${isActive ? getStyle() : 'inactive'}`}
        onClick={() => setActiveStatusIdx(statusIdx)}
      >
        {getStatusLabel(status)} {}
      </div>
    </>
  );
};

export default Chip;