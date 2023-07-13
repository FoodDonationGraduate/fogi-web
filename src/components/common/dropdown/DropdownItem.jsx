// Essentials
import React from 'react';
import { Dropdown } from 'react-bootstrap';

const DropdownItem = ({
  status,
  statusIdx,
  setActiveStatusIdx,
  isActive,
  getStatusLabel,
  style
}) => {

  return (
    <>
      <Dropdown.Item
        onClick={() => setActiveStatusIdx(statusIdx)}
        active={isActive}
      >
        {getStatusLabel(status)} {}
      </Dropdown.Item>
    </>
  );
};

export default DropdownItem;