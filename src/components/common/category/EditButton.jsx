// Essentials
import React from 'react';

// Asset
import { MdModeEdit } from 'react-icons/md'

const EditButton = () => {

  const onClick = (event) => {
    event.stopPropagation();
  };

  return (
    <>
      <div
        className='category-edit-btn'
        onClick={onClick}
      >
        <MdModeEdit
          className='category-edit-icon'
        />
      </div>
    </>
  );
};

export default EditButton;
